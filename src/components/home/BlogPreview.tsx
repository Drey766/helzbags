import Link from "next/link";
import { posts } from "@/lib/blog";
import { PostCard } from "@/components/blog/PostCard";
import { SectionHeading } from "./SectionHeading";

export function BlogPreview() {
  return (
    <section className="section" aria-labelledby="blog-preview-title">
      <div className="container-zb">
        <SectionHeading
          title={<span id="blog-preview-title">Style and care notes</span>}
          action={
            <Link href="/blog" className="btn btn-outline btn-sm">
              Read the blog
            </Link>
          }
        />
        <ul className="mt-10 grid gap-10 md:grid-cols-3 md:gap-8">
          {posts.slice(0, 3).map((p) => (
            <li key={p.slug}>
              <PostCard post={p} />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
