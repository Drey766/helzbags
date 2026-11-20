import Link from "next/link";
import { HandleArch } from "@/components/brand/HandleArch";
import { Logo } from "@/components/brand/Logo";

export function EmptyBasket({ onNavigate, compact }: { onNavigate?: () => void; compact?: boolean }) {
  return (
    <div className={`mx-auto flex max-w-sm flex-col items-center text-center ${compact ? "px-6 py-10" : "py-12"}`}>
      <HandleArch className="w-28" frameClassName="velvet aspect-[4/5] grid place-items-center">
        <Logo variant="mark" tone="dark" decorative className="h-12 w-12 opacity-80" />
      </HandleArch>
      <p className="display mt-6 text-3xl leading-tight text-plum">
        Your basket is waiting for something <em className="text-plum-soft">beautiful</em>.
      </p>
      <p className="mt-3 text-muted">Add a bag or two, then send your order on WhatsApp.</p>
      <div className="mt-6 flex flex-wrap justify-center gap-3">
        <Link href="/shop" onClick={onNavigate} className="btn btn-primary">
          Shop the collection
        </Link>
        <Link href="/bag-finder" onClick={onNavigate} className="btn btn-outline">
          Bag Finder
        </Link>
      </div>
    </div>
  );
}
