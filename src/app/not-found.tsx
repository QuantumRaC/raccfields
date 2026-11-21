import Link from "next/link";

export default function NotFound() {
  return (
    <section className="wrap page-head" style={{ minHeight: "70vh" }}>
      <pre className="mono y" style={{ fontSize: "clamp(12px, 2vw, 16px)", margin: "0 0 24px" }} aria-hidden>
{`  _  _    ___   _  _
 | || |  / _ \\ | || |
 | || |_| | | || || |_
 |__   _| |_| ||__   _|
    |_|  \\___/    |_|`}
      </pre>
      <h1 className="page-title">Nothing at this address.</h1>
      <p className="page-sub">The page moved or never existed. The globe is still spinning on the home page.</p>
      <div className="hero-cta">
        <Link href="/" className="btn btn-primary">
          Home <span className="arrow">→</span>
        </Link>
        <Link href="/blog" className="btn">
          Writing
        </Link>
      </div>
    </section>
  );
}
