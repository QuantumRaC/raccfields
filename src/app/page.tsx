import Link from "next/link";

import AsciiGlobe, { type Marker } from "@/components/AsciiGlobe";
import AsciiPortrait from "@/components/AsciiPortrait";
import CountUp from "@/components/CountUp";
import FusionViz from "@/components/FusionViz";
import PaymentFlow from "@/components/PaymentFlow";
import Scramble from "@/components/Scramble";
import SectionHead from "@/components/SectionHead";
import SparkPanel from "@/components/SparkPanel";
import { site } from "@/content/site";
import { courseThemes, courses, skills } from "@/content/profile";
import { getPosts } from "@/lib/posts";
import { formatDate } from "@/lib/format";

const MARKERS: Marker[] = [
  { code: "GNV", name: "Gainesville", lat: 29.65, lon: -82.32, color: "cyan" },
  { code: "SHA", name: "Shanghai", lat: 31.23, lon: 121.47, color: "magenta" },
  { code: "SYD", name: "Sydney", lat: -33.87, lon: 151.21, color: "yellow" },
];

const ext = { target: "_blank", rel: "noreferrer" } as const;

export default function Home() {
  const posts = getPosts().slice(0, 4);

  return (
    <>
      {/* ------------------------------------------------------------ HERO */}
      <section className="hero" aria-labelledby="hero-name">
        <div className="wrap hero-grid">
          <div className="hero-load">
            <div className="hero-kicker" style={{ ["--i" as string]: 0 }}>
              <span className="label">
                <span className="y">●</span> UF Computer Science · Graduating May 2027
              </span>
            </div>
            <h1 id="hero-name" className="hero-name" style={{ ["--i" as string]: 1 }}>
              <Scramble text={site.name} duration={900} />
              <span className="alt">Xinyi Yao · 姚欣依</span>
            </h1>
            <p className="hero-role" style={{ ["--i" as string]: 2 }}>
              <span className="y">Backend &amp; payments engineering</span>{" "}
              <span className="sep">/</span>{" "}
              <span className="c">Geospatial ML research</span>
            </p>
            <p className="hero-copy" style={{ ["--i" as string]: 3 }}>
              Final-year computer science student at the University of Florida. At <strong>RedNote</strong> in
              Shanghai I built and shipped payment services that run on live traffic; now I&apos;m reproducing and
              benchmarking geospatial foundation models for satellite imagery in UF&apos;s <strong>GeoDi Lab</strong>.
            </p>
            <p className="hero-copy" style={{ ["--i" as string]: 4 }}>
              <strong>Australian citizen</strong>, relocating to Sydney after graduation — full work rights in
              Australia, no sponsorship required. Open to internships and graduate roles in any location.
            </p>
            <div className="hero-cta" style={{ ["--i" as string]: 5 }}>
              <a className="btn btn-primary" href={`mailto:${site.email}`}>
                Email me <span className="arrow">→</span>
              </a>
              {site.resume ? (
                <a className="btn" href={site.resume} {...ext}>
                  Résumé (PDF) <span className="arrow">↓</span>
                </a>
              ) : null}
              <a className="btn" href={site.linkedin} {...ext}>
                LinkedIn
              </a>
              <a className="btn" href={site.github} {...ext}>
                GitHub
              </a>
            </div>
            <dl className="hero-facts" style={{ ["--i" as string]: 6 }}>
              <div>
                <dt>GPA</dt>
                <dd>3.86 / 4.00</dd>
              </div>
              <div>
                <dt>Degree</dt>
                <dd>B.S. CS · UF</dd>
              </div>
              <div>
                <dt>Work rights</dt>
                <dd>AU citizen</dd>
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
              label="ASCII globe tracing a route from Gainesville, Florida to Shanghai to Sydney."
            />
            <div className="globe-caption">
              <span className="globe-route">
                <span className="c">GNV</span> <span className="faint">→</span> <span className="m">SHA</span>{" "}
                <span className="faint">→</span> <span className="y">SYD</span>
              </span>
              <span className="label">US · China · Australia — drag to rotate</span>
            </div>
          </div>
        </div>
        <a href="#experience" className="scroll-hint" aria-label="Scroll to experience">
          ↓ SCROLL
        </a>
      </section>

      {/* ------------------------------------------------------ EXPERIENCE */}
      <section id="experience" className="section">
        <div className="wrap">
          <SectionHead
            index="01"
            title="Experience"
            lede="Production payments engineering on real traffic, then machine learning research on satellite imagery."
          />

          <div className="xp">
            {/* RedNote */}
            <article className="panel xp-feature" data-reveal>
              <div>
                <div className="xp-meta">
                  <span className="status status-shipped">Shipped</span>
                  <span className="label">May – Aug 2026 · Shanghai</span>
                </div>
                <h3 className="xp-org">RedNote (Xiaohongshu)</h3>
                <p className="xp-role">Backend / payments engineering intern · Java microservices</p>
                <ul className="xp-list">
                  <li>
                    Built a <strong>cashier pre-query</strong> spanning 3 services and all 24 payment methods,
                    handling roughly 48,000 requests a day.
                  </li>
                  <li>
                    Built <strong>PayPal reporting ingestion</strong> for 4 report types, feeding foreign-exchange
                    handling and finance reconciliation — rolled out to 100%.
                  </li>
                  <li>
                    Built, solo, a full-stack <strong>Apple in-app purchase lookup tool</strong> handling roughly
                    500 requests a day.
                  </li>
                  <li>
                    Led a <strong>FastJson remote-code-execution remediation</strong>: audited 13 repositories, found
                    10 affected, and migrated 4 core payment repositories to Gson within 24 hours of disclosure.
                  </li>
                </ul>
                <div className="xp-foot">
                  <ul className="chips">
                    {["Java", "Spring Boot", "Thrift RPC", "Apollo", "PayPal", "WeChat Pay", "Apple IAP", "Gson", "Vue.js"].map(
                      (t) => (
                        <li key={t} className="chip">
                          {t}
                        </li>
                      )
                    )}
                  </ul>
                  <Link href="/work/rednote" className="more">
                    Case study <span>→</span>
                  </Link>
                </div>
              </div>
              <div>
                <PaymentFlow />
                <div className="metrics">
                  <div className="metric">
                    <div className="metric-v y">
                      ~<CountUp value={48000} />
                    </div>
                    <div className="metric-k">pre-query requests / day</div>
                  </div>
                  <div className="metric">
                    <div className="metric-v">
                      <CountUp value={24} />
                    </div>
                    <div className="metric-k">payment methods covered</div>
                  </div>
                  <div className="metric">
                    <div className="metric-v sm">
                      <CountUp value={13} /> → <CountUp value={10} /> → <span className="c"><CountUp value={4} /></span>
                    </div>
                    <div className="metric-k">repos audited → affected → core repos migrated</div>
                  </div>
                  <div className="metric">
                    <div className="metric-v m">
                      &lt;<CountUp value={24} />h
                    </div>
                    <div className="metric-k">from RCE disclosure to migration</div>
                  </div>
                </div>
              </div>
            </article>

            {/* GeoDi Lab */}
            <article className="panel xp-feature" data-reveal>
              <div>
                <div className="xp-meta">
                  <span className="status status-progress">In progress</span>
                  <span className="label">Sept 2026 – present · University of Florida</span>
                </div>
                <h3 className="xp-org">GeoDi Lab, UF</h3>
                <p className="xp-role">Geospatial machine learning research · project GeoFM-STF</p>
                <p className="dim" style={{ marginTop: 14 }}>
                  Spatiotemporal fusion: predicting fine-resolution satellite imagery for dates when only coarse
                  imagery exists — and testing how well foundation models cope when spectral bands are missing.
                </p>
                <ul className="xp-list">
                  <li>
                    Reproduced <strong>SimpleDOFA</strong>, a DOFA-based foundation-model approach, as the baseline.
                  </li>
                  <li>
                    Ran Part 1 across <strong>5 missing-band scenarios × 3 random seeds</strong> on the CIA and LGC
                    benchmark datasets.
                  </li>
                  <li>
                    Built per-band analysis with <strong>sign tests</strong>, reporting SSIM and cross-correlation.
                  </li>
                  <li>
                    Benchmarking <strong>GAN-STFM</strong> and <strong>ECPW-STFN</strong> — in progress, with
                    non-convergent seeds reported rather than dropped.
                  </li>
                </ul>
                <p className="note" style={{ marginTop: 20 }}>
                  <b>Paper in preparation</b> — targeting an IEEE remote-sensing venue.
                </p>
                <div className="xp-foot">
                  <ul className="chips">
                    {["Python", "PyTorch", "DOFA", "HiPerGator HPC", "SSIM / CC", "Sign tests"].map((t) => (
                      <li key={t} className="chip">
                        {t}
                      </li>
                    ))}
                  </ul>
                  <Link href="/work/geofm-stf" className="more">
                    Research notes <span>→</span>
                  </Link>
                </div>
              </div>
              <div>
                <FusionViz />
                <div className="metrics">
                  <div className="metric">
                    <div className="metric-v c">
                      <CountUp value={5} />
                    </div>
                    <div className="metric-k">missing-band scenarios</div>
                  </div>
                  <div className="metric">
                    <div className="metric-v">
                      ×<CountUp value={3} />
                    </div>
                    <div className="metric-k">random seeds per scenario</div>
                  </div>
                  <div className="metric">
                    <div className="metric-v">
                      <CountUp value={2} />
                    </div>
                    <div className="metric-k">benchmark datasets (CIA, LGC)</div>
                  </div>
                  <div className="metric">
                    <div className="metric-v y">
                      <CountUp value={3} />
                    </div>
                    <div className="metric-k">methods: SimpleDOFA, GAN-STFM, ECPW-STFN</div>
                  </div>
                </div>
              </div>
            </article>

            {/* Huifu */}
            <article className="panel xp-small" data-reveal>
              <div>
                <div className="xp-meta" style={{ marginBottom: 8 }}>
                  <span className="label">Jun – Jul 2025 · Shanghai</span>
                </div>
                <h3 className="xp-org" style={{ fontSize: "clamp(19px,2vw,23px)" }}>
                  Huifu Payment
                </h3>
                <p className="xp-role">Cybersecurity intern</p>
              </div>
              <p className="dim">
                A one-month cybersecurity internship inside a payments company — early exposure to how security work
                is run where money moves. It&apos;s the grounding I drew on a year later, when the FastJson disclosure
                landed at RedNote.
              </p>
            </article>
          </div>
        </div>
      </section>

      {/* -------------------------------------------------------- PROJECTS */}
      <section id="projects" className="section">
        <div className="wrap">
          <SectionHead index="02" title="Projects" lede="Built outside work — including one you can try right now." />
          <div className="proj-grid">
            <article className="panel proj proj-wide" data-reveal>
              <div style={{ display: "grid", gap: 14 }}>
                <div className="xp-meta" style={{ marginBottom: 0 }}>
                  <span className="status status-shipped">Live</span>
                  <span className="label">NLP · web service</span>
                </div>
                <h3>WriteLike</h3>
                <p>
                  An explainable writing-style analyser. spaCy and statistical features measure the text — sentence
                  rhythm, clause density, part-of-speech and dependency patterns, recurring lemmas — and Gemini turns
                  those numbers into readable feedback. Works in English and, experimentally, Simplified Chinese.
                </p>
                <p>
                  A FastAPI microservice on Render, called from this site with HMAC-signed requests.
                </p>
                <ul className="chips">
                  {["Python", "spaCy", "FastAPI", "Gemini API", "Next.js", "HMAC signing"].map((t) => (
                    <li key={t} className="chip">
                      {t}
                    </li>
                  ))}
                </ul>
                <div className="proj-links">
                  <Link href="/projects/writelike" className="btn btn-primary">
                    Try WriteLike <span className="arrow">→</span>
                  </Link>
                  <a href="https://github.com/QuantumRaC/T3xtAnlys" className="btn" {...ext}>
                    Source
                  </a>
                </div>
              </div>
              <div className="spark" aria-label="Example WriteLike readout" role="img">
                <span className="k">$ writelike analyse excerpt.txt</span>
                {"\n\n"}
                <span className="k">language ......</span> en{"\n"}
                <span className="k">clauses/sent ..</span> <span className="y">~1.75</span>
                {"\n"}
                <span className="k">pacing ........</span> varied <span className="faint">(high oscillation)</span>
                {"\n"}
                <span className="k">motifs ........</span> <span className="c">war · true · death</span>
                {"\n"}
                <span className="k">tone ..........</span> reflective, analytical{"\n\n"}
                <span className="m">→</span> vary sentence length for rhythm
                {"\n"}
                <span className="m">→</span> balance concise and complex vocabulary
              </div>
            </article>

            <article className="panel proj" data-reveal>
              <div className="xp-meta" style={{ marginBottom: 0 }}>
                <span className="status status-planned">Open-source release planned</span>
              </div>
              <h3>Desktop performance panel</h3>
              <p>
                Custom Übersicht widgets for my Mac: live CPU, memory and network sparklines with a rolling sample
                history, top processes by CPU, and a matching news widget. Three themes share one config — including
                an automatic theme that samples the wallpaper&apos;s colours using only the Python standard library.
                I debugged positioning and a wallpaper-path change on a current macOS release along the way.
              </p>
              <SparkPanel />
              <ul className="chips">
                {["Übersicht", "Shell", "Python stdlib", "macOS"].map((t) => (
                  <li key={t} className="chip">
                    {t}
                  </li>
                ))}
              </ul>
            </article>

            <div className="proj-stack">
              <article className="panel proj" data-reveal style={{ ["--d" as string]: "80ms" }}>
                <h3>OBJ Mesh Renderer</h3>
                <p>
                  A C++ / OpenGL renderer: OBJ loading, UV-mapped textures, lighting, backface culling, PN-triangle
                  subdivision and projection transforms.
                </p>
                <div className="proj-links">
                  <a href="https://github.com/QuantumRaC/OBJ-Mesh-Renderer" className="more" {...ext}>
                    GitHub <span>↗</span>
                  </a>
                </div>
              </article>
              <article className="panel proj" data-reveal style={{ ["--d" as string]: "160ms" }}>
                <h3>ChompChompCar</h3>
                <p>
                  Team lead and full-stack developer on a MERN carpool-coordination app with Google Places search,
                  calendar scheduling and authentication.
                </p>
                <div className="proj-links">
                  <a href="https://github.com/QuantumRaC/SWEProject" className="more" {...ext}>
                    GitHub <span>↗</span>
                  </a>
                </div>
              </article>
            </div>
          </div>
        </div>
      </section>

      {/* ---------------------------------------------------------- SKILLS */}
      <section id="skills" className="section">
        <div className="wrap">
          <SectionHead index="03" title="Skills" lede="Every skill sits next to the place it was actually used." />
          <div className="skills">
            {skills.map((g, i) => (
              <div key={g.group} className="panel skill-group" data-reveal style={{ ["--d" as string]: `${i * 70}ms` }}>
                <h3>{g.group}</h3>
                <ul className="skill-rows">
                  {g.rows.map(([s, ev]) => (
                    <li key={s}>
                      <span>{s}</span>
                      <span className="ev">{ev}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
            <div className="panel skill-group" data-reveal style={{ gridColumn: "1 / -1" }}>
              <h3>Spoken languages</h3>
              <div className="lang-row">
                <span>
                  English <span className="faint">— fluent / native</span>
                </span>
                <span>
                  Mandarin 中文 <span className="faint">— fluent / native</span>
                </span>
                <span>Japanese 日本語</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* --------------------------------------------------------- WRITING */}
      <section id="writing" className="section">
        <div className="wrap">
          <SectionHead index="04" title="Writing" lede="Notes on what I build and break — engineering write-ups, security labs, and project post-mortems." />
          <ul className="posts" data-reveal>
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
          <div style={{ marginTop: 22, textAlign: "right" }}>
            <Link href="/blog" className="more">
              All writing <span>→</span>
            </Link>
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------- EDUCATION */}
      <section id="education" className="section">
        <div className="wrap">
          <SectionHead index="05" title="Education" />
          <div className="two-col">
            <div className="panel" data-reveal>
              <h3 className="xp-org">University of Florida</h3>
              <p className="xp-role">Bachelor of Science, Computer Science</p>
              <dl className="kv" style={{ marginTop: 22 }}>
                <dt>Graduating</dt>
                <dd>May 2027</dd>
                <dt>GPA</dt>
                <dd>
                  <span className="y mono">3.86</span> / 4.00
                </dd>
                <dt>Honours</dt>
                <dd>President&apos;s Honor Roll · Dean&apos;s List</dd>
                <dt>Awards</dt>
                <dd>First place, Gator Hack 2025</dd>
              </dl>
              {site.showMasters ? (
                <p className="note" style={{ marginTop: 22 }}>
                  <b>Planned:</b> UNSW Master of Information Technology (AI), Term 3 2027 — under consideration.
                </p>
              ) : null}
            </div>
            <div className="panel" data-reveal style={{ ["--d" as string]: "80ms" }}>
              <h3 className="label" style={{ color: "var(--fg-dim)" }}>
                Coursework themes
              </h3>
              <ul className="themes">
                {courseThemes.map(([k, v]) => (
                  <li key={k}>
                    <b>{k}</b>
                    <span>{v}</span>
                  </li>
                ))}
                <li>
                  <b>Maths</b>
                  <span>Calculus 1–3, computational linear algebra, engineering statistics, calculus-based physics</span>
                </li>
              </ul>
              <details className="courses">
                <summary>Full computer science course list ({courses.length})</summary>
                <table className="course-table">
                  <tbody>
                    {courses.map((c) => (
                      <tr key={c.code}>
                        <td>{c.term}</td>
                        <td>{c.code}</td>
                        <td>
                          {c.title}
                          {c.status ? <span className="faint"> · {c.status}</span> : null}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </details>
            </div>
          </div>
        </div>
      </section>

      {/* ----------------------------------------------------------- ABOUT */}
      <section id="about" className="section">
        <div className="wrap">
          <SectionHead index="06" title="About" />
          <div className="two-col">
            <div className="panel prose-block" data-reveal style={site.headshot ? { display: "grid", gap: 24 } : undefined}>
              {site.headshot ? <AsciiPortrait src={site.headshot} alt="Portrait of Cynthia Yao" /> : null}
              <div className="prose-block">
                <p>
                  I&apos;m an <strong>Australian citizen</strong> who left Australia at three, then studied and worked
                  across the <strong>United States and China</strong>. After graduating I&apos;m moving to Sydney — a
                  deliberate return to a country I haven&apos;t lived in since I was small.
                </p>
                <p>
                  What ties my work together is a liking for systems that have to be right: a payment pre-query where
                  every method must resolve, a migration finished inside a disclosure window, a benchmark run over
                  multiple seeds so one lucky run can&apos;t pass for a result.
                </p>
                <p>
                  Outside of that I sketch, write poetry and play games. I build and customise my own desktop tools,
                  and I&apos;d rather fork free and open-source software and shape it than settle for a default.
                </p>
              </div>
            </div>
            <div style={{ display: "grid", gap: "clamp(16px, 2.4vw, 24px)", alignContent: "start" }}>
              <div className="panel" data-reveal style={{ ["--d" as string]: "80ms" }}>
                <h3 className="label" style={{ color: "var(--fg-dim)", marginBottom: 18 }}>
                  What I&apos;m looking for
                </h3>
                <dl className="kv">
                  <dt>Roles</dt>
                  <dd>Backend &amp; payments engineering · applied ML · geospatial &amp; environmental AI</dd>
                  <dt>Type</dt>
                  <dd>Internships, and graduate / junior roles</dd>
                  <dt>Location</dt>
                  <dd>Open to all locations · relocating to Sydney</dd>
                  <dt>Work rights</dt>
                  <dd>Australian citizen — full work rights in Australia, no sponsorship required</dd>
                </dl>
              </div>
              <div className="panel" data-reveal style={{ ["--d" as string]: "160ms" }}>
                <h3 className="label" style={{ color: "var(--fg-dim)", marginBottom: 18 }}>
                  Coming next
                </h3>
                <ul className="next-list">
                  <li>
                    <span>GeoFM-STF paper</span>
                    <span>
                      <span className="status status-progress">In preparation</span>
                    </span>
                  </li>
                  <li>
                    <span>Desktop performance panel, open-sourced</span>
                    <span>
                      <span className="status status-planned">Planned</span>
                    </span>
                  </li>
                  {site.showSeniorProject ? (
                    <li>
                      <span>Tropical plants benchmark dataset — senior project</span>
                      <span>
                        <span className="status status-planned">Planned</span>
                      </span>
                    </li>
                  ) : null}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* --------------------------------------------------------- CONTACT */}
      <section id="contact" className="section">
        <div className="wrap">
          <SectionHead index="07" title="Contact" />
          <div className="contact" data-reveal>
            <div>
              <p className="contact-big">
                Building something that <span className="y">has to be right?</span>
              </p>
              <p className="dim" style={{ marginTop: 18, maxWidth: "48ch" }}>
                Email is the fastest way to reach me. I&apos;m happy to talk about internships, graduate roles,
                research, or anything on this page.
              </p>
              <a href={`mailto:${site.email}`} className="contact-email">
                {site.email}
              </a>
            </div>
            <ul className="contact-links">
              <li>
                <a href={`mailto:${site.email}`}>
                  <span className="label">Email</span>
                  <span className="v">{site.email}</span>
                  <span className="go">→</span>
                </a>
              </li>
              <li>
                <a href={site.linkedin} {...ext}>
                  <span className="label">LinkedIn</span>
                  <span className="v">in/xinyi-yao</span>
                  <span className="go">↗</span>
                </a>
              </li>
              <li>
                <a href={site.github} {...ext}>
                  <span className="label">GitHub</span>
                  <span className="v">@{site.githubHandle}</span>
                  <span className="go">↗</span>
                </a>
              </li>
              {site.resume ? (
                <li>
                  <a href={site.resume} {...ext}>
                    <span className="label">Résumé</span>
                    <span className="v">PDF</span>
                    <span className="go">↓</span>
                  </a>
                </li>
              ) : null}
              <li>
                <Link href="/blog">
                  <span className="label">Writing</span>
                  <span className="v">raccfields.dev/blog</span>
                  <span className="go">→</span>
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </section>
    </>
  );
}
