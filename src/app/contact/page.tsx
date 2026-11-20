import type { Metadata } from "next";
import { Suspense } from "react";
import { MapPin, Phone } from "lucide-react";
import { brand, mapsUrl } from "@/config/brand";
import { generalMessage, telUrl } from "@/lib/whatsapp";
import { PageHero } from "@/components/layout/PageHero";
import { ContactForm } from "@/components/contact/ContactForm";
import { WhatsAppButton } from "@/components/brand/WhatsAppButton";
import { DraftBadge } from "@/components/ui/DraftBadge";
import { BrandLoader } from "@/components/ui/BrandLoader";

export const metadata: Metadata = {
  title: "Contact",
  description: "Message Zuri Bags on WhatsApp, call, or send a note through the form.",
};

export default function ContactPage() {
  return (
    <>
      <PageHero
        title={
          <>
            Talk to <em className="text-gold-light">us</em>
          </>
        }
        intro="WhatsApp is the quickest way to reach Zuri Bags. You can also call, or leave a message here."
      />
      <section className="section">
        <div className="container-zb grid gap-12 lg:grid-cols-[1fr_1.2fr] lg:gap-20">
          <div>
            <h2 className="display text-3xl text-plum">WhatsApp or call</h2>
            <div className="mt-6 flex flex-wrap gap-3">
              <WhatsAppButton message={generalMessage()} label="Chat on WhatsApp" />
              <a href={telUrl()} className="btn btn-outline">
                <Phone aria-hidden="true" className="h-[18px] w-[18px]" strokeWidth={1.5} />
                {brand.phoneDisplay}
              </a>
            </div>
            <h2 className="display mt-12 text-3xl text-plum">Our shops</h2>
            <ul className="mt-4 space-y-2">
              {brand.shops.map((s) => (
                <li key={s.key}>
                  <a href={mapsUrl(s)} target="_blank" rel="noopener noreferrer" className="flex min-h-11 items-center gap-2 text-ink hover:text-plum">
                    <MapPin aria-hidden="true" className="h-4 w-4 text-plum" strokeWidth={1.5} />
                    {s.mall}, {s.unit}, {s.street}
                    <span className="sr-only">(opens Google Maps)</span>
                  </a>
                  {s.confirm && <DraftBadge label="Confirm" className="ml-6" />}
                </li>
              ))}
            </ul>
          </div>
          <div className="rounded-[28px] bg-champagne p-6 md:p-10">
            <h2 className="display text-3xl text-plum">Send a message</h2>
            <div className="mt-6">
              <Suspense fallback={<BrandLoader size="sm" label="Loading the form" className="py-12" />}>
                <ContactForm />
              </Suspense>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
