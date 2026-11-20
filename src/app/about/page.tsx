import type { Metadata } from "next";
import Link from "next/link";
import about from "@/data/about.json";
import { brand, hasPolicy, showDraftFlags } from "@/config/brand";
import { getVisibleCategories } from "@/lib/products";
import { PageHero } from "@/components/layout/PageHero";
import { SidePanelBlock } from "@/components/brand/SidePanelBlock";
import { ShopsBand } from "@/components/shops/ShopsBand";
import { OrderingSteps } from "@/components/home/OrderingSteps";
import { DraftBadge } from "@/components/ui/DraftBadge";

export const metadata: Metadata = {
  title: "About",
  description: about.intro,
};

export default function AboutPage() {
  const cats = getVisibleCategories();
  return (
    <>
      <PageHero
        title={
          <>
            About <em className="text-accent-light">{brand.name}</em>
          </>
        }
        intro={about.lead}
      />

      <section className="section" aria-labelledby="voice-title">
        <div className="container-hz grid gap-12 lg:grid-cols-[1fr_1.2fr] lg:gap-20">
          <div>
            <h2 id="voice-title" className="display h-section text-primary">
              {about.voiceTitle}
            </h2>
            <p className="mt-4 max-w-md text-muted">
              {about.intro} <DraftBadge />
            </p>
          </div>
          <ul className="space-y-8">
            {Object.values(brand.ownWords).map((w) => (
              <li key={w}>
                <SidePanelBlock as="blockquote">
                  <p className="display text-2xl italic leading-snug text-ink md:text-3xl">&ldquo;{w}&rdquo;</p>
                </SidePanelBlock>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {showDraftFlags && about.story.body && (
        <section className="container-hz pb-16" aria-labelledby="story-title">
          <h2 id="story-title" className="display text-3xl text-primary">
            {about.story.title} <DraftBadge />
          </h2>
          <p className="mt-4 max-w-2xl text-muted">{about.story.body}</p>
        </section>
      )}

      <section className="bg-surface-alt py-16 md:py-24" aria-labelledby="sells-title">
        <div className="container-hz">
          <h2 id="sells-title" className="display h-section text-primary">
            {about.sellsTitle}
          </h2>
          <ul className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {cats.map((c) => (
              <li key={c.key}>
                <Link href={`/shop?category=${c.key}`} className="block h-full rounded-2xl bg-surface p-5 transition-colors hover:bg-white">
                  <span className="display block text-2xl text-primary">{c.name}</span>
                  <span className="mt-1 block text-sm text-muted">{c.blurb}</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="section" aria-labelledby="steps-about-title">
        <div className="container-hz">
          <h2 id="steps-about-title" className="display h-section text-primary">
            How to order
          </h2>
          <p className="mt-3 text-muted">
            {hasPolicy ? `${brand.policy.refunds} ${brand.policy.exchange} ${brand.policyHelp}` : brand.ownWords.delivery}
          </p>
        </div>
        <div className="mt-10">
          <OrderingSteps compact />
        </div>
      </section>

      <ShopsBand />
    </>
  );
}
