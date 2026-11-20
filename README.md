# Heiz Bags website

An online shop for **Heiz Bags**, women's handbags in Nairobi, with a pick-up point at **Dynamic Mall, 5th floor, Shop ML 220, Tom Mboya Street** (opposite Ambassadeur Hotel). "Elevate your style with the perfect handbag."
Orders go through **WhatsApp 0113 846 224**. "Deliveries are done countrywide at a small fee." There is no online payment.

Built with Next.js 16 (App Router, Cache Components), TypeScript, Tailwind CSS 4, zod, Resend and lucide-react. No database, accounts, analytics or payment SDK.

## Run it

```bash
npm install
cp .env.example .env.local      # then edit the values below
npm run dev                     # http://localhost:3000
npm run lint
npm run build && npm start
node scripts/prepare-assets.mjs # regenerate favicon, Apple icon and share image from assets/
```

### Environment

| Variable | What it does |
| --- | --- |
| `NEXT_PUBLIC_SITE_URL` | Full site URL, used in WhatsApp product links, the sitemap and metadata. |
| `NEXT_PUBLIC_DEMO_MODE` | `true` while sample bags are shown (see below). Set `false` for launch. |
| `NEXT_PUBLIC_SHOW_DRAFT_FLAGS` | `true` shows red "Draft" / "Confirm" badges on everything written for review. |
| `RESEND_API_KEY`, `CONTACT_TO_EMAIL`, `CONTACT_FROM_EMAIL` | Contact form email. Without them the form never claims success: it offers WhatsApp and Call with the message pre-filled. |

## Deploy (as a new Vercel project)

This site was rebranded from another client's build. Deploy it as its **own** project:

1. Create a new, empty Git repository for Heiz Bags and push this folder's `main` branch to it (merge `rebrand/heiz-bags` first).
2. In Vercel, **Add New → Project**, import that repository (framework: Next.js, defaults are fine). Do not reuse the old client's Vercel project or domain.
3. Set the environment variables above. Keep `NEXT_PUBLIC_DEMO_MODE=true` until Heiz Bags' own photos are in.
4. Add the Heiz Bags domain when they have one and set `NEXT_PUBLIC_SITE_URL` to it. If you use Resend, verify that domain and use it in `CONTACT_FROM_EMAIL`.

## Demo mode

27 of the 29 bags (HZ-003 to HZ-029) are **samples** from another Nairobi shop's public website. They show the design until Heiz Bags' own photos arrive. Their prices (KES 3,650 to 26,000) are not Heiz Bags' prices.

With `NEXT_PUBLIC_DEMO_MODE=true`:
- a slim notice on every page: "Preview: most bags shown are samples while Heiz Bags' own photos are added."
- "Sample" tags and "Sample price" on samples; "Heiz Collection" on HZ-001 and HZ-002
- `noindex` on every page, `robots.txt` disallows everything, the sitemap lists no samples, and there is no Product/Offer structured data
- some sample photos may show the other shop's small logo. **That shop's initials are also "HB"**, the same letters as the Heiz Bags monogram, so visitors could mistake them for Heiz Bags' own bags. Acceptable only in this preview; replace the samples as soon as possible.

With `NEXT_PUBLIC_DEMO_MODE=false`, every sample disappears (pages, shop, finder, sitemap), search engines are allowed in, and the notice and tags go.

**Before launch:** add Heiz Bags' own bags, then set `NEXT_PUBLIC_DEMO_MODE=false`.

## Adding Heiz Bags' own bags and photos

1. Put photos in `public/products/<id>/`, for example `public/products/hz-001/1.jpg`, `2.jpg` (portrait 4:5 works best, at least 1200px tall).
2. In `src/data/products.json`, edit the bag: set `"images": ["/products/hz-001/1.jpg", "/products/hz-001/2.jpg"]`, and check `carry`, `size` and `fits` (these drive the filters, Bag Finder and "What fits").
3. For a new bag, copy HZ-001's entry, give it a new `id` and `slug`, `"status": "own"`, and write `summary`, `description` and `features` from Heiz Bags' own posts.

## Turning on payment and policy lines

Both are empty because Heiz Bags has not given them. In `src/config/brand.ts`:
- set `mpesaTill` → the Till card appears on product, basket, How to order and Find us pages, and in the footer and menu;
- set `policy.refunds` / `policy.exchange` to their exact words → the policy appears on product pages, How to order, About, Terms, the footer and the home strip.

## Removing the samples

Either set `NEXT_PUBLIC_DEMO_MODE=false` (samples are hidden), or delete the HZ-003 to HZ-029 entries from `src/data/products.json`. When none are left, also remove `media.hbleatherke.com` from `images.remotePatterns` in `next.config.ts`.

## Where things live

- `src/config/brand.ts`: name, phone, pick-up point, their own words, policy, Till, colours and fonts. Change contact details here only.
- `src/components/brand/Logo.tsx` + `monogram.ts`: the HB monogram (traced from their logo) and wordmark.
- `src/data/*.json`: products, Bag Finder questions, FAQs, blog, About, ordering steps. Everything written for review has `"status": "draft"`.
- `src/lib/whatsapp.ts`: every WhatsApp message (product, basket, wishlist, contact fallback).
- `scripts/check-finder.ts`, `scripts/check-basket.ts`: quick checks, run with
  `node --experimental-strip-types --import ./scripts/register-alias.mjs scripts/check-basket.ts`.
- `docs/`: the brief, build phases and the progress log. `rebrand/REPORT.md`: what the rebrand changed.

## Privacy

Basket, wishlist and recently viewed bags are kept in the visitor's browser (`localStorage`). The contact form sends one email and stores nothing; the API logs nothing. No analytics or third-party scripts. The privacy page cites the Data Protection Act, 2019 and the ODPC.

## For Heiz Bags to provide

Nothing below is shown on the site until it is provided.

- [ ] **Photos of their bags**: HZ-001 HW Mini-Handbag (KES 2,200, tan and black) and HZ-002 Heiz Laptop Handbag (KES 2,800) have none yet, plus any other bags with names and prices.
- [ ] **How customers pay**: M-Pesa Till (or Paybill) number, or other method.
- [ ] **Returns and exchanges**: their policy in their own words, if any.
- [ ] **Their logo as a vector file** (SVG, AI or PDF) or a large PNG. The site uses an interim vector traced from a 240px JPG.
- [ ] **Instagram / TikTok / Facebook handles** (the logo reads "Heiz_bags", which may be the handle: confirm).
- [ ] **Opening hours** at the pick-up point.
- [ ] **Email** for the contact form (and a Resend account), or confirm WhatsApp-only.
- [ ] **Delivery details** they want shown (fees, times); the site shows only "Deliveries are done countrywide at a small fee."
- [ ] **Spelling check**: the site writes "Ambassadeur Hotel", "Tom Mboya Street" and "Shop ML 220"; confirm.
- [ ] **Name styling**: the site uses "Heiz Bags"; confirm against "heiz bags" / "Heiz_bags".
- [ ] **A short story of the shop** for the About page (the "Our story" section is hidden until then).
- [ ] Approve the drafted copy: FAQs, blog posts, About, How to order, Bag Finder wording, occasion and editorial headings (view with `NEXT_PUBLIC_SHOW_DRAFT_FLAGS=true`).
