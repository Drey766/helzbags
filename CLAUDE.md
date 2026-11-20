# Zuri Bags — website

An online shop for **Zuri Bags**, a women's handbag shop in Nairobi's CBD with shops in Sasa Mall, Sawa Mall (Moi Avenue) and Star Mall (Tom Mboya Street). Their voice: "Carry elegance. Carry confidence." It must feel **clean, premium and feminine**, in the logo's **plum and gold**. Orders go through **WhatsApp** (0717 840 894); payment is **M-Pesa Till 5242805**. There is no online payment.

Full spec: `docs/BRIEF.md`. Build order: `docs/PHASES.md`. **Progress log: `docs/PROGRESS.md`** (read it first, update it after every phase).

## Working mode: run unattended
- Run **all phases in `docs/PHASES.md` in order without waiting for me**. Don't ask questions the brief answers.
- Anything unanswered: the **conservative option** (empty and hidden, or draft), logged under "Open questions" in `docs/PROGRESS.md`; keep going.
- After each phase: `npm run lint` and `npm run build` pass → **one git commit** → tick it in `docs/PROGRESS.md` (2–3 lines) → next phase.
- **If compacted or lost**, re-read this file, `docs/PROGRESS.md` and the current phase first.
- An error that survives 3 honest attempts: log it under "Blocked", skip that item, continue.
- **Never** `git push`, deploy, delete `.git`, or install global packages. Stay inside this folder.
- **Visual checks:** if Playwright or Chrome DevTools MCP tools are available, use them as PHASES describes. If not, don't install them; review the markup and note "visual check skipped". If a frontend-design skill is available, follow it.

## Stack and commands
- Next.js App Router (latest stable), TypeScript, Tailwind, `zod`, `resend`, `lucide-react`. No database, auth, payment SDK, analytics, or carousel/animation libraries.
- After scaffolding, follow `AGENTS.md` (check `node_modules/next/dist/docs/` when unsure about a Next.js API).
- `npm run dev` · `npm run lint` · `npm run build` · `node scripts/prepare-assets.mjs`.

## Single source of truth
- `src/config/brand.ts` holds name, contacts, shops, the client's own words, policy wording, **colours** and fonts. **No hex codes outside `brand.ts`** (CSS variables → Tailwind theme; the logo SVGs use `--logo-purple`, `--logo-gold`, `--logo-gold-light`, `--logo-gold-deep`; the wave uses `--wave-*`).
- `src/data/products.json` is provided (29 products). **ZB-001 (Chrisbella Handbag, KES 5,300) and ZB-002 (KES 4,500, name to confirm) are Zuri's own, from their posts, with no photos yet.** ZB-003 to ZB-029 are **samples**.
- `data-raw/bag-notes.json` is only for paraphrasing in Phase 2. Never import it; keep it git-ignored.

## Guardrails (non-negotiable — full text in BRIEF §2)
1. **Never invent facts about Zuri Bags**: no founding year, customer counts, ratings, team, brands stocked (beyond Chrisbella, which they name), opening hours, delivery areas, fees or times. Unknown = empty, and **the UI hides empty things**.
2. **No testimonials, reviews or star ratings.**
3. **No "best", "#1", "cheapest", "genuine leather guaranteed", "original", "authentic" claims** about Zuri's stock. Their own phrases are fine.
4. **Policy is their words only**: "No refund. Exchange within 48 hours." Nothing added (no conditions, no "free delivery", no discounts, no Lipa-later).
5. **Their own products' copy stays within their posts.**
6. **Sample products** come from another shop's public site. With `NEXT_PUBLIC_DEMO_MODE=true`: site-wide notice, "Sample" tags (ZB-001/002 get "Zuri Collection"), **noindex everywhere**, robots disallow, no Product/Offer JSON-LD, no samples in the sitemap. **Never show the source shop's name, logo text, links or maker claims** (no "handmade", "made in Kenya", "since day one"). Rewrite descriptions. Sample prices are labelled "Sample price".
7. **Ordering is honest**: "Order on WhatsApp" opens a pre-filled message; nothing claims an order was placed or paid. M-Pesa Till is shown as an instruction, never as an integration.
8. **Privacy**: the contact form emails or hands off to WhatsApp and stores nothing; basket, wishlist and recently viewed live in `localStorage`; no analytics. Cite the Data Protection Act, 2019 and the ODPC.
9. **Drafts flagged** (`status: "draft"` + `<DraftBadge />` when `NEXT_PUBLIC_SHOW_DRAFT_FLAGS === "true"`). Emoji only where Zuri uses them in quoted posts; none in UI. No exclamation marks.

## Design essentials — "Gilded Plum" (BRIEF §4–5)
- Ivory `#FBF8F2` and champagne `#F4EDE0` surfaces, ink `#1E1529`, **plum `#2E0A5C`** (logo purple) for dark sections and primary buttons, **gold `#D4A84A`** for accents.
- **Gold is never text on ivory or champagne** (use `goldText #7A5A1E`); gold text, lines and the gold gradient are for plum sections. Plum buttons carry ivory text; gold buttons carry plum text.
- **Cormorant Garamond** (display, italic for key words) + **Jost** (body; geometric like the "ZURI" letters; tabular numerals on prices).
- Motifs from the logo: the **gold wave** ribbon (`assets/gold-wave.svg`) as section dividers that draw in; the **handle arch**: images framed by an arched top with a thin gold handle line above them; slim plum/gold colour-block edges like the bag's side panels.
- Signatures: **Shop by occasion** (Work · Outings · Evening · Everyday, from their own post), the **Bag Finder**, **What fits** icons, **Visit our shops** with a schematic CBD map, and **Order on WhatsApp** pre-filled with the exact bag.
- **The personality mandate (BRIEF §5) is required**: premium and calm, never plain. Everything respects `prefers-reduced-motion`.
- Mobile-first: sticky bar (WhatsApp · Call · Shop/Order this bag · Basket), tap targets ≥ 44px, check at 375px; filters in a bottom sheet.

## Next.js gotchas that have bitten before
- `"use client"` for hooks and handlers; keep pages server-side.
- `useSearchParams()` inside `<Suspense>` (shop filters, Bag Finder, contact pre-fill).
- `localStorage` only in effects, wrapped in try/catch, no hydration mismatch (render counts after mount).
- Unique, stable keys. `generateStaticParams` + `notFound()`. `params` is async.
- `create-next-app` refuses non-empty folders: scaffold into `zuribags-scaffold/` and **merge** into the existing `src/` (Phase 1).
- Only `media.hbleatherke.com` in `images.remotePatterns` (sample photos; the name never appears in the UI).
- Inline SVG gradient ids must be unique if a logo appears twice on a page (prefix with `useId()`).
- `.npmrc` with `legacy-peer-deps=true` only if install fails with `ERESOLVE`.
