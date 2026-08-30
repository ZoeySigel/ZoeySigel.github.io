import Link from "next/link";

import { USER } from "@/content/profile";

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="shell footer-inner">
        <p>© 2026 {USER.name}. 静态生成，持续更新。</p>
        <div>
          <Link href="/rss.xml">RSS</Link>
          <a href={USER.githubUrl} target="_blank" rel="noreferrer">
            GitHub
          </a>
        </div>
      </div>
    </footer>
  );
}
