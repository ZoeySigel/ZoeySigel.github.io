import { ArrowUpRight, Github, Mail, MapPin, Radio } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import { CollapsibleProfileItem } from "@/components/collapsible-profile-item";
import { FlipSentences } from "@/components/flip-sentences";
import { ProfileCover } from "@/components/profile-cover";
import { ZSMark } from "@/components/zs-mark";
import {
  EXPERIENCES,
  PROJECTS,
  SOCIAL_LINKS,
  TECH_STACK,
  USER,
} from "@/content/profile";
import { formatPostDate, getAllPosts } from "@/lib/posts";

function Separator() {
  return <div className="stripe-separator" aria-hidden="true" />;
}

function SectionHeading({ label, title }: { label: string; title: string }) {
  return (
    <header className="panel-heading">
      <p>{label}</p>
      <h2>{title}</h2>
    </header>
  );
}

export default function HomePage() {
  const latestPosts = getAllPosts().slice(0, 2);

  return (
    <main className="profile-main" id="main-content">
      <div className="frame profile-frame">
        <ProfileCover />

        <section className="identity-panel" aria-labelledby="identity-title">
          <div className="avatar-cell">
            <Image
              src="/avatar-placeholder.svg"
              alt="ZoeySigel 的头像占位图，发布前请替换"
              width={160}
              height={160}
              priority
            />
            <span>ZS</span>
          </div>
          <div className="identity-copy">
            <div className="identity-blueprint" aria-hidden="true">
              text-3xl / font-semibold / tracking-tight
            </div>
            <div className="identity-name-row">
              <div>
                <h1 id="identity-title">{USER.name}</h1>
                <p>{USER.handle}</p>
              </div>
              <span className="verified-mark" title="主页资料占位状态">
                ✓
              </span>
            </div>
            <FlipSentences sentences={USER.flipSentences} />
          </div>
        </section>

        <Separator />

        <section className="overview-panel" aria-label="个人概览">
          <div className="overview-item overview-wide">
            <Radio aria-hidden="true" />
            <span>
              <small>STATUS</small>
              {USER.availability}
            </span>
          </div>
          <div className="overview-item">
            <MapPin aria-hidden="true" />
            <span>
              <small>LOCATION</small>
              {USER.location}
            </span>
          </div>
          <div className="overview-item">
            <Github aria-hidden="true" />
            <span>
              <small>GITHUB</small>
              {USER.handle}
            </span>
          </div>
        </section>

        <Separator />

        <section className="content-panel" aria-labelledby="about-title">
          <SectionHeading label="PROFILE NOTE" title="关于我" />
          <div className="prose-block" id="about-title">
            <p className="lead-copy">{USER.bio}</p>
            {USER.about.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
        </section>

        <Separator />

        <section
          className="content-panel"
          id="work"
          aria-labelledby="work-title"
        >
          <SectionHeading label="SELECTED WORK" title="精选项目" />
          <div className="collapsible-list" id="work-title">
            {PROJECTS.map((project) => (
              <CollapsibleProfileItem
                key={project.title}
                icon={project.icon}
                title={project.title}
                period={project.period}
                description={project.summary}
                tags={project.stack}
                href={project.href}
                defaultOpen={project.defaultOpen}
                placeholder={project.placeholder}
              />
            ))}
          </div>
        </section>

        <Separator />

        <section
          className="content-panel"
          id="experience"
          aria-labelledby="experience-title"
        >
          <SectionHeading label="CHANGELOG" title="经历与教育" />
          <div className="collapsible-list" id="experience-title">
            {EXPERIENCES.map((experience) => (
              <CollapsibleProfileItem
                key={experience.organization}
                icon={experience.icon}
                title={experience.organization}
                subtitle={experience.role}
                period={experience.period}
                description={experience.summary}
                defaultOpen={experience.defaultOpen}
                placeholder={experience.placeholder}
              />
            ))}
          </div>
        </section>

        <Separator />

        <section
          className="content-panel"
          id="stack"
          aria-labelledby="stack-title"
        >
          <SectionHeading label="TOOLBOX" title="技术栈" />
          <div className="stack-table" id="stack-title">
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

        <Separator />

        <section className="content-panel" aria-labelledby="writing-title">
          <SectionHeading label="WRITING LOG" title="最新文章" />
          <div className="article-list" id="writing-title">
            {latestPosts.map((post) => (
              <Link href={`/blog/${post.slug}/`} key={post.slug}>
                <time dateTime={post.metadata.publishedAt}>
                  {formatPostDate(post.metadata.publishedAt)}
                </time>
                <span>
                  <strong>{post.metadata.title}</strong>
                  <small>{post.metadata.description}</small>
                </span>
                <ArrowUpRight aria-hidden="true" />
              </Link>
            ))}
          </div>
          <Link className="panel-link" href="/blog/">
            查看全部文章 <ArrowUpRight aria-hidden="true" />
          </Link>
        </section>

        <Separator />

        <section
          className="content-panel contact-panel"
          id="contact"
          aria-labelledby="contact-title"
        >
          <SectionHeading label="OPEN CHANNEL" title="联系我" />
          <div className="contact-intro" id="contact-title">
            <ZSMark />
            <div>
              <h3>从一个具体问题开始。</h3>
              <p>工作机会、开源协作或技术交流，都可以从下面的渠道联系。</p>
            </div>
          </div>
          <ul className="social-grid">
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
        </section>
      </div>
    </main>
  );
}
