"use client";

import Link from "next/link";
import { Sheet } from "@/components/ui/Sheet";
import { useStore } from "@/store/StoreProvider";
import { formatKes } from "@/lib/format";
import { BasketLines } from "./BasketLines";
import { EmptyBasket } from "./EmptyBasket";
import { UndoBar } from "./UndoBar";
import { useBasketItems } from "./useBasketItems";

export function BasketDrawer() {
  const { basketOpen, setBasketOpen, hydrated } = useStore();
  const { items, subtotal } = useBasketItems();
  const close = () => setBasketOpen(false);
  const count = items.reduce((n, i) => n + i.qty, 0);

  return (
    <Sheet
      open={basketOpen}
      onClose={close}
      title={count ? `Basket (${count})` : "Basket"}
      side="responsive"
      footer={
        hydrated && items.length ? (
          <div>
            <div className="flex items-baseline justify-between">
              <span className="eyebrow text-muted">Subtotal</span>
              <span className="tabular text-xl font-medium text-ink">{formatKes(subtotal)}</span>
            </div>
            <Link href="/basket" onClick={close} className="btn btn-primary mt-4 w-full">
              Review and order on WhatsApp
            </Link>
            <button type="button" onClick={close} className="btn mt-1 w-full text-primary">
              Keep shopping
            </button>
          </div>
        ) : undefined
      }
    >
      {hydrated && (
        <div className="px-5">
          <UndoBar className="mt-4" />
          {items.length ? <BasketLines items={items} compact onNavigate={close} /> : <EmptyBasket compact onNavigate={close} />}
        </div>
      )}
    </Sheet>
  );
}
