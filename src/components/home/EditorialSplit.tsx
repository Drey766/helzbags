import Link from "next/link";
import { brand } from "@/config/brand";
import { getProducts, productAlt } from "@/lib/products";
import { SmartImage } from "@/components/ui/SmartImage";
import { SidePanelBlock } from "@/components/brand/SidePanelBlock";

/** "Simple, elegant & classy": their line beside a large image. */
export function EditorialSplit() {
  const products = getProducts();
  const p =
    products.find((x) => x.slug === "mrembo-mini-top-handle" && x.images.length) ?? products.find((x) => x.images.length > 1);
  return (
    <section className="section" aria-labelledby="editorial-title">
      <div className="container-zb grid items-center gap-10 md:grid-cols-2 md:gap-20">
        <div className="gilt-frame relative aspect-[4/5] overflow-hidden rounded-[24px] bg-plum md:aspect-[5/6]">
          {p && <SmartImage src={p.images[1] ?? p.images[0]} alt={productAlt(p, p.images[1] ? 1 : 0)} sizes="(min-width: 768px) 50vw, 100vw" />}
        </div>
        <div>
          <h2 id="editorial-title" className="display h-section text-plum">
            Simple, <em className="text-plum-soft">elegant</em> &amp; classy
          </h2>
          <SidePanelBlock as="blockquote" className="mt-8">
            <p className="display text-2xl italic leading-snug text-ink md:text-3xl">&ldquo;{brand.ownWords[2]}&rdquo;</p>
            <footer className="mt-3 text-sm text-muted">{brand.name}</footer>
          </SidePanelBlock>
          <div className="mt-10 flex flex-wrap gap-3">
            <Link href="/shop?category=handbags" className="btn btn-primary">
              Shop handbags
            </Link>
            <Link href="/about" className="btn btn-outline">
              About Zuri Bags
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
