"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

export function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();

  return (
    <button
      className="icon-button"
      type="button"
      aria-label="切换亮暗主题"
      onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
    >
      <Sun className="theme-icon-sun" aria-hidden="true" />
      <Moon className="theme-icon-moon" aria-hidden="true" />
    </button>
  );
}
