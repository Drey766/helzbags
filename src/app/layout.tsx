import type { Metadata, Viewport } from "next";
import { Cormorant_Garamond, Jost } from "next/font/google";
import "./globals.css";
import { brand, brandCssVars, isDemoMode, siteUrl } from "@/config/brand";
import { StoreProvider } from "@/store/StoreProvider";
import { DemoNotice } from "@/components/layout/DemoNotice";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { MobileActionBar } from "@/components/layout/MobileActionBar";
import { BasketDrawer } from "@/components/basket/BasketDrawer";
import { StoreJsonLd } from "@/components/layout/StoreJsonLd";
import { QuickViewProvider } from "@/components/product/QuickView";
import { RouteProgress } from "@/components/layout/RouteProgress";
import { Suspense } from "react";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
  variable: "--font-cormorant",
  display: "swap",
});

const jost = Jost({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-jost",
  display: "swap",
});

const description = `Women's handbags from Heiz Bags, Dynamic Mall, Tom Mboya Street, Nairobi. Order on WhatsApp ${brand.phoneDisplay}. ${brand.ownWords.delivery}`;

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: { default: `${brand.name} · ${brand.tagline}`, template: `%s · ${brand.name}` },
  description,
  applicationName: brand.name,
  openGraph: {
    type: "website",
    siteName: brand.name,
    title: `${brand.name} · ${brand.tagline}`,
    description,
    locale: "en_KE",
  },
  twitter: { card: "summary_large_image" },
  robots: isDemoMode ? { index: false, follow: false, googleBot: { index: false, follow: false } } : undefined,
};

export const viewport: Viewport = {
  themeColor: brand.colors.primary,
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en-KE" className={`${cormorant.variable} ${jost.variable}`}>
      <head>
        <style id="hz-brand-vars" dangerouslySetInnerHTML={{ __html: brandCssVars() }} />
      </head>
      <body className="min-h-dvh bg-surface text-ink">
        <a
          href="#main"
          className="sr-only z-[100] rounded-full bg-primary px-5 py-3 text-surface focus:not-sr-only focus:fixed focus:left-4 focus:top-4"
        >
          Skip to content
        </a>
        <Suspense fallback={null}>
          <RouteProgress />
        </Suspense>
        <StoreProvider>
          <QuickViewProvider>
          <DemoNotice />
          <Navbar />
          <main id="main" tabIndex={-1} className="outline-none">
            {children}
          </main>
          <Footer />
          <MobileActionBar />
          <BasketDrawer />
          </QuickViewProvider>
        </StoreProvider>
        <StoreJsonLd />
      </body>
    </html>
  );
}
