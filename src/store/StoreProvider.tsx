"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from "react";
import type { BasketLine } from "@/types";

const KEYS = {
  basket: "hz:basket:v1",
  wishlist: "hz:wishlist:v1",
  recent: "hz:recent:v1",
} as const;

const MAX_QTY = 5;
const MAX_RECENT = 8;

function readJson<T>(key: string, fallback: T): T {
  try {
    const raw = window.localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : fallback;
  } catch {
    return fallback;
  }
}

function writeJson(key: string, value: unknown) {
  try {
    window.localStorage.setItem(key, JSON.stringify(value));
  } catch {
    /* storage unavailable: keep working in memory */
  }
}

type RemovedLine = { line: BasketLine; index: number } | null;

type StoreValue = {
  hydrated: boolean;
  basket: BasketLine[];
  basketCount: number;
  addToBasket: (slug: string, qty?: number) => void;
  setQty: (slug: string, qty: number) => void;
  removeFromBasket: (slug: string) => void;
  undoRemove: () => void;
  lastRemoved: RemovedLine;
  clearBasket: () => void;
  wishlist: string[];
  isWished: (slug: string) => boolean;
  toggleWish: (slug: string) => void;
  recent: string[];
  pushRecent: (slug: string) => void;
  announcement: string;
  announce: (msg: string) => void;
  basketOpen: boolean;
  setBasketOpen: (open: boolean) => void;
};

const StoreContext = createContext<StoreValue | null>(null);

function sanitiseBasket(v: unknown): BasketLine[] {
  if (!Array.isArray(v)) return [];
  return v
    .filter((l): l is BasketLine => !!l && typeof l.slug === "string" && typeof l.qty === "number")
    .map((l) => ({ slug: l.slug, qty: Math.min(MAX_QTY, Math.max(1, Math.round(l.qty))) }));
}

function sanitiseList(v: unknown): string[] {
  return Array.isArray(v) ? v.filter((s): s is string => typeof s === "string") : [];
}

export function StoreProvider({ children }: { children: React.ReactNode }) {
  const [hydrated, setHydrated] = useState(false);
  const [basket, setBasket] = useState<BasketLine[]>([]);
  const [wishlist, setWishlist] = useState<string[]>([]);
  const [recent, setRecent] = useState<string[]>([]);
  const [lastRemoved, setLastRemoved] = useState<RemovedLine>(null);
  const [announcement, setAnnouncement] = useState("");
  const [basketOpen, setBasketOpen] = useState(false);
  const announceTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Load once after mount, so server and first client render match.
  useEffect(() => {
    /* eslint-disable react-hooks/set-state-in-effect -- hydrate from localStorage after mount */
    setBasket(sanitiseBasket(readJson(KEYS.basket, [])));
    setWishlist(sanitiseList(readJson(KEYS.wishlist, [])));
    setRecent(sanitiseList(readJson(KEYS.recent, [])));
    setHydrated(true);
    /* eslint-enable react-hooks/set-state-in-effect */
  }, []);

  useEffect(() => {
    if (hydrated) writeJson(KEYS.basket, basket);
  }, [basket, hydrated]);
  useEffect(() => {
    if (hydrated) writeJson(KEYS.wishlist, wishlist);
  }, [wishlist, hydrated]);
  useEffect(() => {
    if (hydrated) writeJson(KEYS.recent, recent);
  }, [recent, hydrated]);

  // Keep tabs in sync.
  useEffect(() => {
    const onStorage = (e: StorageEvent) => {
      if (e.key === KEYS.basket) setBasket(sanitiseBasket(readJson(KEYS.basket, [])));
      if (e.key === KEYS.wishlist) setWishlist(sanitiseList(readJson(KEYS.wishlist, [])));
    };
    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, []);

  const announce = useCallback((msg: string) => {
    if (announceTimer.current) clearTimeout(announceTimer.current);
    setAnnouncement("");
    announceTimer.current = setTimeout(() => setAnnouncement(msg), 30);
  }, []);

  const addToBasket = useCallback((slug: string, qty = 1) => {
    setBasket((b) => {
      const existing = b.find((l) => l.slug === slug);
      if (existing) {
        return b.map((l) => (l.slug === slug ? { ...l, qty: Math.min(MAX_QTY, l.qty + qty) } : l));
      }
      return [...b, { slug, qty: Math.min(MAX_QTY, qty) }];
    });
  }, []);

  const setQty = useCallback((slug: string, qty: number) => {
    const q = Math.min(MAX_QTY, Math.max(1, qty));
    setBasket((b) => b.map((l) => (l.slug === slug ? { ...l, qty: q } : l)));
  }, []);

  const removeFromBasket = useCallback((slug: string) => {
    setBasket((b) => {
      const index = b.findIndex((l) => l.slug === slug);
      if (index === -1) return b;
      setLastRemoved({ line: b[index], index });
      return b.filter((l) => l.slug !== slug);
    });
  }, []);

  const undoRemove = useCallback(() => {
    setLastRemoved((removed) => {
      if (removed) {
        setBasket((b) => {
          if (b.some((l) => l.slug === removed.line.slug)) return b;
          const next = [...b];
          next.splice(Math.min(removed.index, next.length), 0, removed.line);
          return next;
        });
      }
      return null;
    });
  }, []);

  const clearBasket = useCallback(() => setBasket([]), []);

  const toggleWish = useCallback((slug: string) => {
    setWishlist((w) => (w.includes(slug) ? w.filter((s) => s !== slug) : [slug, ...w]));
  }, []);

  const isWished = useCallback((slug: string) => wishlist.includes(slug), [wishlist]);

  const pushRecent = useCallback((slug: string) => {
    setRecent((r) => [slug, ...r.filter((s) => s !== slug)].slice(0, MAX_RECENT));
  }, []);

  const value = useMemo<StoreValue>(
    () => ({
      hydrated,
      basket,
      basketCount: basket.reduce((n, l) => n + l.qty, 0),
      addToBasket,
      setQty,
      removeFromBasket,
      undoRemove,
      lastRemoved,
      clearBasket,
      wishlist,
      isWished,
      toggleWish,
      recent,
      pushRecent,
      announcement,
      announce,
      basketOpen,
      setBasketOpen,
    }),
    [
      hydrated,
      basket,
      addToBasket,
      setQty,
      removeFromBasket,
      undoRemove,
      lastRemoved,
      clearBasket,
      wishlist,
      isWished,
      toggleWish,
      recent,
      pushRecent,
      announcement,
      announce,
      basketOpen,
    ],
  );

  return (
    <StoreContext.Provider value={value}>
      {children}
      <div aria-live="polite" role="status" className="sr-only">
        {announcement}
      </div>
    </StoreContext.Provider>
  );
}

export function useStore(): StoreValue {
  const ctx = useContext(StoreContext);
  if (!ctx) throw new Error("useStore must be used inside <StoreProvider>");
  return ctx;
}
