import raw from "@/data/products.json";
import { isDemoMode } from "@/config/brand";
import type {
  Category,
  CategoryKey,
  Occasion,
  OccasionKey,
  Product,
  ProductData,
  ShopFilters,
  SortKey,
} from "@/types";

const data = raw as unknown as ProductData;

export const categories: Category[] = data.categories;
export const occasions: Occasion[] = data.occasions;

/** Every product, regardless of demo mode. Use getProducts() for anything shown. */
const allProducts: Product[] = data.products;

/** Products visible on the site: samples only in demo mode. */
export function getProducts(): Product[] {
  return isDemoMode ? allProducts : allProducts.filter((p) => p.status === "own");
}

export function getProduct(slug: string): Product | undefined {
  return getProducts().find((p) => p.slug === slug);
}

export function getOwnProducts(): Product[] {
  return allProducts.filter((p) => p.status === "own");
}

export function getCategory(key: string | undefined): Category | undefined {
  return categories.find((c) => c.key === key);
}

export function getOccasion(key: string | undefined): Occasion | undefined {
  return occasions.find((o) => o.key === key);
}

export function isCategoryKey(v: string | null | undefined): v is CategoryKey {
  return !!v && categories.some((c) => c.key === v);
}

export function isOccasionKey(v: string | null | undefined): v is OccasionKey {
  return !!v && occasions.some((o) => o.key === v);
}

/** Categories that have at least one visible product. */
export function getVisibleCategories(): Category[] {
  const products = getProducts();
  return categories.filter((c) => products.some((p) => p.category === c.key));
}

export function priceBounds(products: Product[] = getProducts()) {
  if (!products.length) return { min: 0, max: 0 };
  const prices = products.map((p) => p.priceKes);
  return { min: Math.min(...prices), max: Math.max(...prices) };
}

function matchesQuery(p: Product, q: string): boolean {
  const needle = q.trim().toLowerCase();
  if (!needle) return true;
  const cat = getCategory(p.category)?.name ?? "";
  const occ = p.occasions.map((o) => getOccasion(o)?.name ?? o).join(" ");
  const hay = `${p.name} ${cat} ${p.category} ${occ}`.toLowerCase();
  return needle.split(/\s+/).every((w) => hay.includes(w));
}

export function filterProducts(products: Product[], f: ShopFilters): Product[] {
  return products.filter((p) => {
    if (f.category && p.category !== f.category) return false;
    if (f.occasion && !p.occasions.includes(f.occasion)) return false;
    if (f.carry?.length && !f.carry.some((c) => p.carry.includes(c))) return false;
    if (f.size?.length && (!p.size || !f.size.includes(p.size))) return false;
    if (f.min != null && p.priceKes < f.min) return false;
    if (f.max != null && p.priceKes > f.max) return false;
    if (f.isNew && !p.isNew) return false;
    if (f.q && !matchesQuery(p, f.q)) return false;
    return true;
  });
}

export function sortProducts(products: Product[], sort: SortKey = "featured"): Product[] {
  const list = [...products];
  const index = new Map(allProducts.map((p, i) => [p.id, i]));
  const featuredRank = (p: Product) => (p.status === "own" ? 0 : 1) * 1000 + (index.get(p.id) ?? 0);
  switch (sort) {
    case "newest":
      return list.sort((a, b) => Number(b.isNew) - Number(a.isNew) || featuredRank(a) - featuredRank(b));
    case "price-asc":
      return list.sort((a, b) => a.priceKes - b.priceKes);
    case "price-desc":
      return list.sort((a, b) => b.priceKes - a.priceKes);
    default:
      return list.sort((a, b) => featuredRank(a) - featuredRank(b));
  }
}

/** Related bags: same occasion or category, excluding the bag itself. */
export function getRelated(product: Product, limit = 4): Product[] {
  return getProducts()
    .filter((p) => p.slug !== product.slug)
    .map((p) => {
      let score = 0;
      if (p.category === product.category) score += 2;
      score += p.occasions.filter((o) => product.occasions.includes(o)).length;
      return { p, score };
    })
    .filter((x) => x.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map((x) => x.p);
}

/** First visible product with photos, preferring Zuri's own bags. */
export function getFeaturedWithPhoto(): Product | undefined {
  const products = getProducts();
  return (
    products.find((p) => p.status === "own" && p.images.length) ??
    products.find((p) => p.images.length > 1 && p.isNew) ??
    products.find((p) => p.images.length)
  );
}

export function productAlt(p: Product, index = 0): string {
  const base = p.status === "sample" ? `${p.name}, sample photo` : p.name;
  return index > 0 ? `${base} ${index + 1}` : base;
}
