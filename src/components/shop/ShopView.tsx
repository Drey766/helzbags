"use client";

import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useMemo, useRef, useState } from "react";
import { Search, SlidersHorizontal, X } from "lucide-react";
import { filterProducts, getCategory, getOccasion, getProducts, sortProducts, categories, occasions } from "@/lib/products";
import { activeFilterCount, parseShopParams, priceRanges, shopQuery, sortOptions } from "@/lib/shopParams";
import { carryLabels, formatKes, sizeLabels } from "@/lib/format";
import { ProductCard } from "@/components/product/ProductCard";
import { Sheet } from "@/components/ui/Sheet";
import { FilterPanel } from "./FilterPanel";
import type { Product, ShopFilters } from "@/types";

export function ShopView() {
  const sp = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const filters = useMemo(() => parseShopParams(new URLSearchParams(sp.toString())), [sp]);
  const [sheetOpen, setSheetOpen] = useState(false);
  const [q, setQ] = useState(filters.q ?? "");
  const searchTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Keep the search box in step with Back/Forward.
  const [lastQ, setLastQ] = useState(filters.q ?? "");
  if ((filters.q ?? "") !== lastQ) {
    setLastQ(filters.q ?? "");
    setQ(filters.q ?? "");
  }

  const all = getProducts();
  const results = useMemo(() => sortProducts(filterProducts(all, filters), filters.sort), [all, filters]);

  function go(next: ShopFilters, mode: "push" | "replace" = "push") {
    const url = `${pathname}${shopQuery(next)}`;
    if (mode === "push") router.push(url, { scroll: false });
    else router.replace(url, { scroll: false });
  }

  function onSearch(value: string) {
    setQ(value);
    if (searchTimer.current) clearTimeout(searchTimer.current);
    searchTimer.current = setTimeout(() => go({ ...filters, q: value.trim() || undefined }, "replace"), 300);
  }
  useEffect(() => () => {
    if (searchTimer.current) clearTimeout(searchTimer.current);
  }, []);

  const category = getCategory(filters.category);
  const occasion = getOccasion(filters.occasion);
  const title = category?.name ?? (occasion ? `Bags for ${occasion.name.toLowerCase()}` : "All bags");
  const intro = category?.blurb ?? (occasion ? "Chosen for the way you spend your day." : "Handbags, totes, office bags, slings, clutches and more.");
  const count = activeFilterCount(filters);

  const chips: { key: string; label: string; next: ShopFilters }[] = [];
  if (category) chips.push({ key: "cat", label: category.name, next: { ...filters, category: undefined } });
  if (occasion) chips.push({ key: "occ", label: occasion.name, next: { ...filters, occasion: undefined } });
  filters.carry?.forEach((c) => chips.push({ key: `c-${c}`, label: carryLabels[c], next: { ...filters, carry: filters.carry!.filter((x) => x !== c) } }));
  filters.size?.forEach((s) => chips.push({ key: `s-${s}`, label: sizeLabels[s], next: { ...filters, size: filters.size!.filter((x) => x !== s) } }));
  if (filters.min != null || filters.max != null) {
    const r = priceRanges.find((x) => ("min" in x ? x.min : undefined) === filters.min && ("max" in x ? x.max : undefined) === filters.max);
    const label = r?.label ?? `${filters.min != null ? formatKes(filters.min) : "Any"} – ${filters.max != null ? formatKes(filters.max) : "any"}`;
    chips.push({ key: "price", label, next: { ...filters, min: undefined, max: undefined } });
  }
  if (filters.isNew) chips.push({ key: "new", label: "New only", next: { ...filters, isNew: false } });
  if (filters.q) chips.push({ key: "q", label: `“${filters.q}”`, next: { ...filters, q: undefined } });

  // Group by category when browsing everything in the featured order.
  const grouped =
    !filters.category && filters.sort === "featured" && !filters.q && results.length > 8
      ? categories
          .map((c) => ({ cat: c, items: results.filter((p) => p.category === c.key) }))
          .filter((g) => g.items.length)
      : null;

  return (
    <div className="container-hz pb-24 pt-8 md:pt-12">
      <header className="max-w-2xl">
        <nav aria-label="Breadcrumb" className="text-sm text-muted">
          <Link href="/" className="hover:text-primary">Home</Link>
          <span aria-hidden="true" className="mx-2">/</span>
          {category || occasion ? <Link href="/shop" className="hover:text-primary">Shop</Link> : <span aria-current="page">Shop</span>}
        </nav>
        <h1 className="display h-section mt-4 text-primary">{title}</h1>
        <p className="mt-3 text-muted">{intro}</p>
      </header>

      <div className="mt-8 flex flex-col gap-3 md:flex-row md:items-center">
        <div className="relative flex-1 md:max-w-sm">
          <label htmlFor="shop-search" className="sr-only">
            Search bags
          </label>
          <Search aria-hidden="true" className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted" strokeWidth={1.5} />
          <input
            id="shop-search"
            type="search"
            value={q}
            onChange={(e) => onSearch(e.target.value)}
            placeholder="Search by name, category or occasion"
            className="input pl-11"
            autoComplete="off"
          />
        </div>
        <div className="flex items-center gap-3 md:ml-auto">
          <button type="button" onClick={() => setSheetOpen(true)} className="btn btn-outline btn-sm lg:hidden" aria-haspopup="dialog">
            <SlidersHorizontal aria-hidden="true" className="h-4 w-4" strokeWidth={1.5} />
            Filters{count ? ` (${count})` : ""}
          </button>
          <label htmlFor="shop-sort" className="sr-only">
            Sort by
          </label>
          <select
            id="shop-sort"
            value={filters.sort}
            onChange={(e) => go({ ...filters, sort: e.target.value as ShopFilters["sort"] })}
            className="input min-h-11 w-auto flex-1 py-2 md:flex-none"
          >
            {sortOptions.map((o) => (
              <option key={o.key} value={o.key}>
                Sort: {o.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      {chips.length > 0 && (
        <ul className="mt-4 flex flex-wrap items-center gap-2" aria-label="Active filters">
          {chips.map((c) => (
            <li key={c.key}>
              <button
                type="button"
                onClick={() => go(c.next)}
                className="inline-flex min-h-9 items-center gap-1.5 rounded-full bg-surface-soft py-1 pl-3 pr-2 text-sm text-primary hover:bg-primary hover:text-surface"
                aria-label={`Remove filter ${c.label}`}
              >
                {c.label}
                <X aria-hidden="true" className="h-3.5 w-3.5" strokeWidth={2} />
              </button>
            </li>
          ))}
          <li>
            <button type="button" onClick={() => go({ sort: filters.sort })} className="min-h-9 px-2 text-sm text-primary underline underline-offset-4">
              Clear all
            </button>
          </li>
        </ul>
      )}

      <div className="mt-8 grid gap-10 lg:grid-cols-[260px_1fr] lg:gap-12">
        <aside className="hidden lg:block" aria-label="Filters">
          <div className="sticky top-28 max-h-[calc(100vh-8rem)] overflow-y-auto pb-8 pr-2 [scrollbar-width:thin]">
            <FilterPanel filters={filters} onChange={(f) => go(f)} idPrefix="side" />
          </div>
        </aside>

        <div>
          <p className="text-sm text-muted" aria-live="polite">
            <span className="tabular">{results.length}</span> {results.length === 1 ? "bag" : "bags"}
          </p>
          {results.length === 0 ? (
            <NoResults onClear={() => go({})} />
          ) : grouped ? (
            <div className="mt-6 space-y-16">
              {grouped.map((g) => (
                <section key={g.cat.key} aria-labelledby={`cat-${g.cat.key}`}>
                  <div className="flex items-baseline justify-between gap-4 border-b border-line pb-3">
                    <h2 id={`cat-${g.cat.key}`} className="display text-3xl text-primary">
                      {g.cat.name}
                    </h2>
                    <Link href={`/shop?category=${g.cat.key}`} className="text-sm text-primary-raised underline-offset-4 hover:underline">
                      View {g.items.length}
                    </Link>
                  </div>
                  <Grid items={g.items} />
                </section>
              ))}
            </div>
          ) : (
            <>
              <h2 className="sr-only">Bags</h2>
              <Grid items={results} />
            </>
          )}
        </div>
      </div>

      <Sheet
        open={sheetOpen}
        onClose={() => setSheetOpen(false)}
        title="Filters"
        side="bottom"
        footer={
          <div className="flex gap-3">
            <button type="button" onClick={() => go({ sort: filters.sort, q: filters.q })} className="btn btn-outline flex-1">
              Clear
            </button>
            <button type="button" onClick={() => setSheetOpen(false)} className="btn btn-primary flex-[2]">
              Show {results.length} {results.length === 1 ? "bag" : "bags"}
            </button>
          </div>
        }
      >
        <div className="px-5 py-6">
          <FilterPanel filters={filters} onChange={(f) => go(f, "replace")} idPrefix="sheet" />
        </div>
      </Sheet>
    </div>
  );
}

function Grid({ items }: { items: Product[] }) {
  return (
    <ul className="mt-6 grid grid-cols-2 gap-x-3 gap-y-10 sm:grid-cols-3 md:gap-x-6 xl:grid-cols-4">
      {items.map((p, i) => (
        <li key={p.id}>
          <ProductCard product={p} priority={i < 4} sizes="(min-width: 1280px) 22vw, (min-width: 640px) 30vw, 50vw" />
        </li>
      ))}
    </ul>
  );
}

function NoResults({ onClear }: { onClear: () => void }) {
  return (
    <div className="mt-8 rounded-[28px] bg-surface-alt px-6 py-12 text-center">
      <p className="display text-3xl text-primary">No bags match those filters.</p>
      <p className="mt-3 text-muted">Remove a filter, or browse by occasion.</p>
      <ul className="mt-6 flex flex-wrap justify-center gap-2">
        {occasions
          .filter((o) => o.key !== "travel")
          .map((o) => (
            <li key={o.key}>
              <Link href={`/shop?occasion=${o.key}`} className="inline-flex min-h-11 items-center rounded-full border border-primary px-5 text-primary hover:bg-primary hover:text-surface">
                {o.name}
              </Link>
            </li>
          ))}
      </ul>
      <button type="button" onClick={onClear} className="btn btn-primary mt-6">
        Show all bags
      </button>
    </div>
  );
}
