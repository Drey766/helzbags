# Heiz Bags — website

An online shop for **Heiz Bags**, a women's handbag seller in Nairobi with a **pick-up point at Dynamic Mall, 5th floor, Shop ML 220, Tom Mboya Street (opposite Ambassadeur Hotel)**. Their voice (bio): "Elevate your style with the perfect handbag." It must feel **elegant, bold and premium**, in the logo's **black and gold** (a gold "HB" script monogram on black). Orders go through **WhatsApp** (0113 846 224). "Deliveries are done countrywide at a small fee" (their words). There is no online payment, and **no M-Pesa Till or policy has been given**: those stay empty and hidden.

Full spec: `docs/BRIEF.md`. Build order: `docs/PHASES.md`. **Progress log: `docs/PROGRESS.md`** (read it first, update it after every change set). Rebrand record: `rebrand/REPORT.md`.

## Working mode: run unattended
- Run tasks without waiting for me. Don't ask questions the brief answers.
- Anything unanswered: the **conservative option** (empty and hidden, or draft), logged under "Open questions" in `docs/PROGRESS.md`; keep going.
- After each change set: `npm run lint` and `npm run build` pass → **one git commit** → note it in `docs/PROGRESS.md` (2–3 lines).
- **If compacted or lost**, re-read this file and `docs/PROGRESS.md` first.
- An error that survives 3 honest attempts: log it under "Blocked", skip that item, continue.
- **Never** `git push`, deploy, delete `.git`, or install global packages. Stay inside this folder.
- **Visual checks:** if Playwright or Chrome DevTools MCP tools are available, use them. If not, don't install them; review the markup and note "visual check skipped". If a frontend-design skill is available, follow it.

## Stack and commands
- Next.js App Router (16.x), TypeScript, Tailwind 4, `zod`, `resend`, `lucide-react`. No database, auth, payment SDK, analytics, or carousel/animation libraries.
- Follow `AGENTS.md` (check `node_modules/next/dist/docs/` when unsure about a Next.js API).
- `npm run dev` · `npm run lint` · `npm run build` (use `NEXT_DIST_DIR=.next-check` while dev runs) · `node scripts/prepare-assets.mjs`.

## Single source of truth
- `src/config/brand.ts` holds name, contacts, the pick-up point, the client's own words, policy wording, **colours** and fonts. **No hex codes outside `brand.ts`** (CSS variables `--hz-*` → Tailwind theme; the logo uses `--logo-ink`, `--logo-gold`, `--logo-gold-light`, `--logo-gold-deep`; the wave uses `--wave-*`). `hasTill` and `hasPolicy` switch the Till card and every policy line on once the client gives them.
- `src/data/products.json`: **HZ-001 (HW Mini-Handbag, KES 2,200) and HZ-002 (Heiz Laptop Handbag, KES 2,800) are Heiz Bags' own, from their posts, with no photos yet.** HZ-003 to HZ-029 are **samples**.
- The logo: `src/components/brand/Logo.tsx` inlines the HB monogram traced from the client's 240px JPG (`src/components/brand/monogram.ts`, `assets/heiz-mark.svg`). Interim: replace with their vector file when it arrives.
- `data-raw/bag-notes.json` is only for paraphrasing samples. Never import it; keep it git-ignored.

## Guardrails (non-negotiable — full text in BRIEF §2)
1. **Never invent facts about Heiz Bags**: no founding year, customer counts, ratings, team, brands stocked, opening hours, delivery fees or times, payment methods. Unknown = empty, and **the UI hides empty things**.
2. **No testimonials, reviews or star ratings.**
3. **No "best", "#1", "cheapest", "genuine leather guaranteed", "original", "authentic" claims** about their stock. Their own phrases ("Good quality", "perfect handbag", "Spacious enough") are fine.
4. **Policy: none given.** Don't write one. Say "Ask us on WhatsApp about exchanges." Delivery is only their sentence "Deliveries are done countrywide at a small fee." (no amounts, areas or times).
5. **Their own products' copy stays within their posts.**
6. **Sample products** come from another shop's public site. With `NEXT_PUBLIC_DEMO_MODE=true`: site-wide notice, "Sample" tags (HZ-001/002 get "Heiz Collection"), **noindex everywhere**, robots disallow, no Product/Offer JSON-LD, no samples in the sitemap. **Never show the source shop's name, logo text, links or maker claims** (no "handmade", "made in Kenya", "since day one"). Sample prices are labelled "Sample price". Note: the source shop's initials are also "HB", so its marks on sample photos could be mistaken for Heiz Bags' monogram; replace samples before launch.
7. **Ordering is honest**: "Order on WhatsApp" opens a pre-filled message; nothing claims an order was placed or paid. A Till, if given later, is shown as an instruction, never an integration.
8. **Privacy**: the contact form emails or hands off to WhatsApp and stores nothing; basket, wishlist and recently viewed live in `localStorage`; no analytics. Cite the Data Protection Act, 2019 and the ODPC.
9. **Drafts flagged** (`status: "draft"` + `<DraftBadge />` when `NEXT_PUBLIC_SHOW_DRAFT_FLAGS === "true"`). Emoji only where Heiz Bags uses them in quoted posts; none in UI. No exclamation marks (their posts use them; drop them when quoting prices).

## Design essentials — "Gilded Noir" (BRIEF §4–5)
- Ivory `surface #FAF8F3` and `surfaceAlt #F2EDE3` surfaces, `ink #171512`, **`primary #181818`** (logo black) for dark sections and primary buttons, **`accent #CBAC43`** (logo gold) for accents, `accentLight #ECCB5B` highlights on black.
- **Colour rules (AA):** gold `accent` is text **only on black** (8.05:1; `accentLight` 11.2:1). On ivory and `surfaceAlt` use `accentText #7A6320` (5.45 / 4.95). `muted #665F55` on light surfaces (≥ 5.07). `mutedOnDark #BEB6A8` on black (8.83). Ivory on black 16.7. `accentDeep` is decorative only. Black buttons carry ivory text; gold buttons carry black text.
- **Cormorant Garamond** (display, italic for key words) + **Jost** (body; tabular numerals on prices).
- Motifs: the **gold wave** ribbon as section dividers that draw in; the **handle arch** image frame with a thin gold handle line; slim black/gold edges on quotes and callouts.
- Signatures: **Shop by occasion**, the **Bag Finder**, **What fits** icons, **Find us** with a schematic map of the pick-up point on Tom Mboya Street, and **Order on WhatsApp** pre-filled with the exact bag.
- **The personality mandate (BRIEF §5) is required**: elegant, bold and premium, never plain. Everything respects `prefers-reduced-motion`.
- Mobile-first: sticky bar (WhatsApp · Call · Shop/Order this bag · Basket), tap targets ≥ 44px, check at 375px; filters in a bottom sheet.

## Next.js gotchas that have bitten before
- `"use client"` for hooks and handlers; keep pages server-side.
- `useSearchParams()` inside `<Suspense>` (shop filters, Bag Finder, contact pre-fill).
- `localStorage` only in effects, wrapped in try/catch, no hydration mismatch (render counts after mount).
- Unique, stable keys. `generateStaticParams` + `notFound()`. `params` is async.
- Only `media.hbleatherke.com` in `images.remotePatterns` (sample photos; the name never appears in the UI).
- Inline SVG gradient ids must be unique if a logo appears twice on a page (prefix with `useId()`).
- `.npmrc` with `legacy-peer-deps=true` only if install fails with `ERESOLVE`.
