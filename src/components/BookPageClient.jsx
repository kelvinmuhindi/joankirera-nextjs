"use client";

import { useState } from "react";
import Link from "next/link";
import BuyBookModal from "@/components/BuyBookModal";

const CHAPTERS = [
  {
    num: "CH 01",
    title: "The Purpose of Dating",
    body: "Dating isn't just romance — it's a season of intentional discovery. This chapter helps you understand what you're truly looking for, how to evaluate compatibility, and what red and green flags actually mean.",
  },
  {
    num: "CH 02",
    title: "Communication as a Love Language",
    body: "Great marriages are built on honest, empathetic communication. Learn how to express your needs, hear your partner deeply, and have conversations that strengthen your bond.",
  },
  {
    num: "CH 03",
    title: "Building Emotional Intimacy",
    body: "Emotional intimacy is the invisible glue of a lasting marriage. Unpack vulnerability, trust-building, and the practices that help couples feel truly known and loved by each other.",
  },
  {
    num: "CH 04",
    title: "Conflict, Growth, and Repair",
    body: "Every couple disagrees — what matters is how you recover. A framework for healthy conflict resolution, apology, forgiveness, and turning disagreements into deeper understanding.",
  },
  {
    num: "CH 05",
    title: "Sustaining a Lifelong Partnership",
    body: "How to keep love intentional, joy present, and your partnership growing stronger with every passing year — a vision of marriage as a living, evolving relationship.",
  },
];

const BOOK_PRICE_LABEL = `KES ${Number(
  process.env.NEXT_PUBLIC_BOOK_PRICE_KES || 1000
).toLocaleString()}`;

function BookOrderIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
      <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
      <line x1="3" y1="6" x2="21" y2="6" />
      <path d="M16 10a4 4 0 0 1-8 0" />
    </svg>
  );
}

export default function BookPageClient() {
  const [openChapter, setOpenChapter] = useState(0);
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <>
      {/* HERO */}
      <section className="book-hero">
        <div className="book-hero-text">
          <span className="book-eyebrow">New Book</span>
          <h1 className="book-hero-title">
            From Dating
            <br />
            to Marriage
          </h1>
          <span className="book-hero-subtitle-label">
            The Foundation of a Lasting Marriage
          </span>
          <p className="book-hero-desc">
            A grounded, compassionate guide for couples at every stage —
            from the early days of courtship to the deep work of building a
            lifelong partnership. Written with warmth, wisdom, and years of
            clinical insight.
          </p>

          <div className="book-authors-row">
            <div className="book-author-chip">
              <img src="/images/joan-kirera.jpeg" alt="Joan Kirera" />
              <span>Joan Kirera</span>
            </div>
            <span className="book-authors-divider">&amp;</span>
            <div className="book-author-chip">
              <div className="book-author-chip-avatar">R</div>
              <span>Dr. Rose Misati</span>
            </div>
          </div>

          <button className="book-order-btn" onClick={() => setModalOpen(true)}>
            <BookOrderIcon />
            Read Online — {BOOK_PRICE_LABEL}
          </button>
        </div>

        <div className="book-hero-visual">
          <div className="book-3d-wrapper">
            <img
              className="book-cover-img"
              src="/images/book-cover.jpeg"
              alt="From Dating to Marriage – Dr. Rose Misati & Joan Kirera"
            />
          </div>
        </div>
      </section>

      {/* ABOUT THE BOOK */}
      <section className="book-about" id="about-book">
        <div className="container">
          <div className="book-about-grid">
            <div>
              <span className="book-section-label">About the Book</span>
              <h2 className="book-about-title">
                What This Book Will Do for Your Relationship
              </h2>
              <div className="book-about-body">
                <p>
                  Whether you&apos;re navigating the excitement of dating or
                  working through the complexities of married life, this
                  book offers practical wisdom that meets you where you are.
                </p>
                <p>
                  Dr. Rose Misati and Joan Kirera combine clinical expertise
                  and lived experience to show what it really takes to
                  build a marriage that lasts — not just in good times, but
                  through every season of life.
                </p>
              </div>
            </div>

            <div className="book-highlights">
              <div className="highlight-item">
                <div className="highlight-icon">💑</div>
                <div className="highlight-text">
                  <h4>Date Intentionally</h4>
                  <p>
                    Learn to date with clarity and purpose so you choose a
                    partner for the right reasons.
                  </p>
                </div>
              </div>
              <div className="highlight-item">
                <div className="highlight-icon">🏛️</div>
                <div className="highlight-text">
                  <h4>Lay a Strong Foundation</h4>
                  <p>
                    Discover the core pillars of a healthy marriage — trust,
                    communication, and shared values.
                  </p>
                </div>
              </div>
              <div className="highlight-item">
                <div className="highlight-icon">🔁</div>
                <div className="highlight-text">
                  <h4>Navigate Conflict Well</h4>
                  <p>
                    Practical tools for resolving disagreements in ways that
                    bring you closer together.
                  </p>
                </div>
              </div>
              <div className="highlight-item">
                <div className="highlight-icon">🌿</div>
                <div className="highlight-text">
                  <h4>Grow Together Over Time</h4>
                  <p>
                    Keep your relationship alive and deeply fulfilling
                    through every stage of marriage.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CHAPTER PREVIEW */}
      <section className="book-chapters">
        <div className="container">
          <div className="chapters-header">
            <span className="book-section-label">Inside the Book</span>
            <h2>What You&apos;ll Explore</h2>
          </div>

          <div className="chapters-accordion">
            {CHAPTERS.map((chapter, i) => (
              <div
                className={`chapter-item${openChapter === i ? " open" : ""}`}
                key={chapter.num}
              >
                <div
                  className="chapter-header"
                  onClick={() => setOpenChapter(openChapter === i ? -1 : i)}
                >
                  <span className="chapter-num">{chapter.num}</span>
                  <h3 className="chapter-title-text">{chapter.title}</h3>
                  <span className="chapter-arrow">▾</span>
                </div>
                <div className="chapter-body">
                  <p>{chapter.body}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ORDER CTA */}
      <section className="book-cta-section" id="get-the-book">
        <div className="book-cta-inner">
          <span className="book-section-label">Get Your Copy</span>
          <h2 className="book-cta-title">
            Ready to Build a <span>Lasting Marriage?</span>
          </h2>
          <p className="book-cta-desc">
            Get instant online access to <em>From Dating to Marriage</em> —
            pay securely with M-Pesa and start reading right away.
          </p>

          <div className="book-cta-btn-wrap">
            <button className="book-order-btn" onClick={() => setModalOpen(true)}>
              <BookOrderIcon />
              Read Online — {BOOK_PRICE_LABEL}
            </button>
          </div>

          <p className="book-cta-note">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <polyline points="20 6 9 17 4 12" />
            </svg>
            Secure payment via M-Pesa — your reading link is emailed to you instantly
          </p>
          <p className="book-cta-note" style={{ marginTop: "0.6rem" }}>
            Prefer a printed copy?{" "}
            <Link href="/contact" style={{ textDecoration: "underline" }}>
              Contact us
            </Link>{" "}
            to arrange one.
          </p>
        </div>
      </section>

      <BuyBookModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        priceLabel={BOOK_PRICE_LABEL}
      />
    </>
  );
}
