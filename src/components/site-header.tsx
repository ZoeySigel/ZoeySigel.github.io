import { Github } from "lucide-react";
import Link from "next/link";

import { CommandMenu } from "@/components/command-menu";
import { SiteHeaderWrapper } from "@/components/site-header-wrapper";
import { ZSMark } from "@/components/zs-mark";
import { getAllPosts } from "@/lib/posts";

export function SiteHeader() {
  const postItems = getAllPosts().map((post) => ({
    label: post.metadata.title,
    detail: "博客文章",
    href: `/blog/${post.slug}/`,
  }));
  const commandItems = [
    { label: "首页", detail: "个人主页", href: "/" },
    { label: "精选项目", detail: "查看代表项目", href: "/#work" },
    { label: "经历", detail: "工作与教育", href: "/#experience" },
    { label: "技术栈", detail: "常用工具", href: "/#stack" },
    { label: "联系", detail: "联系方式", href: "/#contact" },
    ...postItems,
  ];

  return (
    <SiteHeaderWrapper>
      <div className="frame header-inner">
        <Link className="wordmark" href="/" aria-label="ZoeySigel 首页">
          <ZSMark />
        </Link>
        <nav className="main-nav" aria-label="主导航">
          <Link href="/">主页</Link>
          <Link href="/blog/">博客</Link>
        </nav>
        <CommandMenu items={commandItems} />
        <a
          className="header-github"
          href="https://github.com/ZoeySigel"
          target="_blank"
          rel="noreferrer"
          aria-label="打开 ZoeySigel 的 GitHub 主页"
          title="GitHub"
        >
          <Github aria-hidden="true" />
        </a>
      </div>
    </SiteHeaderWrapper>
  );
}
