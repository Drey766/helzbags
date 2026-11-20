---
name: audit-content
description: Audit the Zuri Bags site for invented facts, sample-data leaks, policy wording, privacy and design rules. Use in Phase 8 or whenever asked to "audit".
---

# Audit the Zuri Bags site

Run each check, report PASS or FAIL with file and line, then fix every FAIL (unless told to report only).

1. **Source leaks.** Search `src/` and `public/` (not `node_modules`) for `HB`, `hbleather` (allowed only in `next.config` remotePatterns), `Lipa Pole Pole`, `handmade`, `hand-made`, `made in`, `designed in`, `Italy`, `Kenya tag`, `since day one`, `sq. ft`, `square feet`. Expect none in copy.
2. **Invented facts.** Search copy for years ("since 20", "established"), "customers", "trusted", "years of", "team", "free delivery", "same-day", "delivery in", "hours", "open daily", "discount", "% off", "instalment", "warranty". Expect none (except inside clearly hidden draft sections).
3. **Social proof and superlatives.** "testimonial", "review", "rating", "stars", "best", "#1", "cheapest", "leading", "original", "authentic", "genuine", "guarantee". Expect none.
4. **Policy wording.** Every place that states the policy says exactly "No refund." and "Exchange within 48 hours." from `brand.policy`, with nothing added.
5. **Contacts from config.** Search for `0717`, `254717840894`, `5242805` outside `src/config/brand.ts`: expect none. WhatsApp links are built by `src/lib/whatsapp.ts`.
6. **Honest ordering.** Search for "order placed", "order confirmed", "payment received", "paid", "success". The only success message allowed is the contact form after a real 200 from Resend.
7. **Demo mode.** With `NEXT_PUBLIC_DEMO_MODE=true`: DemoNotice in the root layout, `noindex` metadata, `robots.ts` disallows, sitemap excludes samples, every sample card/page shows "Sample" and "Sample price". No `Product` or `Offer` JSON-LD anywhere. With demo mode false, `getProducts()` returns only `status: "own"`.
8. **Empty things hidden.** `instagram`, `email`, `hours` are empty: no icons, labels or "Coming soon" render for them.
9. **Drafts.** Every Claude-written data item has `status: "draft"`; DraftBadge renders when `NEXT_PUBLIC_SHOW_DRAFT_FLAGS === "true"`; blog posts end with `articleNotice`; Sasa Mall shows a draft flag.
10. **Colours.** Search `src/` (excluding `config/brand.ts`) for `#[0-9a-fA-F]{3,8}\b` (the inlined logo/wave SVG fallbacks inside `var(--x, #hex)` are allowed): expect none. No `text-gold` (or equivalent) on ivory/champagne/lilac backgrounds; gold text only on plum.
11. **Privacy.** `/api/contact` has no `console.log` of bodies, no file or database writes; `localStorage` access is in effects/handlers with try/catch; no analytics or third-party scripts; `/privacy` cites the Data Protection Act, 2019 and the ODPC.
12. **Next.js.** `useSearchParams` users are inside `<Suspense>`; `params` awaited; `generateStaticParams` + `notFound()` on dynamic routes; images have `sizes` and alt text.
13. **Accessibility basics.** Icon buttons have names; sheets trap and restore focus; basket updates announce via `aria-live`; reduced motion handled (waves, reveals, handle lift).
14. **No emoji, no exclamation marks** in UI strings.
15. `npm run lint` and `npm run build` pass.
