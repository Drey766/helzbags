import type { Metadata } from "next";
import Link from "next/link";
import { brand, hasPolicy, hasTill, mapsUrl, shopLabel } from "@/config/brand";
import { generalMessage } from "@/lib/whatsapp";
import { PageHero } from "@/components/layout/PageHero";
import { OrderingSteps } from "@/components/home/OrderingSteps";
import { TillCard } from "@/components/brand/TillCard";
import { WhatsAppButton } from "@/components/brand/WhatsAppButton";
import { SidePanelBlock } from "@/components/brand/SidePanelBlock";
import { DraftBadge } from "@/components/ui/DraftBadge";

export const metadata: Metadata = {
  title: "How to order",
  description: "Order on WhatsApp, then pick up at Dynamic Mall on Tom Mboya Street, Nairobi, or ask about delivery.",
};

export default function HowToOrderPage() {
  return (
    <>
      <PageHero
        title={
          <>
            How to <em className="text-accent-light">order</em>
          </>
        }
        intro={`Ordering from ${brand.name} happens on WhatsApp, so you talk to a person, not a checkout.`}
      />

      <section className="section" aria-label="Steps">
        <OrderingSteps compact />
        <div className="container-hz mt-6">
          <DraftBadge />
        </div>
      </section>

      <section className="bg-surface-alt py-16 md:py-24" aria-labelledby="pickup-title">
        <div className="container-hz grid gap-12 lg:grid-cols-2 lg:gap-16">
          <div>
            <h2 id="pickup-title" className="display h-section text-primary">
              Pick up in town
            </h2>
            <ul className="mt-6 space-y-3">
              {brand.shops.map((s) => (
                <li key={s.key}>
                  <a href={mapsUrl(s)} target="_blank" rel="noopener noreferrer" className="link-underline text-lg text-ink">
                    {shopLabel(s)}
                    <span className="sr-only"> (opens Google Maps)</span>
                  </a>{" "}
                  <span className="block text-muted">{s.landmark}</span>
                  {s.confirm && <DraftBadge label="Confirm" />}
                </li>
              ))}
            </ul>
            <p className="mt-6 text-muted">{brand.ownWords.available}</p>
          </div>
          <div>
            <h2 className="display h-section text-primary">Delivery</h2>
            <SidePanelBlock as="blockquote" className="mt-6">
              <p className="display text-2xl italic text-ink">&ldquo;{brand.ownWords.delivery}&rdquo;</p>
              <footer className="mt-2 text-sm text-muted">{brand.name}</footer>
            </SidePanelBlock>
            <p className="mt-6 max-w-md text-muted">Tell us your area on WhatsApp and {brand.name} will advise.</p>
            <div className="mt-8">
              <WhatsAppButton message={generalMessage()} label="Start on WhatsApp" />
            </div>
          </div>
        </div>
      </section>

      {hasTill && (
        <section className="section" aria-labelledby="pay-title">
          <div className="container-hz grid gap-12 lg:grid-cols-2 lg:gap-16">
            <div>
              <h2 id="pay-title" className="display h-section text-primary">
                Paying by M-Pesa
              </h2>
              <p className="mt-4 max-w-md text-muted">Pay once {brand.name} has confirmed your order in the chat.</p>
            </div>
            <TillCard />
          </div>
        </section>
      )}

      <section className="section" aria-labelledby="more-title">
        <div className="container-hz grid gap-12 lg:grid-cols-2 lg:gap-16">
          {hasPolicy && (
            <div>
              <h2 className="display h-section text-primary">Exchanges</h2>
              <SidePanelBlock className="mt-6">
                <p className="display text-2xl text-ink">
                  {brand.policy.refunds} {brand.policy.exchange}
                </p>
                <p className="mt-2 text-muted">{brand.policyHelp}</p>
              </SidePanelBlock>
            </div>
          )}
          <div>
            <h2 id="more-title" className="display text-3xl text-primary">
              Questions?
            </h2>
            <p className="mt-4 text-muted">
              More answers in the <Link href="/faqs" className="text-primary underline underline-offset-4">FAQs</Link>, or ask us on
              WhatsApp.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
