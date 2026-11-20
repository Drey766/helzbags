import Link from "next/link";
import { SmartImage } from "@/components/ui/SmartImage";
import { SampleTag } from "@/components/ui/SampleTag";
import { Price } from "@/components/ui/Price";
import { getCategory, productAlt } from "@/lib/products";
import type { Product } from "@/types";
import { WishlistButton } from "./WishlistButton";
import { OwnPlaceholder } from "./OwnPlaceholder";
import { QuickViewButton } from "./QuickView";

type Props = { product: Product; priority?: boolean; sizes?: string; className?: string };

export function ProductCard({
  product: p,
  priority,
  sizes = "(min-width: 1024px) 25vw, (min-width: 640px) 33vw, 50vw",
  className = "",
}: Props) {
  const hasPhotos = p.images.length > 0;
  const category = getCategory(p.category);

  return (
    <article className={`arch-group group relative ${className}`}>
      <div className="relative">
        {/* handle line above the arch */}
        <svg
          aria-hidden="true"
          viewBox="0 0 100 30"
          preserveAspectRatio="none"
          className="arch-handle pointer-events-none mx-auto block h-5 w-[42%] overflow-visible md:h-6"
        >
          <path d="M6,30 C6,2 94,2 94,30" fill="none" stroke="var(--zb-gold-text)" strokeWidth="1.25" vectorEffect="non-scaling-stroke" opacity=".7" />
        </svg>
        <Link
          href={`/shop/${p.slug}`}
          className="relative block aspect-[4/5] overflow-hidden bg-champagne"
          style={{ borderRadius: "var(--radius-arch)" }}

        >
          {hasPhotos ? (
            <>
              <SmartImage
                src={p.images[0]}
                alt={productAlt(p)}
                sizes={sizes}
                priority={priority}
                className="transition-[opacity,transform] duration-700 ease-out group-hover:scale-[1.03]"
              />
              {p.images[1] && (
                <span className="absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100">
                  <SmartImage src={p.images[1]} alt="" sizes={sizes} />
                </span>
              )}
            </>
          ) : (
            <OwnPlaceholder name={p.name} size="sm" />
          )}
        </Link>
        <div className="pointer-events-none absolute inset-x-3 top-[18%] flex items-start justify-between md:top-[16%]">
          <div className="flex flex-col items-start gap-1.5">
            {p.isNew && (
              <span className="rounded-full bg-lilac px-2.5 py-1 text-[11px] font-medium uppercase leading-none tracking-[0.14em] text-plum">
                New
              </span>
            )}
            <SampleTag product={p} />
          </div>
        </div>
        <div className="absolute right-2 top-[16%] md:top-[14%]">
          <WishlistButton product={p} />
        </div>
        <div className="absolute inset-x-3 bottom-3 hidden translate-y-2 opacity-0 transition-all duration-300 group-focus-within:translate-y-0 group-focus-within:opacity-100 group-hover:translate-y-0 group-hover:opacity-100 md:block">
          <QuickViewButton slug={p.slug} name={p.name} />
        </div>
      </div>
      <div className="mt-4 px-1">
        {category && <p className="eyebrow text-muted">{category.name}</p>}
        <h3 className="display mt-1 text-[1.375rem] leading-tight text-plum">
          <Link href={`/shop/${p.slug}`} className="link-underline">
            {p.name}
          </Link>
        </h3>
        <Price product={p} size="sm" className="mt-1.5" />
      </div>
    </article>
  );
}
