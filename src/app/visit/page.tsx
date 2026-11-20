import type { Metadata } from "next";
import { Phone } from "lucide-react";
import { brand } from "@/config/brand";
import { generalMessage, telUrl } from "@/lib/whatsapp";
import { PageHero } from "@/components/layout/PageHero";
import { ShopCard } from "@/components/shops/ShopCard";
import { CbdMap } from "@/components/shops/CbdMap";
import { TillCard } from "@/components/brand/TillCard";
import { WhatsAppButton } from "@/components/brand/WhatsAppButton";

export const metadata: Metadata = {
  title: "Visit our shops",
  description: "Zuri Bags shops in Nairobi CBD, along Moi Avenue and Tom Mboya Street. Directions, phone and M-Pesa Till.",
};

export default function VisitPage() {
  return (
    <>
      <PageHero
        title={
          <>
            Visit our <em className="text-gold-light">shops</em>
          </>
        }
        intro="See the bags in person in Nairobi CBD, along Moi Avenue and Tom Mboya Street."
      />
      <section className="section" aria-label="Shops and map">
        <div className="container-zb grid gap-12 lg:grid-cols-[1fr_1.1fr] lg:gap-16">
          <ul className="grid gap-4">
            {brand.shops.map((s) => (
              <li key={s.key}>
                <ShopCard shop={s} tone="light" />
              </li>
            ))}
          </ul>
          <div className="rounded-[28px] bg-plum p-4 md:p-8" data-tone="dark">
            <CbdMap />
          </div>
        </div>
      </section>
      <section className="bg-champagne py-16 md:py-24" aria-labelledby="before-title">
        <div className="container-zb grid gap-12 lg:grid-cols-2 lg:gap-16">
          <div>
            <h2 id="before-title" className="display h-section text-plum">
              Before you come
            </h2>
            <p className="mt-4 max-w-md text-muted">
              Want to see a particular bag? Send it to us on WhatsApp first so we can check it is at the shop.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <WhatsAppButton message={generalMessage()} label="Ask on WhatsApp" />
              <a href={telUrl()} className="btn btn-outline">
                <Phone aria-hidden="true" className="h-[18px] w-[18px]" strokeWidth={1.5} />
                Call {brand.phoneDisplay}
              </a>
            </div>
          </div>
          <TillCard />
        </div>
      </section>
    </>
  );
}
