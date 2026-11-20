export type CategoryKey =
  | "handbags"
  | "totes"
  | "office"
  | "sling"
  | "clutches"
  | "wallets"
  | "pouches"
  | "backpacks";

export type OccasionKey = "work" | "outings" | "evening" | "everyday" | "travel";
export type CarryKey = "hand" | "shoulder" | "crossbody" | "wrist" | "back";
export type SizeKey = "small" | "medium" | "large";
export type FitKey =
  | "phone"
  | "wallet"
  | "keys"
  | "cards"
  | "coins"
  | "notes"
  | "a4"
  | "laptop"
  | "laptop-14"
  | "make-up"
  | "toiletries"
  | "bottles";
export type IdealForKey = "work" | "outings" | "evening" | "everyday" | "travel" | "mum";

export type Product = {
  id: string;
  slug: string;
  name: string;
  nameConfirmed?: false;
  status: "own" | "sample";
  category: CategoryKey;
  occasions: OccasionKey[];
  carry: CarryKey[];
  size: SizeKey | null;
  fits: FitKey[];
  priceKes: number;
  isNew: boolean;
  images: string[];
  summary: string;
  description: string;
  features: string[];
  idealFor: IdealForKey[];
};

export type Category = { key: CategoryKey; name: string; blurb: string };
export type Occasion = { key: OccasionKey; name: string };

export type ProductData = {
  categories: Category[];
  occasions: Occasion[];
  products: Product[];
};

export type DraftStatus = "draft" | "approved";

export type SortKey = "featured" | "newest" | "price-asc" | "price-desc";

export type ShopFilters = {
  category?: CategoryKey;
  occasion?: OccasionKey;
  carry?: CarryKey[];
  size?: SizeKey[];
  min?: number;
  max?: number;
  isNew?: boolean;
  q?: string;
  sort?: SortKey;
};

export type BasketLine = { slug: string; qty: number };
