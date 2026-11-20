import Link from "next/link";
import { getProducts, productAlt } from "@/lib/products";
import { SmartImage } from "@/components/ui/SmartImage";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "./SectionHeading";
import type { OccasionKey, Product } from "@/types";

const tiles: { key: OccasionKey; name: string; prefer: string[] }[] = [
  { key: "work", name: "Work", prefer: ["malkia-structured-tote", "kazi-laptop-bag"] },
  { key: "outings", name: "Outings", prefer: ["shanga-crossbody", "dhahabu-buckle-sling"] },
  { key: "evening", name: "Evening", prefer: ["lulu-crossbody-clutch", "jioni-clutch"] },
  { key: "everyday", name: "Everyday", prefer: ["faraja-everyday-bag", "amani-bag-wallet-set"] },
];

function pick(products: Product[], key: OccasionKey, prefer: string[], used: Set<string>) {
  const withPhoto = products.filter((p) => p.images.length && p.occasions.includes(key) && !used.has(p.slug));
  return prefer.map((s) => withPhoto.find((p) => p.slug === s)).find(Boolean) ?? withPhoto[0];
}

export function Occasions() {
  const products = getProducts();
  const used = new Set<string>();
  return (
    <section className="section" aria-labelledby="occasions-title">
      <div className="container-hz">
        <SectionHeading
          eyebrow="Shop by occasion"
          title={
            <span id="occasions-title">
              A bag for <em className="text-primary-raised">every</em> part of your day
            </span>
          }
          intro="Work, outings, evenings or everyday: start with where you are going."
        />
        <ul className="mt-10 grid grid-cols-2 gap-3 md:mt-14 md:grid-cols-4 md:gap-6">
          {tiles.map((t, i) => {
            const p = pick(products, t.key, t.prefer, used);
            if (p) used.add(p.slug);
            return (
              <li key={t.key}>
                <Reveal delay={i * 80}>
                  <Link
                    href={`/shop?occasion=${t.key}`}
                    className="gilt-frame group relative block aspect-[3/4] overflow-hidden rounded-[20px] bg-primary md:aspect-[4/5.4]"
                  >
                    {p && (
                      <SmartImage
                        src={p.images[0]}
                        alt={productAlt(p)}
                        sizes="(min-width: 768px) 25vw, 50vw"
                        className="transition-transform duration-700 ease-out group-hover:scale-105"
                      />
                    )}
                    <span aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-primary-deep/90 via-primary/25 to-transparent" />
                    <span className="absolute inset-x-0 bottom-7 flex flex-col items-center text-center md:bottom-9">
                      <span className="display block text-[2rem] italic leading-none text-surface md:text-[2.6rem]">{t.name}</span>
                      <span aria-hidden="true" className="mt-3 block h-px w-8 bg-accent-light transition-all duration-500 group-hover:w-16" />
                    </span>
                  </Link>
                </Reveal>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
