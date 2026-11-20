import Link from "next/link";
import { getOwnProducts, productAlt } from "@/lib/products";
import { HandleArch } from "@/components/brand/HandleArch";
import { SmartImage } from "@/components/ui/SmartImage";
import { Price } from "@/components/ui/Price";
import { OwnPlaceholder } from "@/components/product/OwnPlaceholder";
import { WhatsAppButton } from "@/components/brand/WhatsAppButton";
import { productOrderMessage } from "@/lib/whatsapp";
import { SectionHeading } from "./SectionHeading";

/** Zuri's own bags (ZB-001, ZB-002), in their own words, with designed placeholders until photos arrive. */
export function ZuriCollection() {
  const own = getOwnProducts();
  if (!own.length) return null;
  return (
    <section className="section bg-champagne" aria-labelledby="collection-title">
      <div className="container-zb">
        <SectionHeading
          eyebrow="The Zuri Collection"
          title={<span id="collection-title">From our shops, in our words</span>}
          align="center"
        />
        <ul className="mx-auto mt-14 grid max-w-5xl gap-12 md:grid-cols-2 md:gap-16">
          {own.map((p) => (
            <li key={p.id} className="flex flex-col items-center text-center">
              <Link href={`/shop/${p.slug}`} className="arch-group group block w-full max-w-[360px]">
                <HandleArch frameClassName="aspect-[4/5] bg-plum">
                  {p.images.length ? (
                    <SmartImage src={p.images[0]} alt={productAlt(p)} sizes="(min-width: 768px) 360px, 90vw" />
                  ) : (
                    <OwnPlaceholder name={p.name} size="md" />
                  )}
                </HandleArch>
              </Link>
              <h3 className="display mt-6 text-3xl text-plum">
                <Link href={`/shop/${p.slug}`} className="link-underline">
                  {p.name}
                </Link>
              </h3>
              <Price product={p} className="mt-1" />
              {p.description && (
                <blockquote className="display mt-4 max-w-sm text-xl italic leading-snug text-ink">&ldquo;{p.description}&rdquo;</blockquote>
              )}
              <WhatsAppButton message={productOrderMessage(p)} size="sm" className="mt-6" />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
