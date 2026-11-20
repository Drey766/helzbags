// Single source of truth for Heiz Bags: names, contacts, pick-up point, their own words,
// policy wording, colours and fonts. No hex codes anywhere else in src/.

export const brand = {
  name: "Heiz Bags",
  shortName: "Heiz Bags",
  // Their bio line (they write it in capitals). Their own words.
  tagline: "Elevate your style with the perfect handbag.",
  ownWords: {
    bio: "Elevate your style with the perfect handbag.",
    spacious: "Spacious enough to fit a bottle, notebook, wallet, small umbrella, wipes, charger and other essentials.",
    available: "You will find the bags already available there.",
    delivery: "Deliveries are done countrywide at a small fee.",
  },
  phoneDisplay: "0113 846 224",
  phoneTel: "+254113846224",
  whatsapp: "254113846224",
  mpesaTill: "", // unknown → Till card and payment lines hidden
  email: "", // unknown → hidden
  instagram: "", // unknown → hidden (open question)
  hours: "", // unknown → hidden
  // Not stated by Heiz Bags → empty, and every policy line is hidden.
  policy: { refunds: "", exchange: "" },
  policyHelp: "Ask us on WhatsApp about exchanges.",
  shops: [
    {
      key: "dynamic",
      mall: "Dynamic Mall",
      floor: "5th floor",
      unit: "Shop ML 220",
      street: "Tom Mboya Street",
      landmark: "Opposite Ambassadeur Hotel",
      confirm: false,
    },
  ],
  colors: {
    surface: "#FAF8F3", // page
    surfaceAlt: "#F2EDE3", // alternate sections, cards
    surfaceSoft: "#ECE6DA", // soft accent surface (pills)
    ink: "#171512", // text
    muted: "#665F55", // secondary text
    primary: "#181818", // logo black: dark sections, primary buttons
    primaryDeep: "#0D0D0C", // footer
    primaryRaised: "#4A4237", // links/hover on light; warm sheen on primary
    accent: "#CBAC43", // logo gold: accents on primary (never text on light)
    accentLight: "#ECCB5B", // highlights on primary
    accentDeep: "#8F7425", // gradient end only (decorative)
    accentText: "#7A6320", // gold-coloured TEXT on light
    mutedOnDark: "#BEB6A8", // secondary text on primary
    line: "#E5DED1", // hairlines (decorative)
    white: "#FFFFFF",
    success: "#2F6B45",
    danger: "#A3322A",
  },
  fonts: { display: "Cormorant Garamond", body: "Jost" },
  demoNotice: "Preview: most bags shown are samples while Heiz Bags' own photos are added.",
  articleNotice: "This article is general styling and care advice from Heiz Bags.",
} as const;

export type Shop = (typeof brand.shops)[number];

export const isDemoMode = process.env.NEXT_PUBLIC_DEMO_MODE === "true";
export const showDraftFlags = process.env.NEXT_PUBLIC_SHOW_DRAFT_FLAGS === "true";
export const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000").replace(/\/$/, "");

/** True when the client has given a policy; every policy line is hidden otherwise. */
export const hasPolicy = Boolean(brand.policy.refunds || brand.policy.exchange);
/** True when the client has given an M-Pesa Till; the Till card is hidden otherwise. */
export const hasTill = Boolean(brand.mpesaTill);

export function mapsUrl(shop: Shop) {
  const q = `${shop.mall} ${shop.street} Nairobi`;
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(q)}`;
}

export function shopLabel(shop: Shop) {
  return `${shop.mall}, ${shop.floor}, ${shop.unit}, ${shop.street}`;
}

/** CSS custom properties generated from brand.colors, injected in the root layout. */
export function brandCssVars(): string {
  const c = brand.colors;
  const pairs: Record<string, string> = {
    "--hz-surface": c.surface,
    "--hz-surface-alt": c.surfaceAlt,
    "--hz-surface-soft": c.surfaceSoft,
    "--hz-ink": c.ink,
    "--hz-muted": c.muted,
    "--hz-primary": c.primary,
    "--hz-primary-deep": c.primaryDeep,
    "--hz-primary-raised": c.primaryRaised,
    "--hz-accent": c.accent,
    "--hz-accent-light": c.accentLight,
    "--hz-accent-deep": c.accentDeep,
    "--hz-accent-text": c.accentText,
    "--hz-muted-on-dark": c.mutedOnDark,
    "--hz-line": c.line,
    "--hz-white": c.white,
    "--hz-success": c.success,
    "--hz-danger": c.danger,
    "--logo-ink": c.primary,
    "--logo-gold": c.accent,
    "--logo-gold-light": c.accentLight,
    "--logo-gold-deep": c.accentDeep,
    "--wave-deep": c.accentDeep,
    "--wave-gold": c.accent,
    "--wave-light": c.accentLight,
  };
  return `:root{${Object.entries(pairs)
    .map(([k, v]) => `${k}:${v}`)
    .join(";")}}`;
}
