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
        <div className="container-hz pb-4 pt-12 md:pt-16">
          <h1 className="display h-hero text-surface">
            Bag <em className="text-accent-light">Finder</em>
          </h1>
          <p className="mt-4 max-w-lg text-muted-on-dark">
            {finderConfig.intro} <DraftBadge />
          </p>
        </div>
        <GoldWave tone="primary" height={56} />
      </section>
      <div className="container-hz py-12 md:py-16">
        <Suspense fallback={<BrandLoader label="Loading the questions" className="py-16" />}>
          <BagFinder />
        </Suspense>
      </div>
    </>
  );
}
