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
  role: "软件开发者 · 方向待补充",
  location: "所在城市 · 待补充",
  availability: "正在整理个人项目与经历",
  flipSentences: ["全栈Web开发工程师", "AI应用开发工程师", "Agent开发工程师"],
  bio: "这里将用两三句话说明你的技术方向、解决过的问题，以及希望与什么样的团队合作。当前内容为安全占位文案。",
  about: [
    "用一段简短、具体的介绍替换这里：你关注的技术领域、工作方式，以及你能为团队带来的价值。",
    "再补充一个能被验证的事实，例如项目规模、职责边界或一次有代表性的技术决策。避免只罗列形容词。",
  ],
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
    organization: "广州浩传科技有限公司",
    role: "Web开发实习生",
    period: "2026/7 — 2026/9",
    summary: "进行web开发。",
    defaultOpen: true,
    icon: "NOW",
    placeholder: true,
  },
  {
    organization: "湖南大学",
    role: "计算机科学与技术",
    period: "2024 — 2028",
    summary: "努力学习！",
    icon: "PREV",
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
    href: "mailto:your-email@example.com",
    icon: "mail",
    placeholder: true,
  },
];
