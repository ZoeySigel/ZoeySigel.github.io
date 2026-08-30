import fs from "node:fs";
import path from "node:path";

import matter from "gray-matter";

export type PostMetadata = {
  title: string;
  description: string;
  publishedAt: string;
  tags: string[];
};

export type Post = {
  slug: string;
  metadata: PostMetadata;
  content: string;
};

const postsDirectory = path.join(process.cwd(), "src", "content", "posts");

function parseMetadata(data: Record<string, unknown>): PostMetadata {
  const title = String(data.title ?? "");
  const description = String(data.description ?? "");
  const publishedAt =
    data.publishedAt instanceof Date
      ? data.publishedAt.toISOString().slice(0, 10)
      : String(data.publishedAt ?? "");
  const tags = Array.isArray(data.tags) ? data.tags.map(String) : [];

  if (!title || !description || !publishedAt) {
    throw new Error(
      "Blog frontmatter requires title, description and publishedAt"
    );
  }

  return { title, description, publishedAt, tags };
}

export function getPostSlugs(): string[] {
  return fs
    .readdirSync(postsDirectory)
    .filter((fileName) => fileName.endsWith(".mdx"))
    .map((fileName) => fileName.replace(/\.mdx$/, ""));
}

export function getPost(slug: string): Post {
  const filePath = path.join(postsDirectory, `${slug}.mdx`);
  const source = fs.readFileSync(filePath, "utf8");
  const { content, data } = matter(source);

  return {
    slug,
    content,
    metadata: parseMetadata(data),
  };
}

export function getAllPosts(): Post[] {
  return getPostSlugs()
    .map(getPost)
    .sort((a, b) =>
      b.metadata.publishedAt.localeCompare(a.metadata.publishedAt)
    );
}

export function formatPostDate(date: string): string {
  return new Intl.DateTimeFormat("zh-CN", {
    dateStyle: "long",
    timeZone: "UTC",
  }).format(new Date(`${date}T00:00:00Z`));
}
