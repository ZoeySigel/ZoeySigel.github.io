import {
  siCss,
  siDocker,
  siExpress,
  siGin,
  siGithubactions,
  siGo,
  siHtml5,
  siJavascript,
  type SimpleIcon,
  siNextdotjs,
  siNodedotjs,
  siReact,
  siTailwindcss,
  siTypescript,
  siVuedotjs,
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
  HTML5: {
    href: "https://developer.mozilla.org/docs/Web/HTML",
    icon: siHtml5,
  },
  CSS3: {
    href: "https://developer.mozilla.org/docs/Web/CSS",
    icon: siCss,
  },
  Golang: { href: "https://go.dev/", icon: siGo },
  React: { href: "https://react.dev/", icon: siReact },
  "Next.js": {
    href: "https://nextjs.org/",
    icon: siNextdotjs,
    monochrome: true,
  },
  "Tailwind CSS": { href: "https://tailwindcss.com/", icon: siTailwindcss },
  Vue: { href: "https://vuejs.org/", icon: siVuedotjs },
  "Node.js": { href: "https://nodejs.org/", icon: siNodedotjs },
  Express: {
    href: "https://expressjs.com/",
    icon: siExpress,
    monochrome: true,
  },
  Gin: { href: "https://gin-gonic.com/", icon: siGin },
  "GitHub Actions": {
    href: "https://github.com/features/actions",
    icon: siGithubactions,
  },
  Docker: { href: "https://www.docker.com/", icon: siDocker },
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

          if (!brand) return null;

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
                  brand.monochrome ? undefined : { color: `#${brand.icon.hex}` }
                }
              >
                <BrandLogo icon={brand.icon} />
              </a>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
