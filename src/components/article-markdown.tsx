import "server-only";

import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

// Render at build time; the Markdown parser is never sent to the browser.
export function ArticleMarkdown({ source }: { source: string }) {
  return (
    <ReactMarkdown
      remarkPlugins={[remarkGfm]}
      components={{
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
