"use client";

import { useEffect, useState } from "react";

export function SiteHeaderWrapper({ children }: { children: React.ReactNode }) {
  const [affixed, setAffixed] = useState(false);

  useEffect(() => {
    const update = () => setAffixed(window.scrollY > 8);
    update();
    window.addEventListener("scroll", update, { passive: true });
    return () => window.removeEventListener("scroll", update);
  }, []);

  return (
    <header className="site-header" data-affixed={affixed}>
      {children}
    </header>
  );
}
