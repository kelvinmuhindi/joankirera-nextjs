"use client";

import dynamic from "next/dynamic";

const BookReader = dynamic(() => import("@/components/BookReader"), {
  ssr: false,
  loading: () => (
    <div className="reader-gate">
      <p>Loading reader…</p>
    </div>
  ),
});

export default function BookReaderClientOnly({ token }) {
  return <BookReader token={token} />;
}
