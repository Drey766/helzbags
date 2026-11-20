import type { Metadata } from "next";
import Link from "next/link";
import { brand, mapsUrl } from "@/config/brand";
import { generalMessage } from "@/lib/whatsapp";
import { PageHero } from "@/components/layout/PageHero";
import { OrderingSteps } from "@/components/home/OrderingSteps";
import { TillCard } from "@/components/brand/TillCard";
import { WhatsAppButton } from "@/components/brand/WhatsAppButton";
import { SidePanelBlock } from "@/components/brand/SidePanelBlock";
import { DraftBadge } from "@/components/ui/DraftBadge";

export const metadata: Metadata = {
  title: "How to order",
  description: "Order on WhatsApp, pay via M-Pesa Till or at the shop, and pick up in Nairobi CBD.",
};

export default function HowToOrderPage() {
  return (
    <>
      <PageHero
        title={
          <>
            How to <em className="text-gold-light">order</em>
          </>
        }
        intro="Ordering from Zuri Bags happens on WhatsApp, so you talk to a person, not a checkout."
      />

      <section className="section" aria-label="Steps">
        <OrderingSteps compact />
        <div className="container-zb mt-6">
          <DraftBadge />
        </div>
      </section>

      <section className="bg-champagne py-16 md:py-24" aria-labelledby="pay-title">
        <div className="container-zb grid gap-12 lg:grid-cols-2 lg:gap-16">
          <div>
            <h2 id="pay-title" className="display h-section text-plum">
              Paying by M-Pesa
            </h2>
            <p className="mt-4 max-w-md text-muted">
              Pay once Zuri Bags has confirmed your order in the chat. You can also pay when you pick up at a shop.
            </p>
            <div className="mt-8">
              <WhatsAppButton message={generalMessage()} label="Start on WhatsApp" />
            </div>
          </div>
          <TillCard />
        </div>
      </section>

      <section className="section" aria-labelledby="pickup-title">
        <div className="container-zb grid gap-12 lg:grid-cols-2 lg:gap-16">
          <div>
            <h2 id="pickup-title" className="display h-section text-plum">
              Pick up in town
            </h2>
            <ul className="mt-6 space-y-3">
              {brand.shops.map((s) => (
                <li key={s.key}>
                  <a href={mapsUrl(s)} target="_blank" rel="noopener noreferrer" className="link-underline text-lg text-ink">
                    {s.mall}, {s.unit}, {s.street}
                    <span className="sr-only"> (opens Google Maps)</span>
                  </a>{" "}
                  {s.confirm && <DraftBadge label="Confirm" />}
                </li>
              ))}
            </ul>
            <p className="mt-6 text-muted">
              Asking about delivery? Tell us your area on WhatsApp and {brand.name} will advise.
            </p>
          </div>
          <div>
            <h2 className="display h-section text-plum">Exchanges</h2>
            <SidePanelBlock className="mt-6">
              <p className="display text-2xl text-ink">
                {brand.policy.refunds} {brand.policy.exchange}
              </p>
              <p className="mt-2 text-muted">{brand.policyHelp}</p>
            </SidePanelBlock>
            <p className="mt-8 text-muted">
              More answers in the <Link href="/faqs" className="text-plum underline underline-offset-4">FAQs</Link>.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
