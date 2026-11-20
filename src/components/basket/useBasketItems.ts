"use client";

import { useMemo } from "react";
import { useStore } from "@/store/StoreProvider";
import { getProducts } from "@/lib/products";
import { basketTotal } from "@/lib/whatsapp";
import type { Product } from "@/types";

/** Basket lines joined with visible products. Lines for bags no longer shown are skipped. */
export function useBasketItems() {
  const { basket } = useStore();
  return useMemo(() => {
    const bySlug = new Map(getProducts().map((p) => [p.slug, p]));
    const items = basket
      .map((l) => ({ product: bySlug.get(l.slug), qty: l.qty }))
      .filter((i): i is { product: Product; qty: number } => !!i.product);
    return { items, subtotal: basketTotal(items) };
  }, [basket]);
}
