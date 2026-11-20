import type { Metadata } from "next";
import { brand, hasPolicy, hasTill, shopLabel } from "@/config/brand";
import { PageHero } from "@/components/layout/PageHero";
import { DraftBadge } from "@/components/ui/DraftBadge";

export const metadata: Metadata = {
  title: "Terms",
  description: "Ordering through WhatsApp, prices, delivery and exchanges at Heiz Bags.",
};

export default function TermsPage() {
  return (
    <>
      <PageHero title="Terms" intro={`How buying from ${brand.name} works.`} />
      <div className="container-hz max-w-[44rem] py-12 md:py-16">
        <DraftBadge />
        <div className="prose-hz text-[1.05rem] leading-[1.8] text-ink">
          <h2>Ordering</h2>
          <p>
            Orders are made on WhatsApp. Sending a message from this website is a request, not a confirmed order. {brand.name} will reply to confirm
            availability.
          </p>
          <h2>Prices</h2>
          <p>Prices are in Kenyan shillings and may change.</p>
          <h2>Payment</h2>
          <p>
            {hasTill
              ? `Pay via M-Pesa Till ${brand.mpesaTill} once your order is confirmed.`
              : `Ask ${brand.name} on WhatsApp how to pay for your order.`}
          </p>
          <h2>Pick-up and delivery</h2>
          <p>
            Pick up at {shopLabel(brand.shops[0])}, Nairobi. {brand.ownWords.delivery}
          </p>
          <h2>Exchanges</h2>
          <p>{hasPolicy ? `${brand.policy.refunds} ${brand.policy.exchange} ${brand.policyHelp}` : brand.policyHelp}</p>
        </div>
      </div>
    </>
  );
}
