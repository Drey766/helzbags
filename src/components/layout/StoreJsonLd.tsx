import { brand, siteUrl } from "@/config/brand";

/** ClothingStore structured data: name, phone and the confirmed shops only. No ratings, no products. */
export function StoreJsonLd() {
  const confirmed = brand.shops.filter((s) => !s.confirm);
  const data = {
    "@context": "https://schema.org",
    "@type": "ClothingStore",
    name: brand.name,
    url: siteUrl,
    telephone: brand.phoneTel,
    slogan: brand.tagline,
    image: `${siteUrl}/opengraph-image.jpg`,
    currenciesAccepted: "KES",
    address: confirmed.map((s) => ({
      "@type": "PostalAddress",
      streetAddress: `${s.mall}, ${s.floor}, ${s.unit}, ${s.street}`,
      addressLocality: "Nairobi",
      addressCountry: "KE",
    })),
  };
  return (
    <script
      type="application/ld+json"
      // JSON.stringify output with "<" escaped so it cannot close the script tag
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }}
    />
  );
}
