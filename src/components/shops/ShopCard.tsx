import { MapPin, Navigation, Phone } from "lucide-react";
import { mapsUrl, type Shop } from "@/config/brand";
import { telUrl } from "@/lib/whatsapp";
import { DraftBadge } from "@/components/ui/DraftBadge";

export function ShopCard({ shop, tone = "dark" }: { shop: Shop; tone?: "dark" | "light" }) {
  const dark = tone === "dark";
  return (
    <article
      className={`relative flex flex-col gap-y-5 rounded-[22px] p-6 lg:flex-row lg:items-center lg:justify-between ${
        dark ? "bg-plum-deep/55 ring-1 ring-gold/25" : "bg-white ring-1 ring-line"
      }`}
    >
      <div className="flex items-start gap-3">
        <span className={`grid h-10 w-10 shrink-0 place-items-center rounded-full ${dark ? "bg-gold text-plum" : "bg-plum text-gold-light"}`}>
          <MapPin aria-hidden="true" className="h-5 w-5" strokeWidth={1.5} />
        </span>
        <div>
          <h3 className={`display text-[1.75rem] leading-tight ${dark ? "text-ivory" : "text-plum"}`}>
            {shop.mall} {shop.confirm && <DraftBadge label="Confirm" />}
          </h3>
          <p className={`mt-1 ${dark ? "text-lilac-text" : "text-muted"}`}>
            <span className="tabular">{shop.unit}</span>, {shop.street}
          </p>
        </div>
      </div>
      <div className="flex flex-wrap gap-2">
        <a
          href={mapsUrl(shop)}
          target="_blank"
          rel="noopener noreferrer"
          className={`btn btn-sm ${dark ? "btn-gold" : "btn-primary"}`}
        >
          <Navigation aria-hidden="true" className="h-4 w-4" strokeWidth={1.5} />
          Get directions
          <span className="sr-only">to {shop.mall} (opens Google Maps)</span>
        </a>
        <a href={telUrl()} className={`btn btn-sm ${dark ? "btn-outline-light" : "btn-outline"}`}>
          <Phone aria-hidden="true" className="h-4 w-4" strokeWidth={1.5} />
          Call
        </a>
      </div>
    </article>
  );
}
