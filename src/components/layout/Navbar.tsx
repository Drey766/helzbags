"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { ChevronDown, Heart, Menu, Search, ShoppingBag } from "lucide-react";
import { Logo } from "@/components/brand/Logo";
import { useStore } from "@/store/StoreProvider";
import { getVisibleCategories, occasions } from "@/lib/products";
import { mainNav } from "./nav";
import { MobileMenu } from "./MobileMenu";
import { Sheet } from "@/components/ui/Sheet";
import { brand } from "@/config/brand";

export function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const { basketCount, wishlist, hydrated, setBasketOpen } = useStore();
  const [megaOpen, setMegaOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const megaRef = useRef<HTMLLIElement>(null);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const cats = getVisibleCategories();

  // Close menus on route change.
  const [lastPath, setLastPath] = useState(pathname);
  if (lastPath !== pathname) {
    setLastPath(pathname);
    setMegaOpen(false);
    setMenuOpen(false);
  }

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!megaOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMegaOpen(false);
    };
    const onClick = (e: MouseEvent) => {
      if (megaRef.current && !megaRef.current.contains(e.target as Node)) setMegaOpen(false);
    };
    document.addEventListener("keydown", onKey);
    document.addEventListener("mousedown", onClick);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("mousedown", onClick);
    };
  }, [megaOpen]);

  const isActive = (href: string) => (href === "/" ? pathname === "/" : pathname.startsWith(href));
  const openMega = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    setMegaOpen(true);
  };
  const scheduleClose = () => {
    closeTimer.current = setTimeout(() => setMegaOpen(false), 160);
  };

  return (
    <header
      className={`sticky top-0 z-50 border-b transition-[background-color,box-shadow,border-color] duration-300 ${
        scrolled ? "border-line bg-ivory/92 shadow-[0_6px_24px_-18px_rgba(0,0,0,0.25)] backdrop-blur" : "border-transparent bg-ivory"
      }`}
    >
      <div className="container-zb flex h-16 items-center gap-2 md:h-[76px]">
        <button
          type="button"
          className="-ml-2 grid h-11 w-11 place-items-center rounded-full text-plum lg:hidden"
          onClick={() => setMenuOpen(true)}
          aria-label="Open menu"
          aria-haspopup="dialog"
        >
          <Menu aria-hidden="true" className="h-6 w-6" strokeWidth={1.5} />
        </button>

        <Link href="/" className="flex items-center rounded-md lg:mr-6" aria-label={`${brand.name}, home`}>
          <Logo className="h-11 w-auto md:h-[52px]" decorative />
        </Link>

        <nav aria-label="Main" className="hidden flex-1 lg:block">
          <ul className="flex items-center gap-1">
            {mainNav.map((item) =>
              item.href === "/shop" ? (
                <li key={item.href} className="relative" ref={megaRef} onMouseEnter={openMega} onMouseLeave={scheduleClose}>
                  <div className="flex items-center">
                    <Link
                      href="/shop"
                      className={`flex min-h-11 items-center rounded-full px-3 text-[0.72rem] font-medium uppercase tracking-[0.2em] transition-colors hover:text-plum-soft ${
                        isActive("/shop") ? "text-plum" : "text-ink"
                      }`}
                      aria-current={isActive("/shop") ? "page" : undefined}
                    >
                      Shop
                    </Link>
                    <button
                      type="button"
                      className="-ml-2 grid h-11 w-8 place-items-center rounded-full text-plum"
                      aria-expanded={megaOpen}
                      aria-controls="mega-menu"
                      aria-label="Show shop categories"
                      onClick={() => setMegaOpen((o) => !o)}
                    >
                      <ChevronDown
                        aria-hidden="true"
                        className={`h-4 w-4 transition-transform ${megaOpen ? "rotate-180" : ""}`}
                        strokeWidth={1.5}
                      />
                    </button>
                  </div>
                  {megaOpen && (
                    <div
                      id="mega-menu"
                      className="anim-fade absolute left-0 top-full z-50 mt-2 w-[min(760px,80vw)] overflow-hidden rounded-3xl border border-line bg-ivory shadow-[0_30px_60px_-30px_rgba(0,0,0,0.35)]"
                    >
                      <div className="grid grid-cols-[1.4fr_1fr]">
                        <div className="p-7">
                          <p className="eyebrow text-gold-text">Categories</p>
                          <ul className="mt-4 grid grid-cols-2 gap-x-6 gap-y-1">
                            {cats.map((c) => (
                              <li key={c.key}>
                                <Link
                                  href={`/shop?category=${c.key}`}
                                  className="group block rounded-xl px-3 py-2.5 transition-colors hover:bg-champagne"
                                >
                                  <span className="display block text-xl text-plum">{c.name}</span>
                                  <span className="block text-[13px] leading-snug text-muted">{c.blurb}</span>
                                </Link>
                              </li>
                            ))}
                          </ul>
                        </div>
                        <div className="velvet relative p-7" data-tone="dark">
                          <p className="eyebrow text-gold">Shop by occasion</p>
                          <ul className="mt-4 space-y-1">
                            {occasions
                              .filter((o) => o.key !== "travel")
                              .map((o) => (
                                <li key={o.key}>
                                  <Link
                                    href={`/shop?occasion=${o.key}`}
                                    className="display block rounded-lg py-1.5 text-2xl text-ivory transition-colors hover:text-gold-light"
                                  >
                                    {o.name}
                                  </Link>
                                </li>
                              ))}
                          </ul>
                          <p className="mt-6 text-sm italic leading-relaxed text-lilac-text">
                            &ldquo;{brand.ownWords[1]}&rdquo;
                          </p>
                          <Link href="/bag-finder" className="btn btn-gold btn-sm mt-6">
                            Try the Bag Finder
                          </Link>
                        </div>
                      </div>
                    </div>
                  )}
                </li>
              ) : (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className={`flex min-h-11 items-center rounded-full px-3 text-[0.72rem] font-medium uppercase tracking-[0.2em] transition-colors hover:text-plum-soft ${
                      isActive(item.href) ? "text-plum" : "text-ink"
                    }`}
                    aria-current={isActive(item.href) ? "page" : undefined}
                  >
                    <span className={isActive(item.href) ? "border-b border-gold-text pb-0.5" : ""}>{item.label}</span>
                  </Link>
                </li>
              ),
            )}
          </ul>
        </nav>

        <div className="ml-auto flex items-center">
          <button
            type="button"
            onClick={() => setSearchOpen(true)}
            className="grid h-11 w-11 place-items-center rounded-full text-plum transition-colors hover:bg-champagne"
            aria-label="Search bags"
            aria-haspopup="dialog"
          >
            <Search aria-hidden="true" className="h-[21px] w-[21px]" strokeWidth={1.5} />
          </button>
          <Link
            href="/wishlist"
            className="relative hidden h-11 w-11 place-items-center rounded-full text-plum transition-colors hover:bg-champagne sm:grid"
            aria-label={`Wishlist${hydrated && wishlist.length ? `, ${wishlist.length} saved` : ""}`}
          >
            <Heart aria-hidden="true" className="h-[21px] w-[21px]" strokeWidth={1.5} />
            {hydrated && wishlist.length > 0 && <CountDot n={wishlist.length} />}
          </Link>
          <button
            type="button"
            onClick={() => setBasketOpen(true)}
            className="relative -mr-2 grid h-11 w-11 place-items-center rounded-full text-plum transition-colors hover:bg-champagne"
            aria-label={`Basket${hydrated && basketCount ? `, ${basketCount} item${basketCount === 1 ? "" : "s"}` : ", empty"}`}
            aria-haspopup="dialog"
          >
            <ShoppingBag aria-hidden="true" className="h-[21px] w-[21px]" strokeWidth={1.5} />
            {hydrated && basketCount > 0 && <CountDot n={basketCount} />}
          </button>
        </div>
      </div>

      <MobileMenu open={menuOpen} onClose={() => setMenuOpen(false)} />

      <Sheet open={searchOpen} onClose={() => setSearchOpen(false)} title="Search bags" side="bottom" className="md:inset-x-auto md:left-1/2 md:top-24 md:bottom-auto md:w-[560px] md:-translate-x-1/2 md:rounded-3xl">
        <form
          role="search"
          className="p-5"
          onSubmit={(e) => {
            e.preventDefault();
            const q = new FormData(e.currentTarget).get("q")?.toString().trim() ?? "";
            setSearchOpen(false);
            router.push(q ? `/shop?q=${encodeURIComponent(q)}` : "/shop");
          }}
        >
          <label htmlFor="nav-search" className="eyebrow text-muted">
            Bag name, category or occasion
          </label>
          <div className="mt-3 flex gap-2">
            <input id="nav-search" name="q" type="search" className="input" placeholder="Try “tote” or “evening”" data-autofocus autoComplete="off" />
            <button type="submit" className="btn btn-primary btn-sm shrink-0">
              Search
            </button>
          </div>
        </form>
      </Sheet>
    </header>
  );
}

function CountDot({ n }: { n: number }) {
  return (
    <span
      aria-hidden="true"
      className="tabular absolute right-0.5 top-0.5 grid h-[18px] min-w-[18px] place-items-center rounded-full bg-plum px-1 text-[10px] font-medium leading-none text-gold-light ring-2 ring-ivory"
    >
      {n}
    </span>
  );
}
