import Link from "next/link";
import { getProducts, getVisibleCategories, productAlt } from "@/lib/products";
import { HandleArch } from "@/components/brand/HandleArch";
import { SmartImage } from "@/components/ui/SmartImage";
import { OwnPlaceholder } from "@/components/product/OwnPlaceholder";
import { SectionHeading } from "./SectionHeading";

const preferred: Record<string, string> = {
  handbags: "upinde-colour-block-bag",
  totes: "mwanga-carry-all",
  office: "haradali-portrait-tote",
  sling: "porini-sling",
  clutches: "lulu-crossbody-clutch",
  wallets: "shanga-phone-wallet",
  pouches: "urembo-make-up-bag",
  backpacks: "matembezi-mum-backpack",
};

export function CategoryRow() {
  const products = getProducts();
  const cats = getVisibleCategories();
  if (!cats.length) return null;

  return (
    <section className="section bg-surface-alt" aria-labelledby="categories-title">
      <div className="container-hz">
        <SectionHeading
          eyebrow="Categories"
          title={<span id="categories-title">Find your <em className="text-primary-raised">shape</em></span>}
          action={
            <Link href="/shop" className="btn btn-outline btn-sm">
              All bags
            </Link>
          }
        />
      </div>
      <ul className="no-scrollbar mt-10 flex snap-x snap-mandatory gap-4 overflow-x-auto scroll-px-4 px-4 pb-2 md:mx-auto md:max-w-[1280px] md:px-8 md:grid md:grid-cols-4 md:gap-x-6 md:gap-y-10 md:overflow-visible lg:grid-cols-8 lg:gap-x-5">
        {cats.map((c) => {
          const inCat = products.filter((p) => p.category === c.key);
          const p = inCat.find((x) => x.slug === preferred[c.key] && x.images.length) ?? inCat.find((x) => x.images.length) ?? inCat[0];
          return (
            <li key={c.key} className="w-[42vw] max-w-[180px] shrink-0 snap-start md:w-auto md:max-w-none">
              <Link href={`/shop?category=${c.key}`} className="arch-group group block text-center">
                <HandleArch handle="primary" shape="soft" frameClassName="aspect-[4/5] bg-surface">
                  {p && p.images.length ? (
                    <SmartImage
                      src={p.images[0]}
                      alt={productAlt(p)}
                      sizes="(min-width: 1024px) 12vw, (min-width: 768px) 25vw, 42vw"
                      className="transition-transform duration-700 group-hover:scale-105"
                    />
                  ) : (
                    p && <OwnPlaceholder name={c.name} size="sm" />
                  )}
                </HandleArch>
                <span className="display mt-3 block text-xl leading-tight text-primary">{c.name}</span>
                <span className="tabular mt-0.5 block text-xs tracking-wide text-muted">
                  {inCat.length} {inCat.length === 1 ? "bag" : "bags"}
                </span>
              </Link>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
