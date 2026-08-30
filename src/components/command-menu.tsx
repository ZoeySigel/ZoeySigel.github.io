"use client";

import { ArrowUpRight, Search, X } from "lucide-react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useEffect, useMemo, useRef, useState } from "react";

export type CommandItem = {
  label: string;
  detail: string;
  href: string;
};

export function CommandMenu({ items }: { items: CommandItem[] }) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        setOpen((value) => !value);
      }
      if (event.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  useEffect(() => {
    if (!open) return;
    window.setTimeout(() => inputRef.current?.focus(), 30);
  }, [open]);

  const filtered = useMemo(() => {
    const term = query.trim().toLowerCase();
    if (!term) return items;
    return items.filter((item) =>
      `${item.label} ${item.detail}`.toLowerCase().includes(term)
    );
  }, [items, query]);

  return (
    <>
      <button
        className="command-button"
        type="button"
        onClick={() => {
          setQuery("");
          setOpen(true);
        }}
      >
        <Search aria-hidden="true" />
        <span>搜索</span>
        <kbd>Ctrl K</kbd>
      </button>
      <AnimatePresence>
        {open ? (
          <motion.div
            className="command-backdrop"
            initial={reduceMotion ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onMouseDown={(event) => {
              if (event.target === event.currentTarget) setOpen(false);
            }}
          >
            <motion.div
              className="command-dialog"
              role="dialog"
              aria-modal="true"
              aria-label="站内导航"
              initial={
                reduceMotion ? false : { opacity: 0, y: -12, scale: 0.98 }
              }
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -8, scale: 0.98 }}
            >
              <div className="command-search">
                <Search aria-hidden="true" />
                <input
                  ref={inputRef}
                  value={query}
                  onChange={(event) => setQuery(event.target.value)}
                  placeholder="搜索章节或文章…"
                  aria-label="搜索章节或文章"
                />
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  aria-label="关闭"
                >
                  <X aria-hidden="true" />
                </button>
              </div>
              <div className="command-results">
                {filtered.length ? (
                  filtered.map((item) => (
                    <a
                      key={item.href}
                      href={item.href}
                      onClick={() => setOpen(false)}
                    >
                      <span>
                        <strong>{item.label}</strong>
                        <small>{item.detail}</small>
                      </span>
                      <ArrowUpRight aria-hidden="true" />
                    </a>
                  ))
                ) : (
                  <p>没有匹配结果</p>
                )}
              </div>
            </motion.div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </>
  );
}
