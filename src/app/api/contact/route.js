import { NextResponse } from "next/server";
import { z } from "zod";
import { sendMail } from "@/lib/mail";
import { recordSubmission } from "@/lib/submissions";

const ContactSchema = z.object({
  name: z.string({ error: "Name is required" }).trim().min(1, "Name is required").max(200),
  email: z.string({ error: "A valid email is required" }).trim().email("A valid email is required"),
  phone: z.string().trim().max(40).optional().or(z.literal("")),
  service: z
    .string({ error: "Please select a service" })
    .trim()
    .min(1, "Please select a service")
    .max(120, "Please select a service"),
  eventDate: z.string().trim().max(40).optional().or(z.literal("")),
  message: z.string().trim().max(5000).optional().or(z.literal("")),
});

export async function POST(request) {
  let body;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body" }, { status: 400 });
  }

  const parsed = ContactSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: parsed.error.issues[0]?.message || "Invalid input" },
      { status: 400 }
    );
  }

  const { name, email, phone, service, eventDate, message } = parsed.data;
  const recipient = process.env.CONTACT_TO_EMAIL;

  const lines = [
    `Name: ${name}`,
    `Email: ${email}`,
    phone ? `Phone: ${phone}` : null,
    `Service Required: ${service}`,
    eventDate ? `Preferred Date: ${eventDate}` : null,
    "",
    "Message:",
    message || "(no message provided)",
  ].filter(Boolean);

  const text = lines.join("\n");
  const html = `
    <h2>New contact form submission</h2>
    <p><strong>Name:</strong> ${escapeHtml(name)}</p>
    <p><strong>Email:</strong> ${escapeHtml(email)}</p>
    ${phone ? `<p><strong>Phone:</strong> ${escapeHtml(phone)}</p>` : ""}
    <p><strong>Service Required:</strong> ${escapeHtml(service)}</p>
    ${eventDate ? `<p><strong>Preferred Date:</strong> ${escapeHtml(eventDate)}</p>` : ""}
    <p><strong>Message:</strong></p>
    <p>${escapeHtml(message || "(no message provided)").replace(/\n/g, "<br/>")}</p>
  `;

  try {
    await sendMail({
      to: recipient,
      subject: `New enquiry from ${name} — ${service}`,
      text,
      html,
      replyTo: email,
    });
  } catch (err) {
    console.error("Contact form email failed:", err);
    // Store the submission either way — a failed notification email
    // should never mean we silently lose the enquiry itself.
    await recordSubmission({
      name,
      email,
      phone,
      service,
      eventDate,
      message,
      emailStatus: "failed",
    });
    return NextResponse.json(
      { error: "We couldn't send your message right now. Please try again shortly, or email us directly." },
      { status: 502 }
    );
  }

  await recordSubmission({
    name,
    email,
    phone,
    service,
    eventDate,
    message,
    emailStatus: "sent",
  });

  return NextResponse.json({ ok: true });
}

function escapeHtml(str) {
  return String(str)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}
