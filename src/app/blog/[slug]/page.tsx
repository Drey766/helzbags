import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { brand } from "@/config/brand";
import { getPost, postCover, posts } from "@/lib/blog";
import { fillTokens } from "@/lib/content";
import { productAlt } from "@/lib/products";
import { SmartImage } from "@/components/ui/SmartImage";
import { DraftBadge } from "@/components/ui/DraftBadge";
import { SidePanelBlock } from "@/components/brand/SidePanelBlock";
import { GoldWave } from "@/components/brand/GoldWave";
import { PostCard } from "@/components/blog/PostCard";

export function generateStaticParams() {
  return posts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: PageProps<"/blog/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) return { title: "Post not found" };
  return { title: post.title, description: post.excerpt, alternates: { canonical: `/blog/${post.slug}` } };
}

// Every slug is prerendered; awaiting params up front lets unknown slugs return a real 404.
export const instant = false;

export default async function PostPage({ params }: PageProps<"/blog/[slug]">) {
  return <PostContent params={params} />;
}

async function PostContent({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) notFound();
  const cover = postCover(post);
  const more = posts.filter((p) => p.slug !== post.slug).slice(0, 3);

  return (
    <>
      <article>
        <header className="velvet" data-tone="dark">
          <div className="container-hz max-w-4xl pb-4 pt-10 md:pt-16">
            <nav aria-label="Breadcrumb" className="text-sm text-muted-on-dark">
              <Link href="/blog" className="hover:text-surface">
                Blog
              </Link>
            </nav>
            <h1 className="display mt-4 text-[2.5rem] leading-[1.08] text-surface md:text-6xl">{post.title}</h1>
            <p className="mt-4 text-muted-on-dark">
              {post.readMinutes} min read <DraftBadge />
            </p>
          </div>
          <GoldWave tone="primary" height={56} />
        </header>
        {cover && (
          <div className="container-hz max-w-4xl pt-10">
            <div className="relative aspect-[16/9] overflow-hidden rounded-[24px] bg-surface-alt">
              <SmartImage src={cover.images[0]} alt={productAlt(cover)} sizes="(min-width: 1024px) 896px, 100vw" priority />
            </div>
          </div>
        )}
        <div className="container-hz max-w-[44rem] py-12 md:py-16">
          <p className="display text-2xl leading-snug text-primary">{post.excerpt}</p>
          <div className="prose-hz mt-6 text-[1.075rem] leading-[1.8] text-ink">
            {post.body.map((b, i) =>
              b.type === "h2" ? (
                <h2 key={i}>{b.text}</h2>
              ) : b.type === "ul" ? (
                <ul key={i}>
                  {b.items.map((it) => (
                    <li key={it}>{fillTokens(it)}</li>
                  ))}
                </ul>
              ) : (
                <p key={i}>{fillTokens(b.text)}</p>
              ),
            )}
          </div>
          <SidePanelBlock className="mt-12">
            <p className="text-sm text-muted">{brand.articleNotice}</p>
          </SidePanelBlock>
        </div>
      </article>
      <section className="bg-surface-alt py-16" aria-labelledby="more-title">
        <div className="container-hz">
          <h2 id="more-title" className="display text-3xl text-primary">
            More notes
          </h2>
          <ul className="mt-8 grid gap-10 md:grid-cols-3 md:gap-8">
            {more.map((p) => (
              <li key={p.slug}>
                <PostCard post={p} />
              </li>
            ))}
          </ul>
        </div>
      </section>
    </>
  );
}
