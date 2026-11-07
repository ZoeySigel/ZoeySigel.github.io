"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";

const PullCordTheme = dynamic(
  () =>
    import("@/components/pull-cord-theme").then(
      (module) => module.PullCordTheme
    ),
  { ssr: false }
);
const SmoothCursor = dynamic(
  () =>
    import("@/components/smooth-cursor").then((module) => module.SmoothCursor),
  { ssr: false }
);

// Decorative effects should not compete with the initial document and fonts.
export function DeferredEffects() {
  const [effects, setEffects] = useState({ cord: false, cursor: false });

  useEffect(() => {
    const desktop = window.matchMedia("(min-width: 641px)");
    const pointer = window.matchMedia("(pointer: fine)");
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    let idleId: number | undefined;
    let timer: ReturnType<typeof setTimeout> | undefined;
    let ready = false;

    const update = () => {
      if (!ready) return;
      setEffects({
        cord: desktop.matches,
        cursor: pointer.matches && !reducedMotion.matches,
      });
    };
    const enable = () => {
      ready = true;
      update();
    };
    const schedule = () => {
      if ("requestIdleCallback" in window) {
        idleId = window.requestIdleCallback(enable, { timeout: 2000 });
      } else {
        timer = setTimeout(enable, 200);
      }
    };

    if (document.readyState === "complete") schedule();
    else window.addEventListener("load", schedule, { once: true });
    desktop.addEventListener("change", update);
    pointer.addEventListener("change", update);
    reducedMotion.addEventListener("change", update);

    return () => {
      window.removeEventListener("load", schedule);
      desktop.removeEventListener("change", update);
      pointer.removeEventListener("change", update);
      reducedMotion.removeEventListener("change", update);
      if (idleId !== undefined) window.cancelIdleCallback(idleId);
      if (timer !== undefined) clearTimeout(timer);
    };
  }, []);

  return (
    <>
      {effects.cord && <PullCordTheme />}
      {effects.cursor && <SmoothCursor />}
    </>
  );
}
