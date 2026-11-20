"use client";

import Image from "next/image";
import { useState } from "react";
import { Logo } from "@/components/brand/Logo";

type Props = {
  src?: string;
  alt: string;
  sizes: string;
  className?: string;
  priority?: boolean;
  fill?: boolean;
  width?: number;
  height?: number;
};

/**
 * next/image with a soft shimmer while loading, one retry, a fade-in, and a designed primary
 * fallback (logo mark) when there is no photo or it still fails.
 *
 * Remote sample photos skip the optimiser: Next.js gives up on upstream images after 7s,
 * and the sample host is often slower than that. The browser has no such cut-off.
 * Heiz Bags' own photos (in /public) are still optimised.
 */
export function SmartImage({ src, alt, sizes, className = "", priority, fill = true, width, height }: Props) {
  const [attempt, setAttempt] = useState(0);
  const [loaded, setLoaded] = useState(false);
  const [failed, setFailed] = useState(false);

  // Reset when the photo changes (gallery, quick view).
  const [lastSrc, setLastSrc] = useState(src);
  if (src !== lastSrc) {
    setLastSrc(src);
    setAttempt(0);
    setLoaded(false);
    setFailed(false);
  }

  if (!src || failed) return <ImageFallback label={alt} />;

  const remote = /^https?:\/\//.test(src);
  const url = attempt > 0 ? `${src}${src.includes("?") ? "&" : "?"}r=${attempt}` : src;

  return (
    <>
      {!loaded && <span aria-hidden="true" className="hz-shimmer absolute inset-0" />}
      <Image
        key={url}
        src={url}
        alt={alt}
        sizes={sizes}
        priority={priority}
        unoptimized={remote}
        fill={fill}
        width={fill ? undefined : width}
        height={fill ? undefined : height}
        className={`object-cover transition-opacity duration-700 ease-out ${loaded ? "opacity-100" : "opacity-0"} ${className}`}
        onLoad={() => setLoaded(true)}
        onError={() => {
          if (attempt < 1) setTimeout(() => setAttempt((a) => a + 1), 1200);
          else setFailed(true);
        }}
      />
    </>
  );
}

export function ImageFallback({ label }: { label: string }) {
  return (
    <div role="img" aria-label={label} className="velvet absolute inset-0 grid place-items-center">
      <Logo variant="mark" tone="dark" decorative className="h-1/3 max-h-20 w-1/3 max-w-20 opacity-80" />
    </div>
  );
}
