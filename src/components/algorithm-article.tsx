import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";

import { ArticleMarkdown } from "@/components/article-markdown";
import { RandomQuestionButton } from "@/components/random-question-button";

export function AlgorithmArticle({ source }: { source: string }) {
  const questions = [
    ...source.matchAll(
      /^- \[(\d+)\. .+\]\((https:\/\/leetcode\.cn\/problems\/[a-z0-9-]+\/)\)\r?$/gm
    ),
  ];
  // Read on each server render so an IDE edit is visible after a dev-page refresh.
  const questionNotes = Object.fromEntries(
    questions.map(([, id, url]) => {
      const path = join(
        process.cwd(),
        "src/content/algorithm-notes",
        `${id}.md`
      );
      return [
        url,
        { id, source: existsSync(path) ? readFileSync(path, "utf8") : "" },
      ];
    })
  );

  return (
    <>
      <RandomQuestionButton urls={questions.map(([, , url]) => url)} />
      <ArticleMarkdown
        source={source}
        newTabLinks
        questionNotes={questionNotes}
      />
    </>
  );
}
