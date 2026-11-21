import type { Metadata } from "next";
import Link from "next/link";
import FusionViz from "@/components/FusionViz";

export const metadata: Metadata = {
  title: "Filling gaps in satellite imagery",
  description:
    "Research assistant work at the GeoDI Lab, University of Florida: spatiotemporal fusion of satellite imagery with a geospatial foundation model when bands are missing.",
};

type Ref = { title: string; source?: string; href: string };

const READING: { group: string; items: Ref[] }[] = [
  {
    group: "The satellites",
    items: [
      { title: "MODIS", source: "NASA Earthdata", href: "https://www.earthdata.nasa.gov/data/instruments/modis" },
      {
        title: "MODIS spectral bands",
        source: "NASA Earthdata",
        href: "https://www.earthdata.nasa.gov/data/instruments/modis/spectral-bands",
      },
      { title: "Landsat", source: "NASA Science", href: "https://science.nasa.gov/mission/landsat/" },
    ],
  },
  {
    group: "Spatiotemporal fusion",
    items: [
      {
        title: "On the blending of the Landsat and MODIS surface reflectance (STARFM)",
        source: "Gao et al., Remote Sensing of Environment, 2006",
        href: "https://doi.org/10.1016/j.rse.2006.02.001",
      },
      {
        title: "An enhanced spatial and temporal adaptive reflectance fusion model (ESTARFM)",
        source: "Zhu et al., Remote Sensing of Environment, 2010",
        href: "https://doi.org/10.1016/j.rse.2010.08.007",
      },
      {
        title: "A flexible spatiotemporal method for fusing satellite images (FSDAF)",
        source: "Zhu et al., Remote Sensing of Environment, 2016",
        href: "https://doi.org/10.1016/j.rse.2015.11.009",
      },
    ],
  },
  {
    group: "Geospatial foundation models",
    items: [
      {
        title: "Neural plasticity-inspired multimodal foundation model for Earth observation (DOFA)",
        source: "Xiong et al., arXiv, 2024",
        href: "https://arxiv.org/abs/2403.15356",
      },
    ],
  },
  {
    group: "Missing and degraded bands",
    items: [
      {
        title: "Missing information reconstruction of remote sensing data: a technical review",
        source: "Shen et al., IEEE Geoscience and Remote Sensing Magazine, 2015",
        href: "https://doi.org/10.1109/MGRS.2015.2441912",
      },
      {
        title: "Restoration of Aqua MODIS band 6 using histogram matching and local least squares fitting",
        source: "Rakwatin et al., IEEE Transactions on Geoscience and Remote Sensing, 2009",
        href: "https://ieeexplore.ieee.org/document/4694066",
      },
      {
        title: "Scientific impact of MODIS C5 calibration degradation and C6+ improvements",
        source: "Lyapustin et al., Atmospheric Measurement Techniques, 2014",
        href: "https://amt.copernicus.org/articles/7/4353/2014/",
      },
    ],
  },
];

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
        <h1 className="page-title">Filling gaps in satellite imagery</h1>
        <p className="page-sub">
          Research on how geospatial foundation models can help reconstruct satellite images that were never taken
          sharply enough, including when parts of the data are missing.
        </p>
        <div className="page-meta">
          <span className="label">Research assistant, Geospatial ML</span>
          <span className="label">·</span>
          <a href="https://geodi.geog.ufl.edu/" className="label link" target="_blank" rel="noreferrer">
            GeoDI Lab, University of Florida
          </a>
          <span className="label">·</span>
          <span className="label">Sep 2026 – now</span>
        </div>
      </header>

      <div className="wrap">
        <p className="wip">
          Work in progress in Dr. Di Yang&apos;s{" "}
          <a href="https://geodi.geog.ufl.edu/" className="link" target="_blank" rel="noreferrer">
            GeoDI Lab
          </a>{" "}
          (
          <a
            href="https://scholar.google.com/citations?user=B8l_ztwAAAAJ&hl=en"
            className="link"
            target="_blank"
            rel="noreferrer"
          >
            Google Scholar
          </a>
          ). This page describes the problem and my role; results stay with the lab until they are published.
        </p>

        <section className="cs-grid">
          <h2>
            <span>01</span>The problem
          </h2>
          <div className="cs-body">
            <p>
              Earth-observation satellites such as{" "}
              <a href="https://www.earthdata.nasa.gov/data/instruments/modis" className="link" target="_blank" rel="noreferrer">
                MODIS
              </a>{" "}
              and{" "}
              <a href="https://science.nasa.gov/mission/landsat/" className="link" target="_blank" rel="noreferrer">
                Landsat
              </a>{" "}
              trade off <strong>how often</strong> they see a place against{" "}
              <strong>how sharply</strong>. Some sensors revisit daily at coarse resolution; others capture fine detail
              but only every couple of weeks, and clouds take out more of those passes. Spatiotemporal fusion predicts a
              fine-resolution image for a date where only coarse imagery exists, using a fine image from a nearby date
              as reference.
            </p>
            <p>
              Real archives are also incomplete across the spectrum: a band (one of the colour or infrared channels a
              sensor records) can be missing or unusable. The project
              looks at how fusion holds up when that happens, and whether foundation models trained on many kinds of
              satellite data can help.
            </p>
            <FusionViz />
          </div>
        </section>

        <section className="cs-grid">
          <h2>
            <span>02</span>The model
          </h2>
          <div className="cs-body">
            <p>
              We are studying a specific geospatial foundation model, a large model pretrained on many kinds of
              satellite data, which adjusts to the wavelengths of whichever bands it is
              given. One model can take imagery from different sensors and band combinations, which makes it a
              natural fit when bands are missing, a practical problem with real satellite archives. The project looks
              at how to apply it to fusion with incomplete input, and how well it performs there.
            </p>
          </div>
        </section>

        <section className="cs-grid">
          <h2>
            <span>03</span>The lab
          </h2>
          <div className="cs-body">
            <p>
              The GeoDI Lab also works with NASA-supported citizen-science programmes, including{" "}
              <a href="https://geoemerge.com/nasa-at-uf/" className="link" target="_blank" rel="noreferrer">
                EMERGE
              </a>{" "}
              and{" "}
              <a href="https://observer.globe.gov/" className="link" target="_blank" rel="noreferrer">
                GLOBE Observer
              </a>
              , where volunteers submit environmental observations that feed research and teaching.{" "}
              <a
                href="https://geodi.geog.ufl.edu/research/about-citizen-science/"
                className="link"
                target="_blank"
                rel="noreferrer"
              >
                More on the lab&apos;s citizen-science work
              </a>
              .
            </p>
            <p>
              Alongside the research I wrote{" "}
              <a href="https://github.com/QuantumRaC/ask-globe" className="link" target="_blank" rel="noreferrer">
                ask-globe
              </a>
              , a skill that lets an AI agent answer plain-language questions from live GLOBE Observer data, so
              people who don&apos;t write code can use the dataset too.
            </p>
          </div>
        </section>

        <section className="cs-grid">
          <h2>
            <span>04</span>Further reading
          </h2>
          <div className="cs-body">
            {READING.map((g) => (
              <div key={g.group} className="reading">
                <h3>{g.group}</h3>
                <ul>
                  {g.items.map((r) => (
                    <li key={r.href}>
                      <a href={r.href} className="link" target="_blank" rel="noreferrer">
                        {r.title}
                      </a>
                      {r.source ? <span className="faint"> · {r.source}</span> : null}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        <nav className="next-page" aria-label="Next">
          <Link href="/work/rednote" className="more">
            Read the RedNote write-up
          </Link>
          <Link href="/#projects" className="more">
            See my projects
          </Link>
        </nav>
      </div>
    </>
  );
}
