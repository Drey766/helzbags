"use client";

import { useEffect } from "react";
import { useStore } from "@/store/StoreProvider";
import { getProducts } from "@/lib/products";
import { ProductCard } from "./ProductCard";

/** Records the current bag and shows the others viewed recently (after mount only). */
export function RecentlyViewed({ current }: { current: string }) {
  const { recent, pushRecent, hydrated } = useStore();

  useEffect(() => {
    if (hydrated) pushRecent(current);
  }, [current, hydrated, pushRecent]);

  if (!hydrated) return null;
  const bySlug = new Map(getProducts().map((p) => [p.slug, p]));
  const items = recent.filter((s) => s !== current).map((s) => bySlug.get(s)).filter((p) => !!p).slice(0, 4);
  if (!items.length) return null;

  return (
    <section className="container-zb pb-20" aria-labelledby="recent-title">
      <h2 id="recent-title" className="display text-3xl text-plum">
        Recently viewed
      </h2>
      <ul className="mt-8 grid grid-cols-2 gap-x-3 gap-y-10 md:grid-cols-4 md:gap-x-6">
        {items.map((p) => (
          <li key={p!.id}>
            <ProductCard product={p!} />
          </li>
        ))}
      </ul>
    </section>
  );
}
