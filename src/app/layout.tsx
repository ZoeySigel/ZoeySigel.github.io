import "@fontsource-variable/bricolage-grotesque";
import "@fontsource/ibm-plex-mono/400.css";
import "@fontsource/ibm-plex-mono/600.css";
import "@fontsource-variable/noto-sans-sc";
import "@/styles/globals.css";

import type { Metadata, Viewport } from "next";

import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { ThemeProvider } from "@/components/theme-provider";
import { USER } from "@/content/profile";

export const metadata: Metadata = {
  metadataBase: new URL(USER.siteUrl),
  title: {
    default: `${USER.name} · 个人主页`,
    template: `%s · ${USER.name}`,
  },
  description:
    "ZoeySigel 的个人主页：项目、经历、技术栈与技术写作。当前部分内容为待替换占位信息。",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: `${USER.name} · 个人主页`,
    description: "项目、经历、技术栈与技术写作。",
    url: USER.siteUrl,
    siteName: USER.name,
    locale: "zh_CN",
    type: "website",
    images: [{ url: "/og-image.svg", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: `${USER.name} · 个人主页`,
    description: "项目、经历、技术栈与技术写作。",
    images: ["/og-image.svg"],
  },
  icons: {
    icon: "/favicon.svg",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  colorScheme: "light dark",
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#F5F7FB" },
    { media: "(prefers-color-scheme: dark)", color: "#0D1422" },
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="zh-CN" suppressHydrationWarning>
      <body>
        <ThemeProvider>
          <a className="skip-link" href="#main-content">
            跳到主要内容
          </a>
          <SiteHeader />
          {children}
          <SiteFooter />
        </ThemeProvider>
      </body>
    </html>
  );
}
