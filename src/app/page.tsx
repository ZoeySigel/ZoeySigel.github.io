import {
  ArrowDownRight,
  ArrowUpRight,
  Github,
  Mail,
  MapPin,
  Radio,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import {
  EXPERIENCES,
  PROJECTS,
  SOCIAL_LINKS,
  TECH_STACK,
  USER,
} from "@/content/profile";
import { formatPostDate, getAllPosts } from "@/lib/posts";

function SectionHeading({ label, title }: { label: string; title: string }) {
  return (
    <div className="section-heading">
      <p>{label}</p>
      <h2>{title}</h2>
    </div>
  );
}

export default function HomePage() {
  const latestPosts = getAllPosts().slice(0, 2);

  return (
    <main id="main-content">
      <section className="hero shell" aria-labelledby="hero-title">
        <div className="hero-copy">
          <div className="status-line">
            <Radio aria-hidden="true" />
            <span>{USER.availability}</span>
          </div>
          <p className="hero-kicker">{USER.role}</p>
          <h1 id="hero-title">
            把想法写进
            <span>可维护的系统。</span>
          </h1>
          <p className="hero-summary">{USER.bio}</p>
          <div className="hero-actions">
            <a className="button button-primary" href="#work">
              查看项目 <ArrowDownRight aria-hidden="true" />
            </a>
            <a
              className="button button-secondary"
              href={USER.githubUrl}
              target="_blank"
              rel="noreferrer"
            >
              GitHub <ArrowUpRight aria-hidden="true" />
            </a>
          </div>
        </div>
        <div className="identity-card">
          <div className="avatar-frame">
            <Image
              src="/avatar-placeholder.svg"
              alt="ZoeySigel 的头像占位图，发布前请替换"
              width={220}
              height={220}
              priority
            />
            <span>PLACEHOLDER</span>
          </div>
          <div className="identity-meta">
            <div>
              <strong>{USER.name}</strong>
              <span>{USER.handle}</span>
            </div>
            <p>
              <MapPin aria-hidden="true" /> {USER.location}
            </p>
          </div>
        </div>
      </section>

      <div className="shell commit-stream">
        <section className="stream-entry" aria-labelledby="about-title">
          <SectionHeading label="PROFILE NOTE" title="关于我" />
          <div className="about-copy" id="about-title">
            {USER.about.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
        </section>

        <section
          className="stream-entry"
          id="work"
          aria-labelledby="work-title"
        >
          <SectionHeading label="SELECTED WORK" title="精选项目" />
          <div className="project-grid" id="work-title">
            {PROJECTS.map((project) => (
              <a
                className="project-card"
                href={project.href}
                key={project.title}
              >
                <div className="card-topline">
                  <span>{project.period}</span>
                  <ArrowUpRight aria-hidden="true" />
                </div>
                <h3>{project.title}</h3>
                <p>{project.summary}</p>
                <ul aria-label="项目技术">
                  {project.stack.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
                {project.placeholder ? (
                  <span className="placeholder-label">待替换</span>
                ) : null}
              </a>
            ))}
          </div>
        </section>

        <section
          className="stream-entry"
          id="experience"
          aria-labelledby="experience-title"
        >
          <SectionHeading label="CHANGELOG" title="经历与教育" />
          <div className="timeline" id="experience-title">
            {EXPERIENCES.map((experience) => (
              <article className="timeline-item" key={experience.organization}>
                <p className="timeline-period">{experience.period}</p>
                <div>
                  <h3>{experience.organization}</h3>
                  <p className="timeline-role">{experience.role}</p>
                  <p>{experience.summary}</p>
                </div>
                {experience.placeholder ? (
                  <span className="placeholder-label">待替换</span>
                ) : null}
              </article>
            ))}
          </div>
        </section>

        <section className="stream-entry" aria-labelledby="stack-title">
          <SectionHeading label="TOOLBOX" title="技术栈" />
          <div className="stack-grid" id="stack-title">
            {TECH_STACK.map((group) => (
              <article key={group.label}>
                <h3>{group.label}</h3>
                <ul>
                  {group.items.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </section>

        <section className="stream-entry" aria-labelledby="writing-title">
          <SectionHeading label="WRITING LOG" title="最新文章" />
          <div className="post-list" id="writing-title">
            {latestPosts.map((post) => (
              <Link
                className="post-row"
                href={`/blog/${post.slug}/`}
                key={post.slug}
              >
                <div>
                  <time dateTime={post.metadata.publishedAt}>
                    {formatPostDate(post.metadata.publishedAt)}
                  </time>
                  <h3>{post.metadata.title}</h3>
                  <p>{post.metadata.description}</p>
                </div>
                <ArrowUpRight aria-hidden="true" />
              </Link>
            ))}
          </div>
          <Link className="text-link" href="/blog/">
            查看全部文章 <ArrowUpRight aria-hidden="true" />
          </Link>
        </section>

        <section
          className="stream-entry contact-section"
          id="contact"
          aria-labelledby="contact-title"
        >
          <SectionHeading label="OPEN CHANNEL" title="联系我" />
          <div className="contact-panel" id="contact-title">
            <div>
              <h3>从一个具体问题开始。</h3>
              <p>
                请在发布前换成你的真实联系偏好，例如工作机会、开源协作或技术交流。
              </p>
            </div>
            <ul>
              {SOCIAL_LINKS.map((link) => {
                const Icon = link.icon === "github" ? Github : Mail;
                return (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      target={link.icon === "github" ? "_blank" : undefined}
                      rel={link.icon === "github" ? "noreferrer" : undefined}
                    >
                      <Icon aria-hidden="true" />
                      <span>
                        <small>{link.label}</small>
                        {link.value}
                      </span>
                      <ArrowUpRight aria-hidden="true" />
                    </a>
                  </li>
                );
              })}
            </ul>
          </div>
        </section>
      </div>
    </main>
  );
}
