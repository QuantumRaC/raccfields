import type { Metadata } from "next";
import Link from "next/link";
import FusionViz from "@/components/FusionViz";
import Scramble from "@/components/Scramble";

export const metadata: Metadata = {
  title: "GeoFM-STF — geospatial ML research",
  description:
    "Benchmarking geospatial foundation models for spatiotemporal fusion of satellite imagery with missing spectral bands. GeoDi Lab, University of Florida. Paper in preparation.",
};

const SCENARIOS = ["S1", "S2", "S3", "S4", "S5"];

export default function GeoFM() {
  return (
    <>
      <header className="wrap page-head">
        <nav className="crumbs" aria-label="Breadcrumb">
          <Link href="/">~</Link>
          <span>/</span>
          <Link href="/#experience">work</Link>
          <span>/</span>
          <span>geofm-stf</span>
        </nav>
        <Scramble as="h1" className="page-title" text="Filling gaps in satellite imagery" />
        <p className="page-sub">
          GeoFM-STF asks how well geospatial foundation models handle spatiotemporal fusion when spectral bands are
          missing — and benchmarks them carefully enough that the answer can be trusted.
        </p>
        <div className="page-meta">
          <span className="status status-progress">In progress</span>
          <span className="label">GeoDi Lab, University of Florida</span>
          <span className="label">·</span>
          <span className="label">Sept 2026 – present</span>
        </div>
      </header>

      <div className="wrap">
        <p className="note" data-reveal>
          <b>Publication status: paper in preparation</b>, targeting an IEEE remote-sensing venue. Not yet submitted.
          Results and figures will be added here once they can be shared.
        </p>

        <section className="cs-grid" style={{ marginTop: "clamp(40px, 6vw, 72px)" }}>
          <h2>
            <span>01</span>The problem
          </h2>
          <div className="cs-body">
            <p>
              Earth-observation satellites trade off <strong>how often</strong> they see a place against{" "}
              <strong>how sharply</strong>. Some sensors revisit daily at coarse resolution; others capture fine detail
              but only every couple of weeks, and clouds take out more of those passes. Spatiotemporal fusion predicts a
              fine-resolution image for a date where only coarse imagery exists, using a fine image from a nearby date
              as reference.
            </p>
            <p>
              Real archives are also incomplete across the spectrum: a band can be missing or unusable. This project
              looks at how fusion holds up when that happens, using foundation models that can adapt to whichever bands
              are available.
            </p>
            <FusionViz />
          </div>
        </section>

        <section className="cs-grid">
          <h2>
            <span>02</span>Method
          </h2>
          <div className="cs-body">
            <p>
              The baseline is <strong>SimpleDOFA</strong>, an approach built on the DOFA geospatial foundation model,
              which I reproduced first. It is then benchmarked against established fusion methods —{" "}
              <strong>GAN-STFM</strong> and <strong>ECPW-STFN</strong>.
            </p>
            <p>
              Experiments use two standard fusion benchmarks, <strong>CIA</strong> and <strong>LGC</strong> — both, as it
              happens, from New South Wales, Australia. Training and evaluation run on UF&apos;s
              HiPerGator supercomputer.
            </p>
            <ul className="chips">
              {["Python", "PyTorch", "DOFA / SimpleDOFA", "GAN-STFM", "ECPW-STFN", "HiPerGator", "SSIM", "Cross-correlation", "Sign tests"].map((t) => (
                <li key={t} className="chip">
                  {t}
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section className="cs-grid">
          <h2>
            <span>03</span>Experimental design
          </h2>
          <div className="cs-body">
            <p>
              Part 1 runs SimpleDOFA across <strong>5 missing-band scenarios</strong>, each with{" "}
              <strong>3 random seeds</strong>, on both datasets. Results are compared band by band with{" "}
              <strong>sign tests</strong>, using SSIM and cross-correlation (CC), so a difference has to hold up
              across seeds and bands rather than appear in one lucky run.
            </p>
            <div className="table-scroll" data-reveal>
              <table className="grid-table">
                <caption className="sr-only">Part 1 experiment grid: scenarios by seeds for each dataset</caption>
                <thead>
                  <tr>
                    <th scope="col">PART 1</th>
                    {SCENARIOS.map((s) => (
                      <th key={s} scope="col" colSpan={3}>
                        {s}
                      </th>
                    ))}
                  </tr>
                  <tr>
                    <th scope="col">seed →</th>
                    {SCENARIOS.flatMap((s) =>
                      [1, 2, 3].map((k) => (
                        <th key={`${s}${k}`} scope="col">
                          {k}
                        </th>
                      ))
                    )}
                  </tr>
                </thead>
                <tbody>
                  {["CIA", "LGC"].map((d) => (
                    <tr key={d}>
                      <th scope="row">{d}</th>
                      {SCENARIOS.flatMap((s) =>
                        [1, 2, 3].map((k) => (
                          <td key={`${d}${s}${k}`} className="done" aria-label="run">
                            ■
                          </td>
                        ))
                      )}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="label">■ = scenario × seed run per dataset · Part 1 complete</p>
          </div>
        </section>

        <section className="cs-grid">
          <h2>
            <span>04</span>Status &amp; findings
          </h2>
          <div className="cs-body">
            <ol className="timeline">
              <li>
                <span className="t">DONE</span>
                <p>SimpleDOFA reproduced as the baseline.</p>
              </li>
              <li>
                <span className="t">DONE</span>
                <p>Part 1 experiments and per-band analysis with sign tests; SSIM and CC outputs collected.</p>
              </li>
              <li>
                <span className="t">IN PROGRESS</span>
                <p>
                  Benchmarking GAN-STFM and ECPW-STFN. So far GAN-STFM failed to converge in 1 of 3 seeds — a result
                  worth reporting, because it says something about the method&apos;s stability, not just its best case.
                </p>
              </li>
              <li>
                <span className="t">NEXT</span>
                <p>Write-up — paper in preparation, targeting an IEEE remote-sensing venue.</p>
              </li>
            </ol>
          </div>
        </section>

        <nav className="next-page" aria-label="Next">
          <Link href="/work/rednote" className="more">
            <span>←</span> RedNote payments work
          </Link>
          <Link href="/#projects" className="more">
            Projects <span>→</span>
          </Link>
        </nav>
      </div>
    </>
  );
}
