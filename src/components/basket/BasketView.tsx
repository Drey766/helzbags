"use client";

import { useState } from "react";
import { Store, Truck } from "lucide-react";
import { brand, shopLabel } from "@/config/brand";
import { formatKes } from "@/lib/format";
import { basketOrderMessage, type Fulfilment } from "@/lib/whatsapp";
import { useStore } from "@/store/StoreProvider";
import { WhatsAppButton } from "@/components/brand/WhatsAppButton";
import { TillCard } from "@/components/brand/TillCard";
import { DraftBadge } from "@/components/ui/DraftBadge";
import { BasketLines } from "./BasketLines";
import { EmptyBasket } from "./EmptyBasket";
import { UndoBar } from "./UndoBar";
import { useBasketItems } from "./useBasketItems";

export function BasketView() {
  const { hydrated } = useStore();
  const { items, subtotal } = useBasketItems();
  const [mode, setMode] = useState<"pickup" | "delivery">("pickup");
  const [shopKey, setShopKey] = useState<string>(brand.shops.find((s) => !s.confirm)?.key ?? brand.shops[0].key);
  const [area, setArea] = useState("");
  const [name, setName] = useState("");

  if (!hydrated) return <div className="min-h-[40vh]" aria-busy="true" />;

  if (!items.length) {
    return (
      <>
        <UndoBar className="mx-auto max-w-xl" />
        <EmptyBasket />
      </>
    );
  }

  const shop = brand.shops.find((s) => s.key === shopKey) ?? brand.shops[0];
  const fulfilment: Fulfilment = mode === "pickup" ? { kind: "pickup", shopLabel: shopLabel(shop) } : { kind: "delivery", area };
  const message = basketOrderMessage(items, fulfilment, name);
  const count = items.reduce((n, i) => n + i.qty, 0);

  return (
    <div className="grid grid-cols-1 gap-12 lg:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)] lg:gap-16">
      <div className="min-w-0">
        <UndoBar className="mb-4" />
        <BasketLines items={items} />
      </div>

      <aside aria-labelledby="summary-title" className="lg:sticky lg:top-28 lg:self-start">
        <div className="relative overflow-hidden rounded-[24px] bg-surface-alt p-6 pl-8 md:p-8 md:pl-10">
          <span aria-hidden="true" className="absolute inset-y-0 left-0 flex">
            <span className="w-[5px] bg-primary" />
            <span className="ml-[3px] w-[3px] bg-accent-light" />
          </span>
          <h2 id="summary-title" className="display text-3xl text-primary">
            Your order
          </h2>
          <dl className="mt-4 space-y-2 text-sm">
            <div className="flex justify-between">
              <dt className="text-muted">Items</dt>
              <dd className="tabular">{count}</dd>
            </div>
            <div className="flex items-baseline justify-between border-t border-line pt-3">
              <dt className="eyebrow text-muted">Subtotal</dt>
              <dd className="tabular text-2xl font-medium text-ink">{formatKes(subtotal)}</dd>
            </div>
          </dl>

          <fieldset className="mt-6">
            <legend className="eyebrow text-accent-text">Pickup or delivery</legend>
            <div className="mt-3 grid grid-cols-2 gap-2">
              {(
                [
                  ["pickup", "Pick up", Store],
                  ["delivery", "Deliver to me", Truck],
                ] as const
              ).map(([key, label, Icon]) => (
                <label
                  key={key}
                  className={`flex min-h-14 cursor-pointer items-center gap-2 rounded-2xl border px-3 text-sm transition-colors has-[:focus-visible]:ring-2 has-[:focus-visible]:ring-primary has-[:focus-visible]:ring-offset-2 ${
                    mode === key ? "border-primary bg-primary text-surface" : "border-line bg-white text-ink hover:border-primary-raised"
                  }`}
                >
                  <input type="radio" name="fulfilment" value={key} checked={mode === key} onChange={() => setMode(key)} className="sr-only" />
                  <Icon aria-hidden="true" className={`h-4 w-4 shrink-0 ${mode === key ? "text-accent-light" : "text-primary"}`} strokeWidth={1.5} />
                  {label}
                </label>
              ))}
            </div>
          </fieldset>

          {mode === "pickup" ? (
            <div className="mt-4">
              <label htmlFor="pickup-shop" className="text-sm text-muted">
                Pick up at
              </label>
              <select id="pickup-shop" value={shopKey} onChange={(e) => setShopKey(e.target.value)} className="input mt-1">
                {brand.shops.map((s) => (
                  <option key={s.key} value={s.key}>
                    {shopLabel(s)}
                  </option>
                ))}
              </select>
              {shop.confirm && <DraftBadge label="Shop to confirm" className="mt-2" />}
            </div>
          ) : (
            <div className="mt-4">
              <label htmlFor="delivery-area" className="text-sm text-muted">
                Your area
              </label>
              <input
                id="delivery-area"
                value={area}
                onChange={(e) => setArea(e.target.value.slice(0, 80))}
                className="input mt-1"
                placeholder="Your town and area"
                autoComplete="address-level2"
              />
              <p className="mt-2 text-sm text-muted">{brand.ownWords.delivery} {brand.name} will advise.</p>
            </div>
          )}

          <div className="mt-4">
            <label htmlFor="order-name" className="text-sm text-muted">
              Your name <span className="text-xs">(optional)</span>
            </label>
            <input
              id="order-name"
              value={name}
              onChange={(e) => setName(e.target.value.slice(0, 60))}
              className="input mt-1"
              autoComplete="name"
            />
          </div>

          <WhatsAppButton message={message} label="Send order on WhatsApp" fullWidth orderHint className="mt-6" />
          <details className="mt-4 text-sm">
            <summary className="min-h-11 cursor-pointer py-2 text-primary">Preview the message</summary>
            <pre className="mt-2 whitespace-pre-wrap rounded-xl bg-white p-4 font-sans text-[13px] leading-relaxed text-ink">{message}</pre>
          </details>
        </div>
        <TillCard className="mt-6" compact />
      </aside>
    </div>
  );
}
