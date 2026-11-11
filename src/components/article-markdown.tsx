import "server-only";

import { ChevronRight } from "lucide-react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

// Render at build time; the Markdown parser is never sent to the browser.
export function ArticleMarkdown({
  source,
  newTabLinks = false,
  questionNotes,
}: {
  source: string;
  newTabLinks?: boolean;
  questionNotes?: Record<string, { id: string; source: string }>;
}) {
  return (
    <ReactMarkdown
      remarkPlugins={[remarkGfm]}
      components={{
        a: ({ href, title, children }) => {
          const link = (
            <a
              href={href}
              title={title}
              target={newTabLinks ? "_blank" : undefined}
              rel={newTabLinks ? "noopener noreferrer" : undefined}
            >
              {children}
            </a>
          );
          const note = href ? questionNotes?.[href] : undefined;
          if (!note) return link;
          return (
            <div className="algorithm-question">
              <div className="algorithm-question-link">{link}</div>
              <details className="question-note">
                <summary aria-label={`第 ${note.id} 题笔记`}>
                  <ChevronRight aria-hidden="true" />
                </summary>
                <div className="question-note-content">
                  <ArticleMarkdown
                    source={note.source}
                    newTabLinks={newTabLinks}
                  />
                </div>
              </details>
            </div>
          );
        },
        table: ({ children }) => (
          <div
            className="article-table"
            role="region"
            aria-label="文章表格"
            tabIndex={0}
          >
            <table>{children}</table>
          </div>
        ),
      }}
    >
      {source}
    </ReactMarkdown>
  );
}
