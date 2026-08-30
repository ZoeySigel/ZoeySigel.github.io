import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import rehypePrettyCode from "rehype-pretty-code";
import rehypeSlug from "rehype-slug";
import remarkGfm from "remark-gfm";

import { formatPostDate, getPost, getPostSlugs } from "@/lib/posts";

type BlogPostPageProps = {
  params: Promise<{ slug: string }>;
};

export const dynamicParams = false;

export function generateStaticParams() {
  return getPostSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params;
  if (!getPostSlugs().includes(slug)) return {};
  const post = getPost(slug);

  return {
    title: post.metadata.title,
    description: post.metadata.description,
    alternates: { canonical: `/blog/${slug}/` },
  };
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  if (!getPostSlugs().includes(slug)) notFound();
  const post = getPost(slug);

  return (
    <main className="article-main shell" id="main-content">
      <article>
        <header className="article-header">
          <p>WRITING LOG</p>
          <h1>{post.metadata.title}</h1>
          <span>{post.metadata.description}</span>
          <div>
            <time dateTime={post.metadata.publishedAt}>
              {formatPostDate(post.metadata.publishedAt)}
            </time>
            <ul aria-label="文章标签">
              {post.metadata.tags.map((tag) => (
                <li key={tag}>{tag}</li>
              ))}
            </ul>
          </div>
        </header>
        <div className="prose">
          <MDXRemote
            source={post.content}
            options={{
              mdxOptions: {
                remarkPlugins: [remarkGfm],
                rehypePlugins: [
                  rehypeSlug,
                  [
                    rehypePrettyCode,
                    {
                      theme: {
                        dark: "github-dark",
                        light: "github-light",
                      },
                      keepBackground: false,
                    },
                  ],
                ],
              },
            }}
          />
        </div>
      </article>
    </main>
  );
}
