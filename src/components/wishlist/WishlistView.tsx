"use client";

import Link from "next/link";
import { Heart, ShoppingBag } from "lucide-react";
import { useStore } from "@/store/StoreProvider";
import { getProducts } from "@/lib/products";
import { wishlistMessage } from "@/lib/whatsapp";
import { ProductCard } from "@/components/product/ProductCard";
import { WhatsAppButton } from "@/components/brand/WhatsAppButton";
import { HandleArch } from "@/components/brand/HandleArch";

export function WishlistView() {
  const { wishlist, hydrated, addToBasket, announce, setBasketOpen } = useStore();
  const bySlug = new Map(getProducts().map((p) => [p.slug, p]));
  const items = wishlist.map((s) => bySlug.get(s)).filter((p) => !!p);

  if (!hydrated) return <div className="min-h-[40vh]" aria-busy="true" />;

  if (!items.length) {
    return (
      <div className="mx-auto flex max-w-md flex-col items-center py-12 text-center">
        <HandleArch className="w-28" frameClassName="velvet aspect-[4/5] grid place-items-center">
          <Heart aria-hidden="true" className="h-8 w-8 text-accent-light" strokeWidth={1.25} />
        </HandleArch>
        <p className="display mt-6 text-3xl text-primary">Nothing saved yet.</p>
        <p className="mt-3 text-muted">Tap the heart on any bag to keep it here for later.</p>
        <Link href="/shop" className="btn btn-primary mt-6">
          Shop the collection
        </Link>
      </div>
    );
  }

  return (
    <div>
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-muted">
          <span className="tabular">{items.length}</span> saved {items.length === 1 ? "bag" : "bags"}
        </p>
        <div className="flex flex-wrap gap-3">
          <button
            type="button"
            className="btn btn-outline btn-sm"
            onClick={() => {
              items.forEach((p) => addToBasket(p!.slug));
              announce(`${items.length} bags moved to basket`);
              setBasketOpen(true);
            }}
          >
            <ShoppingBag aria-hidden="true" className="h-4 w-4" strokeWidth={1.5} />
            Add all to basket
          </button>
          <WhatsAppButton message={wishlistMessage(items.map((p) => p!))} label="Share list on WhatsApp" size="sm" />
        </div>
      </div>
      <h2 className="sr-only">Saved bags</h2>
      <ul className="mt-10 grid grid-cols-2 gap-x-3 gap-y-12 sm:grid-cols-3 md:gap-x-6 xl:grid-cols-4">
        {items.map((p) => (
          <li key={p!.id}>
            <ProductCard product={p!} />
            <button
              type="button"
              className="mt-3 flex min-h-11 items-center gap-2 px-1 text-sm text-primary underline-offset-4 hover:underline"
              onClick={() => {
                addToBasket(p!.slug);
                announce(`${p!.name} added to basket`);
                setBasketOpen(true);
              }}
            >
              <ShoppingBag aria-hidden="true" className="h-4 w-4" strokeWidth={1.5} />
              Move to basket
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
