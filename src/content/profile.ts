export type Project = {
  title: string;
  summary: string;
  href: string;
  period: string;
  stack: string[];
  defaultOpen?: boolean;
  icon?: string;
  placeholder?: boolean;
};

export type Experience = {
  organization: string;
  role: string;
  period: string;
  summary: string;
  defaultOpen?: boolean;
  icon?: string;
  placeholder?: boolean;
};

export type SocialLink = {
  label: string;
  value: string;
  href: string;
  icon: "github" | "mail";
  placeholder?: boolean;
};

export const USER = {
  name: "Zoey Sigel",
  handle: "@ZoeySigel",
  role: "前端开发/Web全栈开发",
  location: "湖南 · 长沙",
  availability: "寻找实习机会中",
  flipSentences: [
    "Web Developer",
    "Full-stack Developer",
    "AI Application Developer",
  ],
  bio: "我是一名湖南大学在读学生，正在寻找前端/全栈开发实习机会",
  about: ["熟悉React、Vue及相关生态", "熟悉使用Node.js、Express、Next.js开发"],
  githubUrl: "https://github.com/ZoeySigel",
  siteUrl: "https://ZoeySigel.github.io",
} as const;

export const PROJECTS: Project[] = [
  {
    title: "代表项目名称",
    summary:
      "说明项目服务的对象、你负责的核心部分，以及最终带来的可验证结果。当前为占位项目。",
    href: "#contact",
    period: "项目年份 · 待补充",
    stack: ["TypeScript", "Next.js", "数据层待补充"],
    defaultOpen: true,
    icon: "01",
    placeholder: true,
  },
  {
    title: "开源或个人项目",
    summary:
      "介绍你为什么做这个项目、最难的技术问题是什么，以及访问源码或演示的方式。当前为占位项目。",
    href: "#contact",
    period: "项目年份 · 待补充",
    stack: ["React", "Node.js", "部署方案待补充"],
    icon: "02",
    placeholder: true,
  },
  {
    title: "一次技术改造",
    summary:
      "用问题、行动、结果的顺序描述一次性能、架构或体验改造。当前为占位项目。",
    href: "#contact",
    period: "项目年份 · 待补充",
    stack: ["性能优化", "工程化", "可观测性"],
    icon: "03",
    placeholder: true,
  },
];

export const EXPERIENCES: Experience[] = [
  {
    organization: "广州浩传网络科技有限公司",
    role: "Web开发实习生",
    period: "2026/7 — 2026/9",
    summary: "进行web开发。",
    defaultOpen: true,
    icon: "/experience/haochuan.png",
    placeholder: true,
  },
  {
    organization: "湖南大学",
    role: "计算机科学与技术",
    period: "2024 — 2028",
    summary: "努力学习！",
    icon: "/experience/hunan-university.png",
    placeholder: true,
  },
];

export const TECH_STACK = [
  {
    label: "常用语言",
    items: ["TypeScript", "JavaScript", "HTML5", "CSS3", "Golang"],
  },
  {
    label: "前端与体验",
    items: ["React", "Next.js", "Tailwind CSS", "Vue"],
  },
  {
    label: "服务与数据",
    items: ["Node.js", "Express", "Gin"],
  },
  {
    label: "工程与交付",
    items: ["GitHub Actions", "Docker"],
  },
] as const;

export const SOCIAL_LINKS: SocialLink[] = [
  {
    label: "GitHub",
    value: "@ZoeySigel",
    href: "https://github.com/ZoeySigel",
    icon: "github",
  },
  {
    label: "邮箱",
    value: "2696407757@qq.com",
    href: "mailto:2696407757@qq.com",
    icon: "mail",
    placeholder: true,
  },
];
