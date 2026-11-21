"use client";

import { useEffect, useRef, useState } from "react";
import type { Heading } from "@/lib/posts";

/** Sticky table of contents + a thin reading-progress bar. */
export default function Toc({ headings }: { headings: Heading[] }) {
  const [active, setActive] = useState<string | null>(null);
  const barRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const els = headings.map((h) => document.getElementById(h.id)).filter(Boolean) as HTMLElement[];
    const io = new IntersectionObserver(
      (entries) => {
        const vis = entries.filter((e) => e.isIntersecting).sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (vis[0]) setActive(vis[0].target.id);
      },
      { rootMargin: "-10% 0px -70% 0px" }
    );
    els.forEach((el) => io.observe(el));

    let raf = 0;
    const onScroll = () => {
      if (raf) return;
      raf = requestAnimationFrame(() => {
        raf = 0;
        const art = document.querySelector("article.prose") as HTMLElement | null;
        if (!art || !barRef.current) return;
        const r = art.getBoundingClientRect();
        const p = Math.min(1, Math.max(0, -r.top / Math.max(1, r.height - window.innerHeight * 0.6)));
        barRef.current.style.setProperty("--p", String(p));
      });
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      io.disconnect();
      window.removeEventListener("scroll", onScroll);
    };
  }, [headings]);

  return (
    <>
      <div ref={barRef} className="progress" aria-hidden />
      <aside className="toc" aria-label="On this page">
        <span className="label">On this page</span>
        <ol>
          {headings.map((h) => (
            <li key={h.id} className={h.depth === 3 ? "d3" : undefined}>
              <a href={`#${h.id}`} aria-current={active === h.id ? "true" : undefined}>
                {h.text}
              </a>
            </li>
          ))}
        </ol>
      </aside>
    </>
  );
}
