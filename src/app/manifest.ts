import type { MetadataRoute } from "next";

export const dynamic = "force-static";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "ZoeySigel · 个人主页",
    short_name: "ZoeySigel",
    description: "项目、经历、技术栈与技术写作。",
    start_url: "/",
    display: "standalone",
    background_color: "#F5F7FB",
    theme_color: "#315BD6",
    lang: "zh-CN",
    icons: [
      {
        src: "/favicon.svg",
        sizes: "any",
        type: "image/svg+xml",
      },
    ],
  };
}
