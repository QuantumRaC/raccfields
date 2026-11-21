"use client";

import { useEffect, useRef } from "react";

const RAMP = " .,:;i1tfLCG08@";

/**
 * Shows a photo as ASCII art that resolves into the real image on hover/focus.
 * Only rendered when `site.headshot` is set.
 */
export default function AsciiPortrait({ src, alt }: { src: string; alt: string }) {
  const boxRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const box = boxRef.current!;
    const canvas = canvasRef.current!;
    const ctx = canvas.getContext("2d")!;
    const img = new Image();
    img.src = src;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const yellow = getComputedStyle(document.documentElement).getPropertyValue("--yellow").trim();
    const fg = getComputedStyle(document.documentElement).getPropertyValue("--fg").trim();
    let raf = 0;

    const draw = (reveal: number) => {
      const r = box.getBoundingClientRect();
      const dpr = Math.min(2, window.devicePixelRatio || 1);
      canvas.width = r.width * dpr;
      canvas.height = r.height * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      const fs = Math.max(6, r.width / 52);
      const cw = fs * 0.62;
      const chh = fs * 1.05;
      const cols = Math.floor(r.width / cw);
      const rows = Math.floor(r.height / chh);
      // Sample the image at character resolution (object-fit: cover).
      const off = document.createElement("canvas");
      off.width = cols;
      off.height = rows;
      const o = off.getContext("2d")!;
      const ir = img.width / img.height;
      const br = cols * cw / (rows * chh);
      let sw = img.width;
      let sh = img.height;
      if (ir > br) sw = img.height * br;
      else sh = img.width / br;
      o.drawImage(img, (img.width - sw) / 2, (img.height - sh) / 2, sw, sh, 0, 0, cols, rows);
      const data = o.getImageData(0, 0, cols, rows).data;
      ctx.clearRect(0, 0, r.width, r.height);
      ctx.font = `${fs}px ${getComputedStyle(canvas).fontFamily}`;
      ctx.textBaseline = "top";
      for (let y = 0; y < rows; y++) {
        if (y / rows > reveal) break;
        for (let x = 0; x < cols; x++) {
          const i = (y * cols + x) * 4;
          const l = (0.2126 * data[i] + 0.7152 * data[i + 1] + 0.0722 * data[i + 2]) / 255;
          const k = Math.floor(l * (RAMP.length - 1));
          ctx.fillStyle = y / rows > reveal - 0.04 ? yellow : fg;
          ctx.globalAlpha = 0.25 + l * 0.75;
          ctx.fillText(RAMP[k], x * cw, y * chh);
        }
      }
      ctx.globalAlpha = 1;
    };

    const play = () => {
      if (reduced) return draw(1);
      const t0 = performance.now();
      const tick = (now: number) => {
        const t = Math.min(1, (now - t0) / 1600);
        draw(t * 1.05);
        if (t < 1) raf = requestAnimationFrame(tick);
      };
      raf = requestAnimationFrame(tick);
    };

    let io: IntersectionObserver | null = null;
    img.onload = () => {
      io = new IntersectionObserver(([e]) => {
        if (e.isIntersecting) {
          io?.disconnect();
          play();
        }
      });
      io.observe(box);
    };
    const ro = new ResizeObserver(() => img.complete && img.width && draw(1));
    ro.observe(box);
    return () => {
      cancelAnimationFrame(raf);
      io?.disconnect();
      ro.disconnect();
    };
  }, [src]);

  return (
    <div ref={boxRef} className="portrait" tabIndex={0}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={src} alt={alt} />
      <canvas ref={canvasRef} aria-hidden style={{ fontFamily: "var(--mono)" }} />
    </div>
  );
}
