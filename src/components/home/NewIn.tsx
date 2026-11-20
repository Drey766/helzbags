import Link from "next/link";
import { getProducts, sortProducts } from "@/lib/products";
import { ProductCard } from "@/components/product/ProductCard";
import { SectionHeading } from "./SectionHeading";

export function NewIn() {
  const items = sortProducts(getProducts().filter((p) => p.isNew && p.images.length), "featured").slice(0, 4);
  if (!items.length) return null;
  return (
    <section className="section" aria-labelledby="new-in-title">
      <div className="container-zb">
        <SectionHeading
          title={<span id="new-in-title">New in</span>}
          intro="Recently added to the shop."
          action={
            <Link href="/shop?isNew=1" className="btn btn-outline btn-sm">
              See all new bags
            </Link>
          }
        />
      </div>
      <ul className="no-scrollbar mt-10 flex snap-x snap-mandatory gap-4 overflow-x-auto scroll-px-4 px-4 pb-4 md:mx-auto md:max-w-[1280px] md:px-8 md:grid md:grid-cols-4 md:gap-6 md:overflow-visible">
        {items.map((p) => (
          <li key={p.id} className="w-[64vw] max-w-[260px] shrink-0 snap-start md:w-auto md:max-w-none">
            <ProductCard product={p} sizes="(min-width: 768px) 25vw, 64vw" />
          </li>
        ))}
      </ul>
    </section>
  );
}
