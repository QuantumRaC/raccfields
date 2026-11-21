"use client";

import { useEffect, useRef } from "react";

/**
 * Schematic of the cashier pre-query: one request fans out across three
 * services and resolves availability for all 24 payment methods.
 * Drawn and animated as a character grid.
 */
const COLS = 74;
const ROWS = 11;
const MAIN = 5;
const BRANCHES = [1, 5, 9];
const JX = 37; // fan-out column
const MX = 57; // merge column
const GRID_C = [63, 65, 67, 69, 71, 73];
const GRID_R = [3, 4, 5, 6];

type Cls = "" | "hi" | "pk" | "pc" | "pm";

function base() {
  const g: string[][] = Array.from({ length: ROWS }, () => Array(COLS).fill(" "));
  const text = (r: number, c: number, s: string) => {
    for (let i = 0; i < s.length; i++) if (c + i < COLS) g[r][c + i] = s[i];
  };
  text(MAIN, 0, "CLIENT");
  for (let c = 7; c <= 12; c++) g[MAIN][c] = "─";
  g[MAIN][13] = "▶";
  text(4, 14, "┌" + "─".repeat(17) + "┐");
  text(5, 14, "│CASHIER PRE-QUERY│");
  text(6, 14, "└" + "─".repeat(17) + "┘");
  for (let c = 33; c < JX; c++) g[MAIN][c] = "─";
  for (let r = 1; r <= 9; r++) g[r][JX] = "│";
  g[1][JX] = "┌";
  g[9][JX] = "└";
  g[MAIN][JX] = "┼";
  for (let r = 1; r <= 9; r++) g[r][MX] = "│";
  g[1][MX] = "┐";
  g[9][MX] = "┘";
  g[MAIN][MX] = "┼";
  BRANCHES.forEach((r, i) => {
    for (let c = JX + 1; c <= 40; c++) g[r][c] = "─";
    g[r][41] = "▶";
    text(r, 42, `[SERVICE ${i + 1}]`);
    for (let c = 53; c < MX; c++) g[r][c] = "─";
  });
  for (let c = MX + 1; c <= 60; c++) g[MAIN][c] = "─";
  g[MAIN][61] = "▶";
  text(1, 63, "METHODS");
  GRID_R.forEach((r) => GRID_C.forEach((c) => (g[r][c] = "■")));
  text(8, 63, "24 / 24");
  return g;
}

const BASE = base();

function staticHtml() {
  return BASE.map((row, r) =>
    row
      .map((ch, c) => (GRID_R.includes(r) && GRID_C.includes(c) ? `<span class="pc">${ch}</span>` : ch))
      .join("")
  ).join("\n");
}

const pathIn = Array.from({ length: 8 }, (_, i) => [MAIN, 6 + i] as const);
const pathMid = Array.from({ length: 5 }, (_, i) => [MAIN, 33 + i] as const);
const fan = (row: number) => {
  const p: (readonly [number, number])[] = [];
  const dir = row < MAIN ? -1 : 1;
  for (let r = MAIN + dir; row !== MAIN && r !== row + dir; r += dir) p.push([r, JX]);
  for (let c = JX + 1; c <= 41; c++) p.push([row, c]);
  return p;
};
const merge = (row: number) => {
  const p: (readonly [number, number])[] = [];
  for (let c = 53; c <= MX; c++) p.push([row, c]);
  const dir = row < MAIN ? 1 : -1;
  for (let r = row + dir; row !== MAIN && r !== MAIN + dir; r += dir) p.push([r, MX]);
  return p;
};
const pathOut = Array.from({ length: 4 }, (_, i) => [MAIN, 58 + i] as const);

export default function PaymentFlow() {
  const preRef = useRef<HTMLPreElement>(null);

  useEffect(() => {
    const pre = preRef.current;
    if (!pre || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const order = Array.from({ length: 24 }, (_, i) => i);
    let tick = 0;
    let timer = 0;
    let running = false;

    const render = () => {
      const cls: Cls[][] = Array.from({ length: ROWS }, () => Array(COLS).fill(""));
      const g = BASE.map((r) => r.slice());
      const at = (path: readonly (readonly [number, number])[], from: number, len: number) => {
        const k = Math.floor(((tick - from) / len) * path.length);
        if (k >= 0 && k < path.length) {
          const [r, c] = path[k];
          g[r][c] = "●";
          cls[r][c] = "pk";
          if (k > 0) {
            const [r2, c2] = path[k - 1];
            cls[r2][c2] = "hi";
          }
        }
      };
      const flash = (r: number, c0: number, c1: number, on: boolean) => {
        if (!on) return;
        for (let c = c0; c <= c1; c++) cls[r][c] = "pk";
      };

      at(pathIn, 0, 8);
      flash(5, 14, 32, tick >= 8 && tick < 14);
      if (tick >= 8 && tick < 14) {
        flash(4, 14, 32, true);
        flash(6, 14, 32, true);
      }
      at(pathMid, 14, 5);
      BRANCHES.forEach((r) => at(fan(r), 19, 8));
      BRANCHES.forEach((r) => flash(r, 42, 52, tick >= 27 && tick < 33));
      BRANCHES.forEach((r) => at(merge(r), 33, 8));
      at(pathOut, 41, 4);

      // methods resolve one by one
      const lit = tick < 45 ? (tick < 8 ? 24 : 0) : Math.min(24, Math.floor((tick - 45) * 2));
      GRID_R.forEach((r, ri) =>
        GRID_C.forEach((c, ci) => {
          const idx = order.indexOf(ri * GRID_C.length + ci);
          if (idx < lit) {
            cls[r][c] = idx === lit - 1 && lit < 24 ? "pk" : "pc";
          } else {
            g[r][c] = "·";
          }
        })
      );
      const counter = `${String(lit).padStart(2, " ")} / 24`;
      for (let i = 0; i < counter.length; i++) {
        g[8][63 + i] = counter[i];
        cls[8][63 + i] = lit === 24 ? "pc" : "hi";
      }

      let html = "";
      for (let r = 0; r < ROWS; r++) {
        let cur: Cls = "";
        let buf = "";
        const flush = () => {
          if (!buf) return;
          html += cur ? `<span class="${cur}">${buf}</span>` : buf;
          buf = "";
        };
        for (let c = 0; c < COLS; c++) {
          if (cls[r][c] !== cur) {
            flush();
            cur = cls[r][c];
          }
          buf += g[r][c];
        }
        flush();
        if (r < ROWS - 1) html += "\n";
      }
      pre.innerHTML = html;
    };

    const step = () => {
      tick = (tick + 1) % 80;
      if (tick === 0) order.sort(() => Math.random() - 0.5);
      render();
    };
    const start = () => {
      if (running) return;
      running = true;
      timer = window.setInterval(step, 70);
    };
    const stop = () => {
      running = false;
      clearInterval(timer);
    };
    const io = new IntersectionObserver(([e]) => (e.isIntersecting ? start() : stop()), { threshold: 0.3 });
    io.observe(pre);
    return () => {
      stop();
      io.disconnect();
    };
  }, []);

  return (
    <figure className="ascii" style={{ margin: 0, ["--cols" as string]: COLS + 1 }}>
      <div className="ascii-frame">
        <pre
          ref={preRef}
          aria-hidden
          dangerouslySetInnerHTML={{ __html: staticHtml() }}
        />
      </div>
      <figcaption className="ascii-cap">
        <span className="label">Schematic · cashier pre-query fan-out</span>
        <span className="label">3 services → 24 methods</span>
      </figcaption>
      <p className="sr-only">
        Diagram: a client request enters the cashier pre-query, which fans out to three services and
        returns availability for all 24 payment methods.
      </p>
    </figure>
  );
}
