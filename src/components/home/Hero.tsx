import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { brand } from "@/config/brand";
import { HandleArch } from "@/components/brand/HandleArch";
import { GoldWave } from "@/components/brand/GoldWave";
import { WhatsAppButton } from "@/components/brand/WhatsAppButton";
import { SmartImage } from "@/components/ui/SmartImage";
import { SampleTag } from "@/components/ui/SampleTag";
import { Price } from "@/components/ui/Price";
import { OwnPlaceholder } from "@/components/product/OwnPlaceholder";
import { getFeaturedWithPhoto, getOwnProducts, productAlt } from "@/lib/products";
import { generalMessage } from "@/lib/whatsapp";

export function Hero() {
  const featured = getFeaturedWithPhoto() ?? getOwnProducts()[0];

  return (
    <section className="velvet relative overflow-hidden" data-tone="dark" aria-labelledby="hero-title">
      {/* slim side-panel edge, like the bag's sides */}
      <div aria-hidden="true" className="absolute inset-y-0 left-0 hidden w-3 md:flex">
        <span className="w-1.5 bg-plum-deep" />
        <span className="w-1 bg-gold/70" />
      </div>
      <div className="container-zb grid items-center gap-10 pb-6 pt-8 md:grid-cols-[1.05fr_1fr] md:gap-16 md:pb-10 md:pt-16 lg:pt-20">
        <div className="order-2 md:order-1">
          <p className="eyebrow flex items-center gap-3 text-gold">
            <span aria-hidden="true" className="h-px w-8 bg-gold" />
            Women&rsquo;s handbags · Nairobi CBD
          </p>
          <h1 id="hero-title" className="display h-hero mt-5 text-ivory">
            Carry <em className="text-gold-light">elegance</em>.
            <br />
            Carry <em className="text-gold-light">confidence</em>.
          </h1>
          <p className="mt-6 max-w-md text-lg leading-relaxed text-lilac-text">{brand.ownWords[1]}</p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <Link href="/shop" className="btn btn-gold">
              Shop the collection
              <ArrowRight aria-hidden="true" className="h-4 w-4" strokeWidth={1.5} />
            </Link>
            <WhatsAppButton variant="outline-light" message={generalMessage()} />
          </div>
          <p className="mt-8 max-w-md text-sm leading-relaxed text-lilac-text">
            Shops along Moi Avenue and Tom Mboya Street. Pay via M-Pesa Till{" "}
            <span className="tabular text-ivory">{brand.mpesaTill}</span>.
          </p>
        </div>

        {featured && (
          <div className="order-1 mx-auto w-full max-w-[340px] md:order-2 md:max-w-[400px]">
            <Link href={`/shop/${featured.slug}`} className="arch-group group block">
              <HandleArch frameClassName="gilt-frame aspect-[3/4] bg-plum-deep shadow-[0_40px_80px_-30px_rgba(0,0,0,0.6)] ring-1 ring-gold/40">
                {featured.images.length ? (
                  <SmartImage
                    src={featured.images[0]}
                    alt={productAlt(featured)}
                    sizes="(min-width: 768px) 460px, 90vw"
                    priority
                    className="transition-transform duration-[1200ms] ease-out group-hover:scale-[1.03]"
                  />
                ) : (
                  <OwnPlaceholder name={featured.name} size="lg" />
                )}
                <span aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-plum-deep/70 via-transparent to-transparent" />
                <span className="absolute inset-x-4 bottom-4 flex items-end justify-between gap-3">
                  <span>
                    <SampleTag product={featured} />
                    {featured.images.length > 0 && <span className="display mt-2 block text-2xl leading-tight text-ivory">{featured.name}</span>}
                    <Price product={featured} size="sm" tone="dark" />
                  </span>
                  <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-gold text-plum transition-transform group-hover:translate-x-1">
                    <ArrowRight aria-hidden="true" className="h-4 w-4" strokeWidth={1.5} />
                  </span>
                </span>
              </HandleArch>
            </Link>
          </div>
        )}
      </div>
      <GoldWave tone="plum" className="relative -mb-px" />
    </section>
  );
}
