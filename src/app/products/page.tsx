import { ArrowLeft, PackageOpen } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "产品",
  description: "Zoey Sigel 的产品与独立实验。",
  alternates: { canonical: "/products/" },
};

export default function ProductsPage() {
  return (
    <main className="page-main shell" id="main-content">
      <header className="page-intro">
        <p>PRODUCT LOG</p>
        <h1>产品</h1>
        <span>记录正在构建、验证和持续改进的产品。</span>
      </header>

      <section className="product-empty-state" aria-labelledby="product-status">
        <div className="product-empty-card">
          <div className="product-empty-icon" aria-hidden="true">
            <PackageOpen />
          </div>
          <p>PRODUCT SHELF / 00</p>
          <h2 id="product-status">产品正在整理中</h2>
          <span>可公开展示的产品完成后会出现在这里。</span>
          <Link href="/">
            <ArrowLeft aria-hidden="true" /> 返回主页
          </Link>
        </div>
      </section>
    </main>
  );
}
