import type { Metadata } from "next";
import { WishlistView } from "@/components/wishlist/WishlistView";

export const metadata: Metadata = {
  title: "Wishlist",
  description: "Bags you have saved. Your wishlist stays on this device.",
};

export default function WishlistPage() {
  return (
    <div className="container-zb pb-24 pt-10 md:pt-14">
      <h1 className="display h-section text-plum">
        Your <em className="text-plum-soft">wishlist</em>
      </h1>
      <p className="mt-3 max-w-xl text-muted">Saved on this device only. Share it on WhatsApp when you are ready.</p>
      <div className="mt-10">
        <WishlistView />
      </div>
    </div>
  );
}
