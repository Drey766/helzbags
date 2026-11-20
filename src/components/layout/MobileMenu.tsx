"use client";

import Link from "next/link";
import { Heart, Phone } from "lucide-react";
import { Sheet } from "@/components/ui/Sheet";
import { Logo } from "@/components/brand/Logo";
import { WhatsAppButton } from "@/components/brand/WhatsAppButton";
import { GoldWave } from "@/components/brand/GoldWave";
import { brand, hasTill } from "@/config/brand";
import { generalMessage, telUrl } from "@/lib/whatsapp";
import { getVisibleCategories, occasions } from "@/lib/products";
import { mainNav } from "./nav";

export function MobileMenu({ open, onClose }: { open: boolean; onClose: () => void }) {
  const cats = getVisibleCategories();
  return (
    <Sheet open={open} onClose={onClose} title="Menu" side="full" tone="dark" hideTitle>
      <div className="flex min-h-full flex-col px-6 pb-8">
        <Logo tone="dark" className="h-11 w-auto self-start" decorative />
        <nav aria-label="Mobile" className="mt-6">
          <ul className="space-y-1">
            {[{ href: "/", label: "Home" }, ...mainNav].map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  onClick={onClose}
                  className="display block py-1.5 text-[2.1rem] leading-tight text-surface transition-colors hover:text-accent-light"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <GoldWave tone="primary" height={40} className="-mx-6 my-6 w-[calc(100%+3rem)]" />

        <p className="eyebrow text-accent">Shop by occasion</p>
        <ul className="mt-3 flex flex-wrap gap-2">
          {occasions
            .filter((o) => o.key !== "travel")
            .map((o) => (
              <li key={o.key}>
                <Link
                  href={`/shop?occasion=${o.key}`}
                  onClick={onClose}
                  className="inline-flex min-h-11 items-center rounded-full border border-accent/50 px-4 text-sm text-surface"
                >
                  {o.name}
                </Link>
              </li>
            ))}
        </ul>

        <p className="eyebrow mt-7 text-accent">Categories</p>
        <ul className="mt-3 grid grid-cols-2 gap-x-4">
          {cats.map((c) => (
            <li key={c.key}>
              <Link href={`/shop?category=${c.key}`} onClick={onClose} className="flex min-h-11 items-center text-muted-on-dark hover:text-surface">
                {c.name}
              </Link>
            </li>
          ))}
        </ul>

        <div className="mt-8 flex flex-col gap-3">
          <WhatsAppButton variant="accent" label="Chat on WhatsApp" message={generalMessage()} fullWidth />
          <div className="grid grid-cols-2 gap-3">
            <a href={telUrl()} className="btn btn-outline-light btn-sm">
              <Phone aria-hidden="true" className="h-4 w-4" strokeWidth={1.5} />
              Call
            </a>
            <Link href="/wishlist" onClick={onClose} className="btn btn-outline-light btn-sm">
              <Heart aria-hidden="true" className="h-4 w-4" strokeWidth={1.5} />
              Wishlist
            </Link>
          </div>
          <p className="mt-2 text-center text-sm text-muted-on-dark">
            {brand.phoneDisplay}
            {hasTill && ` · Till ${brand.mpesaTill}`}
          </p>
        </div>
      </div>
    </Sheet>
  );
}
