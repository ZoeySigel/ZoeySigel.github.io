import Link from "next/link";

import { ThemeToggle } from "@/components/theme-toggle";

export function SiteHeader() {
  return (
    <header className="site-header">
      <div className="shell header-inner">
        <Link className="wordmark" href="/" aria-label="ZoeySigel 首页">
          ZS<span aria-hidden="true">/</span>log
        </Link>
        <nav className="main-nav" aria-label="主导航">
          <Link href="/#work">项目</Link>
          <Link href="/#experience">经历</Link>
          <Link href="/blog/">博客</Link>
          <Link href="/#contact">联系</Link>
        </nav>
        <ThemeToggle />
      </div>
    </header>
  );
}
