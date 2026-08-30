"use client";

import {
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
} from "motion/react";
import { useEffect, useRef, useState } from "react";

const SPRING = {
  damping: 45,
  stiffness: 400,
  mass: 1,
  restDelta: 0.001,
};

function CursorArrow() {
  return (
    <svg
      aria-hidden="true"
      width="50"
      height="54"
      viewBox="0 0 50 54"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M42.6817 41.1495L27.5103 6.79925C26.7269 5.02557 24.2082 5.02558 23.3927 6.79925L7.59814 41.1495C6.75833 42.9759 8.52712 44.8902 10.4125 44.1947L24.3757 39.0437C24.8829 38.8566 25.4385 38.8566 25.9457 39.0437L39.8121 44.1947C41.6849 44.8902 43.4884 42.9759 42.6817 41.1495Z"
        fill="black"
      />
      <path
        d="M43.7146 40.6933L28.5431 6.34306C27.3556 3.65428 23.5772 3.69516 22.3605 6.33875L6.566 40.689C5.3134 43.412 7.94824 46.2674 10.7983 45.216L24.7615 40.065C25.0198 39.9697 25.302 39.9697 25.5603 40.065L39.4267 45.216C42.2623 46.2693 44.9254 43.4148 43.7146 40.6933Z"
        stroke="white"
        strokeWidth="2.5"
      />
    </svg>
  );
}

export function SmoothCursor() {
  const reduceMotion = useReducedMotion();
  const [enabled, setEnabled] = useState(false);
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const rotation = useMotionValue(0);
  const scale = useMotionValue(0);
  const springX = useSpring(x, SPRING);
  const springY = useSpring(y, SPRING);
  const springRotation = useSpring(rotation, SPRING);
  const springScale = useSpring(scale, SPRING);
  const previousPoint = useRef({ x: 0, y: 0 });
  const previousAngle = useRef(0);
  const accumulatedRotation = useRef(0);
  const frame = useRef<number | null>(null);
  const returnTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const media = window.matchMedia("(pointer: fine)");
    const update = () => setEnabled(media.matches && !reduceMotion);
    update();
    media.addEventListener("change", update);
    return () => media.removeEventListener("change", update);
  }, [reduceMotion]);

  useEffect(() => {
    if (!enabled) return;

    document.documentElement.dataset.customCursor = "true";

    const onMove = (event: PointerEvent) => {
      if (frame.current !== null) cancelAnimationFrame(frame.current);

      frame.current = requestAnimationFrame(() => {
        const point = { x: event.clientX, y: event.clientY };
        const deltaX = point.x - previousPoint.current.x;
        const deltaY = point.y - previousPoint.current.y;
        const velocity = Math.hypot(deltaX, deltaY);

        x.set(point.x);
        y.set(point.y);

        if (scale.get() === 0) {
          previousPoint.current = point;
          scale.set(1);
          frame.current = null;
          return;
        }

        if (velocity > 1) {
          const angle = Math.atan2(deltaY, deltaX) * (180 / Math.PI) + 90;
          let angleDelta = angle - previousAngle.current;

          if (angleDelta > 180) angleDelta -= 360;
          if (angleDelta < -180) angleDelta += 360;

          accumulatedRotation.current += angleDelta;
          rotation.set(accumulatedRotation.current);
          previousAngle.current = angle;
          scale.set(0.95);

          if (returnTimer.current) clearTimeout(returnTimer.current);
          returnTimer.current = setTimeout(() => scale.set(1), 150);
        }

        previousPoint.current = point;
        frame.current = null;
      });
    };

    const reveal = (event: PointerEvent) => {
      previousPoint.current = { x: event.clientX, y: event.clientY };
      x.set(event.clientX);
      y.set(event.clientY);
      scale.set(1);
    };

    window.addEventListener("pointerenter", reveal);
    window.addEventListener("pointermove", onMove);

    return () => {
      delete document.documentElement.dataset.customCursor;
      window.removeEventListener("pointerenter", reveal);
      window.removeEventListener("pointermove", onMove);
      if (frame.current !== null) cancelAnimationFrame(frame.current);
      if (returnTimer.current) clearTimeout(returnTimer.current);
    };
  }, [enabled, rotation, scale, x, y]);

  if (!enabled) return null;

  return (
    <motion.div
      className="smooth-cursor"
      style={{
        left: springX,
        top: springY,
        rotate: springRotation,
        scale: springScale,
      }}
      aria-hidden="true"
    >
      <CursorArrow />
    </motion.div>
  );
}
