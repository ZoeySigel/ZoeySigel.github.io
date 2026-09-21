import { ArrowLeft, ExternalLink, Feather } from "lucide-react";
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
        <span>正在做的东西。</span>
      </header>

      <section className="product-showcase" aria-labelledby="product-title">
        <article className="product-card">
          <div className="product-icon" aria-hidden="true">
            <Feather />
          </div>
          <p>PRODUCT SHELF / 01</p>
          <h2 id="product-title">Owl</h2>
          <span>owl-et.me</span>
          <div className="product-card-actions">
            <a href="https://owl-et.me/" target="_blank" rel="noreferrer">
              访问产品 <ExternalLink aria-hidden="true" />
            </a>
            <Link href="/">
              <ArrowLeft aria-hidden="true" /> 返回主页
            </Link>
          </div>
        </article>
      </section>
    </main>
  );
}
