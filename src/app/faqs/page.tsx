import type { Metadata } from "next";
import { Plus } from "lucide-react";
import faqs from "@/data/faqs.json";
import { fillTokens } from "@/lib/content";
import { generalMessage } from "@/lib/whatsapp";
import { PageHero } from "@/components/layout/PageHero";
import { WhatsAppButton } from "@/components/brand/WhatsAppButton";
import { DraftBadge } from "@/components/ui/DraftBadge";

export const metadata: Metadata = {
  title: "FAQs",
  description: "How to order, pay, visit our shops and exchange a bag.",
};

export default function FaqsPage() {
  return (
    <>
      <PageHero
        title={
          <>
            Questions, <em className="text-gold-light">answered</em>
          </>
        }
        intro="The short version: choose a bag, send it on WhatsApp, pay via M-Pesa Till or at the shop."
      />
      <section className="section">
        <div className="container-zb max-w-3xl">
          <DraftBadge />
          <ul className="mt-4 divide-y divide-line border-y border-line">
            {faqs.faqs.map((f) => (
              <li key={f.key}>
                <details className="group">
                  <summary className="flex min-h-16 cursor-pointer list-none items-center justify-between gap-4 py-5 [&::-webkit-details-marker]:hidden">
                    <span className="display text-2xl text-plum">{f.q}</span>
                    <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full border border-line text-plum transition-transform group-open:rotate-45">
                      <Plus aria-hidden="true" className="h-4 w-4" strokeWidth={1.5} />
                    </span>
                  </summary>
                  <p className="pb-6 pr-12 leading-relaxed text-ink">{fillTokens(f.a)}</p>
                </details>
              </li>
            ))}
          </ul>
          <div className="mt-12 rounded-[24px] bg-champagne p-6 text-center md:p-10">
            <p className="display text-3xl text-plum">Still wondering?</p>
            <p className="mt-2 text-muted">Ask us on WhatsApp.</p>
            <WhatsAppButton message={generalMessage()} label="Chat on WhatsApp" className="mt-6" />
          </div>
        </div>
      </section>
    </>
  );
}
