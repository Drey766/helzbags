---
name: audit-content
description: Audit the Heiz Bags site for invented facts, sample-data leaks, policy wording, privacy and design rules. Use in Phase 8 or whenever asked to "audit".
---

# Audit the Heiz Bags site

Run each check, report PASS or FAIL with file and line, then fix every FAIL (unless told to report only).

1. **Source leaks.** Search `src/` and `public/` (not `node_modules`) for `HB-`, `HB Leather`, `hbleather` (allowed only in `next.config` remotePatterns and sample image URLs; "HB" alone is Heiz Bags' own monogram), `Lipa Pole Pole`, `handmade`, `hand-made`, `made in`, `designed in`, `Italy`, `Kenya tag`, `since day one`, `sq. ft`, `square feet`. Expect none in copy.
2. **Invented facts.** Search copy for years ("since 20", "established"), "customers", "trusted", "years of", "team", "free delivery", "same-day", "delivery in", "delivery fee" amounts, "hours", "open daily", "discount", "% off", "instalment", "warranty". Expect none (except inside clearly hidden draft sections).
3. **Social proof and superlatives.** "testimonial", "review", "rating", "stars", "best", "#1", "cheapest", "leading", "original", "authentic", "genuine", "guarantee". Expect none.
4. **Policy and delivery wording.** No policy has been given: `brand.policy` is empty and no refund/exchange rule appears anywhere (only "Ask us on WhatsApp about exchanges."). Delivery is only their sentence "Deliveries are done countrywide at a small fee." from `brand.ownWords.delivery`. No Till appears while `brand.mpesaTill` is empty.
5. **Contacts from config.** Search for `0113`, `254113846224`, `113846224` outside `src/config/brand.ts`: expect none. WhatsApp links are built by `src/lib/whatsapp.ts`.
6. **Honest ordering.** Search for "order placed", "order confirmed", "payment received", "paid", "success". The only success message allowed is the contact form after a real 200 from Resend.
7. **Demo mode.** With `NEXT_PUBLIC_DEMO_MODE=true`: DemoNotice in the root layout, `noindex` metadata, `robots.ts` disallows, sitemap excludes samples, every sample card/page shows "Sample" and "Sample price". No `Product` or `Offer` JSON-LD anywhere. With demo mode false, `getProducts()` returns only `status: "own"`.
8. **Empty things hidden.** `instagram`, `email`, `hours` are empty: no icons, labels or "Coming soon" render for them.
9. **Drafts.** Every Claude-written data item has `status: "draft"`; DraftBadge renders when `NEXT_PUBLIC_SHOW_DRAFT_FLAGS === "true"`; blog posts end with `articleNotice`.
10. **Colours.** Search `src/` (excluding `config/brand.ts`) for `#[0-9a-fA-F]{3,8}\b` (the inlined logo/wave SVG fallbacks inside `var(--x, #hex)` are allowed): expect none. No `text-accent`, `text-accent-light` or `text-accent-deep` on surface/surface-alt/surface-soft backgrounds (use `text-accent-text`); gold text only on black.
11. **Privacy.** `/api/contact` has no `console.log` of bodies, no file or database writes; `localStorage` access is in effects/handlers with try/catch; no analytics or third-party scripts; `/privacy` cites the Data Protection Act, 2019 and the ODPC.
12. **Next.js.** `useSearchParams` users are inside `<Suspense>`; `params` awaited; `generateStaticParams` + `notFound()` on dynamic routes; images have `sizes` and alt text.
13. **Accessibility basics.** Icon buttons have names; sheets trap and restore focus; basket updates announce via `aria-live`; reduced motion handled (waves, reveals, handle lift).
14. **No emoji, no exclamation marks** in UI strings.
15. `npm run lint` and `npm run build` pass.
