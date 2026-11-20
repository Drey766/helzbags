import { brand } from "@/config/brand";

export function PolicyStrip() {
  return (
    <section aria-label="Exchange policy" className="border-y border-line bg-ivory">
      <div className="container-zb flex flex-col items-center justify-center gap-2 py-6 text-center md:flex-row md:gap-6">
        <p className="display text-2xl text-plum">
          {brand.policy.exchange}
          <span aria-hidden="true" className="mx-4 inline-block h-px w-8 bg-gold-text align-middle" />
          {brand.policy.refunds}
        </p>
        <p className="text-sm text-muted">{brand.policyHelp}</p>
      </div>
    </section>
  );
}
