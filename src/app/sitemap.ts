import type { MetadataRoute } from "next";

import { USER } from "@/content/profile";
import { getAllPosts } from "@/lib/posts";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const posts = getAllPosts().map((post) => ({
    url: `${USER.siteUrl}/blog/${post.slug}/`,
    lastModified: new Date(`${post.metadata.publishedAt}T00:00:00Z`),
  }));

  return [
    { url: `${USER.siteUrl}/`, lastModified: new Date("2026-08-30") },
    { url: `${USER.siteUrl}/blog/`, lastModified: new Date("2026-08-30") },
    ...posts,
  ];
}
