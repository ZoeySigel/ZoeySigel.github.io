import {
  Braces,
  CircleHelp,
  CloudUpload,
  Database,
  FlaskConical,
  type LucideIcon,
} from "lucide-react";
import {
  siGithubactions,
  siJavascript,
  type SimpleIcon,
  siNextdotjs,
  siNodedotjs,
  siReact,
  siTailwindcss,
  siTypescript,
} from "simple-icons";

type StackGroup = {
  label: string;
  items: readonly string[];
};

type BrandEntry = {
  href: string;
  icon: SimpleIcon;
  monochrome?: boolean;
};

const BRAND_ICONS: Record<string, BrandEntry> = {
  TypeScript: {
    href: "https://www.typescriptlang.org/",
    icon: siTypescript,
  },
  JavaScript: {
    href: "https://developer.mozilla.org/docs/Web/JavaScript",
    icon: siJavascript,
  },
  React: { href: "https://react.dev/", icon: siReact },
  "Next.js": {
    href: "https://nextjs.org/",
    icon: siNextdotjs,
    monochrome: true,
  },
  "Tailwind CSS": { href: "https://tailwindcss.com/", icon: siTailwindcss },
  "Node.js": { href: "https://nodejs.org/", icon: siNodedotjs },
  "GitHub Actions": {
    href: "https://github.com/features/actions",
    icon: siGithubactions,
  },
};

const PLACEHOLDER_ICONS: Record<string, LucideIcon> = {
  请补充: CircleHelp,
  数据库待补充: Database,
  "API 设计": Braces,
  静态部署: CloudUpload,
  测试方案待补充: FlaskConical,
};

function BrandLogo({ icon }: { icon: SimpleIcon }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d={icon.path} fill="currentColor" />
    </svg>
  );
}

export function TechStackGrid({ groups }: { groups: readonly StackGroup[] }) {
  const items = groups.flatMap((group) => group.items);

  return (
    <div className="stack-logo-panel" id="stack-title">
      <ul aria-label="技术栈列表">
        {items.map((item) => {
          const brand = BRAND_ICONS[item];

          if (brand) {
            return (
              <li key={item}>
                <a
                  className="stack-logo-item"
                  data-label={item}
                  data-monochrome={brand.monochrome || undefined}
                  href={brand.href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={`${item} 官方网站`}
                  style={
                    brand.monochrome
                      ? undefined
                      : { color: `#${brand.icon.hex}` }
                  }
                >
                  <BrandLogo icon={brand.icon} />
                </a>
              </li>
            );
          }

          const PlaceholderIcon = PLACEHOLDER_ICONS[item] ?? CircleHelp;

          return (
            <li key={item}>
              <span
                className="stack-logo-item stack-logo-placeholder"
                data-label={item}
                role="img"
                aria-label={item}
              >
                <PlaceholderIcon aria-hidden="true" />
              </span>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
