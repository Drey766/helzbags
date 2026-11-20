import Link from "next/link";
import { MapPin, Phone } from "lucide-react";
import { Logo } from "@/components/brand/Logo";
import { GoldWave } from "@/components/brand/GoldWave";
import { DraftBadge } from "@/components/ui/DraftBadge";
import { brand, hasPolicy, hasTill, mapsUrl } from "@/config/brand";
import { telUrl } from "@/lib/whatsapp";
import { footerNav } from "./nav";

export function Footer() {
  return (
    <footer className="relative bg-primary-deep text-surface" data-tone="dark">
      <GoldWave tone="primary" height={64} className="-mt-px" />
      <div className="container-hz grid gap-12 pb-28 pt-10 md:pb-14 lg:grid-cols-[1.2fr_2fr] lg:gap-20">
        <div>
          <Logo tone="dark" className="h-14 w-auto max-w-full md:h-16" />
          <p className="display mt-6 text-3xl italic text-accent-light">{brand.tagline}</p>
          <div className="mt-6 space-y-2 text-sm text-muted-on-dark">
            <a href={telUrl()} className="flex min-h-11 items-center gap-2 text-surface hover:text-accent-light">
              <Phone aria-hidden="true" className="h-4 w-4 text-accent" strokeWidth={1.5} />
              <span className="tabular">{brand.phoneDisplay}</span>
              <span className="text-muted-on-dark">· WhatsApp or call</span>
            </a>
            {hasTill && <p className="tabular">M-Pesa Till {brand.mpesaTill}</p>}
            <p>{brand.ownWords.delivery}</p>
            {hasPolicy && (
              <p>
                {brand.policy.refunds} {brand.policy.exchange}
              </p>
            )}
          </div>
        </div>

        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          <div className="sm:col-span-2 lg:col-span-1">
            <h2 className="eyebrow text-accent">Pick-up point</h2>
            <ul className="mt-4 space-y-4 text-sm">
              {brand.shops.map((s) => (
                <li key={s.key}>
                  <a
                    href={mapsUrl(s)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex gap-2 text-muted-on-dark hover:text-surface"
                  >
                    <MapPin aria-hidden="true" className="mt-0.5 h-4 w-4 shrink-0 text-accent" strokeWidth={1.5} />
                    <span>
                      <span className="block text-surface">{s.mall}</span>
                      {s.floor}, {s.unit}, {s.street}
                      <span className="block">{s.landmark}</span>
                      <span className="sr-only"> (opens Google Maps)</span>
                    </span>
                  </a>
                  {s.confirm && <DraftBadge label="Confirm" className="ml-6 mt-1" />}
                </li>
              ))}
            </ul>
          </div>
          {(
            [
              ["Shop", footerNav.shop],
              ["Help", footerNav.help],
              [brand.name, footerNav.about],
            ] as const
          ).map(([title, links]) => (
            <div key={title}>
              <h2 className="eyebrow text-accent">{title}</h2>
              <ul className="mt-3">
                {links.map((l) => (
                  <li key={l.href}>
                    <Link href={l.href} className="flex min-h-10 items-center text-sm text-muted-on-dark hover:text-surface">
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
      <div className="border-t border-white/10">
        <div className="container-hz flex flex-col gap-2 py-6 pb-28 text-xs text-muted-on-dark sm:flex-row sm:justify-between md:pb-6">
          <p>
            © {brand.name}. Nairobi.
          </p>
          <p>Orders are taken on WhatsApp.</p>
        </div>
      </div>
    </footer>
  );
}
