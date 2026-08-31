"use client";

import { RotateCcw } from "lucide-react";
import { motion, useReducedMotion } from "motion/react";
import { useEffect, useState } from "react";

import { PixelWelcomeMark } from "@/components/pixel-welcome-mark";

export function ProfileCover() {
  const reduceMotion = useReducedMotion();
  const [phase, setPhase] = useState<"hello" | "mark">("hello");
  const [run, setRun] = useState(0);

  const visiblePhase = reduceMotion ? "mark" : phase;

  useEffect(() => {
    if (reduceMotion || phase !== "hello") return;
    const timer = window.setTimeout(() => setPhase("mark"), 4100);
    return () => window.clearTimeout(timer);
  }, [phase, reduceMotion, run]);

  const replay = () => {
    if (reduceMotion) return;
    setRun((value) => value + 1);
    setPhase("hello");
  };

  return (
    <section className="profile-cover" aria-label="ZoeySigel 品牌动画">
      <div className="cover-grid" aria-hidden="true" />
      {!reduceMotion ? (
        <motion.svg
          key={`hello-${run}`}
          className="hello-mark"
          viewBox="0 0 638 200"
          fill="none"
          stroke="currentColor"
          strokeWidth="14.8883"
          initial={{ opacity: 0 }}
          animate={{
            opacity: visiblePhase === "hello" ? 1 : 0,
            scale: visiblePhase === "hello" ? 1 : 0.84,
          }}
          transition={{ duration: 0.35 }}
          aria-label="hello 手写动画"
        >
          <motion.path
            d="M8.692 166.553C36.239 151.239 61.341 131.548 89.819 98.03C109.203 75.149 119.625 49.023 120.122 31.003C120.37 17.604 113.836 7.439 101.759 7.439C88.36 7.439 79.923 17.604 74.712 40.936C69.005 66.579 64.787 96.004 54.117 190.356"
            strokeLinecap="round"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 1 }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
          />
          <motion.path
            d="M55.162 181.135C60.625 133.114 81.412 98.048 107.963 98.048C123.844 98.048 133.937 110.703 131.071 128.817C129.457 139.487 127.587 150.405 125.408 163.06C122.869 178.941 130.128 191.348 152.122 191.348C184.197 191.348 219.189 173.523 237.097 145.915C243.198 136.509 245.68 128.073 245.928 119.884C246.176 104.996 237.739 93.83 222.851 93.83C203.992 93.83 189.6 115.17 189.6 142.465C189.6 171.745 205.481 192.341 239.208 192.341C285.066 192.341 335.86 137.292 359.199 75.859C365.788 58.513 368.26 42.407 368.26 31.151C368.26 17.806 364.042 7.558 352.131 7.558C340.469 7.558 332.777 16.614 325.829 30.913C317.688 47.496 311.667 71.416 309.203 98.455C303 166.301 316.896 191.348 349.936 191.348C390 191.348 434.542 135.534 457.286 75.669C463.803 58.513 466.275 42.407 466.275 31.151C466.275 17.806 462.057 7.558 450.146 7.558C438.484 7.558 430.792 16.614 423.844 30.913C415.703 47.496 409.682 71.416 407.218 98.455C401.015 166.301 414.911 191.348 444.416 191.348C473.874 191.348 489.877 165.67 499.471 138.402C508.955 111.447 520.618 94.822 544.935 94.822C565.035 94.822 580.916 109.71 580.916 137.75C580.916 168.768 560.792 192.093 535.362 192.341C512.984 192.589 498.285 174.475 499.774 147.179C501.511 116.907 519.873 94.822 543.943 94.822C557.839 94.822 569.51 100.999 578.682 107.725C603.549 125.866 622.709 114.656 630.047 96.719"
            strokeLinecap="round"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 1 }}
            transition={{
              duration: 2.8,
              delay: 0.7,
              ease: "easeInOut",
            }}
          />
        </motion.svg>
      ) : null}
      <motion.div
        key={`mark-${run}`}
        className="mark-resize-stage"
        initial={false}
        animate={
          visiblePhase === "mark"
            ? reduceMotion
              ? { opacity: 1, scale: 1, scaleX: 1 }
              : { opacity: 1, scale: 1, scaleX: [1, 0.9, 1] }
            : { opacity: 0, scale: 0.82, scaleX: 1 }
        }
        transition={{
          opacity: { duration: 0.4 },
          scale: { duration: 0.4 },
          scaleX: { duration: 1, delay: 0.35 },
        }}
      >
        <motion.div
          className="resize-frame"
          initial={false}
          animate={{ opacity: visiblePhase === "mark" ? [1, 1, 0] : 0 }}
          transition={{ duration: 2.05, times: [0, 0.75, 1] }}
        >
          <i />
          <i />
          <i />
          <i />
          <span>660 × 110</span>
        </motion.div>
        <PixelWelcomeMark />
      </motion.div>
      <button
        className="cover-replay"
        type="button"
        onClick={replay}
        disabled={visiblePhase !== "mark" || Boolean(reduceMotion)}
        aria-label="重新播放封面动画"
      >
        <RotateCcw aria-hidden="true" />
      </button>
    </section>
  );
}
