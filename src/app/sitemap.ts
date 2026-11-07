import type { MetadataRoute } from "next";

import { USER } from "@/content/profile";
import { getPosts } from "@/lib/posts";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: `${USER.siteUrl}/`, lastModified: new Date("2026-08-30") },
    {
      url: `${USER.siteUrl}/products/`,
      lastModified: new Date("2026-09-04"),
    },
    {
      url: `${USER.siteUrl}/blog/`,
      lastModified: new Date(getPosts()[0].date),
    },
    ...getPosts().map((post) => ({
      url: `${USER.siteUrl}/blog/${post.slug}/`,
      lastModified: new Date(post.date),
    })),
  ];
}
