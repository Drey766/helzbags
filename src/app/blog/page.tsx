import type { Metadata } from "next";
import { posts } from "@/lib/blog";
import { PageHero } from "@/components/layout/PageHero";
import { PostCard } from "@/components/blog/PostCard";

export const metadata: Metadata = {
  title: "Blog",
  description: "Styling and care notes for handbags, from Zuri Bags.",
};

export default function BlogPage() {
  return (
    <>
      <PageHero
        title={
          <>
            Style and care <em className="text-gold-light">notes</em>
          </>
        }
        intro="Short reads on choosing, wearing and caring for a handbag."
      />
      <section className="section">
        <ul className="container-zb grid gap-12 md:grid-cols-2 md:gap-8 lg:grid-cols-3">
          {posts.map((p) => (
            <li key={p.slug}>
              <PostCard post={p} />
            </li>
          ))}
        </ul>
      </section>
    </>
  );
}
