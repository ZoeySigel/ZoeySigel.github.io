"use client";

import { ChevronDown, ExternalLink } from "lucide-react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useState } from "react";
import { siVitest } from "simple-icons";

import type { OpenSourceProject } from "@/content/profile";

function ProjectMark({ project }: { project: OpenSourceProject }) {
  if (project.icon === "vitest") {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d={siVitest.path} fill="currentColor" />
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <circle cx="12" cy="12" r="8.5" />
      <circle cx="12" cy="12" r="4.5" />
      <path d="M12 12 18.7 7.7" />
      <circle className="radar-ping" cx="18.7" cy="7.7" r="1.35" />
    </svg>
  );
}

function OpenSourceItem({
  project,
  index,
}: {
  project: OpenSourceProject;
  index: number;
}) {
  const [open, setOpen] = useState(false);
  const reduceMotion = useReducedMotion();
  const panelId = `open-source-detail-${index}`;

  return (
    <li className="open-source-entry" data-open={open}>
      <div className="open-source-item">
        <button
          type="button"
          className="open-source-trigger"
          aria-expanded={open}
          aria-controls={panelId}
          onClick={() => setOpen((value) => !value)}
        >
          <span
            className="open-source-mark"
            data-project={project.icon}
            aria-hidden="true"
          >
            <ProjectMark project={project} />
          </span>
          <span className="open-source-copy">
            <span className="repository-path">
              <span>{project.owner}</span>
              <i>/</i>
              <strong>{project.name}</strong>
            </span>
            <span className="open-source-summary">{project.summary}</span>
          </span>
          <ChevronDown className="open-source-chevron" aria-hidden="true" />
        </button>
        <a
          className="open-source-link"
          href={project.href}
          target="_blank"
          rel="noreferrer"
          aria-label={`在 GitHub 查看 ${project.owner}/${project.name}`}
          title="在 GitHub 查看仓库"
        >
          <ExternalLink aria-hidden="true" />
        </a>
      </div>
      <AnimatePresence initial={false}>
        {open ? (
          <motion.div
            id={panelId}
            className="open-source-detail"
            initial={reduceMotion ? false : { height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={reduceMotion ? undefined : { height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
          >
            <div>
              <span>PATCH NOTE</span>
              <p>{project.detail}</p>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </li>
  );
}

export function OpenSourceProjects({
  projects,
}: {
  projects: readonly OpenSourceProject[];
}) {
  return (
    <ul className="open-source-list" aria-label="参与过的开源项目">
      {projects.map((project, index) => (
        <OpenSourceItem
          key={`${project.owner}/${project.name}`}
          project={project}
          index={index}
        />
      ))}
    </ul>
  );
}
