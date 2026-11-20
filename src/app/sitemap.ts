import type { MetadataRoute } from "next";
import { siteUrl } from "@/config/brand";
import { getProducts } from "@/lib/products";
import { posts } from "@/lib/blog";

export default function sitemap(): MetadataRoute.Sitemap {
  const pages = ["", "/shop", "/bag-finder", "/how-to-order", "/visit", "/about", "/faqs", "/blog", "/contact", "/privacy", "/terms"];
  // Samples are never listed: only Heiz Bags' own bags.
  const own = getProducts().filter((p) => p.status === "own");
  return [
    ...pages.map((p) => ({ url: `${siteUrl}${p}`, changeFrequency: "weekly" as const, priority: p === "" ? 1 : 0.7 })),
    ...own.map((p) => ({ url: `${siteUrl}/shop/${p.slug}`, changeFrequency: "weekly" as const, priority: 0.8 })),
    ...posts.map((p) => ({ url: `${siteUrl}/blog/${p.slug}`, changeFrequency: "monthly" as const, priority: 0.5 })),
  ];
}
