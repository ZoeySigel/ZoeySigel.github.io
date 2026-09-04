import { ArrowUpRight, Github, Mail, MapPin, Radio } from "lucide-react";
import Image from "next/image";

import { ExperienceTimeline } from "@/components/experience-timeline";
import { FlipSentences } from "@/components/flip-sentences";
import { GitHubContributions } from "@/components/github-contributions";
import { ProfileCover } from "@/components/profile-cover";
import { TechStackGrid } from "@/components/tech-stack-grid";
import { VerifiedBadge } from "@/components/verified-badge";
import { EXPERIENCES, SOCIAL_LINKS, TECH_STACK, USER } from "@/content/profile";

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
  const email = SOCIAL_LINKS.find((link) => link.icon === "mail")?.value;

  return (
    <main className="profile-main" id="main-content">
      <div className="frame profile-frame">
        <ProfileCover />

        <section className="identity-panel" aria-labelledby="identity-title">
          <div className="avatar-cell">
            <Image
              src="/avatar.jpg"
              alt="Zoey Sigel 的头像"
              width={160}
              height={160}
              priority
            />
            {/* <span>ZS</span> */}
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
              <VerifiedBadge />
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
            <Mail aria-hidden="true" />
            <span>
              <small>EMAIL</small>
              {email ?? "邮箱待补充"}
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
          id="experience"
          aria-labelledby="experience-title"
        >
          <SectionHeading label="CHANGELOG" title="经历" />
          <ExperienceTimeline experiences={EXPERIENCES} />
        </section>

        <Separator />

        <GitHubContributions
          username={USER.handle.replace(/^@/, "")}
          profileUrl={USER.githubUrl}
        />

        <Separator />

        <section
          className="content-panel"
          id="stack"
          aria-labelledby="stack-title"
        >
          <SectionHeading label="TOOLBOX" title="技术栈" />
          <TechStackGrid groups={TECH_STACK} />
        </section>

        <Separator />

        <section
          className="content-panel contact-panel"
          id="contact"
          aria-labelledby="contact-title"
        >
          <SectionHeading label="OPEN CHANNEL" title="联系我" />
          <div className="contact-intro" id="contact-title">
            {/* <ZSMark /> */}
            {/* <div>
              <h3>从一个具体问题开始。</h3>
              <p>工作机会、开源协作或技术交流，都可以从下面的渠道联系。</p>
            </div> */}
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
