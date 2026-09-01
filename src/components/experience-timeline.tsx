"use client";

import {
  BriefcaseBusiness,
  Building2,
  ChevronsUpDown,
  GraduationCap,
} from "lucide-react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useState } from "react";

import type { Experience } from "@/content/profile";

function ExperienceEntry({
  experience,
  index,
}: {
  experience: Experience;
  index: number;
}) {
  const [open, setOpen] = useState(Boolean(experience.defaultOpen));
  const reduceMotion = useReducedMotion();
  const panelId = `experience-${index}`;
  const OrganizationIcon = index === 0 ? Building2 : GraduationCap;
  const RoleIcon = index === 0 ? BriefcaseBusiness : GraduationCap;

  return (
    <article className="experience-company" data-open={open}>
      <header className="experience-company-header">
        <span className="experience-company-mark" aria-hidden="true">
          <OrganizationIcon />
        </span>
        <h3>{experience.organization}</h3>
      </header>

      <div className="experience-role-track">
        <button
          type="button"
          className="experience-role-trigger"
          aria-expanded={open}
          aria-controls={panelId}
          onClick={() => setOpen((value) => !value)}
        >
          <span className="experience-role-heading">
            <span className="experience-role-node" aria-hidden="true">
              <RoleIcon />
            </span>
            <strong>{experience.role}</strong>
            <ChevronsUpDown aria-hidden="true" />
          </span>
          <span className="experience-meta">
            <span>{index === 0 ? "工作经历" : " 教育经历"}</span>
            <i aria-hidden="true" />
            <span>{experience.period}</span>
          </span>
        </button>

        <AnimatePresence initial={false}>
          {open ? (
            <motion.div
              id={panelId}
              className="experience-details"
              initial={reduceMotion ? false : { height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={reduceMotion ? undefined : { height: 0, opacity: 0 }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            >
              <div>
                <ul>
                  <li>{experience.summary}</li>
                </ul>
                {/* {experience.placeholder ? (
                  <span className="placeholder-label">待替换</span>
                ) : null} */}
              </div>
            </motion.div>
          ) : null}
        </AnimatePresence>
      </div>
    </article>
  );
}

export function ExperienceTimeline({
  experiences,
}: {
  experiences: readonly Experience[];
}) {
  return (
    <div className="experience-list" id="experience-title">
      {experiences.map((experience, index) => (
        <ExperienceEntry
          key={experience.organization}
          experience={experience}
          index={index}
        />
      ))}
    </div>
  );
}
