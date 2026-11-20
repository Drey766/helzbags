import { isDemoMode } from "@/config/brand";
import type { Product } from "@/types";

/** "Sample" on sample bags, "Heiz Collection" on their own, only in demo mode. */
export function SampleTag({ product, className = "" }: { product: Pick<Product, "status">; className?: string }) {
  if (!isDemoMode) return null;
  const own = product.status === "own";
  return (
    <span
      className={`inline-flex items-center rounded-full px-2.5 py-1 text-[11px] font-medium uppercase leading-none tracking-[0.14em] ${
        own ? "bg-primary text-accent-light" : "bg-white/95 text-muted ring-1 ring-line"
      } ${className}`}
    >
      {own ? "Heiz Collection" : "Sample"}
    </span>
  );
}
