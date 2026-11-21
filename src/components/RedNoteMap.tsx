"use client";

import { useEffect, useRef } from "react";

/**
 * The six pieces of RedNote payments work as branches off one hub.
 * A pulse runs from the hub to each branch in turn and lights its label.
 */
const COLS = 72;
const ROWS = 11;
const HUB_ROW = 5;
const LJ = 27; // left junction column
const RJ = 46; // right junction column

type Branch = { side: "L" | "R"; row: number; label: string; detail: string };

const BRANCHES: Branch[] = [
  // Listed (and animated) in order of significance.
  { side: "L", row: 1, label: "CHECKOUT", detail: "" },
  { side: "R", row: 1, label: "SECURITY FIX", detail: "" },
  { side: "L", row: 5, label: "PAYPAL SUMMARIES", detail: "" },
  { side: "R", row: 5, label: "REFUND ROUTING", detail: "" },
  { side: "L", row: 9, label: "RISK DATA", detail: "" },
  { side: "R", row: 9, label: "SUPPORT TOOLING", detail: "" },
];

type Cls = "" | "hi" | "pk" | "pc";

function base() {
  const g: string[][] = Array.from({ length: ROWS }, () => Array(COLS).fill(" "));
  const text = (r: number, c: number, s: string) => {
    for (let i = 0; i < s.length; i++) if (r < ROWS && c + i < COLS) g[r][c + i] = s[i];
  };
  // hub
  text(4, 30, "┌" + "─".repeat(14) + "┐");
  text(5, 30, "│   PAYMENTS   │");
  text(6, 30, "└" + "─".repeat(14) + "┘");
  text(7, 31, "Java services");
  // junctions
  for (let r = 1; r <= 9; r++) {
    g[r][LJ] = "│";
    g[r][RJ] = "│";
  }
  g[1][LJ] = "┐";
  g[9][LJ] = "┘";
  g[HUB_ROW][LJ] = "┼";
  g[1][RJ] = "┌";
  g[9][RJ] = "└";
  g[HUB_ROW][RJ] = "┼";
  for (let c = LJ + 1; c < 30; c++) g[HUB_ROW][c] = "─";
  for (let c = 45; c < RJ; c++) g[HUB_ROW][c] = "─";
  for (const b of BRANCHES) {
    if (b.side === "L") {
      for (let c = 22; c < LJ; c++) g[b.row][c] = "─";
      text(b.row, 21 - b.label.length, b.label);
      text(b.row + 1, 21 - b.detail.length, b.detail);
    } else {
      for (let c = RJ + 1; c <= 50; c++) g[b.row][c] = "─";
      text(b.row, 52, b.label);
      text(b.row + 1, 52, b.detail);
    }
  }
  return g;
}

const BASE = base();

/** Cells from the hub edge out to a branch's label. */
function path(b: Branch): [number, number][] {
  const p: [number, number][] = [];
  const dir = b.row < HUB_ROW ? -1 : 1;
  if (b.side === "L") {
    for (let c = 29; c > LJ; c--) p.push([HUB_ROW, c]);
    p.push([HUB_ROW, LJ]);
    for (let r = HUB_ROW + dir; b.row !== HUB_ROW && r !== b.row + dir; r += dir) p.push([r, LJ]);
    for (let c = LJ - 1; c >= 22; c--) p.push([b.row, c]);
  } else {
    for (let c = 45; c < RJ; c++) p.push([HUB_ROW, c]);
    p.push([HUB_ROW, RJ]);
    for (let r = HUB_ROW + dir; b.row !== HUB_ROW && r !== b.row + dir; r += dir) p.push([r, RJ]);
    for (let c = RJ + 1; c <= 50; c++) p.push([b.row, c]);
  }
  return p;
}

const PATHS = BRANCHES.map(path);

function render(active: number, step: number, lit: Set<number>) {
  const g = BASE.map((r) => r.slice());
  const cls: Cls[][] = Array.from({ length: ROWS }, () => Array(COLS).fill(""));
  const mark = (r: number, c0: number, len: number, k: Cls) => {
    for (let c = c0; c < c0 + len; c++) cls[r][c] = k;
  };
  mark(5, 31, 14, "hi");
  BRANCHES.forEach((b, i) => {
    const on = lit.has(i);
    const lc = b.side === "L" ? 21 - b.label.length : 52;
    const dc = b.side === "L" ? 21 - b.detail.length : 52;
    mark(b.row, lc, b.label.length, on ? (i === active ? "pk" : "hi") : "");
    mark(b.row + 1, dc, b.detail.length, on ? "pc" : "");
  });
  if (active >= 0) {
    const p = PATHS[active];
    if (step < p.length) {
      const [r, c] = p[step];
      g[r][c] = "●";
      cls[r][c] = "pk";
    }
  }
  let html = "";
  for (let r = 0; r < ROWS; r++) {
    let cur: Cls = "";
    let buf = "";
    const flush = () => {
      if (buf) html += cur ? `<span class="${cur}">${buf}</span>` : buf;
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
  return html;
}

const ALL = new Set(BRANCHES.map((_, i) => i));

export default function RedNoteMap() {
  const preRef = useRef<HTMLPreElement>(null);

  useEffect(() => {
    const pre = preRef.current;
    if (!pre || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let active = 0;
    let step = 0;
    let lit = new Set<number>();
    let hold = 0;
    let timer = 0;
    const tick = () => {
      if (hold > 0) {
        hold--;
        if (hold === 0 && lit.size === BRANCHES.length) lit = new Set();
        pre.innerHTML = render(-1, 0, lit.size ? lit : ALL);
        return;
      }
      step++;
      if (step >= PATHS[active].length) {
        lit.add(active);
        active = (active + 1) % BRANCHES.length;
        step = 0;
        if (lit.size === BRANCHES.length) hold = 30;
      }
      pre.innerHTML = render(hold ? -1 : active, step, lit);
    };
    const io = new IntersectionObserver(([e]) => {
      clearInterval(timer);
      if (e.isIntersecting) timer = window.setInterval(tick, 70);
    });
    io.observe(pre);
    return () => {
      clearInterval(timer);
      io.disconnect();
    };
  }, []);

  return (
    <figure className="ascii" style={{ margin: 0, ["--cols" as string]: COLS + 1 }}>
      <div className="ascii-frame">
        <pre ref={preRef} aria-hidden dangerouslySetInnerHTML={{ __html: render(-1, 0, ALL) }} />
      </div>
      <p className="sr-only">
        Diagram of the areas of payments work at RedNote: checkout, a security fix, PayPal transaction
        summaries, refund routing, risk data and support tooling.
      </p>
    </figure>
  );
}
