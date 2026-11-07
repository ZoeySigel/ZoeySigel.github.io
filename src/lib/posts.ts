import "server-only";

import { POSTS } from "@/content/posts";

export function getPosts() {
  return [...POSTS].sort(
    (a, b) => b.date.localeCompare(a.date) || a.slug.localeCompare(b.slug)
  );
}

export function getPost(slug: string) {
  return POSTS.find((post) => post.slug === slug);
}

export function formatPostDate(date: string) {
  return date.replaceAll("-", ".");
}
