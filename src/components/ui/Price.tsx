import { isDemoMode } from "@/config/brand";
import { formatKes } from "@/lib/format";
import type { Product } from "@/types";

type Props = {
  product: Pick<Product, "priceKes" | "status">;
  className?: string;
  size?: "sm" | "md" | "lg";
  tone?: "light" | "dark";
};

export function Price({ product, className = "", size = "md", tone = "light" }: Props) {
  const sample = isDemoMode && product.status === "sample";
  const sz = { sm: "text-[0.95rem]", md: "text-base", lg: "text-2xl" }[size];
  return (
    <span className={`inline-flex flex-wrap items-baseline gap-x-2 ${className}`}>
      <span className={`tabular font-medium ${sz} ${tone === "dark" ? "text-surface" : "text-ink"}`}>
        {formatKes(product.priceKes)}
      </span>
      {sample && (
        <span className={`text-xs tracking-wide ${tone === "dark" ? "text-muted-on-dark" : "text-muted"}`}>
          Sample price
        </span>
      )}
    </span>
  );
}
