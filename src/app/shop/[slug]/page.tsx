import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { MapPin } from "lucide-react";
import { brand, hasPolicy, mapsUrl } from "@/config/brand";
import { getCategory, getOccasion, getProduct, getProducts, getRelated } from "@/lib/products";
import { carryLabels, sizeLabels } from "@/lib/format";
import { Gallery } from "@/components/product/Gallery";
import { ProductActions } from "@/components/product/ProductActions";
import { FitsRow } from "@/components/product/FitsRow";
import { OwnPlaceholder } from "@/components/product/OwnPlaceholder";
import { ProductCard } from "@/components/product/ProductCard";
import { RecentlyViewed } from "@/components/product/RecentlyViewed";
import { HandleArch } from "@/components/brand/HandleArch";
import { TillCard } from "@/components/brand/TillCard";
import { SidePanelBlock } from "@/components/brand/SidePanelBlock";
import { SampleTag } from "@/components/ui/SampleTag";
import { Price } from "@/components/ui/Price";
import { DraftBadge } from "@/components/ui/DraftBadge";

export function generateStaticParams() {
  return getProducts().map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: PageProps<"/shop/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const p = getProduct(slug);
  if (!p) return { title: "Bag not found" };
  return {
    title: p.name,
    description: p.summary || `${p.name} from ${brand.name}. Order on WhatsApp.`,
    alternates: { canonical: `/shop/${p.slug}` },
    openGraph: p.images[0] ? { images: [{ url: p.images[0], alt: p.name }] } : undefined,
  };
}

// Every slug is prerendered; awaiting params up front lets unknown slugs return a real 404.
export const instant = false;

export default async function ProductPage({ params }: PageProps<"/shop/[slug]">) {
  return <ProductContent params={params} />;
}


async function ProductContent({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const p = getProduct(slug);
  if (!p) notFound();

  const category = getCategory(p.category);
  const related = getRelated(p, 4);

  return (
    <>
      <div className="container-hz pb-16 pt-6 md:pt-10">
        <nav aria-label="Breadcrumb" className="text-sm text-muted">
          <ol className="flex flex-wrap items-center gap-2">
            <li>
              <Link href="/" className="hover:text-primary">Home</Link>
            </li>
            <li aria-hidden="true">/</li>
            <li>
              <Link href="/shop" className="hover:text-primary">Shop</Link>
            </li>
            {category && (
              <>
                <li aria-hidden="true">/</li>
                <li>
                  <Link href={`/shop?category=${category.key}`} className="hover:text-primary">
                    {category.name}
                  </Link>
                </li>
              </>
            )}
          </ol>
        </nav>

        <div className="mt-6 grid gap-10 lg:grid-cols-[1.1fr_1fr] lg:gap-16">
          <div className="lg:sticky lg:top-28 lg:self-start">
            {p.images.length ? (
              <Gallery product={p} />
            ) : (
              <HandleArch frameClassName="aspect-[4/5] bg-primary" className="mx-auto max-w-[520px]">
                <OwnPlaceholder name={p.name} size="lg" />
              </HandleArch>
            )}
          </div>

          <div>
            <div className="flex flex-wrap items-center gap-2">
              <SampleTag product={p} />
              {p.isNew && (
                <span className="rounded-full bg-surface-soft px-2.5 py-1 text-[11px] font-medium uppercase leading-none tracking-[0.14em] text-primary">
                  New
                </span>
              )}
              {p.nameConfirmed === false && <DraftBadge label="Name to confirm" />}
            </div>
            <h1 className="display mt-3 text-[2.6rem] leading-[1.05] text-primary md:text-6xl">{p.name}</h1>
            <Price product={p} size="lg" className="mt-3" />
            <ul className="mt-4 flex flex-wrap gap-2 text-sm text-muted" aria-label="Tags">
              {category && <li className="rounded-full border border-line px-3 py-1">{category.name}</li>}
              {p.occasions.map((o) => (
                <li key={o}>
                  <Link href={`/shop?occasion=${o}`} className="inline-block rounded-full border border-line px-3 py-1 hover:border-primary hover:text-primary">
                    {getOccasion(o)?.name ?? o}
                  </Link>
                </li>
              ))}
              {p.size && <li className="rounded-full border border-line px-3 py-1">{sizeLabels[p.size]}</li>}
            </ul>

            {p.summary && p.status === "sample" && <p className="mt-6 text-lg leading-relaxed text-ink">{p.summary}</p>}
            {p.status === "own" && p.description && (
              <SidePanelBlock as="blockquote" className="mt-6">
                <p className="display text-2xl italic leading-snug text-ink">&ldquo;{p.description}&rdquo;</p>
                <footer className="mt-2 text-sm text-muted">{brand.name}</footer>
              </SidePanelBlock>
            )}

            <div className="mt-8">
              <ProductActions product={p} />
            </div>

            <div className="mt-10 space-y-8">
              <FitsRow fits={p.fits} />

              {p.carry.length > 0 && (
                <div>
                  <h2 className="eyebrow text-accent-text">How to carry</h2>
                  <ul className="mt-3 flex flex-wrap gap-2">
                    {p.carry.map((c) => (
                      <li key={c} className="rounded-full bg-surface-alt px-4 py-2 text-sm text-primary">
                        {carryLabels[c]}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {(p.status === "sample" ? p.description || p.features.length > 0 : p.features.length > 0) && (
                <div>
                  <h2 className="eyebrow text-accent-text">{p.status === "own" ? `Details, in ${brand.name}' words` : "Details"}</h2>
                  {p.status === "sample" && p.description && <p className="mt-3 leading-relaxed text-ink">{p.description}</p>}
                  {p.features.length > 0 && (
                    <ul className="prose-hz mt-3 text-ink">
                      {p.features.map((f) => (
                        <li key={f}>{f}</li>
                      ))}
                    </ul>
                  )}
                </div>
              )}

              <TillCard />

              {hasPolicy && (
                <p className="text-sm text-muted">
                  <span className="text-ink">
                    {brand.policy.refunds} {brand.policy.exchange}
                  </span>{" "}
                  {brand.policyHelp}
                </p>
              )}

              <p className="text-sm text-muted">{brand.ownWords.delivery}</p>

              <div className="rounded-2xl bg-surface-alt p-5">
                <h2 className="display text-2xl text-primary">See it at our pick-up point</h2>
                <ul className="mt-3 space-y-1">
                  {brand.shops.map((s) => (
                    <li key={s.key}>
                      <a
                        href={mapsUrl(s)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex min-h-11 items-center gap-2 text-ink hover:text-primary"
                      >
                        <MapPin aria-hidden="true" className="h-4 w-4 text-primary" strokeWidth={1.5} />
                        {s.mall}, {s.floor}, {s.unit}, {s.street}
                        <span className="sr-only">(opens Google Maps)</span>
                      </a>
                    </li>
                  ))}
                </ul>
                <p className="mt-2 text-sm text-muted">{brand.shops[0].landmark}. Send a WhatsApp message first to check the bag is there.</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {related.length > 0 && (
        <section className="bg-surface-alt py-16 md:py-24" aria-labelledby="related-title">
          <div className="container-hz">
            <h2 id="related-title" className="display h-section text-primary">
              You may also <em className="text-primary-raised">like</em>
            </h2>
            <ul className="mt-10 grid grid-cols-2 gap-x-3 gap-y-10 md:grid-cols-4 md:gap-x-6">
              {related.map((r) => (
                <li key={r.id}>
                  <ProductCard product={r} />
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}
      <div className="pt-16">
        <RecentlyViewed current={p.slug} />
      </div>
    </>
  );
}
