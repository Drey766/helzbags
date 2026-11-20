import Link from "next/link";
import { postCover, type BlogPost } from "@/lib/blog";
import { productAlt } from "@/lib/products";
import { SmartImage } from "@/components/ui/SmartImage";
import { DraftBadge } from "@/components/ui/DraftBadge";

export function PostCard({ post }: { post: BlogPost }) {
  const cover = postCover(post);
  return (
    <article className="group">
      <Link href={`/blog/${post.slug}`} className="block">
        <div className="relative aspect-[4/3] overflow-hidden rounded-[20px] bg-primary">
          {cover ? (
            <SmartImage
              src={cover.images[0]}
              alt={productAlt(cover)}
              sizes="(min-width: 768px) 33vw, 100vw"
              className="transition-transform duration-700 group-hover:scale-[1.03]"
            />
          ) : (
            <span className="velvet absolute inset-0" />
          )}
        </div>
        <p className="mt-4 text-sm text-muted">{post.readMinutes} min read <DraftBadge /></p>
        <h3 className="display mt-1 text-2xl leading-tight text-primary group-hover:text-primary-raised">{post.title}</h3>
        <p className="mt-2 text-muted">{post.excerpt}</p>
      </Link>
    </article>
  );
}
