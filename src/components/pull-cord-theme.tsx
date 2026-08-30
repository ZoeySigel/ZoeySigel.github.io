"use client";

import { useTheme } from "next-themes";
import { PullCord } from "pullcord";

export function PullCordTheme() {
  const { resolvedTheme, setTheme } = useTheme();

  return (
    <div className="desktop-pull-cord">
      <PullCord
        onPull={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
        pulled={resolvedTheme === "light"}
        ariaLabel="切换亮暗主题"
      />
      <span className="cord-hint" aria-hidden="true">
        PULL
        <br />
        THE CORD
      </span>
    </div>
  );
}
