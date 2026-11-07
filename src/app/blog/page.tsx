import type { Metadata } from "next";

import { PostList } from "@/components/post-list";
import { getPosts } from "@/lib/posts";

export const metadata: Metadata = {
  title: "Blog",
  description: "技术笔记、项目记录，还有一些零散想法。",
  alternates: { canonical: "/blog/" },
};

export default function BlogPage() {
  const posts = getPosts();

  return (
    <main className="page-main shell" id="main-content">
      <header className="page-intro blog-intro">
        <p>NOTES & IDEAS / {String(posts.length).padStart(2, "0")} POSTS</p>
        <h1>
          Blog<span aria-hidden="true">_</span>
        </h1>
        <span>技术笔记、项目记录，还有一些零散想法。</span>
      </header>
      <PostList posts={posts} />
      <p className="blog-endnote">记录一点，积累一点。</p>
    </main>
  );
}
