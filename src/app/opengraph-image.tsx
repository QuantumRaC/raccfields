import { ImageResponse } from "next/og";

export const alt = "Cynthia Yao — backend & payments engineering, geospatial ML research";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const DOTS = Array.from({ length: 14 }, (_, r) =>
  Array.from({ length: 34 }, (_, c) => ".:-=+*#"[Math.floor(((Math.sin(r * 0.7 + c * 0.35) + Math.cos(c * 0.21 - r * 0.4)) / 2 + 1) * 3.4)] ?? ".").join("")
);

export default function OG() {
  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", background: "#07070a", color: "#ebe9e4", padding: 64, fontFamily: "monospace" }}>
        <div style={{ display: "flex", flexDirection: "column", justifyContent: "space-between", width: 700 }}>
          <div style={{ display: "flex", fontSize: 22, color: "#63616e", letterSpacing: 3 }}>UF COMPUTER SCIENCE · MAY 2027</div>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <div style={{ fontSize: 96, fontWeight: 700, letterSpacing: -4, lineHeight: 1 }}>Cynthia Yao</div>
            <div style={{ display: "flex", fontSize: 30, marginTop: 28 }}>
              <span style={{ color: "#f4e64d" }}>Backend &amp; payments engineering</span>
            </div>
            <div style={{ display: "flex", fontSize: 30, marginTop: 6 }}>
              <span style={{ color: "#5cecec" }}>Geospatial ML research</span>
            </div>
          </div>
          <div style={{ display: "flex", fontSize: 22, color: "#a3a1ab" }}>
            <span style={{ color: "#5cecec" }}>GNV</span>&nbsp;→&nbsp;<span style={{ color: "#ff3d8e" }}>SHA</span>&nbsp;→&nbsp;<span style={{ color: "#f4e64d" }}>SYD</span>&nbsp;· raccfields.dev
          </div>
        </div>
        <div style={{ display: "flex", flexDirection: "column", fontSize: 20, lineHeight: 1.35, color: "#2b2b38", marginLeft: 20, justifyContent: "center" }}>
          {DOTS.map((l, i) => (
            <div key={i} style={{ display: "flex", whiteSpace: "pre" }}>{l}</div>
          ))}
        </div>
      </div>
    ),
    size
  );
}
