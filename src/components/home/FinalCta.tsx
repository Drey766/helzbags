import Link from "next/link";
import { brand } from "@/config/brand";
import { Logo } from "@/components/brand/Logo";
import { WhatsAppButton } from "@/components/brand/WhatsAppButton";
import { generalMessage } from "@/lib/whatsapp";

export function FinalCta() {
  return (
    <section className="section bg-champagne" aria-labelledby="final-cta-title">
      <div className="container-zb flex flex-col items-center text-center">
        <Logo variant="mark" decorative className="h-16 w-16" />
        <h2 id="final-cta-title" className="display h-section mt-6 max-w-2xl text-plum">
          Carry <em className="text-plum-soft">elegance</em>. Carry <em className="text-plum-soft">confidence</em>.
        </h2>
        <p className="mt-4 max-w-md text-muted">
          Found a bag you love? Send it to us on WhatsApp, or call {brand.phoneDisplay}.
        </p>
        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <WhatsAppButton message={generalMessage()} label="Chat on WhatsApp" />
          <Link href="/shop" className="btn btn-outline">
            Shop the collection
          </Link>
        </div>
      </div>
    </section>
  );
}
