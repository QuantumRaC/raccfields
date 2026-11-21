import Link from "next/link";

import AsciiGlobe, { type Marker } from "@/components/AsciiGlobe";
import AsciiPortrait from "@/components/AsciiPortrait";
import FusionViz from "@/components/FusionViz";
import RedNoteMap from "@/components/RedNoteMap";
import { site } from "@/content/site";
import { skills } from "@/content/profile";
import { getPosts } from "@/lib/posts";
import { formatDate } from "@/lib/format";

const MARKERS: Marker[] = [
  { code: "GNV", name: "Gainesville", lat: 29.65, lon: -82.32, color: "cyan" },
  { code: "SHA", name: "Shanghai", lat: 31.23, lon: 121.47, color: "magenta" },
  { code: "SYD", name: "Sydney", lat: -33.87, lon: 151.21, color: "yellow" },
];

const ext = { target: "_blank", rel: "noreferrer" } as const;

function Stack({ items }: { items: string[] }) {
  return <p className="stack">{items.join(" · ")}</p>;
}

export default function Home() {
  const posts = getPosts().slice(0, 4);

  return (
    <>
      {/* ------------------------------------------------------------ HERO */}
      <section className="hero" aria-labelledby="hero-name">
        <div className="wrap hero-grid">
          <div className="hero-load">
            <h1 id="hero-name" className="hero-name" style={{ ["--i" as string]: 1 }}>
              {site.name}
              <span className="alt">Xinyi Yao · 姚欣依</span>
            </h1>
            <ul className="hero-roles" style={{ ["--i" as string]: 2 }}>
              <li>
                <span className="hr-time">Sep 2026 – now</span>
                <a href="#xp-geodi" className="hr-title">
                  Research Assistant, Geospatial ML{" "}
                  <span className="hr-org">
                    <span className="hr-at">at</span> <span className="c">GeoDI Lab, UF</span>
                  </span>
                </a>
                <span className="hr-line">Machine learning research on satellite imagery.</span>
              </li>
              <li>
                <span className="hr-time">May – Aug 2026</span>
                <a href="#xp-rednote" className="hr-title">
                  Backend Engineering Intern, Payments{" "}
                  <span className="hr-org">
                    <span className="hr-at">at</span> <span className="y">RedNote</span>
                  </span>
                </a>
                <span className="hr-line">Backend work on live payment services.</span>
              </li>
              <li>
                <span className="hr-time">Until May 2027</span>
                <a href="#xp-uf" className="hr-title">
                  B.S. Computer Science{" "}
                  <span className="hr-org">
                    <span className="hr-at">at</span> <span className="m">University of Florida</span>
                  </span>
                </a>
                <span className="hr-line">Final year.</span>
              </li>
            </ul>
            <p className="hero-copy" style={{ ["--i" as string]: 3 }}>
              Open to internships and graduate roles in the US, Shanghai or Australia.
            </p>
            <div className="hero-cta" style={{ ["--i" as string]: 4 }}>
              <a className="btn btn-primary" href={`mailto:${site.email}`}>
                Email me
              </a>
              {site.resume ? (
                <a className="btn" href={site.resume} {...ext}>
                  Download my résumé
                </a>
              ) : null}
              <span className="hero-links">
                <a className="link" href={site.linkedin} {...ext}>
                  LinkedIn
                </a>
                <a className="link" href={site.github} {...ext}>
                  GitHub
                </a>
              </span>
            </div>
            <dl className="hero-facts" style={{ ["--i" as string]: 5 }}>
              <div>
                <dt>Based</dt>
                <dd>Gainesville, FL</dd>
              </div>
              <div>
                <dt>Languages</dt>
                <dd>EN · 中文 · 日本語</dd>
              </div>
            </dl>
          </div>

          <div className="hero-visual">
            <AsciiGlobe
              markers={MARKERS}
              label="Globe drawn in text characters, marking Gainesville, Shanghai and Sydney."
            />
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------ EXPERIENCE */}
      <section id="experience" className="section">
        <div className="wrap">
          <div className="sec-head">
            <h2 className="sec-title">Experience</h2>
            <p className="sec-lede">Most recent first.</p>
          </div>

          <div className="xp">
            <article id="xp-geodi" className="panel xp-feature">
              <div>
                <p className="xp-when">Sep 2026 – now · Gainesville, FL</p>
                <h3 className="xp-org">GeoDI Lab, University of Florida</h3>
                <p className="xp-role">Research assistant, geospatial machine learning</p>
                <div className="xp-body">
                  <p>
                    I work on a project about filling gaps in satellite imagery: predicting a sharp image for days when
                    only a coarse one was taken, and testing how well large pretrained models for satellite data
                    (geospatial foundation models) cope when some of a sensor&apos;s colour or infrared channels are
                    missing.
                  </p>
                  <p>
                    My part is reproducing the baseline model, running experiments, comparing it with existing methods
                    and analysing the results.
                  </p>
                </div>
                <Stack items={["Python", "PyTorch", "Remote sensing"]} />
                <Link href="/work/geofm-stf" className="more">
                  Read the project write-up
                </Link>
              </div>
              <FusionViz />
            </article>

            <article id="xp-rednote" className="panel xp-feature">
              <div>
                <p className="xp-when">May – Aug 2026 · Shanghai</p>
                <h3 className="xp-org">RedNote (Xiaohongshu)</h3>
                <p className="xp-role">Backend engineering intern, Payments</p>
                <div className="xp-body">
                  <p>
                    RedNote is a Chinese social media and shopping app. I worked on the Java services behind its
                    payments, mainly what the checkout offers, and on the team&apos;s response to a security flaw in a
                    widely used Java library.
                  </p>
                  <p>
                    I also brought in its PayPal transaction summaries for currency exchange and reconciliation, added
                    a rule for which bank accounts refunds are paid from, sent risk data to WeChat Pay, and built a
                    lookup tool that lets support staff check users&apos; Apple in-app purchase records themselves.
                  </p>
                </div>
                <Stack items={["Java", "Spring Boot", "Microservices"]} />
                <Link href="/work/rednote" className="more">
                  Read the internship write-up
                </Link>
              </div>
              <RedNoteMap />
            </article>

            <article id="xp-uf" className="panel xp-small">
              <div>
                <p className="xp-when">Until May 2027 · Gainesville, FL</p>
                <h3 className="xp-org xp-org-sm">University of Florida</h3>
                <p className="xp-role">B.S. Computer Science</p>
              </div>
              <div className="xp-body">
                <p>
                  Coursework across systems, algorithms, programming languages, databases, AI, natural language
                  processing and security, with maths through linear algebra and statistics.
                </p>
                <p>
                  GPA 3.86 / 4.00. President&apos;s Honor Roll (Spring 2025) and Dean&apos;s List (2024–2026).
                </p>
                {site.showMasters ? (
                  <p>Planned: UNSW Master of Information Technology (AI), under consideration.</p>
                ) : null}
              </div>
            </article>

            <article className="panel xp-small">
              <div>
                <p className="xp-when">Jun – Jul 2025 · Shanghai</p>
                <h3 className="xp-org xp-org-sm">Huifu Payment</h3>
                <p className="xp-role">Cybersecurity intern</p>
              </div>
              <div className="xp-body">
                <p>
                  A one-month cybersecurity internship at a payments company. I supported the security team with
                  vulnerability scans, compliance documentation and firewall rule reviews, and learned how security is
                  handled in payment systems.
                </p>
              </div>
            </article>
          </div>
        </div>
      </section>

      {/* -------------------------------------------------------- PROJECTS */}
      <section id="projects" className="section">
        <div className="wrap">
          <div className="sec-head">
            <h2 className="sec-title">Projects</h2>
          </div>
          <div className="proj-grid">
            <article className="panel proj">
              <h3>WriteLike</h3>
              <p>
                A web tool that describes the writing style of a passage: it measures things like sentence length and
                word choice, then uses Google&apos;s Gemini to explain the results in plain language. Works in English
                and Simplified Chinese.
              </p>
              <Stack items={["Python", "spaCy", "FastAPI", "Next.js"]} />
              <div className="proj-links">
                <Link href="/projects/writelike" className="btn btn-primary">
                  Try WriteLike
                </Link>
                <a href="https://github.com/QuantumRaC/T3xtAnlys" className="link" {...ext}>
                  View the source
                </a>
              </div>
            </article>

            <article className="panel proj">
              <h3>ask-globe</h3>
              <p>
                An add-on for AI assistants such as Claude Code that answers plain-language questions using live data
                from NASA&apos;s GLOBE Observer citizen-science programme, so people who don&apos;t write code can use
                the data.
              </p>
              <Stack items={["Python", "GLOBE API", "AI agents"]} />
              <div className="proj-links">
                <a href="https://github.com/QuantumRaC/ask-globe" className="link" {...ext}>
                  View on GitHub
                </a>
              </div>
            </article>

            <article className="panel proj">
              <h3>Talk Art to Me</h3>
              <p>
                A web app that describes artworks aloud for blind and visually impaired visitors. Gemini describes
                the whole image and each region, and you tap a region to hear it. Built at Gator Hack 2025, where it
                won first place.
              </p>
              <Stack items={["Next.js", "TypeScript", "Gemini API", "Web Speech API"]} />
              <div className="proj-links">
                <a href="https://talk-art-to-me.vercel.app/" className="link" {...ext}>
                  Try the demo
                </a>
                <a href="https://github.com/QuantumRaC/Talk-Art-to-Me" className="link" {...ext}>
                  View the source
                </a>
              </div>
            </article>

            <article className="panel proj">
              <h3>OBJ Mesh Renderer</h3>
              <p>A 3D model renderer in C++ and OpenGL, with textures and lighting.</p>
              <div className="proj-links">
                <a href="https://github.com/QuantumRaC/OBJ-Mesh-Renderer" className="link" {...ext}>
                  View on GitHub
                </a>
              </div>
            </article>

          </div>
        </div>
      </section>

      {/* ---------------------------------------------------------- SKILLS */}
      <section id="skills" className="section">
        <div className="wrap">
          <div className="sec-head sec-head-row">
            <h2 className="sec-title">Skills</h2>
            {site.resume ? (
              <a className="btn" href={site.resume} {...ext}>
                Download my CV (PDF)
              </a>
            ) : null}
          </div>
          <dl className="panel skill-list">
            {skills.map(([group, items]) => (
              <div key={group}>
                <dt>{group}</dt>
                <dd>{items}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* --------------------------------------------------------- WRITING */}
      <section id="writing" className="section">
        <div className="wrap">
          <div className="sec-head">
            <h2 className="sec-title">Writing</h2>
          </div>
          <ul className="posts">
            {posts.map((p) => (
              <li key={p.slug}>
                <Link href={`/blog/${p.slug}`} className="post-row">
                  <span className="post-date">{formatDate(p.date)}</span>
                  <span className="post-title">{p.title}</span>
                  <span className="post-meta">{p.minutes} min</span>
                  <span className="post-desc">{p.description}</span>
                </Link>
              </li>
            ))}
          </ul>
          <p style={{ marginTop: 22 }}>
            <Link href="/blog" className="more">
              Read all posts
            </Link>
          </p>
        </div>
      </section>

      {/* ----------------------------------------------------------- ABOUT */}
      <section id="about" className="section">
        <div className="wrap">
          <div className="sec-head">
            <h2 className="sec-title">About</h2>
          </div>
          <div className="two-col">
            <div className="panel prose-block" style={site.headshot ? { display: "grid", gap: 24 } : undefined}>
              {site.headshot ? <AsciiPortrait src={site.headshot} alt="Portrait of Cynthia Yao" /> : null}
              <div className="prose-block">
                <p>
                  I was born in Shanghai, spent part of my early childhood in Australia, and have since studied and
                  worked in China and the United States. I&apos;m open to work in any of the three.
                </p>
                <p>
                  Outside work I sketch, write poetry and play games. I also like spending free time exploring and
                  playing around with open-source projects.
                </p>
              </div>
            </div>
            <div className="about-side">
              <div className="panel">
                <h3 className="panel-title">What I&apos;m looking for</h3>
                <dl className="kv">
                  <dt>Roles</dt>
                  <dd>Backend and payments engineering, applied ML, geospatial and environmental AI</dd>
                  <dt>Type</dt>
                  <dd>Internships, and graduate or junior roles</dd>
                  <dt>Location</dt>
                  <dd>US, Shanghai or Australia</dd>
                </dl>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* --------------------------------------------------------- CONTACT */}
      <section id="contact" className="section">
        <div className="wrap">
          <div className="sec-head">
            <h2 className="sec-title">Contact</h2>
          </div>
          <div className="contact">
            <div>
              <p className="dim">Email me about internships, graduate roles or research.</p>
              <a href={`mailto:${site.email}`} className="contact-email">
                {site.email}
              </a>
            </div>
            <ul className="contact-links">
              <li>
                <a href={site.linkedin} {...ext}>
                  <span className="k">LinkedIn</span>
                  <span className="v">in/xinyi-yao</span>
                </a>
              </li>
              <li>
                <a href={site.github} {...ext}>
                  <span className="k">GitHub</span>
                  <span className="v">@{site.githubHandle}</span>
                </a>
              </li>
              {site.resume ? (
                <li>
                  <a href={site.resume} {...ext}>
                    <span className="k">Résumé</span>
                    <span className="v">PDF</span>
                  </a>
                </li>
              ) : null}
              <li>
                <Link href="/blog">
                  <span className="k">Writing</span>
                  <span className="v">raccfields.dev/blog</span>
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </section>
    </>
  );
}
