import { isCategoryKey, isOccasionKey } from "@/lib/products";
import type { CarryKey, ShopFilters, SizeKey, SortKey } from "@/types";

export const carryKeys: CarryKey[] = ["hand", "shoulder", "crossbody", "wrist", "back"];
export const sizeKeys: SizeKey[] = ["small", "medium", "large"];
export const sortOptions: { key: SortKey; label: string }[] = [
  { key: "featured", label: "Featured" },
  { key: "newest", label: "Newest" },
  { key: "price-asc", label: "Price: low to high" },
  { key: "price-desc", label: "Price: high to low" },
];
export const priceRanges = [
  { key: "u5", label: "Up to KES 5,000", max: 5000 },
  { key: "5-10", label: "KES 5,000 – 10,000", min: 5000, max: 10000 },
  { key: "10-15", label: "KES 10,000 – 15,000", min: 10000, max: 15000 },
  { key: "o15", label: "Over KES 15,000", min: 15000 },
] as const;

function list<T extends string>(v: string | null, allowed: readonly T[]): T[] {
  if (!v) return [];
  return v.split(",").filter((x): x is T => (allowed as readonly string[]).includes(x));
}

function num(v: string | null): number | undefined {
  if (!v) return undefined;
  const n = Number(v);
  return Number.isFinite(n) && n >= 0 ? n : undefined;
}

export function parseShopParams(sp: URLSearchParams): ShopFilters {
  const category = sp.get("category");
  const occasion = sp.get("occasion");
  const sort = sp.get("sort") as SortKey | null;
  return {
    category: isCategoryKey(category) ? category : undefined,
    occasion: isOccasionKey(occasion) ? occasion : undefined,
    carry: list(sp.get("carry"), carryKeys),
    size: list(sp.get("size"), sizeKeys),
    min: num(sp.get("min")),
    max: num(sp.get("max")),
    isNew: sp.get("isNew") === "1",
    q: sp.get("q")?.slice(0, 80) || undefined,
    sort: sortOptions.some((o) => o.key === sort) ? (sort as SortKey) : "featured",
  };
}

export function shopQuery(f: ShopFilters): string {
  const sp = new URLSearchParams();
  if (f.category) sp.set("category", f.category);
  if (f.occasion) sp.set("occasion", f.occasion);
  if (f.carry?.length) sp.set("carry", f.carry.join(","));
  if (f.size?.length) sp.set("size", f.size.join(","));
  if (f.min != null) sp.set("min", String(f.min));
  if (f.max != null) sp.set("max", String(f.max));
  if (f.isNew) sp.set("isNew", "1");
  if (f.q) sp.set("q", f.q);
  if (f.sort && f.sort !== "featured") sp.set("sort", f.sort);
  const s = sp.toString();
  return s ? `?${s}` : "";
}

export function activeFilterCount(f: ShopFilters): number {
  return (
    (f.category ? 1 : 0) +
    (f.occasion ? 1 : 0) +
    (f.carry?.length ?? 0) +
    (f.size?.length ?? 0) +
    (f.min != null || f.max != null ? 1 : 0) +
    (f.isNew ? 1 : 0)
  );
}
