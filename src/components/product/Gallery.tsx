"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight, Expand } from "lucide-react";
import { SmartImage } from "@/components/ui/SmartImage";
import { Sheet } from "@/components/ui/Sheet";
import { productAlt } from "@/lib/products";
import type { Product } from "@/types";

/** Swipe on mobile (scroll-snap), thumbnails on desktop, lightbox with arrow keys. */
export function Gallery({ product }: { product: Product }) {
  const images = product.images;
  const [active, setActive] = useState(0);
  const [lightbox, setLightbox] = useState(false);
  const track = useRef<HTMLDivElement>(null);

  const goTo = useCallback(
    (i: number) => {
      const n = (i + images.length) % images.length;
      setActive(n);
      const el = track.current;
      if (el) el.scrollTo({ left: n * el.clientWidth, behavior: "smooth" });
    },
    [images.length],
  );

  // Sync the active index when the user swipes.
  useEffect(() => {
    const el = track.current;
    if (!el) return;
    let t: ReturnType<typeof setTimeout>;
    const onScroll = () => {
      clearTimeout(t);
      t = setTimeout(() => setActive(Math.round(el.scrollLeft / el.clientWidth)), 80);
    };
    el.addEventListener("scroll", onScroll, { passive: true });
    return () => el.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!lightbox) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") setActive((a) => (a + 1) % images.length);
      if (e.key === "ArrowLeft") setActive((a) => (a - 1 + images.length) % images.length);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [lightbox, images.length]);

  return (
    <div className="md:grid md:grid-cols-[76px_1fr] md:gap-4" role="region" aria-roledescription="carousel" aria-label={`${product.name} photos`}>
      {images.length > 1 && (
        <ul className="hidden max-h-[640px] flex-col gap-3 overflow-y-auto md:flex" aria-label="Choose photo">
          {images.map((src, i) => (
            <li key={src}>
              <button
                type="button"
                onClick={() => goTo(i)}
                aria-label={`Show photo ${i + 1} of ${images.length}`}
                aria-current={i === active}
                className={`relative block h-[92px] w-[76px] overflow-hidden rounded-xl bg-champagne transition ${
                  i === active ? "ring-2 ring-plum ring-offset-2 ring-offset-ivory" : "opacity-60 hover:opacity-100"
                }`}
              >
                <SmartImage src={src} alt="" sizes="76px" />
              </button>
            </li>
          ))}
        </ul>
      )}
      <div className={`relative ${images.length > 1 ? "" : "md:col-span-2"}`}>
        <div
          ref={track}
          className="no-scrollbar flex aspect-[4/5] snap-x snap-mandatory overflow-x-auto bg-champagne"
          style={{ borderRadius: "var(--radius-arch)" }}
          tabIndex={0}
          aria-label="Photos, swipe or use the arrow buttons"
          onKeyDown={(e) => {
            if (e.key === "ArrowRight") goTo(active + 1);
            if (e.key === "ArrowLeft") goTo(active - 1);
          }}
        >
          {images.map((src, i) => (
            <div key={src} className="relative h-full w-full shrink-0 snap-center" aria-roledescription="slide" aria-label={`${i + 1} of ${images.length}`}>
              <SmartImage src={src} alt={productAlt(product, i)} sizes="(min-width: 1024px) 45vw, 100vw" priority={i === 0} />
            </div>
          ))}
        </div>
        <button
          type="button"
          onClick={() => setLightbox(true)}
          className="absolute bottom-4 right-4 grid h-11 w-11 place-items-center rounded-full bg-ivory/90 text-plum shadow-sm backdrop-blur hover:bg-ivory"
          aria-label="Open full-screen photos"
          aria-haspopup="dialog"
        >
          <Expand aria-hidden="true" className="h-[18px] w-[18px]" strokeWidth={1.5} />
        </button>
        {images.length > 1 && (
          <>
            <div className="absolute inset-x-0 bottom-5 flex justify-center gap-1.5 md:hidden" aria-hidden="true">
              {images.map((src, i) => (
                <span key={src} className={`h-1.5 rounded-full transition-all ${i === active ? "w-5 bg-plum" : "w-1.5 bg-plum/30"}`} />
              ))}
            </div>
            <div className="absolute inset-y-0 left-2 hidden items-center md:flex">
              <ArrowBtn dir="prev" onClick={() => goTo(active - 1)} />
            </div>
            <div className="absolute inset-y-0 right-2 hidden items-center md:flex">
              <ArrowBtn dir="next" onClick={() => goTo(active + 1)} />
            </div>
          </>
        )}
      </div>

      <Sheet open={lightbox} onClose={() => setLightbox(false)} title={`${product.name} photos`} side="full" tone="dark">
        <div className="relative flex h-full flex-col items-center justify-center px-4 pb-8">
          <div className="relative h-[70vh] w-full max-w-3xl">
            <SmartImage src={images[active]} alt={productAlt(product, active)} sizes="100vw" className="!object-contain" />
          </div>
          {images.length > 1 && (
            <div className="mt-6 flex items-center gap-4">
              <ArrowBtn dir="prev" dark onClick={() => setActive((a) => (a - 1 + images.length) % images.length)} />
              <span className="tabular text-sm text-lilac-text" aria-live="polite">
                {active + 1} / {images.length}
              </span>
              <ArrowBtn dir="next" dark onClick={() => setActive((a) => (a + 1) % images.length)} />
            </div>
          )}
        </div>
      </Sheet>
    </div>
  );
}

function ArrowBtn({ dir, onClick, dark }: { dir: "prev" | "next"; onClick: () => void; dark?: boolean }) {
  const Icon = dir === "prev" ? ChevronLeft : ChevronRight;
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={dir === "prev" ? "Previous photo" : "Next photo"}
      className={`grid h-11 w-11 place-items-center rounded-full shadow-sm ${
        dark ? "border border-gold/50 text-gold-light hover:bg-white/10" : "bg-ivory/90 text-plum hover:bg-ivory"
      }`}
    >
      <Icon aria-hidden="true" className="h-5 w-5" strokeWidth={1.5} />
    </button>
  );
}
