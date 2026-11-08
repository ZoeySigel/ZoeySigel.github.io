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
  readingMinutes: number;
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
    slug: "keeping-a-static-blog-simple",
    title: "一个静态博客的整理方式",
    description:
      "把文章内容、列表和首页推荐连在一起，让每次更新都少做几件重复的事。",
    date: "2026-11-06",
    readingMinutes: 2,
    tags: ["开发笔记", "示例文章"],
    content: (
      <>
        <p className="article-lead">
          这是第二篇示例文章，用来检查不同文章之间的跳转，以及首页最新文章的排序。
        </p>
        <h2>一份内容，几个入口</h2>
        <p>
          同一篇文章会出现在博客列表、首页的最新文章区域，也会拥有自己的详情页。标题、摘要和日期放在同一份数据里，这几个入口就可以一起更新。
        </p>
        <p>
          首页只取日期最新的两篇，博客页面展示全部文章。以后增加第三篇时，不需要再手动修改首页的文章链接。
        </p>
        <h2>给每篇文章一个稳定的地址</h2>
        <p>
          标题可以修改，链接尽量保持稳定。为文章单独设置一个简短的
          slug，可以让标题和地址各自承担自己的工作。
        </p>
        <pre>
          <code>
            {"/blog/a-place-for-notes/\n/blog/keeping-a-static-blog-simple/"}
          </code>
        </pre>
        <p>
          文章详情会在构建时生成成静态页面，所以从列表点击进入和直接打开文章地址，都有对应的页面可以访问。
        </p>
        <h2>发布前走一遍阅读路径</h2>
        <ul>
          <li>从顶部 Blog 按钮进入列表，确认标题和摘要。</li>
          <li>打开文章，检查正文、日期和返回列表的入口。</li>
          <li>回到首页，确认开源参与下方展示了最新两篇。</li>
          <li>在手机宽度和深色模式下，检查内容是否仍然易读。</li>
        </ul>
        <p>把这些基础环节整理好，后续更新就可以把注意力留给文章本身。</p>
      </>
    ),
  },
];
