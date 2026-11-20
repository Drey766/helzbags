import type { Metadata } from "next";
import { BasketView } from "@/components/basket/BasketView";

export const metadata: Metadata = {
  title: "Basket",
  description: "Check your bags and send your order on WhatsApp.",
};

export default function BasketPage() {
  return (
    <div className="container-zb pb-24 pt-10 md:pt-14">
      <h1 className="display h-section text-plum">Basket</h1>
      <p className="mt-3 max-w-xl text-muted">
        Your basket stays on this device. When you are ready, send the order on WhatsApp and Zuri Bags will reply to confirm.
      </p>
      <div className="mt-10">
        <BasketView />
      </div>
    </div>
  );
}
