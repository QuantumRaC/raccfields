"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import type { PostMeta } from "@/lib/posts";
import { formatDate } from "@/lib/format";

export default function PostList({ posts }: { posts: PostMeta[] }) {
  const [tag, setTag] = useState<string | null>(null);
  const tags = useMemo(() => {
    const count = new Map<string, number>();
    posts.forEach((p) => p.tags.forEach((t) => count.set(t, (count.get(t) ?? 0) + 1)));
    return [...count.entries()].sort((a, b) => b[1] - a[1]).map(([t]) => t);
  }, [posts]);
  const shown = tag ? posts.filter((p) => p.tags.includes(tag)) : posts;

  return (
    <>
      <div className="tag-filter" role="group" aria-label="Filter by tag">
        <button className="tag-btn" aria-pressed={tag === null} onClick={() => setTag(null)}>
          all
        </button>
        {tags.map((t) => (
          <button key={t} className="tag-btn" aria-pressed={tag === t} onClick={() => setTag(tag === t ? null : t)}>
            {t.toLowerCase()}
          </button>
        ))}
      </div>
      <ul className="posts">
        {shown.map((p) => (
          <li key={p.slug}>
            <Link href={`/blog/${p.slug}`} className="post-row">
              <span className="post-date">{formatDate(p.date)}</span>
              <span className="post-title">{p.title}</span>
              <span className="post-meta">{p.minutes} min read</span>
              <span className="post-desc">{p.description}</span>
              <span className="post-tags chips">
                {p.tags.map((t) => (
                  <span key={t} className="chip">
                    {t}
                  </span>
                ))}
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </>
  );
}
