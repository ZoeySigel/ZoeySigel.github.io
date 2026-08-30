"use client";

import { ChevronDown, ExternalLink } from "lucide-react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useState } from "react";

export function CollapsibleProfileItem({
  icon,
  title,
  subtitle,
  period,
  description,
  tags,
  href,
  defaultOpen = false,
  placeholder = false,
}: {
  icon?: string;
  title: string;
  subtitle?: string;
  period: string;
  description: string;
  tags?: readonly string[];
  href?: string;
  defaultOpen?: boolean;
  placeholder?: boolean;
}) {
  const [open, setOpen] = useState(defaultOpen);
  const reduceMotion = useReducedMotion();
  const panelId = `panel-${title.replace(/\s+/g, "-")}`;

  return (
    <article className="collapsible-item" data-open={open}>
      <div className="collapsible-summary">
        <span className="item-icon" aria-hidden="true">
          {icon ?? "//"}
        </span>
        <button
          type="button"
          className="collapsible-trigger"
          aria-expanded={open}
          aria-controls={panelId}
          onClick={() => setOpen((value) => !value)}
        >
          <span>
            <strong>{title}</strong>
            {subtitle ? <small>{subtitle}</small> : null}
          </span>
          <span className="item-period">{period}</span>
          <ChevronDown className="collapsible-chevron" aria-hidden="true" />
        </button>
        {href ? (
          <a
            className="item-link"
            href={href}
            target={href.startsWith("http") ? "_blank" : undefined}
            rel={href.startsWith("http") ? "noreferrer" : undefined}
            aria-label={`打开${title}链接`}
          >
            <ExternalLink aria-hidden="true" />
          </a>
        ) : null}
      </div>
      <AnimatePresence initial={false}>
        {open ? (
          <motion.div
            id={panelId}
            className="collapsible-content"
            initial={reduceMotion ? false : { height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={reduceMotion ? undefined : { height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
          >
            <div>
              <p>{description}</p>
              {tags?.length ? (
                <ul aria-label={`${title}技术标签`}>
                  {tags.map((tag) => (
                    <li key={tag}>{tag}</li>
                  ))}
                </ul>
              ) : null}
              {placeholder ? (
                <span className="placeholder-label">待替换</span>
              ) : null}
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </article>
  );
}
