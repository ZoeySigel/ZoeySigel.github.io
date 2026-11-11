"use client";

import { Shuffle } from "lucide-react";

export function RandomQuestionButton({ urls }: { urls: string[] }) {
  return (
    <button
      className="random-question-button"
      type="button"
      disabled={urls.length === 0}
      onClick={() => {
        const url = urls[Math.floor(Math.random() * urls.length)];
        if (url) window.open(url, "_blank", "noopener,noreferrer");
      }}
    >
      <Shuffle aria-hidden="true" />
      随机一题
    </button>
  );
}
