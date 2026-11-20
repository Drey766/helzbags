import blog from "@/data/blog.json";
import { getProducts } from "@/lib/products";

export type BlogBlock = { type: "p" | "h2"; text: string } | { type: "ul"; items: string[] };
export type BlogPost = {
  slug: string;
  status: string;
  title: string;
  excerpt: string;
  occasion: string;
  category: string;
  readMinutes: number;
  body: BlogBlock[];
};

export const posts = (blog as unknown as { posts: BlogPost[] }).posts;

export function getPost(slug: string) {
  return posts.find((p) => p.slug === slug);
}

/** A cover photo for a post from a visible bag in the post's category (or none). */
export function postCover(post: BlogPost) {
  const products = getProducts().filter((p) => p.images.length);
  return products.find((p) => p.category === post.category) ?? products.find((p) => p.occasions.includes(post.occasion as never));
}
