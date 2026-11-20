"use client";

import { useEffect, useRef, useState } from "react";

/** Adds visibility once the element enters the viewport. Instant when reduced motion is on. */
export function useReveal<T extends Element>(options: { rootMargin?: string; threshold?: number } = {}) {
  const ref = useRef<T | null>(null);
  const [visible, setVisible] = useState(false);
  const { rootMargin = "0px 0px -10% 0px", threshold = 0.15 } = options;

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce || typeof IntersectionObserver === "undefined") {
      setVisible(true); // eslint-disable-line react-hooks/set-state-in-effect -- no observer needed
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          setVisible(true);
          io.disconnect();
        }
      },
      { rootMargin, threshold },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [rootMargin, threshold]);

  return { ref, visible };
}
