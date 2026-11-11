import { readFileSync } from "node:fs";
import { join } from "node:path";

import type { ReactNode } from "react";

import { ArticleMarkdown } from "@/components/article-markdown";

const aiCodingArticle = readFileSync(
  join(process.cwd(), "src/content/posts/ai-coding-engineering.md"),
  "utf8"
);

export type Post = {
  slug: string;
  title: string;
  description: string;
  date: string;
  readingMinutes?: number;
  tags: string[];
  content: ReactNode;
};

// slug 是文章的永久链接，发布后应保持稳定。
export const POSTS: Post[] = [
  {
    slug: "a-place-for-notes",
    title: aiCodingArticle.split(/\r?\n/)[0].replace(/^# /, ""),
    description:
      "关于上下文工程、Spec 驱动开发、Agent Harness、测试验证与人机协作的系统整理。",
    date: "2026-11-08",
    readingMinutes: 22,
    tags: ["AI Coding", "工程实践"],
    content: (
      <ArticleMarkdown
        source={aiCodingArticle.replace(/^# [^\r\n]+\r?\n/, "").trim()}
      />
    ),
  },
  {
    slug: "algorithm-learning",
    title: "算法学习",
    description: "",
    date: "2026-11-11",
    tags: [],
    content: (
      <ArticleMarkdown
        source={readFileSync(
          join(process.cwd(), "src/content/posts/algorithm-learning.md"),
          "utf8"
        )}
      />
    ),
  },
];
