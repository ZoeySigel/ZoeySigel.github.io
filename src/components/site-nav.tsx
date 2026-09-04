"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const NAV_ITEMS = [
  { href: "/", label: "主页", matches: (pathname: string) => pathname === "/" },
  {
    href: "/products/",
    label: "产品",
    matches: (pathname: string) =>
      pathname === "/products" || pathname.startsWith("/products/"),
  },
];

export function SiteNav() {
  const pathname = usePathname();

  return (
    <nav className="main-nav" aria-label="主导航">
      {NAV_ITEMS.map((item) => {
        const active = item.matches(pathname);

        return (
          <Link
            key={item.href}
            href={item.href}
            data-active={active}
            aria-current={active ? "page" : undefined}
          >
            {item.label}
          </Link>
        );
      })}
    </nav>
  );
}
