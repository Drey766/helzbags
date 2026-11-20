import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Lets a verification build use its own folder (NEXT_DIST_DIR=.next-check) so it never
  // overwrites files a running `next dev` is reading.
  distDir: process.env.NEXT_DIST_DIR || ".next",
  cacheComponents: true,
  partialPrefetching: true,
  images: {
    // Sample photos only (demo mode). Replace with Heiz Bags' own photos in public/products/.
    remotePatterns: [{ protocol: "https", hostname: "media.hbleatherke.com", pathname: "/products/**" }],
    // Remote sample photos are loaded unoptimised (see SmartImage): Next.js aborts upstream
    // image fetches after a fixed 7s, and the sample host is often slower than that.
    minimumCacheTTL: 60 * 60 * 24 * 30,
  },
  turbopack: {
    rules: {
      "*.css": {
        // Only our own CSS: Next.js' internal font CSS must not go through this loader.
        condition: { path: /globals\.css$/ },
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
