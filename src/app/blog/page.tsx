import type { Metadata } from "next";

import { PostList } from "@/components/post-list";
import { getPosts } from "@/lib/posts";

export const metadata: Metadata = {
  title: "Blog",
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
      </header>
      <PostList posts={posts} />
    </main>
  );
}
