import type { Metadata } from "next";
import { Suspense } from "react";
import { BagFinder } from "@/components/finder/BagFinder";
import { finderConfig } from "@/lib/finder";
import { DraftBadge } from "@/components/ui/DraftBadge";
import { GoldWave } from "@/components/brand/GoldWave";
import { BrandLoader } from "@/components/ui/BrandLoader";

export const metadata: Metadata = {
  title: "Bag Finder",
  description: "Answer four quick questions and see bags for your day.",
};

export default function BagFinderPage() {
  return (
    <>
      <section className="velvet" data-tone="dark">
        <div className="container-zb pb-4 pt-12 md:pt-16">
          <h1 className="display h-hero text-ivory">
            Bag <em className="text-gold-light">Finder</em>
          </h1>
          <p className="mt-4 max-w-lg text-lilac-text">
            {finderConfig.intro} <DraftBadge />
          </p>
        </div>
        <GoldWave tone="plum" height={56} />
      </section>
      <div className="container-zb py-12 md:py-16">
        <Suspense fallback={<BrandLoader label="Loading the questions" className="py-16" />}>
          <BagFinder />
        </Suspense>
      </div>
    </>
  );
}
