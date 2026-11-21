import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getPost, getPosts } from "@/lib/posts";
import { formatDate } from "@/lib/format";
import Toc from "./Toc";

export function generateStaticParams() {
  return getPosts().map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPost(slug);
  if (!post) return {};
  return {
    title: post.meta.title,
    description: post.meta.description,
    openGraph: { type: "article", title: post.meta.title, description: post.meta.description, publishedTime: post.meta.date },
  };
}

export default async function BlogPost({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = await getPost(slug);
  if (!post) notFound();
  const { meta, html, headings } = post;

  const all = getPosts();
  const i = all.findIndex((p) => p.slug === slug);
  const newer = i > 0 ? all[i - 1] : null;
  const older = i >= 0 && i < all.length - 1 ? all[i + 1] : null;

  return (
    <>
      <header className="wrap page-head">
        <nav className="crumbs" aria-label="Breadcrumb">
          <Link href="/">~</Link>
          <span>/</span>
          <Link href="/blog">writing</Link>
          <span>/</span>
          <span>{slug}</span>
        </nav>
        <h1 className="page-title" style={{ maxWidth: "24ch" }}>
          {meta.title}
        </h1>
        {meta.description ? <p className="page-sub">{meta.description}</p> : null}
        <div className="page-meta">
          <span className="label">{formatDate(meta.date)}</span>
          <span className="label">·</span>
          <span className="label">
            {meta.minutes} min read · {meta.words.toLocaleString("en-AU")} words
          </span>
          <ul className="chips" style={{ marginLeft: 4 }}>
            {meta.tags.map((t) => (
              <li key={t} className="chip">
                {t}
              </li>
            ))}
          </ul>
        </div>
      </header>

      <div className="wrap post-layout">
        <article className="prose" dangerouslySetInnerHTML={{ __html: html }} />
        {headings.length > 2 ? <Toc headings={headings} /> : <div />}
      </div>

      <nav className="wrap" aria-label="More posts" style={{ marginTop: "clamp(56px, 8vw, 96px)" }}>
        <div className="next-page">
          {older ? (
            <Link href={`/blog/${older.slug}`} className="more" style={{ maxWidth: "45%" }}>
              <span>←</span> {older.title}
            </Link>
          ) : (
            <span />
          )}
          {newer ? (
            <Link href={`/blog/${newer.slug}`} className="more" style={{ maxWidth: "45%", textAlign: "right" }}>
              {newer.title} <span>→</span>
            </Link>
          ) : (
            <Link href="/blog" className="more">
              Read all posts
            </Link>
          )}
        </div>
      </nav>
    </>
  );
}
