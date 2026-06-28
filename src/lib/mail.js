import { Resend } from "resend";

let cachedClient = null;

function getClient() {
  if (cachedClient) return cachedClient;

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    throw new Error(
      "RESEND_API_KEY is not configured. Set it in .env.local — see .env.example"
    );
  }

  cachedClient = new Resend(apiKey);
  return cachedClient;
}

/**
 * Send an email via Resend.
 *
 * Until you verify your own sending domain in Resend, set
 * MAIL_FROM to their sandbox address (onboarding@resend.dev) — it
 * works immediately with no DNS setup, but can only send to the
 * email address on your Resend account. Switch to your own domain
 * once verified, see .env.example for details.
 */
export async function sendMail({ to, subject, text, html, replyTo }) {
  const client = getClient();
  const from = process.env.MAIL_FROM || "onboarding@resend.dev";

  const { data, error } = await client.emails.send({
    from,
    to,
    subject,
    text,
    html,
    replyTo,
  });

  if (error) {
    throw new Error(
      `Resend error: ${error.message || JSON.stringify(error)}`
    );
  }

  return data;
}
