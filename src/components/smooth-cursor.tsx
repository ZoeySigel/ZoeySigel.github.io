"use client";

import {
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
} from "motion/react";
import { useEffect, useState } from "react";

export function SmoothCursor() {
  const reduceMotion = useReducedMotion();
  const [enabled, setEnabled] = useState(false);
  const [active, setActive] = useState(false);
  const x = useMotionValue(-40);
  const y = useMotionValue(-40);
  const springX = useSpring(x, { stiffness: 720, damping: 42, mass: 0.35 });
  const springY = useSpring(y, { stiffness: 720, damping: 42, mass: 0.35 });

  useEffect(() => {
    const media = window.matchMedia("(pointer: fine)");
    const update = () => setEnabled(media.matches && !reduceMotion);
    update();
    media.addEventListener("change", update);
    return () => media.removeEventListener("change", update);
  }, [reduceMotion]);

  useEffect(() => {
    if (!enabled) return;
    const onMove = (event: PointerEvent) => {
      x.set(event.clientX - 5);
      y.set(event.clientY - 5);
    };
    const onOver = (event: PointerEvent) => {
      setActive(Boolean((event.target as Element).closest("a, button, input")));
    };
    window.addEventListener("pointermove", onMove);
    window.addEventListener("pointerover", onOver);
    return () => {
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerover", onOver);
    };
  }, [enabled, x, y]);

  if (!enabled) return null;
  return (
    <motion.div
      className="smooth-cursor"
      data-active={active}
      style={{ x: springX, y: springY }}
      aria-hidden="true"
    />
  );
}
