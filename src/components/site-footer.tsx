import Link from "next/link";

import { ZSMark } from "@/components/zs-mark";
import { USER } from "@/content/profile";

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="frame footer-inner">
        <div className="footer-brand">
          <ZSMark />
          <p>© 2026 {USER.name}. 静态生成，持续更新。</p>
        </div>
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
