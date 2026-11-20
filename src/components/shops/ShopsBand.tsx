import Link from "next/link";
import { brand } from "@/config/brand";
import { GoldWave } from "@/components/brand/GoldWave";
import { CbdMap } from "./CbdMap";
import { ShopCard } from "./ShopCard";

export function ShopsBand({ headingLevel = "h2" }: { headingLevel?: "h1" | "h2" }) {
  const H = headingLevel;
  return (
    <section className="velvet relative overflow-hidden" data-tone="dark" aria-labelledby="shops-title">
      <GoldWave tone="plum" flip height={56} />
      <div className="container-zb grid gap-12 py-16 md:py-24 lg:grid-cols-[1.1fr_1fr] lg:gap-16">
        <div>
          <H id="shops-title" className="display h-section text-ivory">
            Visit our <em className="text-gold-light">shops</em>
          </H>
          <p className="mt-4 max-w-md text-lilac-text">
            See the bags in person in Nairobi CBD, along Moi Avenue and Tom Mboya Street.
          </p>
          <ul className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-1">
            {brand.shops.map((s) => (
              <li key={s.key} className={s.key === "star" ? "sm:col-span-2 lg:col-span-1" : ""}>
                <ShopCard shop={s} />
              </li>
            ))}
          </ul>
          <Link href="/visit" className="mt-8 inline-flex min-h-11 items-center text-gold-light underline underline-offset-4 hover:text-ivory">
            More about visiting
          </Link>
        </div>
        <div className="self-center rounded-[28px] bg-plum-deep/50 p-4 ring-1 ring-gold/20 md:p-8">
          <CbdMap />
        </div>
      </div>
    </section>
  );
}
