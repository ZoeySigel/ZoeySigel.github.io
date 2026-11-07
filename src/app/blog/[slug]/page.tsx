import { ArrowLeft, ArrowRight } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { USER } from "@/content/profile";
import { formatPostDate, getPost, getPosts } from "@/lib/posts";

type Props = { params: Promise<{ slug: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return getPosts().map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const post = getPost((await params).slug);
  if (!post) notFound();

  return {
    title: post.title,
    description: post.description,
    alternates: { canonical: `/blog/${post.slug}/` },
    openGraph: {
      type: "article",
      title: post.title,
      description: post.description,
      url: `/blog/${post.slug}/`,
      publishedTime: post.date,
      authors: [USER.name],
    },
    twitter: { title: post.title, description: post.description },
  };
}

export default async function PostPage({ params }: Props) {
  const post = getPost((await params).slug);
  if (!post) notFound();
  const otherPost = getPosts().find((entry) => entry.slug !== post.slug);

  return (
    <main className="page-main shell" id="main-content">
      <article>
        <header className="article-header">
          <Link className="blog-back" href="/blog/">
            <ArrowLeft aria-hidden="true" /> 全部文章
          </Link>
          <div className="post-tags">{post.tags.join(" / ")}</div>
          <h1>{post.title}</h1>
          <p>{post.description}</p>
          <div className="article-meta">
            <span>{USER.name}</span>
            <time dateTime={post.date}>{formatPostDate(post.date)}</time>
            <span>{post.readingMinutes} 分钟阅读</span>
          </div>
        </header>
        <div className="article-body">{post.content}</div>
      </article>
      <nav className="article-footer" aria-label="文章导航">
        <Link className="blog-back" href="/blog/">
          <ArrowLeft aria-hidden="true" /> 返回 Blog
        </Link>
        {otherPost && (
          <Link className="article-next" href={`/blog/${otherPost.slug}/`}>
            <small>继续阅读</small>
            <span>
              {otherPost.title} <ArrowRight aria-hidden="true" />
            </span>
          </Link>
        )}
      </nav>
    </main>
  );
}
