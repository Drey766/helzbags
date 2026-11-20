import type { Metadata } from "next";
import { Suspense } from "react";
import { ShopView } from "@/components/shop/ShopView";
import { BrandLoader } from "@/components/ui/BrandLoader";

export const metadata: Metadata = {
  title: "Shop handbags",
  description: "Handbags, totes, office bags, slings, clutches, wallets and more. Order on WhatsApp.",
  alternates: { canonical: "/shop" },
};

function ShopFallback() {
  return (
    <div className="container-hz pb-24 pt-12">
      <h1 className="display h-section text-primary">All bags</h1>
      <BrandLoader label="Loading the collection" className="py-24" />
    </div>
  );
}

export default function ShopPage() {
  return (
    <Suspense fallback={<ShopFallback />}>
      <ShopView />
    </Suspense>
  );
}
