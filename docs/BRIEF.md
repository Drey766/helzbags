# Heiz Bags — full brief

> Rebranded on 2026-11-20 from an earlier handbag-shop build. Only the facts below belong to Heiz Bags (source: `rebrand/REBRAND.md`).

## 1. The business (only what they have said)

- **Name:** Heiz Bags (the logo writes it "Heiz_bags" under a gold "HB" script monogram on black).
- **What:** women's handbags. Their bio: "ELEVATE YOUR STYLE WITH THE PERFECT HANDBAG". Services as they put it: "Perfect handbags".
- **Phone / WhatsApp:** 0113 846 224 (`254113846224`).
- **Pick-up point:** "Dynamic mall 5th floor shop ml 220 opposite ambassuduer hotel along tommboya street, Nairobi" → shown as Dynamic Mall, 5th floor, Shop ML 220, Tom Mboya Street, opposite Ambassadeur Hotel. "You will find the bags already available there."
- **Delivery (their words):** "Deliveries are done countrywide at a small fee." No amounts, areas or times.
- **Their posts:**
  - "HW MINI-HANDBAG AVAILABLE AT KSH 2200" · Colours: tan & black · Good quality · Spacious enough to fit a bottle, notebook, wallet, small umbrella, wipes, charger and other essentials · Has a zip to keep your essentials safe · Adjustable straps.
  - "Heiz laptop handbag available at KSH 2800" · Good quality · Fits up to 14 inches laptop · Has a padded laptop compartment · Spacious enough · Has a back sleeve for suitcase handle to slide in while traveling · Adjustable straps · Has a long shoulder strap · Available in black, tan, brown, coffee and grey.
- Unknown (hide until provided): M-Pesa Till or other payment method, exchange/refund policy, Instagram and other socials, email, opening hours, website domain, founding story, team, brands stocked, photos.

## 2. Guardrails (full text)

1. **No invented facts.** No founding year, years in business, customer numbers, "trusted by", team members, brand lists, hours, payment methods, delivery fees, areas or times. Empty fields render nothing (no "Coming soon" placeholders on public pages).
2. **No social proof**: no testimonials, ratings, review counts, "loved by", "best seller".
3. **No superlatives or authenticity claims** of our own: no "best", "#1", "cheapest", "original", "authentic", "genuine leather", "premium quality guaranteed". Their own phrases may be quoted ("Good quality", "the perfect handbag", "Spacious enough").
4. **Policy**: none given. `brand.policy` is empty, so no policy line renders (`hasPolicy`). Say only "Ask us on WhatsApp about exchanges." Delivery is only their sentence. No fees, free-delivery thresholds, discounts, gift wrapping, instalments or loyalty schemes.
5. **Own products** (HZ-001, HZ-002): copy built only from their posts (features, colours and fits as stated). No materials or dimensions beyond "fits up to a 14-inch laptop".
6. **Samples** (HZ-003–HZ-029) are from another Nairobi shop's public site, used to show the design. With `NEXT_PUBLIC_DEMO_MODE=true`:
   - a slim site-wide notice: "Preview: most bags shown are samples while Heiz Bags' own photos are added."
   - a "Sample" tag on every sample card and page, "Sample price" next to sample prices
   - `noindex` on every page, `robots.ts` disallows all, sitemap excludes samples, **no Product/Offer JSON-LD** for anything
   - never show the source shop's name, initials, URL, "handmade", "made in", "designed in", "since day one", leather area or lining lengths
   - photos may show the source's small branding. Its initials are also "HB", the same letters as Heiz Bags' monogram, so this is acceptable only in demo mode and samples must be replaced before launch (README).
   With demo mode **off**, samples are hidden entirely (filter by `status`).
7. **WhatsApp ordering**: buttons open `https://wa.me/254113846224?text=…`. Copy says "Order on WhatsApp" / "Send order on WhatsApp", never "Order placed", "Paid", "Confirmed". After opening WhatsApp, show "Finish your order in WhatsApp. Heiz Bags will reply to confirm."
8. **Privacy**: contact form → Resend email if keys exist, otherwise WhatsApp/Call fallback; never a false success; no storage, no logging of personal data. Basket, wishlist, recently viewed: `localStorage` only. `/privacy` cites the Data Protection Act, 2019 and the Office of the Data Protection Commissioner (ODPC).
9. **Drafts**: every page/section Claude writes beyond their words has `status: "draft"` in data and shows `<DraftBadge />` when `NEXT_PUBLIC_SHOW_DRAFT_FLAGS === "true"`. Blog posts end with the `articleNotice`.
10. **Tone**: elegant, bold, short sentences, Kenyan English, KES. No emoji in UI, no exclamation marks.

## 3. Brand config (`src/config/brand.ts`)

Name, contacts, `ownWords` (bio, spacious, available, delivery), the single pick-up point (`shops[0]`: mall, floor, unit, street, landmark), empty `mpesaTill`, `email`, `instagram`, `hours` and `policy`, colours and fonts. `hasTill` / `hasPolicy` show the Till card and policy lines automatically once filled.

Colours (contrast on the pairs used for text):

| Token | Hex | Use | Contrast |
| --- | --- | --- | --- |
| `surface` | `#FAF8F3` | page | ink 17.17 |
| `surfaceAlt` | `#F2EDE3` | alternate sections, cards | ink 15.62, muted 5.40 |
| `surfaceSoft` | `#ECE6DA` | pills, soft panels | primary 14.29, muted 5.07 |
| `ink` | `#171512` | text | on surface 17.17 |
| `muted` | `#665F55` | secondary text on light | on surface 5.94 |
| `primary` | `#181818` | logo black: dark sections, primary buttons | surface on primary 16.73 |
| `primaryDeep` | `#0D0D0C` | footer | accent on it 8.82 |
| `primaryRaised` | `#4A4237` | links/hover on light, sheen on black | on surface 9.31 |
| `accent` | `#CBAC43` | logo gold: accents on black | on primary 8.05; primary on accent 8.05 |
| `accentLight` | `#ECCB5B` | highlights on black | on primary 11.21 |
| `accentDeep` | `#8F7425` | gradient end only (decorative) | below 4.5 everywhere |
| `accentText` | `#7A6320` | gold-coloured TEXT on light | on surface 5.45, surfaceAlt 4.95, surfaceSoft 4.65 |
| `mutedOnDark` | `#BEB6A8` | secondary text on black | on primary 8.83 |
| `line` | `#E5DED1` | hairlines (decorative) | |

Contrast rules: **gold `accent` is never text on light** (use `accentText`). Gold gradient text only on black, at 24px and up. `accentDeep` never carries text. `mutedOnDark` only on black.

## 4. Design system — "Gilded Noir"

**Idea.** A boutique counter at night: ivory pages like tissue paper, deep black feature sections taken from the logo, and fine gold lines and script. Bold contrast, calm space, large images, small precise type. Premium comes from restraint, alignment and detail, not from decoration everywhere.

- **Type.** Cormorant Garamond 400–600 for headings (italic for one or two words, e.g. "Elevate your *style*"). Jost 400–500 for body (16px min), Jost 500 uppercase with wide tracking for eyebrows and labels. Prices: Jost 500 tabular. The logo wordmark beside the monogram is Jost, letter-spaced.
- **Grid.** 16px gutters on mobile, max width 1280. Generous vertical rhythm.
- **Surfaces.** Ivory page; `surfaceAlt` cards and alternating sections; black feature sections (hero, Bag Finder band, Find us band, footer in `primaryDeep`) with a warm sheen.
- **Handle arch (signature).** Product and category images sit in a frame with a rounded-arch top and a thin gold or black **handle line** floating above. On hover/focus the handle lifts 4px. Use with restraint.
- **Gold wave.** `gold-wave.svg` as a full-width divider between major sections (at most 3 per page), drawing in when it enters the viewport.
- **Side-panel blocks.** A slim black bar + pale-gold bar as the left edge of quotes and callouts.
- **Buttons.** Primary: black fill, ivory text, radius 999px. On black sections: gold fill, black text. Secondary: 1px black outline. WhatsApp buttons use the lucide `MessageCircle` icon (no green WhatsApp branding).
- **Cards.** Product card: arched image (4:5), "Sample" tag (demo), wishlist heart (44px target), name in Cormorant, price in Jost, category in muted caps.
- **Motion.** 200–400ms ease-out; reveals rise 12px; waves draw in; handle lifts; heart fills. All off with `prefers-reduced-motion`.
- **Icons.** lucide, 1.5px stroke, in black or gold.

## 5. Personality mandate (required)

A correct but plain shop fails this brief. Each must exist and be done well:

1. **Hero** on black: "Elevate your *style* with the *perfect* handbag." (their bio) in Cormorant with gold italics, their delivery line, a featured bag image in the handle-arch frame, the gold wave beneath, two buttons: "Shop the collection" and "Order on WhatsApp". The pick-up point under the buttons.
2. **Shop by occasion**: four tiles Work · Outings · Evening · Everyday → `/shop?occasion=` (draft intro, not a quote).
3. **Category tiles** in handle-arch frames as a horizontal snap row on mobile.
4. **Bag Finder** (`/bag-finder`): 4 questions, answers in the URL, results "Bags for your day" with one-line reasons from the data. No scores, no "perfect match".
5. **What fits** row on product pages, **only** from the product's `fits` data.
6. **Order on WhatsApp** everywhere it matters: product page, basket (whole list + total + pick-up or "delivery, please advise"), sticky mobile bar.
7. **Find us** band on black: the pick-up point card (mall, floor, unit, street, landmark, "Get directions", "Call") and a **schematic map** in SVG (Tom Mboya Street as a gold line, the Dynamic Mall pin, Ambassadeur Hotel opposite, "Not to scale").
8. **M-Pesa Till card**: built, but hidden until the client gives a Till (`hasTill`).
9. **Gold wave** dividers that draw in, and the **handle arch** motif, used with restraint.
10. **Designed empty and error states**: empty basket, empty wishlist, no results (with occasion links), 404 "This bag has wandered off." with the pick-up point link.

## 6. Pages

**Chrome on every page:** skip link, DemoNotice (demo mode), Navbar (logo, Shop with a mega menu of categories and occasions, Bag Finder, About, Blog, Visit us, search icon, wishlist, basket with count), mobile menu (full-screen black sheet), Footer (primaryDeep: logo dark variant, tagline, pick-up point, phone, their delivery line, Till and policy only once given, links, legal), MobileActionBar, `ClothingStore` JSON-LD (name, phone, the pick-up point address, no ratings, no payment claims), metadata (noindex in demo mode).

- **`/` Home.** Hero → occasions → category row → "New in" rail (`isNew`) → Bag Finder band (black, the first question inline) → featured "Heiz Collection" (HZ-001/002 with designed placeholders until photos) → "Room for your whole day" editorial split (their "Spacious enough…" line + image) → how ordering works (3 steps: choose → WhatsApp → pick up or delivery) → Find us band → delivery strip (their delivery line; the policy joins it once given) → blog preview → final CTA.
- **`/shop`.** Grid (2 cols mobile, 3 tablet, 4 desktop). Filters synced to the URL: category, occasion, carry (hand, shoulder, crossbody, wrist, back), size (small, medium, large), price range, "New only". Bottom-sheet filters on mobile, sidebar on desktop; active chips; sort (Featured, Newest, Price low–high, high–low); result count; **search** box filtering name, category and occasion (debounced). Category landing via `?category=`; the heading and intro change with it (from `categories[].blurb`). Quick view sheet (images, price, what fits, Order on WhatsApp, Add to basket, View details).
- **`/shop/[slug]`.** Gallery (swipe on mobile, thumbnails desktop, lightbox, keyboard), name, price (with "Sample price" when sample), tags, short summary, **Order on WhatsApp** (primary), Add to basket, wishlist, share (Web Share API → copy link), What fits, details (description, features), "How to carry" chips from `carry`, Till card and policy line (hidden until given), their delivery line, "See it at our pick-up point", "You may also like" (same occasion or category), recently viewed. Own products without photos show a designed placeholder: black handle-arch frame, gold wave, the bag name in Cormorant and "Photos coming soon".
- **`/bag-finder`.** As in §5.4, inside `<Suspense>`.
- **`/wishlist`.** Saved bags, move to basket, share list on WhatsApp.
- **`/basket`.** Line items (image, name, price, quantity stepper 1–5, remove with Undo), subtotal, choice: "Pick up at" (the pick-up point) or "Deliver to me" (area text field, with their delivery line and "Heiz Bags will advise."), name field (optional), **Send order on WhatsApp** (message lists items, quantities, prices, subtotal, pickup/delivery choice, name), Till card once given. Basket drawer for quick view from the navbar. Basket naming: call it **Basket** everywhere (a "bag" basket is confusing in a bag shop).
- **`/how-to-order`.** Steps, pick-up point, delivery (their words), Till and exchanges only once given, FAQ links.
- **`/about`.** Their words, what they sell (categories), the pick-up point, their delivery line, how to order. No invented story: if no story is provided, the page is built from facts and their voice, with a draft "Our story" section hidden unless `NEXT_PUBLIC_SHOW_DRAFT_FLAGS` is true.
- **`/visit`** ("Find us"). The pick-up point with directions and the schematic map, phone. Till and hours hidden until known.
- **`/faqs`.** 8 drafts answered only from known facts (how to order, how to pay ("Ask us on WhatsApp"), where to find us, exchanges ("Ask us on WhatsApp" until a policy is given), can I see a bag before buying (the pick-up point), do you deliver (their words), are the bags on the site in stock ("Ask on WhatsApp to confirm"), laptop bags).
- **`/blog`, `/blog/[slug]`.** 6 posts (Phase 3).
- **`/contact`.** Form (name, phone, message, optional product pre-filled from `?bag=`), WhatsApp and Call buttons, pick-up point.
- **`/privacy`, `/terms`** (terms: ordering through WhatsApp, prices may change, ask how to pay, pick-up and their delivery line, exchanges: ask on WhatsApp — no extra terms), **not-found**.

## 7. Data

`src/data/products.json` (provided):

```ts
type Product = {
  id: string; slug: string; name: string; nameConfirmed?: false;
  status: "own" | "sample";
  category: "handbags"|"totes"|"office"|"sling"|"clutches"|"wallets"|"pouches"|"backpacks";
  occasions: ("work"|"outings"|"evening"|"everyday"|"travel")[];
  carry: ("hand"|"shoulder"|"crossbody"|"wrist"|"back")[];
  size: "small"|"medium"|"large"|null;
  fits: string[];          // phone, wallet, keys, cards, coins, notes, a4, laptop, laptop-14, make-up, toiletries, bottles
  priceKes: number; isNew: boolean;
  images: string[];        // remote sample photos; [] for HZ-001/002
  summary: string; description: string; features: string[];   // filled in Phase 2
  idealFor: string[];      // Bag Finder tags: work, outings, evening, everyday, travel, mum
};
```
The file also has `categories` and `occasions`. Read it and make the types match exactly.

Phase 2 rules: `summary` ≤ 140 characters; `description` 2–3 sentences in Heiz Bags' voice; `features` 3–6 short lines **visible or stated** (closures, pockets, straps, linings, beadwork), with no measurements of material, no maker or origin claims, no brand marks. HZ-001/HZ-002: use only the wording of their posts (§1).

Other data files written in Phase 3 (all `status: "draft"`): `finder.json` (questions, answers → tags/filters), `faqs.json`, `blog.json`, `about.json`, `steps.json` (how to order).

Libraries: `src/lib/products.ts` (load, filter by demo mode, filter/sort/search), `src/lib/finder.ts`, `src/lib/whatsapp.ts` (message builders, `wa.me` URLs, encodeURIComponent), `src/lib/format.ts` (`Intl.NumberFormat("en-KE")` → "KES 2,800"), `src/store/` (basket, wishlist, recently viewed; context + `localStorage` with try/catch and a `hydrated` flag).

## 8. Technical rules

- Server components by default; client islands for filters, gallery, basket, wishlist, finder, forms.
- `next/image` for everything; `remotePatterns` only for `media.hbleatherke.com`; `sizes` set; a designed fallback (black frame + logo mark) if an image fails.
- `/api/contact`: zod, honeypot, minimum fill time (3s), simple in-memory rate limit, Resend when `RESEND_API_KEY` and `CONTACT_TO_EMAIL` exist; otherwise 503 → the form shows WhatsApp/Call fallback with the message pre-filled. Never store or log personal data.
- Metadata per page; title template `%s · Heiz Bags`; `opengraph-image.jpg`, icons and `manifest.ts` from the asset script.
- Accessibility: AA contrast per §3, focus visible (2px gold outline on black, black on light), sheets trap and return focus, `aria-live` for basket updates, alt text "Name, sample photo" for samples.

## 9. Environment (`.env.example`)

```
NEXT_PUBLIC_SITE_URL=
NEXT_PUBLIC_DEMO_MODE=true
NEXT_PUBLIC_SHOW_DRAFT_FLAGS=false
RESEND_API_KEY=
CONTACT_TO_EMAIL=
CONTACT_FROM_EMAIL=
```

## 10. File structure (guide)

```
src/app/(site)/…   src/app/api/contact/route.ts   src/app/manifest.ts   src/app/sitemap.ts   src/app/robots.ts
src/components/{brand,layout,product,shop,basket,finder,shops,ui}/
src/config/brand.ts   src/data/*.json   src/lib/*   src/store/*   src/types/*
```

## 11. README checklist

How to run and deploy; demo mode and what turns off; how to add Heiz Bags' own products and photos (`public/products/<id>/`), and how to remove samples; and **for Heiz Bags to provide**: photos of their bags (HZ-001, HZ-002 and any others) with prices, how to pay (M-Pesa Till or other), their exchange/refund policy, Instagram or other handles, opening hours at the pick-up point, email for the contact form, delivery fees and times if they want them shown, a short story of the shop, their logo as a vector file, plus every item under "Open questions".
