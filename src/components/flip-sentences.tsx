"use client";

import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useEffect, useState } from "react";

export function FlipSentences({ sentences }: { sentences: readonly string[] }) {
  const [index, setIndex] = useState(0);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    if (reduceMotion || sentences.length < 2) return;
    const timer = window.setInterval(
      () => setIndex((value) => (value + 1) % sentences.length),
      3200
    );
    return () => window.clearInterval(timer);
  }, [reduceMotion, sentences.length]);

  return (
    <div className="flip-sentences" aria-live="polite">
      <AnimatePresence mode="wait" initial={false}>
        <motion.p
          key={sentences[index]}
          initial={reduceMotion ? false : { y: 16, opacity: 0, rotateX: -32 }}
          animate={{ y: 0, opacity: 1, rotateX: 0 }}
          exit={reduceMotion ? undefined : { y: -16, opacity: 0, rotateX: 32 }}
          transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
        >
          {sentences[index]}
        </motion.p>
      </AnimatePresence>
    </div>
  );
}
