import {
  Banknote,
  Brush,
  Coins,
  CreditCard,
  Droplets,
  FileText,
  KeyRound,
  Laptop,
  Milk,
  Smartphone,
  Wallet,
  type LucideIcon,
} from "lucide-react";
import { fitLabels } from "@/lib/format";
import type { FitKey } from "@/types";

const icons: Record<FitKey, LucideIcon> = {
  phone: Smartphone,
  wallet: Wallet,
  keys: KeyRound,
  cards: CreditCard,
  coins: Coins,
  notes: Banknote,
  a4: FileText,
  laptop: Laptop,
  "laptop-14": Laptop,
  "make-up": Brush,
  toiletries: Droplets,
  bottles: Milk,
};

/** "What fits" icons, shown only from the product's own `fits` data. Renders nothing when empty. */
export function FitsRow({
  fits,
  tone = "light",
  title = "What fits",
  headingLevel: H = "h2",
}: {
  fits: FitKey[];
  tone?: "light" | "dark";
  title?: string;
  headingLevel?: "h2" | "h3" | "h4";
}) {
  if (!fits.length) return null;
  return (
    <div>
      <H className={`eyebrow ${tone === "dark" ? "text-gold" : "text-gold-text"}`}>{title}</H>
      <ul className="mt-3 flex flex-wrap gap-2">
        {fits.map((f) => {
          const Icon = icons[f] ?? Smartphone;
          return (
            <li
              key={f}
              className={`flex items-center gap-2 rounded-full py-2 pl-2 pr-4 text-sm ${
                tone === "dark" ? "bg-white/8 text-ivory ring-1 ring-white/15" : "bg-lilac text-plum"
              }`}
            >
              <span className={`grid h-7 w-7 place-items-center rounded-full ${tone === "dark" ? "bg-plum-deep text-gold" : "bg-ivory text-plum"}`}>
                <Icon aria-hidden="true" className="h-4 w-4" strokeWidth={1.5} />
              </span>
              {fitLabels[f] ?? f}
            </li>
          );
        })}
      </ul>
    </div>
  );
}
