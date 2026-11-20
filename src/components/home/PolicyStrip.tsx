import { brand, hasPolicy } from "@/config/brand";

/** Delivery in their own words, plus the exchange policy once Heiz Bags provides one. */
export function PolicyStrip() {
  return (
    <section aria-label="Delivery" className="border-y border-line bg-surface">
      <div className="container-hz flex flex-col items-center justify-center gap-2 py-6 text-center md:flex-row md:gap-6">
        <p className="display text-2xl text-primary">
          {brand.ownWords.delivery}
          {hasPolicy && (
            <>
              <span aria-hidden="true" className="mx-4 inline-block h-px w-8 bg-accent-text align-middle" />
              {brand.policy.exchange} {brand.policy.refunds}
            </>
          )}
        </p>
        <p className="text-sm text-muted">{hasPolicy ? brand.policyHelp : "Ask us on WhatsApp about delivery to you."}</p>
      </div>
    </section>
  );
}
