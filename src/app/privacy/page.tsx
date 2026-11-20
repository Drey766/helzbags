import type { Metadata } from "next";
import { brand, isDemoMode } from "@/config/brand";
import { PageHero } from "@/components/layout/PageHero";
import { DraftBadge } from "@/components/ui/DraftBadge";

export const metadata: Metadata = {
  title: "Privacy",
  description: "How the Heiz Bags website handles your information.",
};

export default function PrivacyPage() {
  return (
    <>
      <PageHero title="Privacy notice" intro="Short and plain: this website keeps as little about you as it can." />
      <div className="container-hz max-w-[44rem] py-12 md:py-16">
        <DraftBadge />
        <div className="prose-hz text-[1.05rem] leading-[1.8] text-ink">
          <h2>Who we are</h2>
          <p>
            {brand.name} sells women&rsquo;s handbags from a pick-up point in {brand.shops[0].mall}, {brand.shops[0].street}, Nairobi. You can reach us on WhatsApp or by phone on{" "}
            {brand.phoneDisplay}.
          </p>
          <h2>What this website stores</h2>
          <ul>
            <li>Your basket, wishlist and recently viewed bags are saved in your own browser (local storage). They never reach us unless you send them on WhatsApp.</li>
            <li>The site uses no analytics, advertising or tracking cookies.</li>
          </ul>
          <h2>Ordering on WhatsApp</h2>
          <p>
            When you tap Order on WhatsApp, WhatsApp opens with a message written for you. Nothing is sent until you press send. Your chat with us is handled
            by WhatsApp under its own privacy policy.
          </p>
          <h2>The contact form</h2>
          <p>
            If you use the contact form, your name, phone number and message are sent to {brand.name} by email so we can reply. The website does not keep a
            copy and does not log what you write. If the email service is not available, the form offers WhatsApp or a call instead, and nothing is sent.
          </p>
          <h2>Your rights</h2>
          <p>
            Under the Data Protection Act, 2019 you can ask what personal information we hold about you, ask us to correct or delete it, and object to its
            use. Ask us on WhatsApp or by phone. If you are not satisfied, you can complain to the Office of the Data Protection Commissioner (ODPC).
          </p>
          {isDemoMode && (
            <>
              <h2>Photos on this preview</h2>
              <p>While this site is in preview, some bags shown are samples used to demonstrate the design.</p>
            </>
          )}
        </div>
      </div>
    </>
  );
}
