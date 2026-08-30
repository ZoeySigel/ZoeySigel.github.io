import { USER } from "@/content/profile";
import { getAllPosts } from "@/lib/posts";

export const dynamic = "force-static";

function escapeXml(value: string): string {
  return value.replace(/[<>&'\"]/g, (character) => {
    const entities: Record<string, string> = {
      "<": "&lt;",
      ">": "&gt;",
      "&": "&amp;",
      "'": "&apos;",
      '"': "&quot;",
    };
    return entities[character];
  });
}

export function GET() {
  const items = getAllPosts()
    .map((post) => {
      const url = `${USER.siteUrl}/blog/${post.slug}/`;
      return `
        <item>
          <title>${escapeXml(post.metadata.title)}</title>
          <link>${url}</link>
          <guid>${url}</guid>
          <pubDate>${new Date(`${post.metadata.publishedAt}T00:00:00Z`).toUTCString()}</pubDate>
          <description>${escapeXml(post.metadata.description)}</description>
        </item>`;
    })
    .join("");

  const xml = `<?xml version="1.0" encoding="UTF-8" ?>
    <rss version="2.0">
      <channel>
        <title>${USER.name} · 技术博客</title>
        <link>${USER.siteUrl}/blog/</link>
        <description>关于开发、设计决策与工程实践的写作记录。</description>
        <language>zh-CN</language>
        ${items}
      </channel>
    </rss>`;

  return new Response(xml, {
    headers: { "Content-Type": "application/rss+xml; charset=utf-8" },
  });
}
