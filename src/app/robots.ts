import type { MetadataRoute } from "next";
import { isDemoMode, siteUrl } from "@/config/brand";

export default function robots(): MetadataRoute.Robots {
  if (isDemoMode) {
    // Preview with sample bags: keep it out of search engines.
    return { rules: { userAgent: "*", disallow: "/" } };
  }
  return {
    rules: { userAgent: "*", allow: "/", disallow: ["/api/"] },
    sitemap: `${siteUrl}/sitemap.xml`,
  };
}
