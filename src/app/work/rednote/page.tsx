import type { Metadata } from "next";
import Link from "next/link";
import RedNoteMap from "@/components/RedNoteMap";

export const metadata: Metadata = {
  title: "RedNote — payments engineering",
  description:
    "Backend engineering internship on RedNote's payments team in Shanghai: checkout, a security fix, PayPal transaction summaries, refund routing, risk data for WeChat Pay and a support lookup tool, on Java microservices.",
};

const STACK = ["Java", "Spring Boot", "Microservices", "Thrift RPC", "Apollo config"];

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
        <h1 className="page-title">Payments engineering at RedNote</h1>
        <p className="page-sub">
          Backend engineering on the payments team of RedNote, a Chinese social media and shopping app: six
          pieces of work on the Java microservices behind checkout, security, currency exchange, refunds and
          risk control.
        </p>
        <div className="page-meta">
          <span className="label">Backend engineering intern, Payments</span>
          <span className="label">·</span>
          <span className="label">May – Aug 2026</span>
          <span className="label">·</span>
          <span className="label">Shanghai, China</span>
        </div>
      </header>

      <div className="wrap">
        <RedNoteMap />

        <section className="cs-grid" style={{ marginTop: "clamp(32px, 5vw, 56px)" }}>
          <h2>
            <span>01</span>Checkout
          </h2>
          <div className="cs-body">
            <div className="work-item">
              <h3>Deciding which payment methods the checkout shows</h3>
              <p>
                A lookup that runs before checkout and returns which payment methods to offer, built across three
                microservices with an internal RPC call and an HTTP endpoint. The rules account for the device, app and
                browser, and operations staff can switch a payment method off and show a notice through configuration
                (Apollo), without a code release.
              </p>
              <p>
                I also wrote emergency runbooks so operations staff can handle common failures without engineers.
              </p>
            </div>
          </div>
        </section>

        <section className="cs-grid">
          <h2>
            <span>02</span>Security fix
          </h2>
          <div className="cs-body">
            <div className="work-item">
              <h3>Responding to a critical vulnerability in a shared Java library</h3>
              <p>
                In July 2026 a remote-code-execution flaw was disclosed in a widely used Java library for reading JSON,
                with no patch coming. I audited the payment codebase&apos;s dependencies to separate our own use of the
                library from use inside shared internal libraries, and flagged what each owning team needed to fix.
              </p>
              <p>
                I then led the fix in the core payment services: moving them to a different JSON library, and turning on the library&apos;s safe mode wherever it couldn&apos;t be
                removed yet.
              </p>
            </div>
          </div>
        </section>

        <section className="cs-grid">
          <h2>
            <span>03</span>PayPal
          </h2>
          <div className="cs-body">
            <div className="work-item">
              <h3>Bringing in PayPal transaction summaries for currency exchange and reconciliation</h3>
              <p>
                Automated the daily intake of the company&apos;s own transaction summaries from its PayPal account,
                which feed currency exchange and finance reconciliation. I built it on the existing file-download framework
                rather than adding a new scheduler, mapped the records to internal types, and rolled it out gradually.
              </p>
            </div>
          </div>
        </section>

        <section className="cs-grid">
          <h2>
            <span>04</span>Refunds
          </h2>
          <div className="cs-body">
            <div className="work-item">
              <h3>Choosing which bank accounts refunds are paid from</h3>
              <p>
                Funds held at different banks earn different interest, so where outgoing refunds are drawn from
                matters. I added a configurable routing rule for this, split between a service that decides the route and
                one that keeps the counts, and reorganised the routing settings into an ordered list with gradual-rollout
                options so new rules can be added and switched on step by step.
              </p>
            </div>
          </div>
        </section>

        <section className="cs-grid">
          <h2>
            <span>05</span>WeChat Pay
          </h2>
          <div className="cs-body">
            <div className="work-item">
              <h3>Sending risk data to WeChat Pay</h3>
              <p>
                WeChat Pay asks platforms to send extra details with some payments for its fraud and risk checks. I
                mapped its specification against the existing payment flow and carried the required fields from order
                creation through to payment across two services.
              </p>
            </div>
          </div>
        </section>

        <section className="cs-grid">
          <h2>
            <span>06</span>In-app purchases
          </h2>
          <div className="cs-body">
            <div className="work-item">
              <h3>A self-service lookup for users&apos; Apple in-app purchase records</h3>
              <p>
                Support staff had no way to look up users&apos; Apple in-app purchase records directly in the internal
                portal. I built, on my own, a lookup tab there so they can check a record themselves: a Java endpoint
                that reuses an existing internal service call, and a table showing what they need.
              </p>
            </div>
          </div>
        </section>

        <section className="cs-grid">
          <h2>
            <span>07</span>Stack
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
            Back to experience
          </Link>
          <Link href="/work/geofm-stf" className="more">
            Read the research write-up
          </Link>
        </nav>
      </div>
    </>
  );
}
