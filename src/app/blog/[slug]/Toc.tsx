import type { Heading } from "@/lib/posts";

/** Sticky table of contents for long posts. */
export default function Toc({ headings }: { headings: Heading[] }) {
  return (
    <aside className="toc" aria-label="On this page">
      <span className="toc-title">On this page</span>
      <ol>
        {headings.map((h) => (
          <li key={h.id} className={h.depth === 3 ? "d3" : undefined}>
            <a href={`#${h.id}`}>{h.text}</a>
          </li>
        ))}
      </ol>
    </aside>
  );
}
