import type { Metadata } from "next";
import Link from "next/link";
import WriteLikeTool from "./WriteLikeTool";

export const metadata: Metadata = {
  title: "WriteLike",
  description:
    "An explainable writing-style analyser: spaCy and statistical features measure a passage, and Gemini turns the numbers into readable feedback.",
};

export default function WriteLikePage() {
  return (
    <>
      <header className="wrap page-head">
        <nav className="crumbs" aria-label="Breadcrumb">
          <Link href="/">~</Link>
          <span>/</span>
          <Link href="/#projects">projects</Link>
          <span>/</span>
          <span>writelike</span>
        </nav>
        <h1 className="page-title">WriteLike</h1>
        <p className="page-sub">
          Paste a passage to see how it is built: rhythm, clause density, word choice and tone, measured with spaCy
          and explained in plain language by Gemini.
        </p>
        <div className="page-meta">
          <a href="https://github.com/QuantumRaC/T3xtAnlys" className="label link" target="_blank" rel="noreferrer">
            View the source on GitHub
          </a>
        </div>
      </header>

      <div className="wrap">
        <WriteLikeTool />
        <p className="label" style={{ marginTop: 12 }}>
          English · Simplified Chinese (experimental). The backend runs on a free tier and may take a few seconds to wake up.
        </p>
      </div>

      <div className="wrap" style={{ marginTop: "clamp(56px, 8vw, 96px)" }}>
        <section className="cs-grid">
          <h2>
            <span>01</span>What it does
          </h2>
          <div className="cs-body">
            <p>
              WriteLike looks at the shape of a piece of writing (sentence length, rhythm, tone and word choice) and
              turns those patterns into feedback. It doesn&apos;t judge whether writing is good or bad; it shows{" "}
              <strong>how</strong> it works, so you can borrow a rhythm or a structure while keeping your own voice.
            </p>
          </div>
        </section>
        <section className="cs-grid">
          <h2>
            <span>02</span>How it works
          </h2>
          <div className="cs-body">
            <p>
              The numbers describe what&apos;s happening; the language model explains what it means. Keeping the
              measurement deterministic makes the feedback explainable instead of a black-box opinion.
            </p>
            <div className="spark" style={{ whiteSpace: "pre-wrap" }}>
              <span className="y">detect   </span> langdetect, English / Simplified Chinese{"\n"}
              <span className="y">parse    </span> spaCy 3.8 (en_core_web_sm, zh_core_web_sm), TextBlob sentiment{"\n"}
              <span className="y">measure  </span> sentence &amp; token lengths, clause density, POS &amp; dependency
              distributions, tense, lemma motifs{"\n"}
              <span className="y">explain  </span> compact JSON summary → Gemini 2.5 → style feedback{"\n"}
              <span className="y">serve    </span> FastAPI on Render · Next.js front end · HMAC-signed requests
            </div>
          </div>
        </section>
        <section className="cs-grid">
          <h2>
            <span>03</span>Posts about WriteLike
          </h2>
          <div className="cs-body">
            <ul className="posts">
              <li>
                <Link href="/blog/building-writelike" className="post-row">
                  <span className="post-date">Story</span>
                  <span className="post-title">The Story of WriteLike</span>
                  <span className="post-meta" />
                  <span className="post-desc">Motivation, experiments, deployment and current limitations.</span>
                </Link>
              </li>
              <li>
                <Link href="/blog/why-writelike-works" className="post-row">
                  <span className="post-date">Deep dive</span>
                  <span className="post-title">How it works, why it works</span>
                  <span className="post-meta" />
                  <span className="post-desc">The NLP pipeline, feature engineering and safeguards.</span>
                </Link>
              </li>
            </ul>
          </div>
        </section>
      </div>
    </>
  );
}
