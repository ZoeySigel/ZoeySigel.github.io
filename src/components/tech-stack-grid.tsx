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
  siMysql,
  siNextdotjs,
  siNodedotjs,
  siRabbitmq,
  siReact,
  siRedis,
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
  icon?: SimpleIcon;
  mark?: "gorm";
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
  MySQL: { href: "https://www.mysql.com/", icon: siMysql },
  Redis: { href: "https://redis.io/", icon: siRedis },
  RabbitMQ: { href: "https://www.rabbitmq.com/", icon: siRabbitmq },
  GORM: {
    href: "https://gorm.io/",
    mark: "gorm",
    monochrome: true,
  },
  "GitHub Actions": {
    href: "https://github.com/features/actions",
    icon: siGithubactions,
  },
  Docker: { href: "https://www.docker.com/", icon: siDocker },
};

function BrandLogo({ brand }: { brand: BrandEntry }) {
  if (brand.mark === "gorm") {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path
          d="M20.7 10.4H12v3.7h4.6a5.3 5.3 0 1 1-1.3-5.5L18 6A9 9 0 1 0 21 12c0-.5-.1-1.1-.3-1.6Z"
          fill="currentColor"
        />
      </svg>
    );
  }

  if (!brand.icon) return null;

  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d={brand.icon.path} fill="currentColor" />
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
                  brand.monochrome || !brand.icon
                    ? undefined
                    : { color: `#${brand.icon.hex}` }
                }
              >
                <BrandLogo brand={brand} />
              </a>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
