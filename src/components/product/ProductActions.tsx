"use client";

import { useState } from "react";
import { Check, Share2, ShoppingBag } from "lucide-react";
import { WhatsAppButton } from "@/components/brand/WhatsAppButton";
import { useStore } from "@/store/StoreProvider";
import { productOrderMessage, productUrl } from "@/lib/whatsapp";
import type { Product } from "@/types";
import { WishlistButton } from "./WishlistButton";

export function ProductActions({ product }: { product: Product }) {
  const { addToBasket, announce, setBasketOpen } = useStore();
  const [added, setAdded] = useState(false);
  const [shared, setShared] = useState<"" | "copied" | "failed">("");

  async function share() {
    const url = productUrl(product);
    try {
      if (navigator.share) {
        await navigator.share({ title: product.name, url });
        return;
      }
      await navigator.clipboard.writeText(url);
      setShared("copied");
    } catch (e) {
      if ((e as Error)?.name === "AbortError") return;
      setShared("failed");
    }
    setTimeout(() => setShared(""), 2500);
  }

  return (
    <div className="space-y-3">
      <WhatsAppButton message={productOrderMessage(product)} fullWidth orderHint />
      <div className="grid grid-cols-[1fr_auto_auto] gap-2">
        <button
          type="button"
          className="btn btn-outline"
          onClick={() => {
            addToBasket(product.slug);
            setAdded(true);
            announce(`${product.name} added to basket`);
            setBasketOpen(true);
            setTimeout(() => setAdded(false), 2000);
          }}
        >
          {added ? (
            <Check aria-hidden="true" className="h-[18px] w-[18px]" strokeWidth={1.5} />
          ) : (
            <ShoppingBag aria-hidden="true" className="h-[18px] w-[18px]" strokeWidth={1.5} />
          )}
          {added ? "Added" : "Add to basket"}
        </button>
        <WishlistButton product={product} variant="overlay" className="!h-[52px] !w-[52px] border border-plum !bg-transparent" />
        <button
          type="button"
          onClick={share}
          className="grid h-[52px] w-[52px] place-items-center rounded-full border border-plum text-plum hover:bg-plum hover:text-ivory"
          aria-label="Share this bag"
        >
          <Share2 aria-hidden="true" className="h-[18px] w-[18px]" strokeWidth={1.5} />
        </button>
      </div>
      <p className="min-h-5 text-sm text-muted" aria-live="polite">
        {shared === "copied" ? "Link copied." : shared === "failed" ? "Could not share. Copy the link from the address bar." : ""}
      </p>
    </div>
  );
}
