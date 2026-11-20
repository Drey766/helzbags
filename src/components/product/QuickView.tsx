"use client";

import Link from "next/link";
import { createContext, useCallback, useContext, useState } from "react";
import { Eye, ShoppingBag } from "lucide-react";
import { Sheet } from "@/components/ui/Sheet";
import { SmartImage } from "@/components/ui/SmartImage";
import { SampleTag } from "@/components/ui/SampleTag";
import { Price } from "@/components/ui/Price";
import { WhatsAppButton } from "@/components/brand/WhatsAppButton";
import { useStore } from "@/store/StoreProvider";
import { getProduct, productAlt } from "@/lib/products";
import { productOrderMessage } from "@/lib/whatsapp";
import { FitsRow } from "./FitsRow";
import { OwnPlaceholder } from "./OwnPlaceholder";

const QuickViewContext = createContext<(slug: string) => void>(() => {});

export function QuickViewProvider({ children }: { children: React.ReactNode }) {
  const [slug, setSlug] = useState<string | null>(null);
  const open = useCallback((s: string) => setSlug(s), []);
  const product = slug ? getProduct(slug) : undefined;
  const { addToBasket, announce, setBasketOpen } = useStore();
  const [active, setActive] = useState(0);

  return (
    <QuickViewContext.Provider value={open}>
      {children}
      <Sheet
        open={!!product}
        onClose={() => {
          setSlug(null);
          setActive(0);
        }}
        title={product ? `Quick view: ${product.name}` : "Quick view"}
        side="responsive"
        hideTitle
      >
        {product && (
          <div className="px-5 pb-8">
            <div className="relative aspect-[4/5] overflow-hidden bg-surface-alt" style={{ borderRadius: "var(--radius-arch)" }}>
              {product.images.length ? (
                <SmartImage src={product.images[active]} alt={productAlt(product, active)} sizes="(min-width: 768px) 420px, 100vw" />
              ) : (
                <OwnPlaceholder name={product.name} />
              )}
            </div>
            {product.images.length > 1 && (
              <div className="mt-3 flex gap-2 overflow-x-auto no-scrollbar" role="group" aria-label="Photos">
                {product.images.map((src, i) => (
                  <button
                    key={src}
                    type="button"
                    onClick={() => setActive(i)}
                    aria-label={`Show photo ${i + 1}`}
                    aria-current={i === active}
                    className={`relative h-16 w-14 shrink-0 overflow-hidden rounded-xl ring-offset-2 ring-offset-surface ${i === active ? "ring-2 ring-primary" : "opacity-70"}`}
                  >
                    <SmartImage src={src} alt="" sizes="56px" />
                  </button>
                ))}
              </div>
            )}
            <div className="mt-5 flex items-center gap-2">
              <SampleTag product={product} />
            </div>
            <h3 className="display mt-2 text-3xl leading-tight text-primary">{product.name}</h3>
            <Price product={product} size="lg" className="mt-1" />
            {product.summary && <p className="mt-3 text-muted">{product.summary}</p>}
            <div className="mt-5">
              <FitsRow fits={product.fits} headingLevel="h4" />
            </div>
            <div className="mt-6 grid gap-3">
              <WhatsAppButton message={productOrderMessage(product)} fullWidth orderHint />
              <button
                type="button"
                className="btn btn-outline w-full"
                onClick={() => {
                  addToBasket(product.slug);
                  announce(`${product.name} added to basket`);
                  setSlug(null);
                  setBasketOpen(true);
                }}
              >
                <ShoppingBag aria-hidden="true" className="h-[18px] w-[18px]" strokeWidth={1.5} />
                Add to basket
              </button>
              <Link href={`/shop/${product.slug}`} onClick={() => setSlug(null)} className="btn w-full text-primary underline-offset-4 hover:underline">
                View details
              </Link>
            </div>
          </div>
        )}
      </Sheet>
    </QuickViewContext.Provider>
  );
}

export function QuickViewButton({ slug, name }: { slug: string; name: string }) {
  const open = useContext(QuickViewContext);
  return (
    <button
      type="button"
      onClick={() => open(slug)}
      className="pointer-events-auto flex min-h-11 w-full items-center justify-center gap-2 rounded-full bg-surface/95 text-sm font-medium tracking-wide text-primary shadow-sm backdrop-blur transition-colors hover:bg-primary hover:text-surface"
      aria-label={`Quick view ${name}`}
      aria-haspopup="dialog"
    >
      <Eye aria-hidden="true" className="h-4 w-4" strokeWidth={1.5} />
      Quick view
    </button>
  );
}
