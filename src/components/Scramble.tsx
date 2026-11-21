"use client";

import { useEffect, useRef, useState } from "react";

const GLYPHS = "!<>-_\\/[]{}=+*^?#01";

/**
 * Renders `text` normally (server-side and for screen readers), then plays a
 * one-off "decrypt" effect the first time it scrolls into view.
 */
export default function Scramble({
  text,
  className,
  duration = 700,
  delay = 0,
  as: Tag = "span",
}: {
  text: string;
  className?: string;
  duration?: number;
  delay?: number;
  as?: "span" | "h1" | "h2" | "h3";
}) {
  const ref = useRef<HTMLElement>(null);
  const [shown, setShown] = useState(text);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let raf = 0;
    let timer = 0;
    const run = () => {
      const start = performance.now() + delay;
      const tick = (now: number) => {
        const t = Math.min(1, Math.max(0, (now - start) / duration));
        let out = "";
        for (let i = 0; i < text.length; i++) {
          const ch = text[i];
          // Characters settle left to right; whitespace never scrambles.
          const settleAt = (i / text.length) * 0.75 + 0.25;
          out += ch === " " || t >= settleAt ? ch : GLYPHS[(Math.random() * GLYPHS.length) | 0];
        }
        setShown(out);
        if (t < 1) raf = requestAnimationFrame(tick);
      };
      raf = requestAnimationFrame(tick);
    };
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          io.disconnect();
          run();
        }
      },
      { threshold: 0.4 }
    );
    io.observe(el);
    return () => {
      io.disconnect();
      cancelAnimationFrame(raf);
      clearTimeout(timer);
    };
  }, [text, duration, delay]);

  return (
    <Tag ref={ref as never} className={className}>
      <span aria-hidden>{shown}</span>
      <span className="sr-only">{text}</span>
    </Tag>
  );
}
