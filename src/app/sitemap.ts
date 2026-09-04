import type { MetadataRoute } from "next";

import { USER } from "@/content/profile";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: `${USER.siteUrl}/`, lastModified: new Date("2026-08-30") },
    {
      url: `${USER.siteUrl}/products/`,
      lastModified: new Date("2026-09-04"),
    },
  ];
}
