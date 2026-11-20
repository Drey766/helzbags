import type { MetadataRoute } from "next";
import { brand } from "@/config/brand";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: brand.name,
    short_name: brand.name,
    description: `${brand.tagline} Women's handbags in Nairobi CBD.`,
    start_url: "/",
    display: "standalone",
    background_color: brand.colors.ivory,
    theme_color: brand.colors.plum,
    icons: [
      { src: "/brand/favicon-256.png", sizes: "256x256", type: "image/png" },
      { src: "/brand/icon-512.png", sizes: "512x512", type: "image/png" },
      { src: "/brand/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
  };
}
