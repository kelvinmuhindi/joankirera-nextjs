import { NextResponse } from "next/server";
import { markOrderPaid, markOrderFailed, getOrderByCheckoutRequestId } from "@/lib/orders";
import { issueAccessToken } from "@/lib/access-token";
import { sendMail } from "@/lib/mail";

/**
 * Safaricom calls this URL directly (server-to-server) after the
 * customer completes or cancels the STK push prompt on their phone.
 * It does not go through the browser, so there's no user session here.
 *
 * Expected payload shape (simplified):
 * {
 *   Body: {
 *     stkCallback: {
 *       MerchantRequestID, CheckoutRequestID, ResultCode, ResultDesc,
 *       CallbackMetadata: { Item: [{ Name, Value }, ...] } // only on success
 *     }
 *   }
 * }
 */
export async function POST(request) {
  let payload;
  try {
    payload = await request.json();
  } catch {
    // Always 200 — Safaricom retries aggressively on non-200 responses,
    // and we can't recover a malformed payload by retrying anyway.
    return NextResponse.json({ ok: true });
  }

  const callback = payload?.Body?.stkCallback;
  if (!callback) {
    return NextResponse.json({ ok: true });
  }

  const { CheckoutRequestID, ResultCode, ResultDesc } = callback;

  try {
    if (ResultCode === 0) {
      const items = callback.CallbackMetadata?.Item || [];
      const getItem = (name) => items.find((i) => i.Name === name)?.Value;
      const mpesaReceiptNumber = getItem("MpesaReceiptNumber");

      const order = await markOrderPaid(CheckoutRequestID, {
        mpesaReceiptNumber,
        resultDesc: ResultDesc,
      });

      if (order) {
        const token = issueAccessToken({ orderId: order.id, email: order.email });
        const appUrl = process.env.APP_URL || new URL(request.url).origin;
        const readLink = `${appUrl}/book/read?token=${encodeURIComponent(token)}`;

        try {
          await sendMail({
            to: order.email,
            subject: "Your copy of 'From Dating to Marriage' is ready",
            text: `Thank you for your purchase, ${order.fullName}!\n\nM-Pesa receipt: ${mpesaReceiptNumber}\n\nRead your book online here:\n${readLink}\n\nThis link is yours to keep — bookmark it to come back anytime.`,
            html: `
              <p>Thank you for your purchase, ${order.fullName}!</p>
              <p><strong>M-Pesa receipt:</strong> ${mpesaReceiptNumber}</p>
              <p>You can read your copy of <em>From Dating to Marriage</em> online here:</p>
              <p><a href="${readLink}">${readLink}</a></p>
              <p>This link is yours to keep — bookmark it to come back anytime.</p>
            `,
          });
        } catch (mailErr) {
          // Payment already succeeded; don't fail the callback over email.
          console.error("Failed to send purchase confirmation email:", mailErr);
        }
      }
    } else {
      // ResultCode !== 0 means the user cancelled or the request timed out.
      await markOrderFailed(CheckoutRequestID, { resultDesc: ResultDesc });
    }
  } catch (err) {
    console.error("Error processing M-Pesa callback:", err);
  }

  // Safaricom only cares that we returned 200 OK.
  return NextResponse.json({ ResultCode: 0, ResultDesc: "Accepted" });
}
