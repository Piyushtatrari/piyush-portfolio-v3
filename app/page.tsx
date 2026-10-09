import { existsSync } from "node:fs";
import { join } from "node:path";
import {
  ArrowsClockwiseIcon, ArrowUpIcon, ArrowUpRightIcon, BroadcastIcon, BrowsersIcon, CertificateIcon, ChartLineUpIcon, CheckCircleIcon,
  DatabaseIcon, DeviceTabletIcon, DownloadSimpleIcon, FileArrowDownIcon, GithubLogoIcon, GraphIcon, LinkedinLogoIcon, LockSimpleIcon,
  MagnifyingGlassIcon, PaperPlaneTiltIcon, ReceiptIcon, RocketLaunchIcon, SparkleIcon, StackIcon, TreeStructureIcon, VectorThreeIcon,
} from "@phosphor-icons/react/dist/ssr";
import { Avatar, GhGrid, thumbs } from "@/components/art";
import { Header } from "@/components/Header";
import { HeroArt } from "@/components/HeroArt";
import { CountUp, Magnetic, Reveal, Spot } from "@/components/motion";
import { WorkBento } from "@/components/WorkBento";
import { CopyEmail, RepoCount } from "@/components/widgets";
import { certifications, iconUrl, marquee, profile, projects, roles, skills, stats, type Tech } from "@/lib/data";

// Evaluated at build time: drop a square public/avatar.jpg in and the monogram is replaced on the next build.
const hasAvatar = existsSync(join(process.cwd(), "public", "avatar.jpg"));

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: profile.name,
  jobTitle: profile.role,
  worksFor: { "@type": "Organization", name: "CustomerInsights.AI" },
  alumniOf: "Graphic Era Hill University",
  email: `mailto:${profile.email}`,
  sameAs: [profile.github, profile.linkedin],
  knowsAbout: ["React", "Next.js", "TypeScript", "Node.js", "Python", "FastAPI", "RAG", "Semantic search", "PostgreSQL"],
};

/** Renders **bold** segments from the data file. */
function Rich({ text }: { text: string }) {
  return <>{text.split("**").map((part, i) => (i % 2 ? <b key={i}>{part}</b> : part))}</>;
}

function Logo({ t, size }: { t: Tech; size: number }) {
  // eslint-disable-next-line @next/next/no-img-element -- external SVG logos, static export
  return <img src={iconUrl(t)} alt="" width={size} height={size} loading="lazy" className={t.invert ? "inv" : undefined} />;
}

function Chips({ items }: { items: Tech[] }) {
  return (
    <div className="chips">
      {items.map((t) => (
        <span key={t.slug} className="chip">
          <Logo t={t} size={20} />
          {t.name}
        </span>
      ))}
    </div>
  );
}

export default function Home() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <a className="skip" href="#main">Skip to content</a>
      <div className="progress" aria-hidden="true" />
      <Header />

      <main id="main">
        {/* ================= HERO ================= */}
        <section className="hero" id="top">
          <div className="hero-bg" aria-hidden="true" />
          <div className="shell hero-grid">
            <div>
              <span className="pill rise" style={{ "--i": 0 } as React.CSSProperties}>
                <span className="live" aria-hidden="true" />
                Open to full-stack roles, remote or Delhi NCR
              </span>
              <h1 className="rise" style={{ "--i": 1 } as React.CSSProperties}>
                I turn complex data into{" "}
                <span className="mark">
                  products people use.
                  <svg viewBox="0 0 300 20" preserveAspectRatio="none" aria-hidden="true">
                    <path d="M4 14 C 60 4, 120 4, 170 10 S 260 16, 296 6" />
                  </svg>
                </span>
              </h1>
              <p className="hero-sub rise" style={{ "--i": 2 } as React.CSSProperties}>
                Full Stack Engineer at <strong>CustomerInsights.AI</strong>. React, Next.js, TypeScript, Node and FastAPI, now shipping RAG and semantic search.
              </p>
              <div className="hero-cta rise" style={{ "--i": 3 } as React.CSSProperties}>
                <Magnetic className="btn btn-primary" href="#work">
                  View work <ArrowUpRightIcon />
                </Magnetic>
                <Magnetic className="btn btn-ghost" href={profile.resume} download>
                  Resume <DownloadSimpleIcon />
                </Magnetic>
              </div>
            </div>
            <div className="art-wrap rise" style={{ "--i": 2 } as React.CSSProperties}>
              <HeroArt />
            </div>
          </div>
        </section>

        {/* ================= PROOF ================= */}
        <section className="proof" aria-label="Highlights">
          <div className="shell">
            <div className="stats">
              {stats.map((s, i) => (
                <Reveal key={s.label} className="stat" delay={i}>
                  <b>
                    <CountUp to={s.value} since={s.since} />
                    {s.suffix && <em>{s.suffix}</em>}
                  </b>
                  <span>{s.label}</span>
                </Reveal>
              ))}
            </div>
          </div>
          <div className="marquee" aria-label="Technologies I use">
            <div className="track">
              {[false, true].map((hidden) =>
                marquee.map((t) => (
                  <span key={`${hidden}-${t.slug}`} className="tech" aria-hidden={hidden || undefined}>
                    <Logo t={t} size={26} />
                    {t.name}
                  </span>
                )),
              )}
            </div>
          </div>
        </section>

        {/* ================= WORK ================= */}
        <section className="blk" id="work">
          <div className="shell">
            <Reveal className="sec-head">
              <h2>Work at CustomerInsights.AI</h2>
              <p className="lede">Enterprise life-sciences data platform. The code is private, so each card opens a short case study instead.</p>
            </Reveal>
            <WorkBento />
          </div>
        </section>

        {/* ================= PROJECTS ================= */}
        <section className="blk" id="projects" style={{ paddingTop: 0 }}>
          <div className="shell">
            <Reveal className="sec-head">
              <h2>Side projects</h2>
              <p className="lede">Things I built on my own time to learn a stack properly. Hover a card to see it move.</p>
            </Reveal>
            <div className="projects">
              {projects.map((p, i) => {
                const Thumb = thumbs[p.thumb];
                const thumb = <div className="thumb" aria-hidden="true"><Thumb /></div>;
                const body = (
                  <div className="body">
                    <h3>
                      {p.name} {p.badge && <span className="badge">{p.badge}</span>}
                    </h3>
                    <p>{p.description}</p>
                    <div className="row">
                      <div className="tags">{p.tags.map((t) => <span key={t} className="tag">{t}</span>)}</div>
                      {p.repo ? (
                        <a className="code-link" href={p.repo} target="_blank" rel="noopener">
                          <GithubLogoIcon />
                          Code
                        </a>
                      ) : (
                        <span className="private"><LockSimpleIcon />Private repo</span>
                      )}
                    </div>
                  </div>
                );
                return (
                  <Spot key={p.name} className={`proj${p.wide ? " wide" : ""}`} delay={i % 3}>
                    {p.wide ? <div className="wide-in">{thumb}{body}</div> : <>{thumb}{body}</>}
                  </Spot>
                );
              })}
              <Spot className="proj wide" delay={1}>
                <div className="wide-in">
                  <div className="thumb" aria-hidden="true" style={{ display: "grid", placeItems: "center", padding: 18 }}>
                    <GhGrid />
                  </div>
                  <div className="body">
                    <span className="gh-num"><RepoCount user={profile.githubUser} fallback="20+" /></span>
                    <p>public repositories on GitHub, from DSA practice in C to Forage engineering tasks for J.P. Morgan.</p>
                    <div className="row">
                      <span />
                      <a className="code-link" href={profile.github} target="_blank" rel="noopener">
                        <GithubLogoIcon />
                        Open GitHub
                      </a>
                    </div>
                  </div>
                </div>
              </Spot>
            </div>
          </div>
        </section>

        {/* ================= EXPERIENCE ================= */}
        <section className="blk" id="experience" style={{ background: "var(--surface-2)", borderBlock: "1px solid var(--line)" }}>
          <div className="shell">
            <Reveal className="sec-head">
              <h2>From data engineer to full stack in under two years</h2>
            </Reveal>
            <div className="timeline">
              <div className="tl-rail" aria-hidden="true"><div className="tl-fill" /></div>
              {roles.map((r) => (
                <Reveal as="article" key={r.title} className="role">
                  <div>
                    <span className="when">{r.when}</span>
                    <span className="org">{r.org}</span>
                  </div>
                  <div>
                    <h3>
                      {r.title} {r.badge && <span className="badge">{r.badge}</span>}
                    </h3>
                    <ul>{r.points.map((pt) => <li key={pt}><Rich text={pt} /></li>)}</ul>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* ================= SKILLS ================= */}
        <section className="blk" id="skills">
          <div className="shell">
            <Reveal className="sec-head">
              <h2>The stack I ship with</h2>
              <p className="lede">Daily drivers at work, not a list of tutorials.</p>
            </Reveal>
            <div className="skills">
              <Reveal className="panel tall">
                <h3><BrowsersIcon />Frontend</h3>
                <Chips items={skills.frontend} />
                <div className="chips">
                  <span className="chip"><StackIcon />Zustand</span>
                  <span className="chip"><ArrowsClockwiseIcon />TanStack Query</span>
                  <span className="chip"><ChartLineUpIcon />ECharts</span>
                  <span className="chip"><DeviceTabletIcon />Responsive design</span>
                </div>
              </Reveal>
              <Reveal className="panel" delay={1}>
                <h3><DatabaseIcon />Backend and APIs</h3>
                <Chips items={skills.backend} />
              </Reveal>
              <Reveal className="panel ai" delay={2}>
                <h3><SparkleIcon />AI and data</h3>
                <div className="chips">
                  <span className="chip"><MagnifyingGlassIcon />RAG</span>
                  <span className="chip"><GraphIcon />Semantic search</span>
                  <span className="chip"><VectorThreeIcon />Embeddings</span>
                  <span className="chip"><TreeStructureIcon />Data modeling</span>
                  <span className="chip"><BroadcastIcon />Server-Sent Events</span>
                </div>
              </Reveal>
              <Reveal className="panel" delay={3} style={{ gridColumn: "1 / -1" }}>
                <h3><CheckCircleIcon />Testing and tools</h3>
                <Chips items={skills.tools} />
              </Reveal>
            </div>
          </div>
        </section>

        {/* ================= ABOUT ================= */}
        <section className="blk" id="about" style={{ paddingTop: 0 }}>
          <div className="shell about">
            <Reveal className="avatar">
              {hasAvatar ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src="/avatar.jpg" alt="Portrait of Piyush Tatrari" width={168} height={168} />
              ) : (
                <Avatar />
              )}
            </Reveal>
            <Reveal className="about-txt" delay={1}>
              <h2 style={{ marginBottom: 22 }}>About me</h2>
              <p>
                I started in data engineering, so I care about what happens behind a UI: <strong>validation, edge cases, and the empty and error states</strong> nobody designs for.
              </p>
              <p>
                Today I own features end to end, from FastAPI endpoints to the React components that call them. I like small reusable pieces, honest tests, and interfaces that stay fast with real data.
              </p>
            </Reveal>
            <Reveal className="facts" delay={2}>
              <h3>Now working on</h3>
              <ul>
                <li><RocketLaunchIcon /><span>ciATHENA: agentic AI, RAG and data-mapping workflows</span></li>
                <li><ReceiptIcon /><span>InvoiceFlow, in Next.js and TypeScript</span></li>
              </ul>
              <h3>Certifications</h3>
              <ul>
                {certifications.map((c) => (
                  <li key={c.name}>
                    <CertificateIcon />
                    <span>
                      <a href={c.url} target="_blank" rel="noopener">{c.name}</a>
                      <small>{c.issuer}</small>
                    </span>
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>
        </section>

        {/* ================= CONTACT ================= */}
        <section className="blk" id="contact" style={{ paddingTop: 0 }}>
          <div className="shell">
            <Reveal className="cta-box">
              <svg className="cta-art" viewBox="0 0 360 360" aria-hidden="true">
                {[60, 100, 140, 178].map((r) => <circle key={r} cx="180" cy="180" r={r} />)}
              </svg>
              <div style={{ position: "relative" }}>
                <span className="eyebrow">Contact</span>
                <h2>
                  Hiring for a <span style={{ whiteSpace: "nowrap" }}>full-stack</span> role? Let&apos;s talk.
                </h2>
                <p>I reply within a day. Open to full-time roles, remote or in Delhi NCR.</p>
              </div>
              <div className="cta-actions">
                <div className="email-row">
                  <Magnetic className="btn btn-primary" href={`mailto:${profile.email}?subject=Opportunity%20for%20Piyush`}>
                    Get in touch <PaperPlaneTiltIcon />
                  </Magnetic>
                  <CopyEmail email={profile.email} />
                </div>
                <div className="socials">
                  <a href={profile.github} target="_blank" rel="noopener" aria-label="GitHub"><GithubLogoIcon /></a>
                  <a href={profile.linkedin} target="_blank" rel="noopener" aria-label="LinkedIn"><LinkedinLogoIcon /></a>
                  <a href={profile.resume} download aria-label="Download resume (PDF)"><FileArrowDownIcon /></a>
                </div>
              </div>
            </Reveal>
          </div>
        </section>
      </main>

      <footer>
        <div className="shell foot">
          <span>&copy; {new Date().getFullYear()} Piyush Tatrari. Built with Next.js, TypeScript and hand-drawn SVG.</span>
          <a className="top-link" href="#top">Back to top <ArrowUpIcon /></a>
        </div>
      </footer>
    </>
  );
}
