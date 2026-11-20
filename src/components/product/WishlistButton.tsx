"use client";

import { useState } from "react";
import { Heart } from "lucide-react";
import { useStore } from "@/store/StoreProvider";
import type { Product } from "@/types";

type Props = { product: Pick<Product, "slug" | "name">; className?: string; variant?: "overlay" | "inline" };

export function WishlistButton({ product, className = "", variant = "overlay" }: Props) {
  const { isWished, toggleWish, hydrated, announce } = useStore();
  const [pop, setPop] = useState(false);
  const on = hydrated && isWished(product.slug);

  return (
    <button
      type="button"
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        toggleWish(product.slug);
        setPop(true);
        announce(on ? `${product.name} removed from wishlist` : `${product.name} saved to wishlist`);
      }}
      onAnimationEnd={() => setPop(false)}
      aria-pressed={on}
      aria-label={on ? `Remove ${product.name} from wishlist` : `Save ${product.name} to wishlist`}
      className={
        variant === "overlay"
          ? `grid h-11 w-11 place-items-center rounded-full bg-ivory/90 text-plum shadow-sm backdrop-blur transition-colors hover:bg-ivory ${className}`
          : `btn btn-outline btn-sm ${className}`
      }
    >
      <Heart
        aria-hidden="true"
        className={`h-[19px] w-[19px] ${pop ? "heart-pop" : ""}`}
        strokeWidth={1.5}
        fill={on ? "currentColor" : "none"}
      />
      {variant === "inline" && <span>{on ? "Saved" : "Save"}</span>}
    </button>
  );
}
