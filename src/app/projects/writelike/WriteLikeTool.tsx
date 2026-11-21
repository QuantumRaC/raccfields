"use client";

import { useEffect, useRef, useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkBreaks from "remark-breaks";
import remarkGfm from "remark-gfm";
import { secureFetch } from "@/lib/secure-fetch";

const ENDPOINT = "https://t3xtanlys.onrender.com/analyze";

const SAMPLE = `To generalize about war is like generalizing about peace. Almost everything is true. Almost nothing is true. At its core, perhaps, war is just another name for death, and yet any soldier will tell you, if he tells the truth, that proximity to death brings with it a corresponding proximity to life. After a firefight, there is always the immense pleasure of aliveness. The trees are alive. The grass, the soil—everything. All around you things are purely living, and you among them, and the aliveness makes you tremble.
— Tim O'Brien, The Things They Carried`;

const EXAMPLE_OUTPUT = `**Example output.** Press *Analyse this text* to run it live.

**Overall style & tone**
Frequent lemmas like "generalize", "war", "true" and "death" suggest a serious, reflective, analytical tone. It leans formal rather than conversational.

**Pacing** — high oscillation in sentence and token length: concise statements mixed with longer, complex sentences create rhythm and emphasis.

**Clarity** — about 1.75 clauses per sentence keeps it digestible while retaining nuance.

**To write like this**
- Vary sentence lengths for dynamic pacing.
- Balance concise and complex vocabulary.
- Explore abstract themes (truth, conflict, mortality).
- Keep a serious, analytical tone.`;

const SPIN = ["⠋", "⠙", "⠹", "⠸", "⠼", "⠴", "⠦", "⠧", "⠇", "⠏"];

export default function WriteLikeTool() {
  const [text, setText] = useState(SAMPLE);
  const [result, setResult] = useState<string | null>(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [latency, setLatency] = useState<number | null>(null);
  const [spin, setSpin] = useState(0);
  const [elapsed, setElapsed] = useState(0);
  const started = useRef(0);

  useEffect(() => {
    if (!loading) return;
    const id = setInterval(() => {
      setSpin((s) => (s + 1) % SPIN.length);
      setElapsed(Math.round((performance.now() - started.current) / 100) / 10);
    }, 90);
    return () => clearInterval(id);
  }, [loading]);

  const analyse = async () => {
    if (!text.trim() || loading) return;
    setLoading(true);
    setError("");
    setLatency(null);
    started.current = performance.now();
    try {
      const res = await secureFetch(ENDPOINT, { method: "POST", body: { text } });
      if (!res.ok) {
        setError(`Server error ${res.status}: ${await res.text()}`);
        return;
      }
      const data = (await res.json()) as { analysis?: string; error?: string };
      if (data.error) {
        setError(data.error);
        return;
      }
      setLatency(Math.round(performance.now() - started.current));
      setResult(data.analysis ?? "");
    } catch (err) {
      if (err instanceof TypeError) setError("Network error — the analysis service may be waking up. Try again in a moment.");
      else setError(err instanceof Error ? err.message : "Unknown error.");
    } finally {
      setLoading(false);
    }
  };

  const words = text.trim() ? text.trim().split(/\s+/).length : 0;

  return (
    <div className="tool">
      <div>
        <div className="tool-bar">
          <label htmlFor="wl-input">input.txt</label>
          <span>{words} words</span>
        </div>
        <textarea
          id="wl-input"
          value={text}
          onChange={(e) => setText(e.target.value)}
          onKeyDown={(e) => {
            if ((e.metaKey || e.ctrlKey) && e.key === "Enter") analyse();
          }}
          spellCheck={false}
          placeholder="Paste a passage to analyse…"
        />
        <div className="tool-actions">
          <span className="label">⌘ / Ctrl + Enter</span>
          <div style={{ display: "flex", gap: 8 }}>
            <button className="btn" onClick={() => setText("")} disabled={loading}>
              Clear
            </button>
            <button className="btn btn-primary" onClick={analyse} disabled={loading || !text.trim()}>
              {loading ? "Analysing…" : "Analyse this text"}
            </button>
          </div>
        </div>
      </div>
      <div>
        <div className="tool-bar">
          <span>analysis.md</span>
          <span aria-live="polite">
            {loading ? (
              <span className="loader">
                {SPIN[spin]} {elapsed.toFixed(1)}s
              </span>
            ) : latency !== null ? (
              <span className="c">done · {(latency / 1000).toFixed(2)}s</span>
            ) : result === null ? (
              "example"
            ) : null}
          </span>
        </div>
        <div className="tool-out prose" aria-live="polite">
          {error ? (
            <p className="err">✕ {error}</p>
          ) : loading ? (
            <p className="loader">
              {SPIN[spin]} parsing · measuring · explaining…
            </p>
          ) : (
            <ReactMarkdown remarkPlugins={[remarkGfm, remarkBreaks]}>{result ?? EXAMPLE_OUTPUT}</ReactMarkdown>
          )}
        </div>
      </div>
    </div>
  );
}
