import { ArrowUpRight } from "lucide-react";
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

export function OpenSourceProjects({
  projects,
}: {
  projects: readonly OpenSourceProject[];
}) {
  return (
    <ul className="open-source-list" aria-label="参与过的开源项目">
      {projects.map((project) => (
        <li key={`${project.owner}/${project.name}`}>
          <a
            className="open-source-item"
            href={project.href}
            target="_blank"
            rel="noreferrer"
            aria-label={`在 GitHub 查看 ${project.owner}/${project.name}`}
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
            <span className="contribution-label">参与贡献</span>
            <ArrowUpRight className="open-source-arrow" aria-hidden="true" />
          </a>
        </li>
      ))}
    </ul>
  );
}
