import { ArrowUpRight } from "lucide-react";
import Link from "next/link";

import type { Post } from "@/content/posts";
import { formatPostDate } from "@/lib/posts";

export function PostList({ posts }: { posts: Post[] }) {
  return (
    <ul className="post-list">
      {posts.map((post) => (
        <li key={post.slug}>
          <Link className="post-entry" href={`/blog/${post.slug}/`}>
            <div className="post-meta">
              <time dateTime={post.date}>{formatPostDate(post.date)}</time>
              <span>{post.readingMinutes} 分钟阅读</span>
            </div>
            <div className="post-copy">
              <div className="post-tags">{post.tags.join(" / ")}</div>
              <h2>{post.title}</h2>
              <p>{post.description}</p>
            </div>
            <ArrowUpRight className="post-arrow" aria-hidden="true" />
          </Link>
        </li>
      ))}
    </ul>
  );
}
