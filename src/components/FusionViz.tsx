"use client";

import { useEffect, useRef } from "react";

/**
 * Schematic of spatiotemporal fusion: a fine image from an earlier date plus a
 * coarse image from the target date are combined to predict the fine image at
 * the target date. Synthetic patchwork "fields", not real data.
 */
const PW = 22; // panel width (chars)
const PH = 10; // panel height (rows)
const GAP = 3;
const COLS = PW * 3 + GAP * 2;
const RAMP = " .:-=+*#%@";
const GLYPHS = "░▒▓/\\|<>?#";
const BANDS = ["B", "G", "R", "NIR", "SW1", "SW2"];

// Small deterministic PRNG so server and client agree on the first frame.
function rng(seed: number) {
  let s = seed >>> 0;
  return () => {
    s = (s * 1664525 + 1013904223) >>> 0;
    return s / 4294967296;
  };
}

function makeFields() {
  const r = rng(7);
  const id = Array.from({ length: PH }, () => Array(PW).fill(0));
  // Recursive rectangular splits — reads like irrigated paddocks from above.
  let next = 0;
  const split = (x0: number, y0: number, x1: number, y1: number, depth: number) => {
    const w = x1 - x0;
    const h = y1 - y0;
    if (depth > 3 || (w < 7 && h < 4) || (depth > 1 && r() < 0.15)) {
      const k = next++;
      for (let y = y0; y < y1; y++) for (let x = x0; x < x1; x++) id[y][x] = k;
      return;
    }
    if (w / 2.2 > h) {
      const cut = x0 + 2 + Math.floor(r() * (w - 4));
      split(x0, y0, cut, y1, depth + 1);
      split(cut, y0, x1, y1, depth + 1);
    } else {
      const cut = y0 + 1 + Math.floor(r() * Math.max(1, h - 2));
      split(x0, y0, x1, cut, depth + 1);
      split(x0, cut, x1, y1, depth + 1);
    }
  };
  split(0, 0, PW, PH, 0);
  const v1 = Array.from({ length: next }, (_, i) => ((i * 0.37 + r() * 0.25) % 0.85) + 0.08);
  const v2 = v1.map((v) => (r() < 0.45 ? Math.min(0.98, Math.max(0.05, v + (r() - 0.4) * 0.8)) : v));
  const tex = Array.from({ length: PH }, () => Array.from({ length: PW }, () => (r() - 0.5) * 0.05));
  const fine = (vals: number[]) => id.map((row, y) => row.map((k, x) => Math.min(0.99, Math.max(0, vals[k] + tex[y][x]))));
  const t1 = fine(v1);
  const t2 = fine(v2);
  // Coarse: 4x3 block means of t2.
  const coarse = t2.map((row, y) =>
    row.map((_, x) => {
      const bx = Math.floor(x / 4) * 4;
      const by = Math.floor(y / 3) * 3;
      let s = 0;
      let n = 0;
      for (let yy = by; yy < Math.min(PH, by + 3); yy++)
        for (let xx = bx; xx < Math.min(PW, bx + 4); xx++) {
          s += t2[yy][xx];
          n++;
        }
      return s / n;
    })
  );
  return { t1, t2, coarse };
}

const F = makeFields();
const ch = (v: number) => RAMP[Math.min(RAMP.length - 1, Math.floor(v * RAMP.length))];

function frame(front: number, missing: number, rand: () => number) {
  const out: string[] = [];
  const pad = (s: string, n: number) => (s + " ".repeat(n)).slice(0, n);
  const gap = " ".repeat(GAP);
  out.push(
    `<span class="hi">${pad("FINE  t1", PW)}</span>${gap}<span class="hi">${pad("COARSE  t2", PW)}</span>${gap}<span class="pk">${pad("FUSED  t2 (pred.)", PW)}</span>`
  );
  out.push(`${"─".repeat(PW)}${gap}${"─".repeat(PW)}${gap}${"─".repeat(PW)}`);
  for (let y = 0; y < PH; y++) {
    let a = "";
    let b = "";
    let c = "";
    for (let x = 0; x < PW; x++) {
      a += ch(F.t1[y][x]);
      b += ch(F.coarse[y][x]);
    }
    let fused = "";
    for (let x = 0; x < PW; x++) {
      const d = front - x - (y % 2) * 0.5;
      if (d > 2) fused += ch(F.t2[y][x]);
      else if (d > -1) fused += `<span class="pk">${GLYPHS[(rand() * GLYPHS.length) | 0]}</span>`;
      else fused += `<span class="faint-ch">·</span>`;
    }
    c = fused;
    out.push(`<span class="hi">${a}</span>${gap}${b}${gap}<span class="hi">${c}</span>`);
  }
  out.push("");
  const strip = BANDS.map((b, i) => (i === missing ? `<span class="pm">[ ? ]</span>` : `<span class="pc">[${(b + "   ").slice(0, 3)}]</span>`)).join(" ");
  out.push(`BANDS ${strip}`);
  return out.join("\n");
}

export default function FusionViz() {
  const preRef = useRef<HTMLPreElement>(null);

  useEffect(() => {
    const pre = preRef.current;
    if (!pre || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let t = 0;
    let missing = 3;
    let timer = 0;
    const rand = Math.random;
    const step = () => {
      t++;
      const cycle = 64;
      const k = t % cycle;
      if (k === 0) missing = (missing + 1 + Math.floor(Math.random() * 4)) % BANDS.length;
      const front = k < 6 ? -2 : Math.min(PW + 4, (k - 6) * 0.75);
      pre.innerHTML = frame(front, missing, rand);
    };
    const io = new IntersectionObserver(
      ([e]) => {
        clearInterval(timer);
        if (e.isIntersecting) timer = window.setInterval(step, 70);
      },
      { threshold: 0.3 }
    );
    io.observe(pre);
    return () => {
      clearInterval(timer);
      io.disconnect();
    };
  }, []);

  return (
    <figure className="ascii" style={{ margin: 0, ["--cols" as string]: COLS + 1 }}>
      <div className="ascii-frame">
        <pre ref={preRef} aria-hidden dangerouslySetInnerHTML={{ __html: frame(PW + 4, 3, rng(1)) }} />
      </div>
      <figcaption className="ascii-cap">
        <span className="label">Schematic · synthetic fields, not lab data</span>
        <span className="label">fine t1 + coarse t2 → fine t2</span>
      </figcaption>
      <p className="sr-only">
        Diagram: a fine-resolution image from an earlier date and a coarse image from the target date are
        fused to predict a fine image at the target date, with one spectral band withheld.
      </p>
    </figure>
  );
}
