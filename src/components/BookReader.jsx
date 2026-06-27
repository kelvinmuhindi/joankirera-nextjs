"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { Document, Page, pdfjs } from "react-pdf";
import "react-pdf/dist/Page/AnnotationLayer.css";
import "react-pdf/dist/Page/TextLayer.css";

if (typeof window !== "undefined") {
  pdfjs.GlobalWorkerOptions.workerSrc = "/pdf-worker/pdf.worker.min.mjs";
}

export default function BookReader({ token }) {
  const [status, setStatus] = useState("checking"); // checking | denied | ready
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);
  const [pageWidth, setPageWidth] = useState(720);
  const [loadError, setLoadError] = useState(null);

  useEffect(() => {
    let cancelled = false;
    async function check() {
      if (!token) {
        setStatus("denied");
        return;
      }
      try {
        const res = await fetch(
          `/api/book/access?token=${encodeURIComponent(token)}`
        );
        if (cancelled) return;
        setStatus(res.ok ? "ready" : "denied");
      } catch {
        if (!cancelled) setStatus("denied");
      }
    }
    check();
    return () => {
      cancelled = true;
    };
  }, [token]);

  useEffect(() => {
    function updateWidth() {
      const margin = window.innerWidth < 768 ? 32 : 96;
      setPageWidth(Math.min(820, window.innerWidth - margin));
    }
    updateWidth();
    window.addEventListener("resize", updateWidth);
    return () => window.removeEventListener("resize", updateWidth);
  }, []);

  const onDocumentLoadSuccess = useCallback(({ numPages }) => {
    setNumPages(numPages);
    setLoadError(null);
  }, []);

  const onDocumentLoadError = useCallback((err) => {
    setLoadError(
      err?.message?.includes("Missing PDF")
        ? "The book file hasn't been uploaded yet. Please contact support."
        : "We couldn't load the book right now. Please refresh or contact support."
    );
  }, []);

  if (status === "checking") {
    return (
      <div className="reader-gate">
        <p>Checking your access…</p>
      </div>
    );
  }

  if (status === "denied") {
    return (
      <div className="reader-gate">
        <h1>This link isn&apos;t valid</h1>
        <p>
          Your access link may have expired or is incorrect. If you&apos;ve
          already purchased the book, check your email for the original
          link, or get in touch and we&apos;ll resend it.
        </p>
        <Link href="/book" className="btn btn--primary">
          Back to the Book Page
        </Link>
      </div>
    );
  }

  const pdfUrl = `/api/book/pdf?token=${encodeURIComponent(token)}`;

  return (
    <div className="reader-shell">
      <div className="reader-topbar">
        <span className="reader-topbar-title">From Dating to Marriage</span>
        {numPages && (
          <div className="reader-page-controls">
            <button
              onClick={() => setPageNumber((p) => Math.max(1, p - 1))}
              disabled={pageNumber <= 1}
              aria-label="Previous page"
            >
              ‹
            </button>
            <span>
              Page {pageNumber} of {numPages}
            </span>
            <button
              onClick={() => setPageNumber((p) => Math.min(numPages, p + 1))}
              disabled={pageNumber >= numPages}
              aria-label="Next page"
            >
              ›
            </button>
          </div>
        )}
      </div>

      <div className="reader-canvas-wrap">
        {loadError ? (
          <div className="reader-gate">
            <p>{loadError}</p>
          </div>
        ) : (
          <Document
            file={pdfUrl}
            onLoadSuccess={onDocumentLoadSuccess}
            onLoadError={onDocumentLoadError}
            loading={<p style={{ fontSize: "1.6rem" }}>Loading book…</p>}
          >
            <Page
              pageNumber={pageNumber}
              width={pageWidth}
              renderAnnotationLayer
              renderTextLayer
            />
          </Document>
        )}
      </div>
    </div>
  );
}
