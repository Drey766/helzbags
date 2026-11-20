# Zuri Bags — full brief

## 1. The business (only what they have said)

- **Name:** Zuri Bags ("zuri" means beautiful in Kiswahili; don't claim that is why they chose it).
- **What:** women's handbags. Their hashtags: sling bags, tote bags, office bags, clutch bags, and the Chrisbella brand.
- **Phone / WhatsApp:** 0717 840 894 (`254717840894`). "Whatsapp 0717840894 to order."
- **Payment:** M-Pesa Till **5242805**.
- **Shops:**
  - Sasa Mall, G16, Moi Avenue (in the bio; not in their latest posts → confirm it is still open)
  - Sawa Mall, G12, along Moi Avenue
  - Star Mall, M12, along Tom Mboya Street
- **Policy (their words):** "No refund. Exchange within 48hrs."
- **Their voice (posts):**
  - "Carry elegance. Carry confidence. Carry Chrisbella. Perfect for work, outings or elevating your everyday look." (Ksh 5,300)
  - "A timeless piece for the woman who loves her style simple, elegant & classy." (Ksh 4,500)
- Unknown (hide until provided): Instagram handle, email, opening hours, delivery areas/fees/times, founding story, team, brands beyond Chrisbella, photos.

## 2. Guardrails (full text)

1. **No invented facts.** No founding year, years in business, customer numbers, "trusted by", team members, brand lists, hours, delivery promises. Empty fields render nothing (no "Coming soon" placeholders on public pages).
2. **No social proof**: no testimonials, ratings, review counts, "loved by", "best seller".
3. **No superlatives or authenticity claims**: no "best", "#1", "cheapest", "original", "authentic", "genuine leather" (for Zuri's own stock, unless they confirm), "premium quality guaranteed".
4. **Policy**: show "No refund. Exchange within 48 hours." exactly, with "Ask us on WhatsApp about exchanges." No conditions, fees, free-delivery thresholds, discounts, gift wrapping, instalments or loyalty schemes.
5. **Own products** (ZB-001, ZB-002): copy built only from their posts. No materials, dimensions or colours until they provide them. ZB-002's name is a placeholder: show it, flag `nameConfirmed: false` as an open question.
6. **Samples** (ZB-003–ZB-029) are from another Nairobi shop's public site, used to show the design. With `NEXT_PUBLIC_DEMO_MODE=true`:
   - a slim site-wide notice: "Preview: most bags shown are samples while Zuri Bags' own photos are added."
   - a "Sample" tag on every sample card and page, "Sample price" next to sample prices
   - `noindex` on every page, `robots.ts` disallows all, sitemap excludes samples, **no Product/Offer JSON-LD** for anything
   - never show the source shop's name, initials, URL, "handmade", "made in", "designed in", "since day one", leather area or lining lengths
   - photos may show the source's small branding: that is acceptable only in demo mode and must be replaced before launch (README)
   With demo mode **off**, samples are hidden entirely (filter by `status`).
7. **WhatsApp ordering**: buttons open `https://wa.me/254717840894?text=…`. Copy says "Order on WhatsApp" / "Send order on WhatsApp", never "Order placed", "Paid", "Confirmed". After opening WhatsApp, show "Finish your order in WhatsApp. Zuri Bags will reply to confirm." (that is how WhatsApp ordering works, not a promise of timing).
8. **Privacy**: contact form → Resend email if keys exist, otherwise WhatsApp/Call fallback; never a false success; no storage, no logging of personal data. Basket, wishlist, recently viewed: `localStorage` only. `/privacy` cites the Data Protection Act, 2019 and the Office of the Data Protection Commissioner (ODPC).
9. **Drafts**: every page/section Claude writes beyond their words has `status: "draft"` in data and shows `<DraftBadge />` when `NEXT_PUBLIC_SHOW_DRAFT_FLAGS === "true"`. Blog posts end with the `articleNotice`.
10. **Tone**: warm, elegant, short sentences, Kenyan English, KES. No emoji in UI, no exclamation marks.

## 3. Brand config (`src/config/brand.ts`)

```ts
export const brand = {
  name: "Zuri Bags",
  tagline: "Carry elegance. Carry confidence.",        // their words
  ownWords: [
    "Carry elegance. Carry confidence. Carry Chrisbella.",
    "Perfect for work, outings or elevating your everyday look.",
    "A timeless piece for the woman who loves her style simple, elegant & classy.",
  ],
  phoneDisplay: "0717 840 894",
  phoneTel: "+254717840894",
  whatsapp: "254717840894",
  mpesaTill: "5242805",
  email: "",            // unknown → hidden
  instagram: "",        // unknown → hidden (open question)
  hours: "",            // unknown → hidden
  policy: { refunds: "No refund.", exchange: "Exchange within 48 hours." },
  shops: [
    { key: "sasa", mall: "Sasa Mall", unit: "G16", street: "Moi Avenue", confirm: true },
    { key: "sawa", mall: "Sawa Mall", unit: "G12", street: "Moi Avenue", confirm: false },
    { key: "star", mall: "Star Mall", unit: "M12", street: "Tom Mboya Street", confirm: false },
  ],
  // Google Maps search links (no embeds): https://www.google.com/maps/search/?api=1&query=<mall>+<street>+Nairobi
  colors: {
    ivory: "#FBF8F2",      // page
    champagne: "#F4EDE0",  // alternate sections, cards
    lilac: "#EEE8F4",      // soft accent surface (plum on lilac 13.3)
    ink: "#1E1529",        // text                       on ivory 16.59
    muted: "#6B6275",      // secondary text             on ivory 5.46, on champagne 4.97
    plum: "#2E0A5C",       // logo purple: dark sections, primary buttons   ivory on plum 15.08
    plumDeep: "#1C0638",   // footer                      gold on plumDeep 8.39
    plumSoft: "#5B3A8C",   // links/hover on light       on ivory 8.16
    gold: "#D4A84A",       // accents on plum             gold on plum 7.23; plum on gold 7.23
    goldLight: "#EEDC88",  // highlights on plum          on plum 11.59
    goldDeep: "#A87A2C",   // gradient end only (decorative)
    goldText: "#7A5A1E",   // gold-coloured TEXT on light on ivory 5.99
    lilacText: "#C9B8DE",  // secondary text on plum      on plum 8.67
    line: "#E7DECF",       // hairlines (decorative)
    white: "#FFFFFF",
    success: "#2F6B45",
    danger: "#A3322A",
  },
  fonts: { display: "Cormorant Garamond", body: "Jost" },
  demoNotice: "Preview: most bags shown are samples while Zuri Bags' own photos are added.",
  articleNotice: "This article is general styling and care advice from Zuri Bags.",
} as const;
```

Contrast rules: **gold (`#D4A84A`) is 2.09:1 on ivory → never text on light**; use `goldText`. Gold gradient text only on plum, ≥ 24px. Muted text never on lilac below 16px.

## 4. Design system — "Gilded Plum"

**Idea.** A boutique counter at dusk: ivory and champagne like tissue paper, plum velvet sections, thin gold lines. Calm space, large images, small precise type. Premium comes from restraint, alignment and detail, not from decoration everywhere.

- **Type.** Cormorant Garamond 500–700 for headings (large: hero 44px at 375, 72px desktop; italic for one or two words, e.g. "Carry *elegance*"). Jost 400–500 for body (16px min), Jost 500 uppercase with 0.18em tracking for eyebrows and small labels. Prices: Jost 500 tabular.
- **Grid.** 16px gutters on mobile, max width 1280. Generous vertical rhythm (64–96px sections on mobile, 120px desktop).
- **Surfaces.** Ivory page; champagne cards and alternating sections; plum feature sections (hero, Bag Finder band, shops band, footer in plumDeep).
- **Handle arch (signature).** Product and category images sit in a frame with a rounded-arch top (`border-radius: 999px 999px 16px 16px` on tiles, or 50% top radius on category tiles) and a thin gold or plum **handle line** (an SVG arc, 1.5px) floating above the frame. On hover/focus the handle lifts 4px. Use on category tiles, the hero image and featured cards; plain 16px-radius cards elsewhere so it stays special.
- **Gold wave.** `gold-wave.svg` as a full-width divider between major sections (at most 3 per page), drawing in with `stroke-dashoffset` on the thin lines when it enters the viewport. On plum it shines; on ivory use it thin and low-opacity.
- **Side-panel blocks.** A slim plum bar + pale-gold bar (like the logo's bag sides) as the left edge of quotes, policy callouts and the order summary.
- **Buttons.** Primary: plum fill, ivory text, 52px tall, radius 999px. On plum sections: gold fill, plum text. Secondary: 1px plum outline. WhatsApp buttons are primary style with the lucide `MessageCircle` icon (no green WhatsApp branding).
- **Cards.** Product card: arched image (4:5), "New" pill (plum on lilac), "Sample" tag (when demo), wishlist heart top-right (44px target), name in Cormorant 22px, price in Jost, category in muted caps; hover shows the second image and a "Quick view" button; tap on mobile goes to the page.
- **Motion.** 200–400ms ease-out; reveals rise 12px; waves draw in; handle lifts; heart fills with a small scale. All off with `prefers-reduced-motion`.
- **Icons.** lucide, 1.5px stroke, in plum or gold.

## 5. Personality mandate (required, reviewed in Phase 9)

A correct but plain shop fails this brief. Each must exist and be done well:

1. **Hero** on plum: "Carry *elegance*. Carry *confidence*." (their words) in Cormorant with goldLight italics, a featured bag image (ZB-001 when it has photos, otherwise a sample) in the handle-arch frame with the gold handle line, the gold wave sweeping beneath, two buttons: "Shop the collection" and "Order on WhatsApp". On mobile the image comes first, cropped tall.
2. **Shop by occasion**: four tiles Work · Outings · Evening · Everyday, captioned with their own line "Perfect for work, outings or elevating your everyday look." → `/shop?occasion=`.
3. **Category tiles** in handle-arch frames (Handbags, Totes, Office, Sling & Crossbody, Clutches, Wallets, Pouches, Backpacks) as a horizontal snap row on mobile.
4. **Bag Finder** (`/bag-finder`): 4 questions (Where are you going? What do you carry? How do you like to carry it? Budget), answers in the URL, results "Bags for your day" with one-line reasons from the data ("Fits a 14-inch laptop", "Worn crossbody"). No scores, no "perfect match".
5. **What fits** row on product pages: icons for phone, wallet, keys, cards, A4, laptop, make-up, bottles, shown **only** from the product's `fits` data.
6. **Order on WhatsApp** everywhere it matters: product page (with the exact bag name, price and link), basket (whole list + total + chosen shop for pickup or "delivery, please advise" note), and the sticky mobile bar.
7. **Visit our shops** band on plum: three shop cards (mall, unit, street, "Get directions", "Call"), and a **schematic CBD map** drawn in SVG (Moi Avenue and Tom Mboya Street as two gold lines, three plum pins, labelled "Not to scale"). Sasa Mall carries a draft flag until confirmed.
8. **M-Pesa Till card**: a neat card "Pay via M-Pesa · Till 5242805" with a copy button and steps (Lipa na M-Pesa → Buy Goods → Till 5242805 → amount → PIN), shown on basket, How to order and product pages, with "Send your order on WhatsApp first so Zuri Bags can confirm availability." (that is ordering logic, not a policy).
9. **Gold wave** dividers that draw in, and the **handle arch** motif, used with restraint.
10. **Designed empty and error states**: empty basket ("Your basket is waiting for something beautiful."), empty wishlist, no results (with occasion links), 404 "This bag has wandered off." with shop links.

## 6. Pages

**Chrome on every page:** skip link, DemoNotice (demo mode), Navbar (logo, Shop with a mega menu of categories and occasions, Bag Finder, About, Blog, Visit us, search icon, wishlist, basket with count), mobile menu (full-screen plum sheet), Footer (plumDeep: logo on light variant, tagline, shops, phone, Till, policy line, links, legal), MobileActionBar, `ClothingStore` JSON-LD (name, phone, addresses of the two confirmed shops, no ratings), metadata (noindex in demo mode).

- **`/` Home.** Hero → occasions → category row → "New in" rail (`isNew`) → Bag Finder band (plum, the first question inline) → featured "Zuri Collection" (ZB-001/002 with designed placeholders until photos) → "Simple, elegant & classy" editorial split (their line + image) → how ordering works (3 steps: choose → WhatsApp → pay Till or at the shop) → Visit our shops band → policy strip ("Exchange within 48 hours · No refund") → blog preview → final CTA.
- **`/shop`.** Grid (2 cols mobile, 3 tablet, 4 desktop). Filters synced to the URL: category, occasion, carry (hand, shoulder, crossbody, wrist, back), size (small, medium, large), price range, "New only". Bottom-sheet filters on mobile, sidebar on desktop; active chips; sort (Featured, Newest, Price low–high, high–low); result count; **search** box filtering name, category and occasion (debounced). Category landing via `?category=`; the heading and intro change with it (from `categories[].blurb`). Quick view sheet (images, price, what fits, Order on WhatsApp, Add to basket, View details).
- **`/shop/[slug]`.** Gallery (swipe on mobile, thumbnails desktop, lightbox, keyboard), name, price (with "Sample price" when sample), tags, short summary, **Order on WhatsApp** (primary), Add to basket, wishlist, share (Web Share API → copy link), What fits, details (description, features), "How to carry" chips from `carry`, Till card, policy line, "Visit a shop to see it" with shop links, "You may also like" (same occasion or category), recently viewed. Own products without photos show a designed placeholder: plum handle-arch frame, gold wave, the bag name in Cormorant and "Photos coming soon".
- **`/bag-finder`.** As in §5.4, inside `<Suspense>`.
- **`/wishlist`.** Saved bags, move to basket, share list on WhatsApp.
- **`/basket`.** Line items (image, name, price, quantity stepper 1–5, remove with Undo), subtotal, choice: "Pick up at" (shop select) or "Deliver to me" (area text field, with "Zuri Bags will advise on delivery"), name field (optional), **Send order on WhatsApp** (message lists items, quantities, prices, subtotal, pickup/delivery choice, name), Till card. Basket drawer for quick view from the navbar. Basket naming: call it **Basket** everywhere (a "bag" basket is confusing in a bag shop).
- **`/how-to-order`.** Steps, WhatsApp, Till instructions, pickup at shops, exchange policy, FAQ links.
- **`/about`.** Their words, what they sell (categories), the three shops, the policy, how to order. No invented story: if no story is provided, the page is built from facts and their voice, with a draft "Our story" section hidden unless `NEXT_PUBLIC_SHOW_DRAFT_FLAGS` is true.
- **`/visit`.** Shops with directions and the schematic map, phone, Till. Hours hidden until known.
- **`/faqs`.** 8 drafts answered only from known facts (how to order, how to pay, where the shops are, exchange policy, can I see a bag before buying (visit the shops), do you deliver ("Ask us on WhatsApp"), are the bags on the site in stock ("Ask on WhatsApp to confirm"), Chrisbella).
- **`/blog`, `/blog/[slug]`.** 6 posts (Phase 3).
- **`/contact`.** Form (name, phone, message, optional product pre-filled from `?bag=`), WhatsApp and Call buttons, shops.
- **`/privacy`, `/terms`** (terms: ordering through WhatsApp, prices may change, exchange within 48 hours, no refund — no extra terms), **not-found**.

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
  images: string[];        // remote sample photos; [] for ZB-001/002
  summary: string; description: string; features: string[];   // filled in Phase 2
  idealFor: string[];      // Bag Finder tags: work, outings, evening, everyday, travel, mum
};
```
The file also has `categories` and `occasions`. Read it and make the types match exactly.

Phase 2 rules: `summary` ≤ 140 characters; `description` 2–3 sentences in Zuri's voice; `features` 3–6 short lines **visible or stated** (closures, pockets, straps, linings, beadwork), with no measurements of material, no maker or origin claims, no brand marks. ZB-001/ZB-002: use only `data-raw/bag-notes.json` `ownWords`.

Other data files written in Phase 3 (all `status: "draft"`): `finder.json` (questions, answers → tags/filters), `faqs.json`, `blog.json`, `about.json`, `steps.json` (how to order).

Libraries: `src/lib/products.ts` (load, filter by demo mode, filter/sort/search), `src/lib/finder.ts`, `src/lib/whatsapp.ts` (message builders, `wa.me` URLs, encodeURIComponent), `src/lib/format.ts` (`Intl.NumberFormat("en-KE")` → "KES 5,300"), `src/store/` (basket, wishlist, recently viewed; context + `localStorage` with try/catch and a `hydrated` flag).

## 8. Technical rules

- Server components by default; client islands for filters, gallery, basket, wishlist, finder, forms.
- `next/image` for everything; `remotePatterns` only for `media.hbleatherke.com`; `sizes` set; a designed fallback (plum frame + logo mark) if an image fails.
- `/api/contact`: zod, honeypot, minimum fill time (3s), simple in-memory rate limit, Resend when `RESEND_API_KEY` and `CONTACT_TO_EMAIL` exist; otherwise 503 → the form shows WhatsApp/Call fallback with the message pre-filled. Never store or log personal data.
- Metadata per page; title template `%s · Zuri Bags`; `opengraph-image.jpg`, icons and `manifest.ts` from the asset script.
- Accessibility: AA contrast per §3, focus visible (2px gold outline on plum, plum on light), sheets trap and return focus, `aria-live` for basket updates, alt text "Name, sample photo" for samples.

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

## 11. README checklist (Phase 9)

How to run and deploy; demo mode and what turns off; how to add Zuri's own products and photos (`public/products/<id>/`), and how to remove samples; and **for Zuri Bags to provide**: photos and names of their bags with prices, ZB-002's name, whether Sasa Mall G16 is still open, Instagram handle, opening hours, delivery areas and fees (if they deliver), exchange conditions, email for the contact form, the brands they stock, a short story of the shop, plus every item under "Open questions".
