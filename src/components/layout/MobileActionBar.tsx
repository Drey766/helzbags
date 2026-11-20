"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { MessageCircle, Phone, ShoppingBag, Store } from "lucide-react";
import { useStore } from "@/store/StoreProvider";
import { getProduct } from "@/lib/products";
import { generalMessage, productOrderMessage, telUrl, waUrl } from "@/lib/whatsapp";

/** Sticky bottom bar on mobile: WhatsApp · Call · Shop / Order this bag · Basket. */
export function MobileActionBar() {
  const pathname = usePathname();
  const { basketCount, hydrated, setBasketOpen } = useStore();
  const slug = pathname.startsWith("/shop/") ? decodeURIComponent(pathname.split("/")[2] ?? "") : "";
  const product = slug ? getProduct(slug) : undefined;

  const item = "flex min-h-[56px] flex-1 flex-col items-center justify-center gap-0.5 text-[11px] tracking-wide";

  return (
    <nav
      aria-label="Quick actions"
      data-tone="dark"
      className="fixed inset-x-0 bottom-0 z-40 border-t border-gold/30 bg-plum pb-[env(safe-area-inset-bottom)] text-ivory shadow-[0_-10px_30px_-15px_rgba(0,0,0,0.5)] md:hidden"
    >
      <div className="flex items-stretch">
        <a href={waUrl(generalMessage())} target="_blank" rel="noopener noreferrer" className={item}>
          <MessageCircle aria-hidden="true" className="h-5 w-5 text-gold" strokeWidth={1.5} />
          WhatsApp
          <span className="sr-only">(opens WhatsApp)</span>
        </a>
        <a href={telUrl()} className={item}>
          <Phone aria-hidden="true" className="h-5 w-5 text-gold" strokeWidth={1.5} />
          Call
        </a>
        {product ? (
          <a
            href={waUrl(productOrderMessage(product))}
            target="_blank"
            rel="noopener noreferrer"
            className="m-1.5 flex flex-[1.6] items-center justify-center gap-1.5 rounded-full bg-gradient-to-br from-gold-light via-gold to-gold-deep px-3 text-[13px] font-medium text-plum"
          >
            <MessageCircle aria-hidden="true" className="h-4 w-4" strokeWidth={1.5} />
            Order this bag
            <span className="sr-only">on WhatsApp (opens WhatsApp)</span>
          </a>
        ) : (
          <Link href="/shop" className={item}>
            <Store aria-hidden="true" className="h-5 w-5 text-gold" strokeWidth={1.5} />
            Shop
          </Link>
        )}
        <button
          type="button"
          onClick={() => setBasketOpen(true)}
          className={`${item} relative`}
          aria-label={`Basket${hydrated && basketCount ? `, ${basketCount} item${basketCount === 1 ? "" : "s"}` : ", empty"}`}
        >
          <span className="relative">
            <ShoppingBag aria-hidden="true" className="h-5 w-5 text-gold" strokeWidth={1.5} />
            {hydrated && basketCount > 0 && (
              <span className="tabular absolute -right-2.5 -top-1.5 grid h-4 min-w-4 place-items-center rounded-full bg-gold-light px-1 text-[10px] font-medium text-plum">
                {basketCount}
              </span>
            )}
          </span>
          <span aria-hidden="true">Basket</span>
        </button>
      </div>
    </nav>
  );
}
