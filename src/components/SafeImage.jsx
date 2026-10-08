"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";

/**
 * next/image with a safety net: if the image optimizer can't produce the
 * image (host without `sharp`, unusual file format, optimizer limits, etc.),
 * fall back to serving the original file from /public instead of showing a
 * broken image.
 *
 * Two triggers cover both cases:
 *  - onError: the image fails after React has hydrated
 *  - mount check: the image already failed before hydration, so the
 *    error event was missed
 */
export default function SafeImage({ unoptimized, ...props }) {
  const [failed, setFailed] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const img = ref.current;
    if (img && img.complete && img.naturalWidth === 0 && img.currentSrc) {
      setFailed(true);
    }
  }, []);

  return (
    <Image
      {...props}
      ref={ref}
      unoptimized={failed || unoptimized}
      onError={() => setFailed(true)}
    />
  );
}
