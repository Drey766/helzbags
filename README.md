# Zuri Bags website

An online shop for **Zuri Bags**, women's handbags in Nairobi CBD (Sawa Mall, Star Mall and Sasa Mall). "Carry elegance. Carry confidence."
Orders go through **WhatsApp 0717 840 894**; payment is **M-Pesa Till 5242805** or at the shop. There is no online payment.

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

## Deploy

Any Node host that runs Next.js 16 works (for example Vercel). Set the environment variables there, and set `NEXT_PUBLIC_SITE_URL` to the real domain. If you use Resend, verify the sending domain and use it in `CONTACT_FROM_EMAIL`.

## Demo mode

27 of the 29 bags (ZB-003 to ZB-029) are **samples** from another Nairobi shop's public website. They show the design until Zuri Bags' own photos arrive. Their prices (KES 3,650 to 26,000) are not Zuri's prices.

With `NEXT_PUBLIC_DEMO_MODE=true`:
- a slim notice on every page: "Preview: most bags shown are samples while Zuri Bags' own photos are added."
- "Sample" tags and "Sample price" on samples; "Zuri Collection" on ZB-001 and ZB-002
- `noindex` on every page, `robots.txt` disallows everything, the sitemap lists no samples, and there is no Product/Offer structured data
- some sample photos may show the other shop's small logo on the leather. That is acceptable only in this preview.

With `NEXT_PUBLIC_DEMO_MODE=false`, every sample disappears (pages, shop, finder, sitemap), search engines are allowed in, and the notice and tags go. The site has been built and checked this way with only ZB-001 and ZB-002.

**Before launch:** add Zuri's own bags, then set `NEXT_PUBLIC_DEMO_MODE=false`.

## Adding Zuri's own bags and photos

1. Put photos in `public/products/<id>/`, for example `public/products/zb-001/1.jpg`, `2.jpg` (portrait 4:5 works best, at least 1200px tall).
2. In `src/data/products.json`, edit the bag: set `"images": ["/products/zb-001/1.jpg", "/products/zb-001/2.jpg"]`, and fill `carry`, `size` and `fits` (these drive the filters, Bag Finder and "What fits").
3. For a new bag, copy ZB-001's entry, give it a new `id` and `slug`, `"status": "own"`, and write `summary` and `description` from Zuri's own words.
4. Rename ZB-002 when its name is confirmed, and remove `"nameConfirmed": false`.

## Removing the samples

Either set `NEXT_PUBLIC_DEMO_MODE=false` (samples are hidden), or delete the ZB-003 to ZB-029 entries from `src/data/products.json`. When none are left, also remove `media.hbleatherke.com` from `images.remotePatterns` in `next.config.ts`.

## Where things live

- `src/config/brand.ts`: name, phone, Till, shops, their own words, policy, colours and fonts. Change contact details here only.
- `src/data/*.json`: products, Bag Finder questions, FAQs, blog, About, ordering steps. Everything written for review has `"status": "draft"`.
- `src/lib/whatsapp.ts`: every WhatsApp message (product, basket, wishlist, contact fallback).
- `scripts/check-finder.ts`, `scripts/check-basket.ts`: quick checks, run with
  `node --experimental-strip-types --import ./scripts/register-alias.mjs scripts/check-basket.ts`.
- `docs/`: the brief, build phases and the progress log.

## Privacy

Basket, wishlist and recently viewed bags are kept in the visitor's browser (`localStorage`). The contact form sends one email and stores nothing; the API logs nothing. No analytics or third-party scripts. The privacy page cites the Data Protection Act, 2019 and the ODPC.

## For Zuri Bags to provide

Nothing below is shown on the site until it is provided.

- [ ] **Photos, names and prices of their bags** (ZB-001 Chrisbella Handbag KES 5,300 and ZB-002 KES 4,500 have no photos yet), plus what each carries, its size and how it is worn.
- [ ] **The name of the KES 4,500 bag** (ZB-002 is shown as "Classic Everyday Handbag", a placeholder).
- [ ] **Is Sasa Mall, G16, Moi Avenue still open?** It is in the bio but not in recent posts. It is shown with a "Confirm" flag in draft view.
- [ ] **Instagram handle** (hidden until given).
- [ ] **Email** for the contact form (and a Resend account), or confirm WhatsApp-only.
- [ ] **Opening hours** (hidden until given).
- [ ] **Delivery:** do they deliver? Areas, fees and times. The site currently says only "Ask us on WhatsApp" and "Zuri Bags will advise on delivery".
- [ ] **Exchange conditions:** what qualifies for "Exchange within 48 hours". Only their words are shown.
- [ ] **Brands stocked** besides Chrisbella.
- [ ] **A short story of the shop** for the About page (the "Our story" section is hidden until then).
- [ ] **Their original logo file** (vector or a large PNG); the current logo is rebuilt from a 150px image.
- [ ] Approve the drafted copy: FAQs, blog posts, About, How to order, Bag Finder wording (view with `NEXT_PUBLIC_SHOW_DRAFT_FLAGS=true`).
