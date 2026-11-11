import "server-only";

import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

// Render at build time; the Markdown parser is never sent to the browser.
export function ArticleMarkdown({
  source,
  newTabLinks = false,
}: {
  source: string;
  newTabLinks?: boolean;
}) {
  return (
    <ReactMarkdown
      remarkPlugins={[remarkGfm]}
      components={{
        a: ({ href, title, children }) => (
          <a
            href={href}
            title={title}
            target={newTabLinks ? "_blank" : undefined}
            rel={newTabLinks ? "noopener noreferrer" : undefined}
          >
            {children}
          </a>
        ),
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
