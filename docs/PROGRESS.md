# Progress log

Claude: update this at the end of every phase. If you were compacted, read this first.

## Phases
- [x] Phase 1 — Foundation
- [x] Phase 2 — Product content (own bags + 27 samples)
- [x] Phase 3 — Supporting content (+ Bag Finder logic)
- [x] Phase 4 — Home
- [x] Phase 5 — Shop, product pages, quick view, wishlist, Bag Finder
- [x] Phase 6 — Basket, How to order, Visit, About, FAQs
- [x] Phase 7 — Blog, Contact, API, legal, SEO
- [x] Phase 8 — Audit
- [x] Phase 9 — Polish, QA, README

## Phase 2 batch tracker
- [x] Own bags (their words only)
- [x] HZ-003 – HZ-011
- [x] HZ-012 – HZ-020
- [x] HZ-021 – HZ-029

## Notes per phase (include "visual check done / skipped")
- **Phase 1**: Next 16.4 scaffold merged (cacheComponents + partialPrefetching kept from the scaffold). brand.ts → CSS vars (now --hz-*) → Tailwind @theme; Logo/GoldWave/HandleArch/TillCard/WhatsAppButton, Sheet with focus trap, store (basket, wishlist, recent) in localStorage, Navbar with mega menu, mobile menu, footer, MobileActionBar, BasketDrawer, ClothingStore JSON-LD, noindex in demo mode. Footer shows no year (avoids request-time Date with cacheComponents). Visual check: n/a (placeholder home).
- **Phase 2**: Own-bag copy is their own words only. Samples rewritten from notes in three batches: only visible/stated features (closures, pockets, straps, linings, beadwork); no material claims, origin, maker, measurements or brand marks. Banned-term scan clean ("14-inch laptop" kept: it is the laptop size from fits). Visual check: n/a.
- **Phase 3**: finder.json, steps.json, faqs.json (8), about.json (story empty, hidden), blog.json (6 posts), all status draft; policy/Till/shops in copy are {tokens} filled from brand.ts (src/lib/content.ts). src/lib/finder.ts checked with scripts/check-finder.ts (laptop → only laptop bags; evening + essentials → clutches/small first; budget and baby filters). Visual check: n/a.
- **Phase 4**: Home built: dark hero (handle-arch image, wave, two CTAs), occasions, category arch row (snap row on mobile), New in, Bag Finder band (Q1 inline), own-collection placeholders, editorial split, ordering steps, shops band + schematic map, policy strip, blog preview, final CTA. Fixed: Tailwind turbopack loader restricted to globals.css (it broke next/font in dev), arch radius in % so base corners survive, md:container-hz (custom classes take no variants in v4). Visual check done at 1280×800 and 375×812 with Playwright; sample photos often time out on this network and show the designed fallback.
- **Phase 5**: /shop (URL-synced filters in Suspense, sidebar on desktop, bottom sheet on mobile, chips, sort, debounced search, category headings, empty state with occasion links, quick view), /shop/[slug] (swipe gallery + thumbnails + keyboard lightbox, or designed placeholder for the own bags; Order on WhatsApp with name, price, URL; basket; wishlist; share; What fits; carry chips; Till card; policy; shop links; related; recently viewed), /wishlist, /bag-finder. Product content wrapped in Suspense (Next 16 instant-navigation check on params). Checked: filters survive reload and Back; product WhatsApp link has name, KES price and URL. Visual check done (1280 and 375, own-bag placeholder, sample with 6 photos, finder results, mobile filters sheet).
- **Phase 6**: /basket (stepper 1–5, remove with Undo, pickup shop select or delivery area with "the shop will advise on delivery", optional name, Send order on WhatsApp with message preview, Till card), basket drawer, /how-to-order, /visit (shop cards, directions, call, map), /about (their words, categories, policy, steps, shops; story hidden), /faqs (8, tokens from brand.ts). scripts/check-basket.ts passes (lines, qty, line totals, subtotal, pickup/delivery, name). Counts render only after hydration. Visual check done (basket 375 + 1280, visit 1280).
- **Phase 7**: /blog + posts (articleNotice at the end of each), /contact (pre-fills ?bag=), /api/contact (zod, honeypot, 3s minimum, in-memory rate limit, Resend, 503 without keys, no storing/logging), /privacy (Data Protection Act, 2019 + ODPC), /terms (only ordering, prices may change, payment, policy), 404 "This bag has wandered off." with shop links, sitemap (no samples), robots (disallow in demo), manifest. Tested on dev: valid post without keys → 503 → WhatsApp/Call fallback with the message, never a success; too fast → 422; invalid → 422 fields; honeypot → 400. Dynamic routes set instant = false so unknown slugs return a real 404 (Suspense streaming gave 200). Visual check done (contact fallback, 404 and blog post at 375).
- **Phase 8**: audit-content run. All 15 checks PASS after fixes: (5) Till number removed from a code comment in TillCard; (3) basket meta "Review" reworded; (6) blog "ordered or paid" reworded. Notes: "leading-*" (CSS) and "Preview" are not social proof; © is not an emoji; "Photos coming soon" is the brief's own-bag placeholder, not an empty contact field. Demo off: getProducts() returns only the own bags. Only JSON-LD is ClothingStore (no Product/Offer, no ratings).
- **Phase 9**: Personality review (BRIEF §5): 1 Hero → components/home/Hero; 2 occasions → home/Occasions; 3 category arch row → home/CategoryRow; 4 Bag Finder → finder/BagFinder + lib/finder; 5 What fits → product/FitsRow; 6 Order on WhatsApp → brand/WhatsAppButton, ProductActions, BasketView, MobileActionBar; 7 Visit band + schematic map → shops/ShopsBand, CbdMap; 8 Till card → brand/TillCard; 9 gold wave + handle arch → brand/GoldWave, HandleArch, ProductCard; 10 empty/error states → EmptyBasket, WishlistView, ShopView NoResults, not-found. Refined: hero caption, placeholders, heading order, label/name mismatches. Lighthouse accessibility (mobile): home 100, shop 100, product 98 → heading fixed. Remaining Lighthouse fails are intended (noindex in demo) or network (remote sample photos time out here). Demo off build checked on :3100: samples 404, only the own bags, robots allows, no notice, pages complete. README written with the checklist. Visual check done.

## Follow-up (after Phase 9)
- Elegance pass: lighter Cormorant (400), finer tracking, small-caps boutique buttons and nav, more section space, gilt inner frames on hero/occasion/editorial images, calmer occasion tiles.
- Loading: branded loader (handle draws itself, gold line sweeps) for loading.tsx and Suspense fallbacks; gold progress thread on page changes; shimmer + fade-in on every photo.
- Images: Next 16.4 aborts remote image fetches after a fixed 7s; the sample host often takes longer here, so remote samples now load unoptimised (browser has no cut-off), with one retry before the designed fallback. Own photos in /public stay optimised. No Pexels replacement needed.
- Jest worker error: a dev-server race on first compile of dynamic routes, made likely by verification builds writing .next while dev ran. Builds can now use NEXT_DIST_DIR=.next-check.
- Basket: fixed 18px horizontal overflow at 375px.

## Rebrand to Heiz Bags (2026-11-20)
- [x] Rebranded from the previous client's build following `rebrand/INSTRUCTIONS.md` (depth: skin). Branch `rebrand/heiz-bags`. Details in `rebrand/REPORT.md`.
- Logo: HB monogram traced to SVG from the 240px JPG (interim), inlined in `Logo.tsx` with a gold gradient and a "HEIZ BAGS" wordmark; new favicon, Apple icon, 512 icon and share image from `scripts/prepare-assets.mjs`.
- Colours: black `#181818` + logo gold `#CBAC43` on ivory; tokens renamed to semantic names (`primary`, `accent`, `surface`, …; CSS prefix `--hz-`). All text pairs AA.
- Content: their bio, delivery line and two products (HZ-001 HW Mini-Handbag KES 2,200, HZ-002 Heiz Laptop Handbag KES 2,800). One pick-up point replaces the three shops; map redrawn. No Till or policy given → hidden via `hasTill` / `hasPolicy`. Old own products removed; samples renumbered HZ-003–029.
- Visual check: see the report.
- Hero on mobile: text first, featured image below (desktop unchanged: text left, image right). Visual check done at 375×812.

## Open questions (for Heiz Bags — copy into the README checklist)
- Photos of their bags (HZ-001 and HZ-002 have none yet), and any other bags with names and prices.
- How customers pay (M-Pesa Till/Paybill or other). The Till card is hidden until given.
- Returns/exchange policy in their words, if any. Nothing is shown until given.
- Their logo as a vector or large PNG (current monogram is traced from a 240px JPG).
- Instagram/TikTok/Facebook handles (the logo's "Heiz_bags" may be the handle), email, opening hours.
- Delivery fees and times, if they want them shown (only "Deliveries are done countrywide at a small fee." is used).
- Spellings: "Ambassadeur Hotel" (they wrote "ambassuduer"), "Tom Mboya Street", "Shop ML 220"; name styling "Heiz Bags".
- A short story of the shop for About.
- The sample photos' source shop also uses the initials "HB": replace samples before launch.

## Blocked
