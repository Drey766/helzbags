# Build phases (unattended run)

Run every phase in order, back to back. End of each phase: `npm run lint` and `npm run build` pass → one commit (`Phase N: <name>`) → tick it in `docs/PROGRESS.md` with a short note → continue. Read the BRIEF sections listed before each phase. If compacted, re-read `CLAUDE.md` and `docs/PROGRESS.md` first.

**Visual check (Phases 4–7 and 9):** if Playwright or Chrome DevTools MCP tools are available, start `npm run dev`, open each page built in the phase, take **viewport** screenshots (not full-page) at 375×812 and 1280×800, look at them critically, and fix layout, spacing, contrast and overflow before committing. Stop the dev server afterwards. Otherwise review the markup and note "visual check skipped" in PROGRESS.md.

---

## Phase 1 — Foundation
**Read:** BRIEF §2, §3, §4, §7, §8, §9, §10.
1. `git init` if there's no `.git` folder.
2. `npx create-next-app@latest zuribags-scaffold --ts --tailwind --eslint --app --src-dir --import-alias "@/*" --use-npm --disable-git --yes`. Move everything (including `.gitignore`) up; **merge** the scaffold's `src/app/` into the existing `src/` (which already has `src/data/products.json`); delete `zuribags-scaffold/`. Never overwrite `CLAUDE.md`, `START-HERE.md`, `docs/`, `assets/`, `scripts/`, `src/data/`, `data-raw/` or `.claude/`. Read `AGENTS.md`.
3. Make sure `.gitignore` contains `data-raw/`.
4. `npm install zod resend lucide-react`; `npm install --save-dev sharp`.
5. `src/config/brand.ts` (BRIEF §3), then `node scripts/prepare-assets.mjs`. Copy `public/brand/favicon-256.png` → `src/app/icon.png`, `apple-touch-icon.png` → `src/app/apple-icon.png`, `og-image.jpg` → `src/app/opengraph-image.jpg`; remove the scaffold `favicon.ico` if it conflicts. Create `public/products/zb-001/` and `public/products/zb-002/` with `.gitkeep`.
6. Types (§7), `src/lib/products.ts`, `format.ts`, `whatsapp.ts`, the store (basket, wishlist, recently viewed).
7. Fonts: Cormorant Garamond (400–700 + italic) and Jost via `next/font/google`. CSS variables from `brand.colors` → Tailwind theme. `globals.css` components (§4).
8. Brand components: Logo (inline `assets/zuri-logo.svg` and `zuri-mark.svg`, unique gradient ids per instance; tones light and dark — on plum, set `--logo-purple` to ivory), GoldWave (draw-in), HandleArch frame, SidePanelBlock, TillCard, WhatsAppButton. UI: SmartImage (remote → designed plum fallback), DraftBadge, SampleTag, Price, Sheet, Reveal plus `useReveal`.
9. Layout: skip link, DemoNotice, Navbar (with mega menu), MobileMenu, Footer, MobileActionBar, BasketDrawer, `ClothingStore` JSON-LD, metadata (noindex in demo mode). A placeholder home page.
10. `next.config`: `images.remotePatterns` for `media.hbleatherke.com` only. `.env.example`.

## Phase 2 — Product content (ZB-001, ZB-002 + 27 samples)
**Read:** BRIEF §2 (guardrails 3, 5, 6), §7 (Phase 2 rules).
ZB-001 and ZB-002: `summary` and `description` from their own words only; `features` stay empty. ZB-003 to ZB-029: write `summary`, `description` and `features` from `data-raw/bag-notes.json`, in batches of 9, saving after each batch and ticking the tracker. Don't change other fields.
**Check:** search `products.json` for "HB", "hbleather", "handmade", "hand-made", "made in", "designed in", "Italy", "Kenya tag", "sq", "metre", "meter", "since day one", "best", "genuine", "authentic", "original", "review", and fix every hit.

## Phase 3 — Supporting content
**Read:** BRIEF §2, §5, §6 (Bag Finder, About, FAQs, Blog, How to order), §7.
Write `finder.json`, `steps.json`, `faqs.json` (8), `about.json`, then `blog.json` (6 posts: choosing a work bag that fits your day; sling, crossbody or shoulder; caring for your handbag (general, no product claims); one bag three ways (work, outings, evening); choosing a clutch for weddings and evenings; how to order from Zuri Bags). Build `src/lib/finder.ts` and check it with a small script (for example: "Work + laptop" returns only bags whose `fits` includes a laptop; "Evening + just essentials" returns clutches and small bags first).
**Check:** no hours, fees, delivery promises, discounts, superlatives or invented facts; all draft; posts end with `articleNotice`.

## Phase 4 — Home
**Read:** BRIEF §4, §5, §6 (Home).
All Home sections, meeting the personality mandate (hero with handle arch and wave, occasions, category row, New in, Bag Finder band, Zuri Collection with designed placeholders, editorial split, ordering steps, shops band with schematic map, policy strip, blog preview, final CTA). Visual check.

## Phase 5 — Shop, product pages, quick view, wishlist, Bag Finder
**Read:** BRIEF §6 (Shop, product, Bag Finder, Wishlist), §8.
`/shop` (URL-synced filters inside `<Suspense>`, bottom sheet on mobile, chips, sort, search, category headings, empty state, quick view), `/shop/[slug]` (gallery and lightbox, or the designed placeholder for ZB-001/002; price; Order on WhatsApp with the exact bag; basket; wishlist; share; What fits; carry chips; Till card; related; recently viewed), `/wishlist`, `/bag-finder`. Visual check, including ZB-001 with the placeholder and a sample with several photos.
**Check:** filters survive reload and Back; the WhatsApp link for a product contains its name, price and URL.

## Phase 6 — Basket, How to order, Visit, About, FAQs
**Read:** BRIEF §2 (7), §5 (6–8), §6.
`/basket` and the drawer (stepper, Undo, pickup/delivery choice, WhatsApp order message, Till card), `/how-to-order`, `/visit` (shop cards, directions, schematic map), `/about`, `/faqs`. Visual check.
**Check:** the basket WhatsApp message lists every line, quantity, line total and subtotal correctly; empty basket shows the designed state; counts don't flash wrong values on load.

## Phase 7 — Blog, Contact, API, legal, SEO
**Read:** BRIEF §6, §8, §9.
`/blog` and posts, `/contact` (pre-fill from `?bag=`), `/api/contact` (zod, honeypot, timing, rate limit, Resend, 503 fallback, no storing or logging), `/privacy`, `/terms`, the 404 ("This bag has wandered off."), `sitemap.ts` (no samples in demo mode), `robots.ts` (disallow in demo mode), `manifest.ts`.
**Check:** with no email keys, the form shows the WhatsApp and Call fallback with the message and never a false success. Test by calling the API on the dev server. Visual check.

## Phase 8 — Audit
Run every check in `.claude/skills/audit-content/SKILL.md` and **fix every failure** (in this unattended run you may edit to fix). Commit.

## Phase 9 — Polish, QA, README
1. **Personality review**: go through BRIEF §5 point by point, name the component that delivers each, and improve anything plain, crowded or template-like (the goal is calm, premium and clearly Zuri's plum and gold). With browser tools, screenshot Home (hero, occasions, shops band), Shop (filters open on mobile), a sample product, ZB-001, Bag Finder results, Basket and Visit at both sizes, and refine.
2. Accessibility: keyboard (menus, sheets, gallery, filters, stepper), focus, labels, contrast (no gold text on light, gold gradient only on plum), headings, reduced motion. Run a Lighthouse accessibility pass with Chrome DevTools MCP if available.
3. Demo mode off: build once with `NEXT_PUBLIC_DEMO_MODE=false` and confirm samples disappear and pages still look complete with only ZB-001/002 (empty-state copy where needed). Restore `true`.
4. Write `README.md` (BRIEF §11), including everything under "Open questions".
5. Final `npm run lint` and `npm run build`, then commit.
6. Short report: built, sample or draft, blocked, and what Zuri Bags needs to provide.
