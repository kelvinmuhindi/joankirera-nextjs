"use client";

import { useState } from "react";

const SERVICES = [
  "Book Purchase",
  "Individual Therapy",
  "Family Counseling",
  "Marriage Therapy",
  "Child & Adolescent Therapy",
  "Virtual Therapy",
  "Group Sessions & Training",
  "Other",
];

const initialForm = {
  name: "",
  email: "",
  phone: "",
  service: "",
  eventDate: "",
  message: "",
};

export default function ContactForm() {
  const [form, setForm] = useState(initialForm);
  const [submitting, setSubmitting] = useState(false);
  const [result, setResult] = useState(null); // { ok: true } | { ok: false, error }

  function update(field) {
    return (e) => setForm((f) => ({ ...f, [field]: e.target.value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setSubmitting(true);
    setResult(null);

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();

      if (!res.ok) {
        setResult({ ok: false, error: data.error || "Something went wrong." });
      } else {
        setResult({ ok: true });
        setForm(initialForm);
      }
    } catch {
      setResult({
        ok: false,
        error: "We couldn't reach the server. Please check your connection and try again.",
      });
    } finally {
      setSubmitting(false);
    }
  }

  if (result?.ok) {
    return (
      <div className="pay-status pay-status--success" style={{ fontSize: "1.6rem" }}>
        Thank you, {form.name || "friend"}! Your message has been sent — we&apos;ll
        be in touch shortly.
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="contact__form">
      {result?.error && (
        <div className="pay-status pay-status--error" style={{ marginBottom: "2rem" }}>
          {result.error}
        </div>
      )}

      <div className="contact__form-field">
        <label className="contact__form-label" htmlFor="name">
          Name *
        </label>
        <input
          required
          placeholder="Your full name"
          type="text"
          className="contact__form-input"
          name="name"
          id="name"
          value={form.name}
          onChange={update("name")}
        />
      </div>

      <div className="contact__form-field">
        <label className="contact__form-label" htmlFor="email">
          Email *
        </label>
        <input
          required
          placeholder="your.email@example.com"
          type="email"
          className="contact__form-input"
          name="email"
          id="email"
          value={form.email}
          onChange={update("email")}
        />
      </div>

      <div className="contact__form-field">
        <label className="contact__form-label" htmlFor="phone">
          Phone Number
        </label>
        <input
          placeholder="+254 700 000 000"
          type="tel"
          className="contact__form-input"
          name="phone"
          id="phone"
          value={form.phone}
          onChange={update("phone")}
        />
      </div>

      <div className="contact__form-field">
        <label className="contact__form-label" htmlFor="service">
          Service Required *
        </label>
        <select
          required
          className="contact__form-input"
          name="service"
          id="service"
          value={form.service}
          onChange={update("service")}
        >
          <option value="" disabled>
            Select a service
          </option>
          {SERVICES.map((s) => (
            <option value={s} key={s}>
              {s}
            </option>
          ))}
        </select>
      </div>

      <div className="contact__form-field">
        <label className="contact__form-label" htmlFor="event-date">
          Preferred Date
        </label>
        <input
          type="date"
          className="contact__form-input"
          name="event-date"
          id="event-date"
          value={form.eventDate}
          onChange={update("eventDate")}
        />
      </div>

      <div className="contact__form-field">
        <label className="contact__form-label" htmlFor="message">
          Message
        </label>
        <textarea
          cols="20"
          rows="6"
          className="contact__form-input"
          placeholder="Tell us how we can help you..."
          name="message"
          id="message"
          value={form.message}
          onChange={update("message")}
        ></textarea>
      </div>

      <button
        type="submit"
        className="btn btn--primary contact__btn"
        disabled={submitting}
      >
        {submitting ? "Sending…" : "Send Message"}
      </button>
    </form>
  );
}
