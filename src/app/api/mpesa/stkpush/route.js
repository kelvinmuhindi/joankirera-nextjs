import { NextResponse } from "next/server";
import { z } from "zod";
import { initiateStkPush, normalizePhone } from "@/lib/mpesa";
import { createOrder, attachCheckoutRequest } from "@/lib/orders";

const BOOK_PRICE_KES = Number(process.env.BOOK_PRICE_KES || 1000);

const RequestSchema = z.object({
  fullName: z.string({ error: "Full name is required" }).trim().min(1, "Full name is required").max(200),
  email: z.string({ error: "A valid email is required" }).trim().email("A valid email is required"),
  phone: z.string({ error: "A valid phone number is required" }).trim().min(9, "Enter a valid phone number").max(15),
});

export async function POST(request) {
  let body;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body" }, { status: 400 });
  }

  const parsed = RequestSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: parsed.error.issues[0]?.message || "Invalid input" },
      { status: 400 }
    );
  }

  let phone;
  try {
    phone = normalizePhone(parsed.data.phone);
  } catch {
    return NextResponse.json(
      { error: "Enter a valid Safaricom number, e.g. 0712345678" },
      { status: 400 }
    );
  }

  const { fullName, email } = parsed.data;
  const order = await createOrder({
    fullName,
    email,
    phone,
    amount: BOOK_PRICE_KES,
  });

  const appUrl = process.env.APP_URL || new URL(request.url).origin;
  const callbackUrl = `${appUrl}/api/mpesa/callback`;

  try {
    const stkResponse = await initiateStkPush({
      phone,
      amount: BOOK_PRICE_KES,
      accountReference: "FromDating2Marriage",
      description: "From Dating to Marriage",
      callbackUrl,
    });

    if (stkResponse.ResponseCode !== "0") {
      return NextResponse.json(
        { error: stkResponse.ResponseDescription || "Could not start payment" },
        { status: 502 }
      );
    }

    await attachCheckoutRequest(order.id, {
      merchantRequestId: stkResponse.MerchantRequestID,
      checkoutRequestId: stkResponse.CheckoutRequestID,
    });

    return NextResponse.json({
      orderId: order.id,
      checkoutRequestId: stkResponse.CheckoutRequestID,
    });
  } catch (err) {
    console.error("STK push failed:", err?.response?.data || err);
    return NextResponse.json(
      {
        error:
          "We couldn't reach M-Pesa right now. Please check the number and try again.",
      },
      { status: 502 }
    );
  }
}
