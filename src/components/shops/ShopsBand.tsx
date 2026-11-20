import Link from "next/link";
import { brand } from "@/config/brand";
import { GoldWave } from "@/components/brand/GoldWave";
import { CbdMap } from "./CbdMap";
import { ShopCard } from "./ShopCard";

export function ShopsBand({ headingLevel = "h2" }: { headingLevel?: "h1" | "h2" }) {
  const H = headingLevel;
  return (
    <section className="velvet relative overflow-hidden" data-tone="dark" aria-labelledby="shops-title">
      <GoldWave tone="primary" flip height={56} />
      <div className="container-hz grid gap-12 py-16 md:py-24 lg:grid-cols-[1.1fr_1fr] lg:gap-16">
        <div>
          <H id="shops-title" className="display h-section text-surface">
            Find <em className="text-accent-light">us</em>
          </H>
          <p className="mt-4 max-w-md text-muted-on-dark">
            Our pick-up point is at {brand.shops[0].mall}, along {brand.shops[0].street}, Nairobi. {brand.ownWords.available}
          </p>
          <ul className="mt-10 grid gap-4">
            {brand.shops.map((s) => (
              <li key={s.key}>
                <ShopCard shop={s} />
              </li>
            ))}
          </ul>
          <Link href="/visit" className="mt-8 inline-flex min-h-11 items-center text-accent-light underline underline-offset-4 hover:text-surface">
            More about visiting
          </Link>
        </div>
        <div className="self-center rounded-[28px] bg-primary-deep/50 p-4 ring-1 ring-accent/20 md:p-8">
          <CbdMap />
        </div>
      </div>
    </section>
  );
}
