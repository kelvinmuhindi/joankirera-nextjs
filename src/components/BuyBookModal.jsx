"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";

const POLL_INTERVAL_MS = 3000;
const POLL_TIMEOUT_MS = 90000;

export default function BuyBookModal({ open, onClose, priceLabel }) {
  const router = useRouter();
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [phase, setPhase] = useState("form"); // form | waiting | success | error
  const [errorMessage, setErrorMessage] = useState("");
  const [wasOpen, setWasOpen] = useState(open);
  const pollTimerRef = useRef(null);
  const pollDeadlineRef = useRef(null);

  useEffect(() => {
    return () => clearTimeout(pollTimerRef.current);
  }, []);

  // Reset state whenever the modal transitions to closed, so reopening
  // starts fresh. Done during render (rather than in an effect) to
  // avoid an extra cascading render pass.
  if (open !== wasOpen) {
    setWasOpen(open);
    if (!open) {
      setPhase("form");
      setErrorMessage("");
      setSubmitting(false);
      clearTimeout(pollTimerRef.current);
    }
  }

  if (!open) return null;

  async function pollStatus(orderId) {
    if (Date.now() > pollDeadlineRef.current) {
      setPhase("error");
      setErrorMessage(
        "We didn't receive confirmation in time. If you completed the M-Pesa prompt, check your email shortly — otherwise please try again."
      );
      return;
    }

    try {
      const res = await fetch(`/api/mpesa/status?orderId=${orderId}`);
      const data = await res.json();

      if (data.status === "paid") {
        setPhase("success");
        // Give the reader a moment to see the success state, then take
        // them straight into the book using their freshly-issued token.
        setTimeout(() => {
          router.push(`/book/read?token=${encodeURIComponent(data.accessToken)}`);
        }, 1400);
        return;
      }

      if (data.status === "failed") {
        setPhase("error");
        setErrorMessage(data.message || "Payment was not completed.");
        return;
      }

      pollTimerRef.current = setTimeout(() => pollStatus(orderId), POLL_INTERVAL_MS);
    } catch {
      pollTimerRef.current = setTimeout(() => pollStatus(orderId), POLL_INTERVAL_MS);
    }
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setSubmitting(true);
    setErrorMessage("");

    try {
      const res = await fetch("/api/mpesa/stkpush", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ fullName, email, phone }),
      });
      const data = await res.json();

      if (!res.ok) {
        setSubmitting(false);
        setErrorMessage(data.error || "Something went wrong. Please try again.");
        return;
      }

      setPhase("waiting");
      pollDeadlineRef.current = Date.now() + POLL_TIMEOUT_MS;
      pollStatus(data.orderId);
    } catch {
      setSubmitting(false);
      setErrorMessage("We couldn't reach the server. Please check your connection and try again.");
    }
  }

  return (
    <div className="pay-modal-overlay" onClick={onClose}>
      <div className="pay-modal" onClick={(e) => e.stopPropagation()}>
        <button className="pay-modal-close" onClick={onClose} aria-label="Close">
          ×
        </button>

        <h3 className="pay-modal-title">Get Your Copy</h3>
        <p className="pay-modal-price">From Dating to Marriage — {priceLabel}</p>

        {phase === "form" && (
          <form onSubmit={handleSubmit}>
            {errorMessage && (
              <div className="pay-status pay-status--error">{errorMessage}</div>
            )}
            <div className="pay-field">
              <label htmlFor="buy-name">Full name</label>
              <input
                id="buy-name"
                required
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder="Your full name"
              />
            </div>
            <div className="pay-field">
              <label htmlFor="buy-email">Email</label>
              <input
                id="buy-email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your.email@example.com"
              />
            </div>
            <div className="pay-field">
              <label htmlFor="buy-phone">M-Pesa phone number</label>
              <input
                id="buy-phone"
                required
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="07XX XXX XXX"
                inputMode="tel"
              />
            </div>
            <button
              type="submit"
              className="btn btn--primary pay-submit-btn"
              disabled={submitting}
            >
              {submitting && <span className="pay-spinner" />}
              {submitting ? "Sending request…" : "Pay with M-Pesa"}
            </button>
          </form>
        )}

        {phase === "waiting" && (
          <div>
            <div className="pay-status pay-status--info">
              <span className="pay-spinner" />
              Check your phone — enter your M-Pesa PIN to complete payment.
            </div>
            <p style={{ fontSize: "1.4rem", color: "var(--text-light)" }}>
              We&apos;re waiting for confirmation. This usually takes a few
              seconds after you enter your PIN.
            </p>
          </div>
        )}

        {phase === "success" && (
          <div className="pay-status pay-status--success">
            Payment received! Opening your book…
          </div>
        )}

        {phase === "error" && (
          <div>
            <div className="pay-status pay-status--error">{errorMessage}</div>
            <button
              className="btn btn--primary pay-submit-btn"
              onClick={() => {
                setPhase("form");
                setErrorMessage("");
              }}
            >
              Try Again
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
