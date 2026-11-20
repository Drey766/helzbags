"use client";

import Link from "next/link";
import { Minus, Plus, X } from "lucide-react";
import { useStore } from "@/store/StoreProvider";
import { SmartImage } from "@/components/ui/SmartImage";
import { SampleTag } from "@/components/ui/SampleTag";
import { formatKes } from "@/lib/format";
import { productAlt } from "@/lib/products";
import { isDemoMode } from "@/config/brand";
import type { Product } from "@/types";

type Props = {
  items: { product: Product; qty: number }[];
  compact?: boolean;
  onNavigate?: () => void;
};

export function BasketLines({ items, compact, onNavigate }: Props) {
  const { setQty, removeFromBasket, announce } = useStore();

  return (
    <ul className="divide-y divide-line">
      {items.map(({ product: p, qty }) => (
        <li key={p.slug} className={`flex gap-4 ${compact ? "py-4" : "py-6"}`}>
          <Link
            href={`/shop/${p.slug}`}
            onClick={onNavigate}
            className={`relative shrink-0 overflow-hidden bg-surface-alt ${compact ? "h-24 w-20" : "h-28 w-[84px] sm:h-32 sm:w-[104px]"}`}
            style={{ borderRadius: "var(--radius-arch)" }}
            tabIndex={-1}
            aria-hidden="true"
          >
            <SmartImage src={p.images[0]} alt={productAlt(p)} sizes="104px" />
          </Link>
          <div className="flex min-w-0 flex-1 flex-col">
            <div className="flex items-start justify-between gap-2">
              <div className="min-w-0">
                <Link
                  href={`/shop/${p.slug}`}
                  onClick={onNavigate}
                  className={`display block leading-tight text-primary hover:text-primary-raised ${compact ? "text-xl" : "text-2xl"}`}
                >
                  {p.name}
                </Link>
                <p className="mt-1 flex flex-wrap items-center gap-2 text-sm text-muted">
                  <span className="tabular">{formatKes(p.priceKes)}</span>
                  {isDemoMode && p.status === "sample" && <span className="text-xs">Sample price</span>}
                  {!compact && <SampleTag product={p} />}
                </p>
              </div>
              <button
                type="button"
                onClick={() => {
                  removeFromBasket(p.slug);
                  announce(`${p.name} removed from basket`);
                }}
                className="-mr-2 -mt-2 grid h-11 w-11 shrink-0 place-items-center rounded-full text-muted transition-colors hover:bg-surface-alt hover:text-primary"
                aria-label={`Remove ${p.name}`}
              >
                <X aria-hidden="true" className="h-[18px] w-[18px]" strokeWidth={1.5} />
              </button>
            </div>
            <div className="mt-auto flex items-end justify-between gap-3 pt-3">
              <div className="flex items-center rounded-full border border-line bg-white" role="group" aria-label={`Quantity of ${p.name}`}>
                <button
                  type="button"
                  className="grid h-11 w-11 place-items-center rounded-full text-primary disabled:opacity-35"
                  onClick={() => {
                    setQty(p.slug, qty - 1);
                    announce(`${p.name}: quantity ${qty - 1}`);
                  }}
                  disabled={qty <= 1}
                  aria-label={`Decrease quantity of ${p.name}`}
                >
                  <Minus aria-hidden="true" className="h-4 w-4" strokeWidth={1.5} />
                </button>
                <span className="tabular w-7 text-center font-medium" aria-live="polite">
                  {qty}
                </span>
                <button
                  type="button"
                  className="grid h-11 w-11 place-items-center rounded-full text-primary disabled:opacity-35"
                  onClick={() => {
                    setQty(p.slug, qty + 1);
                    announce(`${p.name}: quantity ${qty + 1}`);
                  }}
                  disabled={qty >= 5}
                  aria-label={`Increase quantity of ${p.name}`}
                >
                  <Plus aria-hidden="true" className="h-4 w-4" strokeWidth={1.5} />
                </button>
              </div>
              <p className="tabular whitespace-nowrap text-right font-medium text-ink">{formatKes(p.priceKes * qty)}</p>
            </div>
          </div>
        </li>
      ))}
    </ul>
  );
}
