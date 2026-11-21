import type { Metadata } from "next";
import Link from "next/link";
import CountUp from "@/components/CountUp";
import PaymentFlow from "@/components/PaymentFlow";
import Scramble from "@/components/Scramble";

export const metadata: Metadata = {
  title: "RedNote — payments engineering",
  description:
    "Backend / payments engineering internship at RedNote, Shanghai: a cashier pre-query across 3 services and 24 payment methods, PayPal reporting ingestion, an Apple IAP lookup tool, and a 24-hour FastJson RCE remediation.",
};

const STACK = ["Java", "Spring Boot", "Microservices", "Thrift RPC", "Apollo config", "WeChat Pay", "PayPal", "Apple IAP", "FastJson → Gson", "Vue.js"];

export default function RedNote() {
  return (
    <>
      <header className="wrap page-head">
        <nav className="crumbs" aria-label="Breadcrumb">
          <Link href="/">~</Link>
          <span>/</span>
          <Link href="/#experience">work</Link>
          <span>/</span>
          <span>rednote</span>
        </nav>
        <Scramble as="h1" className="page-title" text="Payments engineering at RedNote" />
        <p className="page-sub">
          A summer on the payments team at RedNote (Xiaohongshu) in Shanghai, working in Java microservices on services
          that carry live payment traffic. Four pieces of work, all shipped.
        </p>
        <div className="page-meta">
          <span className="status status-shipped">Shipped</span>
          <span className="label">Backend / payments engineering intern</span>
          <span className="label">·</span>
          <span className="label">May – Aug 2026</span>
          <span className="label">·</span>
          <span className="label">Shanghai, China</span>
        </div>
      </header>

      <div className="wrap">
        <div className="metrics" style={{ gridTemplateColumns: "repeat(auto-fit, minmax(170px, 1fr))", marginTop: 0 }} data-reveal>
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
            <div className="metric-v">
              <CountUp value={4} />
            </div>
            <div className="metric-k">PayPal report types ingested</div>
          </div>
          <div className="metric">
            <div className="metric-v">
              ~<CountUp value={500} />
            </div>
            <div className="metric-k">IAP lookups / day</div>
          </div>
          <div className="metric">
            <div className="metric-v m">
              &lt;<CountUp value={24} />h
            </div>
            <div className="metric-k">RCE disclosure → core repos migrated</div>
          </div>
        </div>

        <section className="cs-grid" style={{ marginTop: "clamp(40px, 6vw, 72px)" }}>
          <h2>
            <span>01</span>Cashier pre-query
          </h2>
          <div className="cs-body">
            <div className="work-item">
              <h3>One query, three services, every payment method</h3>
              <div className="big">
                ~48k
                <small>requests / day</small>
              </div>
              <p>
                Built a cashier pre-query that spans <strong>3 services</strong> and covers{" "}
                <strong>all 24 payment methods</strong>, handling roughly 48,000 requests a day — the kind of fan-out where one slow or
                inconsistent service shows up directly at checkout.
              </p>
            </div>
            <PaymentFlow />
          </div>
        </section>

        <section className="cs-grid">
          <h2>
            <span>02</span>PayPal reporting
          </h2>
          <div className="cs-body">
            <div className="work-item">
              <h3>Reporting ingestion for FX and reconciliation</h3>
              <div className="big">
                100%
                <small>rolled out</small>
              </div>
              <p>
                Built ingestion for <strong>4 PayPal report types</strong>, feeding foreign-exchange handling and
                finance reconciliation, and shipped it to 100%. Reporting data is where payments meet accounting, so
                the job is completeness and correctness rather than speed.
              </p>
            </div>
          </div>
        </section>

        <section className="cs-grid">
          <h2>
            <span>03</span>Apple IAP lookup
          </h2>
          <div className="cs-body">
            <div className="work-item">
              <h3>An internal tool, built solo end to end</h3>
              <div className="big">
                ~500
                <small>requests / day</small>
              </div>
              <p>
                Built, on my own, a full-stack lookup tool for Apple in-app purchases with a Vue.js front end. It
                handles roughly 500 requests a day.
              </p>
            </div>
          </div>
        </section>

        <section className="cs-grid">
          <h2>
            <span>04</span>FastJson RCE
          </h2>
          <div className="cs-body">
            <div className="work-item">
              <h3>Remediating a remote-code-execution disclosure in 24 hours</h3>
              <div className="big">
                &lt;24h
                <small>to migration</small>
              </div>
              <p>
                When a FastJson remote-code-execution vulnerability was disclosed, I led the remediation across the
                payment codebase: auditing 13 repositories, confirming which were affected, and migrating the core
                payment repositories to Gson within 24 hours of disclosure.
              </p>
            </div>
            <ol className="timeline" data-reveal>
              <li>
                <span className="t">T+0</span>
                <p>RCE disclosure in FastJson.</p>
              </li>
              <li>
                <span className="t">AUDIT</span>
                <p>
                  <strong className="y">13</strong> repositories audited for FastJson usage.
                </p>
              </li>
              <li>
                <span className="t">TRIAGE</span>
                <p>
                  <strong className="y">10</strong> confirmed affected.
                </p>
              </li>
              <li>
                <span className="t">&lt; T+24h</span>
                <p>
                  <strong className="y">4</strong> core payment repositories migrated from FastJson to Gson.
                </p>
              </li>
            </ol>
          </div>
        </section>

        <section className="cs-grid">
          <h2>
            <span>05</span>Stack
          </h2>
          <div className="cs-body">
            <ul className="chips">
              {STACK.map((t) => (
                <li key={t} className="chip">
                  {t}
                </li>
              ))}
            </ul>
          </div>
        </section>

        <nav className="next-page" aria-label="Next">
          <Link href="/#experience" className="more">
            <span>←</span> All experience
          </Link>
          <Link href="/work/geofm-stf" className="more">
            Next: GeoFM-STF research <span>→</span>
          </Link>
        </nav>
      </div>
    </>
  );
}
