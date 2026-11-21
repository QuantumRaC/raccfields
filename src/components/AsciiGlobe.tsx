"use client";

import { useEffect, useRef } from "react";
import { LAND_B64, LAND_H, LAND_W } from "@/lib/landmask";

export type Marker = { code: string; name: string; lat: number; lon: number; color: "cyan" | "magenta" | "yellow" };

const DEG = Math.PI / 180;
const LAND_RAMP = ".:-=+*#%@";

function decodeMask(): Uint8Array {
  const bin = atob(LAND_B64);
  const out = new Uint8Array(bin.length);
  for (let i = 0; i < bin.length; i++) out[i] = bin.charCodeAt(i);
  return out;
}

type Vec = [number, number, number];

function toVec(lat: number, lon: number): Vec {
  const p = lat * DEG;
  const l = lon * DEG;
  return [Math.cos(p) * Math.sin(l), Math.sin(p), Math.cos(p) * Math.cos(l)];
}

/** Spherical interpolation between two unit vectors. */
function slerp(a: Vec, b: Vec, t: number): Vec {
  const d = Math.min(1, Math.max(-1, a[0] * b[0] + a[1] * b[1] + a[2] * b[2]));
  const w = Math.acos(d);
  if (w < 1e-6) return a;
  const s = Math.sin(w);
  const k1 = Math.sin((1 - t) * w) / s;
  const k2 = Math.sin(t * w) / s;
  return [a[0] * k1 + b[0] * k2, a[1] * k1 + b[1] * k2, a[2] * k1 + b[2] * k2];
}

/**
 * A rotating globe drawn entirely in monospace characters on a canvas.
 * Land comes from a Natural Earth bitmask; markers and great-circle arcs are
 * drawn into the same character grid so everything stays "ASCII".
 */
export default function AsciiGlobe({ markers, label }: { markers: Marker[]; label: string }) {
  const boxRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const box = boxRef.current!;
    const canvas = canvasRef.current!;
    const ctx = canvas.getContext("2d")!;
    const mask = decodeMask();
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const css = getComputedStyle(document.documentElement);
    const col = {
      fg: css.getPropertyValue("--fg").trim() || "#ebe9e4",
      faint: css.getPropertyValue("--fg-faint").trim() || "#63616e",
      cyan: css.getPropertyValue("--cyan").trim() || "#5cecec",
      magenta: css.getPropertyValue("--magenta").trim() || "#ff3d8e",
      yellow: css.getPropertyValue("--yellow").trim() || "#f4e64d",
    };
    const fontFamily = getComputedStyle(canvas).fontFamily || "monospace";

    const land = (lat: number, lon: number) => {
      let x = Math.floor(((lon + 180) / 360) * LAND_W) % LAND_W;
      if (x < 0) x += LAND_W;
      const y = Math.min(LAND_H - 1, Math.max(0, Math.floor(((90 - lat) / 180) * LAND_H)));
      const i = y * LAND_W + x;
      return (mask[i >> 3] >> (i & 7)) & 1;
    };

    // ---- view state -------------------------------------------------------
    // Rest view looks across the Pacific so all three cities are on screen.
    // Start looking across the Pacific so all three cities are on screen, then spin slowly.
    const REST_LON = -178;
    const SPIN = 0.006; // degrees per ms (~1 revolution a minute)
    let lon0 = REST_LON;
    let tilt = 12 * DEG;
    let vel = 0;
    let dragging = false;
    let lastX = 0;
    let lastY = 0;
    let lastInteract = -1e9;
    let hoverTilt = 0;

    // ---- layout -----------------------------------------------------------
    let W = 0;
    let H = 0;
    let fs = 12;
    let cw = 7;
    let ch = 12;
    let cols = 0;
    let rows = 0;
    let R = 0;
    let cx = 0;
    let cy = 0;
    const resize = () => {
      const r = box.getBoundingClientRect();
      W = Math.max(1, r.width);
      H = Math.max(1, r.height);
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.round(W * dpr);
      canvas.height = Math.round(H * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      // Aim for roughly 64–96 columns depending on available width.
      fs = Math.max(7.5, Math.min(13.5, W / 54));
      cw = fs * 0.62;
      ch = fs * 1.12;
      cols = Math.floor(W / cw);
      rows = Math.floor(H / ch);
      R = Math.min(W, H) * 0.42;
      cx = W / 2;
      cy = H / 2;
    };
    resize();
    const ro = new ResizeObserver(() => {
      resize();
      if (reduced) draw(performance.now());
    });
    ro.observe(box);

    // forward: world -> view
    const fwd = (v: Vec, cl: number, sl: number, ct: number, st: number): Vec => {
      const x1 = v[0] * cl + v[2] * sl;
      const z1 = -v[0] * sl + v[2] * cl;
      const y2 = v[1] * ct - z1 * st;
      const z2 = v[1] * st + z1 * ct;
      return [x1, y2, z2];
    };

    const route = markers.map((m) => toVec(m.lat, m.lon));
    const L: Vec = (() => {
      const v: Vec = [-0.55, 0.45, 0.7];
      const n = Math.hypot(...v);
      return [v[0] / n, v[1] / n, v[2] / n];
    })();

    // Character buffers reused every frame.
    let chars: string[] = [];
    let styles: Int8Array = new Int8Array(0);
    // style ids: 0 none, 1-6 land shades, 7-8 ocean, 9 rim, 10 cyan, 11 magenta, 12 yellow, 13 graticule
    const STYLE: string[] = [];
    const shade = (hex: string, a: number) => {
      const h = hex.replace("#", "");
      const r = parseInt(h.slice(0, 2), 16);
      const g = parseInt(h.slice(2, 4), 16);
      const b = parseInt(h.slice(4, 6), 16);
      return `rgba(${r},${g},${b},${a})`;
    };
    STYLE[1] = shade(col.fg, 0.34);
    STYLE[2] = shade(col.fg, 0.48);
    STYLE[3] = shade(col.fg, 0.62);
    STYLE[4] = shade(col.fg, 0.76);
    STYLE[5] = shade(col.fg, 0.88);
    STYLE[6] = shade(col.fg, 1);
    STYLE[7] = shade(col.faint, 0.28);
    STYLE[8] = shade(col.faint, 0.5);
    STYLE[9] = shade(col.cyan, 0.4);
    STYLE[10] = col.cyan;
    STYLE[11] = col.magenta;
    STYLE[12] = col.yellow;
    STYLE[13] = shade(col.cyan, 0.2);
    const markerStyle = { cyan: 10, magenta: 11, yellow: 12 } as const;

    const put = (c: number, r: number, s: number, glyph: string) => {
      if (c < 0 || r < 0 || c >= cols || r >= rows) return;
      const i = r * cols + c;
      chars[i] = glyph;
      styles[i] = s;
    };

    const draw = (now: number) => {
      const n = cols * rows;
      if (chars.length !== n) {
        chars = new Array(n);
        styles = new Int8Array(n);
      }
      styles.fill(0);

      const cl = Math.cos(-lon0 * DEG);
      const sl = Math.sin(-lon0 * DEG);
      const t = tilt + hoverTilt;
      const ct = Math.cos(t);
      const st = Math.sin(t);

      // --- sphere body -----------------------------------------------------
      for (let r = 0; r < rows; r++) {
        const py = (r + 0.5) * ch;
        const ny = (cy - py) / R;
        for (let c = 0; c < cols; c++) {
          const px = (c + 0.5) * cw;
          const nx = (px - cx) / R;
          const d2 = nx * nx + ny * ny;
          if (d2 > 1) {
            if (d2 < 1.06) put(c, r, 9, "·");
            continue;
          }
          const z = Math.sqrt(1 - d2);
          // inverse of fwd: undo tilt, then undo spin
          const y1 = ny * ct + z * st;
          const z1 = -ny * st + z * ct;
          const x0 = nx * cl - z1 * sl;
          const z0 = nx * sl + z1 * cl;
          const lat = Math.asin(Math.max(-1, Math.min(1, y1))) / DEG;
          const lon = Math.atan2(x0, z0) / DEG;
          const lit = Math.max(0, nx * L[0] + ny * L[1] + z * L[2]);
          if (land(lat, lon)) {
            const k = Math.min(LAND_RAMP.length - 1, Math.floor((0.15 + lit * 0.85) * LAND_RAMP.length));
            const s = 1 + Math.min(5, Math.floor((0.12 + lit) * 5.2));
            put(c, r, s, LAND_RAMP[k]);
          } else {
            const gl = Math.abs(((lat + 180) % 15) - 7.5) > 6.9 || Math.abs(((lon + 360) % 15) - 7.5) > 7.1;
            if (gl && lit > 0.05) put(c, r, 13, "·");
            else if (lit > 0.82 && (c + r * 3) % 4 === 0) put(c, r, 7, ".");
            if (z < 0.22) put(c, r, 9, z < 0.1 ? ":" : ".");
          }
        }
      }

      // --- great-circle arcs between consecutive markers --------------------
      const cycle = 5200;
      const phase = reduced ? 1 : (now % (cycle * (route.length - 1) + 1600)) / cycle;
      const project = (v: Vec, h: number) => {
        const p = fwd(v, cl, sl, ct, st);
        const x = cx + p[0] * R * h;
        const y = cy - p[1] * R * h;
        const front = p[2] > 0 || Math.hypot(p[0], p[1]) * h > 1.0;
        return { x, y, front };
      };
      for (let s = 0; s < route.length - 1; s++) {
        const a = route[s];
        const b = route[s + 1];
        const local = reduced ? 1 : Math.min(1, Math.max(0, phase - s));
        const steps = 90;
        for (let i = 0; i <= steps; i++) {
          const u = i / steps;
          const v = slerp(a, b, u);
          const h = 1 + 0.22 * Math.sin(Math.PI * u);
          const pr = project(v, h);
          if (!pr.front) continue;
          const c = Math.floor(pr.x / cw);
          const r = Math.floor(pr.y / ch);
          if (u <= local) {
            const head = local < 1 && u > local - 0.04;
            put(c, r, head ? 12 : markerStyle[markers[s + 1].color], head ? "@" : "•");
          } else if (i % 3 === 0) {
            put(c, r, 7, "·");
          }
        }
      }

      // --- markers -----------------------------------------------------------
      const labels: { x: number; y: number; m: Marker; s: number }[] = [];
      markers.forEach((m, i) => {
        const pr = project(route[i], 1);
        if (!pr.front) return;
        const c = Math.floor(pr.x / cw);
        const r = Math.floor(pr.y / ch);
        const s = markerStyle[m.color];
        const pulse = reduced ? 0 : ((now / 900 + i * 0.33) % 1);
        put(c, r, s, "◉");
        const ring = pulse < 0.5 ? 1 : 2;
        put(c - ring, r, s, "(");
        put(c + ring, r, s, ")");
        labels.push({ x: c * cw, y: r * ch, m, s });
      });

      // --- paint -------------------------------------------------------------
      ctx.clearRect(0, 0, W, H);
      ctx.font = `${fs}px ${fontFamily}`;
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      for (let s = 1; s < STYLE.length; s++) {
        ctx.fillStyle = STYLE[s];
        for (let i = 0; i < n; i++) {
          if (styles[i] !== s) continue;
          const c = i % cols;
          const r = (i / cols) | 0;
          ctx.fillText(chars[i], (c + 0.5) * cw, (r + 0.5) * ch);
        }
      }

      // HUD labels with a short leader line.
      const lfs = Math.max(9.5, fs * 0.95);
      ctx.font = `${lfs}px ${fontFamily}`;
      ctx.textBaseline = "middle";
      for (const { x, y, m, s } of labels) {
        const w = Math.max(ctx.measureText(m.code).width, ctx.measureText(m.name).width) + 22;
        // Prefer the outer side of the globe, but keep the label inside the canvas.
        let right = x < cx;
        if (right && x - w < 0) right = false;
        if (!right && x + cw + w > W) right = true;
        const lx = right ? x - 14 : x + cw + 14;
        const ly = y + ch / 2 - (m.lat > 0 ? 18 : -18);
        ctx.strokeStyle = STYLE[s];
        ctx.globalAlpha = 0.7;
        ctx.beginPath();
        ctx.moveTo(x + cw / 2, y + ch / 2);
        ctx.lineTo(lx, ly);
        ctx.stroke();
        ctx.globalAlpha = 1;
        ctx.textAlign = right ? "right" : "left";
        const pad = right ? -4 : 4;
        ctx.fillStyle = STYLE[s];
        ctx.fillText(m.code, lx + pad, ly - lfs * 0.6);
        ctx.fillStyle = STYLE[3];
        ctx.fillText(m.name, lx + pad, ly + lfs * 0.6);
      }
    };

    // ---- animation loop ---------------------------------------------------
    let raf = 0;
    let visible = true;
    let last = performance.now();
    const loop = (now: number) => {
      const dt = Math.min(64, now - last);
      last = now;
      if (!dragging) {
        if (Math.abs(vel) > 0.002) {
          lon0 += vel * dt;
          vel *= Math.pow(0.94, dt / 16);
        } else {
          // Ease back into the slow auto-spin after a drag.
          const ramp = Math.min(1, Math.max(0, (now - lastInteract - 1200) / 1500));
          lon0 += SPIN * ramp * dt;
          tilt += (12 * DEG - tilt) * Math.min(1, dt / 2500) * ramp;
        }
      }
      draw(now);
      raf = visible ? requestAnimationFrame(loop) : 0;
    };

    if (reduced) {
      lon0 = REST_LON;
      draw(performance.now());
    } else {
      raf = requestAnimationFrame(loop);
    }

    const io = new IntersectionObserver(([e]) => {
      visible = e.isIntersecting && !document.hidden;
      if (visible && !raf && !reduced) {
        last = performance.now();
        raf = requestAnimationFrame(loop);
      }
    });
    io.observe(box);
    const onVis = () => {
      visible = !document.hidden;
      if (visible && !raf && !reduced) {
        last = performance.now();
        raf = requestAnimationFrame(loop);
      }
    };
    document.addEventListener("visibilitychange", onVis);

    // ---- interaction ------------------------------------------------------
    const onDown = (e: PointerEvent) => {
      dragging = true;
      lastX = e.clientX;
      lastY = e.clientY;
      vel = 0;
      box.setPointerCapture(e.pointerId);
    };
    const onMove = (e: PointerEvent) => {
      if (dragging) {
        const dx = e.clientX - lastX;
        const dy = e.clientY - lastY;
        // On touch, let vertical scrolls through.
        if (e.pointerType === "touch" && Math.abs(dy) > Math.abs(dx) * 1.2) return;
        lastX = e.clientX;
        lastY = e.clientY;
        const k = 110 / R;
        lon0 -= dx * k;
        tilt = Math.max(-35 * DEG, Math.min(45 * DEG, tilt + dy * k * DEG));
        vel = (-dx * k) / 16;
        lastInteract = performance.now();
        if (reduced) draw(performance.now());
      } else if (e.pointerType === "mouse" && !reduced) {
        const r = box.getBoundingClientRect();
        hoverTilt = (((e.clientY - r.top) / r.height - 0.5) * 10) * DEG;
      }
    };
    const onUp = (e: PointerEvent) => {
      dragging = false;
      lastInteract = performance.now();
      if (box.hasPointerCapture(e.pointerId)) box.releasePointerCapture(e.pointerId);
    };
    const onLeave = () => {
      hoverTilt = 0;
    };
    box.addEventListener("pointerdown", onDown);
    box.addEventListener("pointermove", onMove);
    box.addEventListener("pointerup", onUp);
    box.addEventListener("pointercancel", onUp);
    box.addEventListener("pointerleave", onLeave);

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      io.disconnect();
      document.removeEventListener("visibilitychange", onVis);
      box.removeEventListener("pointerdown", onDown);
      box.removeEventListener("pointermove", onMove);
      box.removeEventListener("pointerup", onUp);
      box.removeEventListener("pointercancel", onUp);
      box.removeEventListener("pointerleave", onLeave);
    };
  }, [markers]);

  return (
    <div ref={boxRef} className="globe" role="img" aria-label={label}>
      <canvas ref={canvasRef} />
    </div>
  );
}
