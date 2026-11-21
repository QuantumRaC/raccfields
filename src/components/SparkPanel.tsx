"use client";

import { useEffect, useRef } from "react";

/** A preview of the desktop performance-panel style. Values are simulated. */
const BARS = "▁▂▃▄▅▆▇█";
const N = 28;

function bar(vals: number[]) {
  return vals.map((v) => BARS[Math.min(7, Math.max(0, Math.floor(v * 8)))]).join("");
}

function seed(base: number, amp: number) {
  return Array.from({ length: N }, (_, i) => Math.max(0, Math.min(0.99, base + Math.sin(i / 2.3) * amp)));
}

export default function SparkPanel() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const series = { cpu: seed(0.32, 0.18), mem: seed(0.58, 0.04), up: seed(0.15, 0.1), dn: seed(0.3, 0.2) };
    const walk = (arr: number[], vol: number, mean: number) => {
      const last = arr[arr.length - 1];
      let v = last + (Math.random() - 0.5) * vol + (mean - last) * 0.08;
      if (Math.random() < 0.05) v += 0.35;
      arr.push(Math.max(0.02, Math.min(0.98, v)));
      arr.shift();
    };
    let timer = 0;
    const render = () => {
      walk(series.cpu, 0.22, 0.32);
      walk(series.mem, 0.03, 0.58);
      walk(series.up, 0.18, 0.15);
      walk(series.dn, 0.3, 0.3);
      const pct = (a: number[]) => String(Math.round(a[a.length - 1] * 100)).padStart(3, " ") + "%";
      el.querySelector("[data-cpu]")!.textContent = bar(series.cpu);
      el.querySelector("[data-cpu-v]")!.textContent = pct(series.cpu);
      el.querySelector("[data-mem]")!.textContent = bar(series.mem);
      el.querySelector("[data-mem-v]")!.textContent = pct(series.mem);
      el.querySelector("[data-up]")!.textContent = bar(series.up);
      el.querySelector("[data-dn]")!.textContent = bar(series.dn);
    };
    const io = new IntersectionObserver(([e]) => {
      clearInterval(timer);
      if (e.isIntersecting) timer = window.setInterval(render, 420);
    });
    io.observe(el);
    return () => {
      clearInterval(timer);
      io.disconnect();
    };
  }, []);

  const cpu = seed(0.32, 0.18);
  const mem = seed(0.58, 0.04);
  return (
    <div>
      <div ref={ref} className="spark" aria-hidden>
        <span className="k">CPU </span>
        <span className="y" data-cpu>
          {bar(cpu)}
        </span>
        <span data-cpu-v> 32%</span>
        {"\n"}
        <span className="k">MEM </span>
        <span className="c" data-mem>
          {bar(mem)}
        </span>
        <span data-mem-v> 58%</span>
        {"\n"}
        <span className="k">NET↑</span>
        <span className="m" data-up>
          {bar(seed(0.15, 0.1))}
        </span>
        {"\n"}
        <span className="k">NET↓</span>
        <span className="c" data-dn>
          {bar(seed(0.3, 0.2))}
        </span>
        {"\n"}
        <span className="k">TOP </span>
        <span>WindowServer · kernel_task · …</span>
      </div>
      <p className="label" style={{ marginTop: 8 }}>
        Style preview · simulated values
      </p>
    </div>
  );
}
