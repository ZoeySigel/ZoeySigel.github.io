import Link from "next/link";

export default function NotFound() {
  return (
    <main className="not-found shell" id="main-content">
      <p>404 / MISSING ENTRY</p>
      <h1>这条记录不存在。</h1>
      <span>链接可能已移动，或这篇文章还没有发布。</span>
      <Link className="button button-primary" href="/">
        返回首页
      </Link>
    </main>
  );
}
