# Rebrand report: Zuri Bags → Heiz Bags

Date: 2026-11-20 · Depth: **skin** · Branch: `rebrand/heiz-bags` (on top of a `chore: pre-rebrand snapshot` commit; the folder was not a git repo, so `git init` was run first).

## What changed

### Logo
- Source: `rebrand/logo.jpg`, copied from your Downloads (the `logo.lnk` shortcut pointed to it): **240×240 JPG**, a gold "HB" script monogram and "Heiz_bags" on black.
- **Interim rebuilt logo:** the HB monogram was traced to a vector with potrace (10× upscale, smoothed) and checked side by side with the original. It lives in `src/components/brand/monogram.ts` and `assets/heiz-mark.svg`. `Logo.tsx` fills it with a gold gradient from CSS variables. The "HEIZ BAGS" wordmark is live, letter-spaced text (the original's tiny brush lettering couldn't be traced cleanly at this size).
- Favicon, Apple icon, 512 icon and share image are rendered from the vector (`scripts/prepare-assets.mjs`, rewritten): gold monogram on black. The share image adds "HEIZ BAGS" and their bio line.
- Removed: `zuri-logo.svg`, `zuri-mark.svg` and the old original JPG (from `assets/` and `public/brand/`).

### Colours (from the logo)

| Role | Before (Zuri) | After (Heiz) |
| --- | --- | --- |
| Dark sections / primary buttons | plum `#2E0A5C` | `primary` black `#181818` |
| Footer | plumDeep `#1C0638` | `primaryDeep` `#0D0D0C` |
| Links / sheen | plumSoft `#5B3A8C` | `primaryRaised` `#4A4237` |
| Accent | gold `#D4A84A` | `accent` logo gold `#CBAC43` |
| Highlight on dark | goldLight `#EEDC88` | `accentLight` `#ECCB5B` |
| Gradient end | goldDeep `#A87A2C` | `accentDeep` `#8F7425` |
| Gold text on light | goldText `#7A5A1E` | `accentText` `#7A6320` |
| Page / alt / soft | ivory / champagne / lilac | `surface #FAF8F3` / `surfaceAlt #F2EDE3` / `surfaceSoft #ECE6DA` |
| Ink / muted | `#1E1529` / `#6B6275` | `#171512` / `#665F55` |
| Secondary text on dark | lilacText `#C9B8DE` | `mutedOnDark #BEB6A8` |

Token names were tied to the old palette, so they were renamed to semantic names across the config, CSS variables (`--zb-*` → `--hz-*`), the Tailwind theme and every component (`bg-plum` → `bg-primary`, `text-gold-text` → `text-accent-text`, `btn-gold` → `btn-accent`, …). Other old prefixes went too: `container-zb`, `prose-zb`, `zb-*` animations → `hz-*`; `zw-*` wave classes → `wave-*`; localStorage keys → `hz:*`.

Contrast (text pairs, from `contrast.mjs`): ivory on black 16.73 · gold on black 8.05 · accentLight on black 11.21 · mutedOnDark on black 8.83 · black on gold 8.05 · accentText on surface 5.45 / surfaceAlt 4.95 / surfaceSoft 4.65 · muted on surface 5.94 / surfaceAlt 5.40 / surfaceSoft 5.07 · ink on surface 17.17. **No text pair below AA.** Gold `accent` is never text on light; `accentDeep` is decorative only. The rules are written into `CLAUDE.md` and `docs/BRIEF.md` §3.

### Fonts and motifs
Unchanged (skin mode): Cormorant Garamond + Jost; the gold wave, handle arch and side-panel edges, recoloured to black and gold. The design system is now called "Gilded Noir".

### Copy and data
- `brand.ts`: name, phone/WhatsApp 0113 846 224, their own words (bio, "Spacious enough…", "You will find the bags already available there.", "Deliveries are done countrywide at a small fee."), one pick-up point (Dynamic Mall, 5th floor, Shop ML 220, Tom Mboya Street, opposite Ambassadeur Hotel). Till, policy, email, Instagram and hours are **empty**. New `hasTill` / `hasPolicy` flags hide the Till card and every policy line, and switch them back on when filled in.
- Hero, final CTA and footer use their bio. The editorial split quotes their "Spacious enough…" line. The policy strip now shows their delivery line. "Visit our shops" became "Find us", and the schematic map shows one street, the pick-up pin and the hotel opposite.
- Products: the old client's two real bags were **removed**. New own bags come from their posts: **HZ-001 HW Mini-Handbag KES 2,200** and **HZ-002 Heiz Laptop Handbag KES 2,800** (features and colours as posted, no photos, so they show designed placeholders). The 27 samples were kept as samples and renumbered HZ-003 to HZ-029, with every demo safeguard intact.
- FAQs, About, ordering steps and the "how to order" blog post were rewritten for pick-up and delivery, with no payment claims. The Chrisbella FAQ was replaced by a laptop-bag one. All stay `status: "draft"`.
- Metadata, title template, JSON-LD (no more `paymentAccepted`), manifest, OG alt text, `package.json` name, README, START-HERE, CLAUDE.md, BRIEF, PHASES, PROGRESS and the audit skill were all updated.
- Also fixed: ESLint now ignores `rebrand/**` and the generated `.next-check/**`, and the map's SVG title caused a hydration mismatch (fixed).

## Verification
- `brand-scan.mjs` with the old terms (`rebrand/old-terms.txt`): **0 hits, 0 stray hex codes**. Not scanned: G16/G12/M12 (too generic; G12 matched inside a sample image URL). The only "ivory" hits describe the new surface colour.
- `npm run lint` and `npm run build` pass. `scripts/check-basket.ts` passes (updated to the new bags). `check-finder.ts` passes in demo mode.
- Audit-content greps (source leaks, invented facts, superlatives, contacts outside config, false order claims): clean.
- Visual check with Playwright: Home at 375×812 and 1280×800, Find us band and map at 375, product page HZ-002 at 1280, Contact at 375. No horizontal overflow, and the new favicon and OG image are served. Fixed during the check: logo sizes (wider lock-up), a clipped map street label, and leftover "Visit our shops" labels.

## Warnings
- **Small raster logo.** The site uses a traced interim vector. Ask for the original file.
- **"HB" conflict with the sample source.** The sample photos come from a shop whose initials are also "HB", and some photos show its marks. On a site whose logo is "HB", visitors could take those bags for Heiz Bags'. Demo mode labels them "Sample", but replace them soon.
- Sample prices (KES 3,650–26,000) are far above Heiz Bags' (2,200–2,800). They are labelled "Sample price".

## Open questions for Heiz Bags
- Photos of their bags, plus any other bags with names and prices.
- How customers pay (M-Pesa Till/Paybill?). Nothing about payment is shown until then.
- Returns/exchange policy, in their words, if any.
- Their logo as SVG/AI/PDF or a large PNG.
- Social handles (is "Heiz_bags" the Instagram?), email, opening hours.
- Delivery fees/times, if they want them shown.
- Spellings: "Ambassadeur Hotel" (they wrote "ambassuduer"), "Tom Mboya Street", "Shop ML 220". Name styling: "Heiz Bags" vs "heiz bags" / "Heiz_bags".
- A short story for the About page. Approval of all draft copy (view with `NEXT_PUBLIC_SHOW_DRAFT_FLAGS=true`).

## Deploy as a new Vercel project
1. Merge `rebrand/heiz-bags` into `main`, create a **new** Git repository for Heiz Bags and push to it (this folder has no remote; nothing was pushed).
2. Vercel → Add New → Project → import that repository (Next.js defaults). Don't reuse the old client's project or domain.
3. Environment variables: `NEXT_PUBLIC_SITE_URL`, `NEXT_PUBLIC_DEMO_MODE=true` (until real photos are in), `NEXT_PUBLIC_SHOW_DRAFT_FLAGS=false`, plus `RESEND_API_KEY`, `CONTACT_TO_EMAIL` and `CONTACT_FROM_EMAIL` if they want the email form.
4. Add their domain when ready and update `NEXT_PUBLIC_SITE_URL`.
5. Browsers cache favicons: check the new icon with a hard refresh or in a private window.
