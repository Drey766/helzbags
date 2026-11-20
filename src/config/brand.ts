// Single source of truth for Zuri Bags: names, contacts, shops, their own words,
// policy wording, colours and fonts. No hex codes anywhere else in src/.

export const brand = {
  name: "Zuri Bags",
  tagline: "Carry elegance. Carry confidence.", // their words
  ownWords: [
    "Carry elegance. Carry confidence. Carry Chrisbella.",
    "Perfect for work, outings or elevating your everyday look.",
    "A timeless piece for the woman who loves her style simple, elegant & classy.",
  ],
  phoneDisplay: "0717 840 894",
  phoneTel: "+254717840894",
  whatsapp: "254717840894",
  mpesaTill: "5242805",
  email: "", // unknown → hidden
  instagram: "", // unknown → hidden (open question)
  hours: "", // unknown → hidden
  policy: { refunds: "No refund.", exchange: "Exchange within 48 hours." },
  policyHelp: "Ask us on WhatsApp about exchanges.",
  shops: [
    { key: "sasa", mall: "Sasa Mall", unit: "G16", street: "Moi Avenue", confirm: true },
    { key: "sawa", mall: "Sawa Mall", unit: "G12", street: "Moi Avenue", confirm: false },
    { key: "star", mall: "Star Mall", unit: "M12", street: "Tom Mboya Street", confirm: false },
  ],
  colors: {
    ivory: "#FBF8F2", // page
    champagne: "#F4EDE0", // alternate sections, cards
    lilac: "#EEE8F4", // soft accent surface
    ink: "#1E1529", // text
    muted: "#6B6275", // secondary text
    plum: "#2E0A5C", // logo purple: dark sections, primary buttons
    plumDeep: "#1C0638", // footer
    plumSoft: "#5B3A8C", // links/hover on light
    gold: "#D4A84A", // accents on plum (never text on light)
    goldLight: "#EEDC88", // highlights on plum
    goldDeep: "#A87A2C", // gradient end only (decorative)
    goldText: "#7A5A1E", // gold-coloured TEXT on light
    lilacText: "#C9B8DE", // secondary text on plum
    line: "#E7DECF", // hairlines (decorative)
    white: "#FFFFFF",
    success: "#2F6B45",
    danger: "#A3322A",
  },
  fonts: { display: "Cormorant Garamond", body: "Jost" },
  demoNotice: "Preview: most bags shown are samples while Zuri Bags' own photos are added.",
  articleNotice: "This article is general styling and care advice from Zuri Bags.",
} as const;

export type Shop = (typeof brand.shops)[number];

export const isDemoMode = process.env.NEXT_PUBLIC_DEMO_MODE === "true";
export const showDraftFlags = process.env.NEXT_PUBLIC_SHOW_DRAFT_FLAGS === "true";
export const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000").replace(/\/$/, "");

export function mapsUrl(shop: Shop) {
  const q = `${shop.mall} ${shop.street} Nairobi`;
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(q)}`;
}

export function shopLabel(shop: Shop) {
  return `${shop.mall}, ${shop.unit}, ${shop.street}`;
}

/** CSS custom properties generated from brand.colors, injected in the root layout. */
export function brandCssVars(): string {
  const c = brand.colors;
  const pairs: Record<string, string> = {
    "--zb-ivory": c.ivory,
    "--zb-champagne": c.champagne,
    "--zb-lilac": c.lilac,
    "--zb-ink": c.ink,
    "--zb-muted": c.muted,
    "--zb-plum": c.plum,
    "--zb-plum-deep": c.plumDeep,
    "--zb-plum-soft": c.plumSoft,
    "--zb-gold": c.gold,
    "--zb-gold-light": c.goldLight,
    "--zb-gold-deep": c.goldDeep,
    "--zb-gold-text": c.goldText,
    "--zb-lilac-text": c.lilacText,
    "--zb-line": c.line,
    "--zb-white": c.white,
    "--zb-success": c.success,
    "--zb-danger": c.danger,
    "--logo-purple": c.plum,
    "--logo-gold": c.gold,
    "--logo-gold-light": c.goldLight,
    "--logo-gold-deep": c.goldDeep,
    "--wave-deep": c.goldDeep,
    "--wave-gold": c.gold,
    "--wave-light": c.goldLight,
  };
  return `:root{${Object.entries(pairs)
    .map(([k, v]) => `${k}:${v}`)
    .join(";")}}`;
}
