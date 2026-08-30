import type { Metadata } from "next";
import Link from "next/link";

import { formatPostDate, getAllPosts } from "@/lib/posts";

export const metadata: Metadata = {
  title: "博客",
  description: "关于开发、设计决策与工程实践的写作记录。",
  alternates: { canonical: "/blog/" },
};

export default function BlogPage() {
  const posts = getAllPosts();

  return (
    <main className="page-main shell" id="main-content">
      <header className="page-intro">
        <p>WRITING LOG</p>
        <h1>博客</h1>
        <span>记录问题、约束、决策和结果，不把术语当作结论。</span>
      </header>
      <div className="blog-index">
        {posts.map((post) => (
          <Link href={`/blog/${post.slug}/`} key={post.slug}>
            <time dateTime={post.metadata.publishedAt}>
              {formatPostDate(post.metadata.publishedAt)}
            </time>
            <h2>{post.metadata.title}</h2>
            <p>{post.metadata.description}</p>
            <ul aria-label="文章标签">
              {post.metadata.tags.map((tag) => (
                <li key={tag}>{tag}</li>
              ))}
            </ul>
          </Link>
        ))}
      </div>
    </main>
  );
}
