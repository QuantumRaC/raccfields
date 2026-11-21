import type { Metadata } from "next";
import Link from "next/link";
import { getPosts } from "@/lib/posts";
import PostList from "./PostList";

export const metadata: Metadata = {
  title: "Writing",
  description: "Engineering write-ups, security lab notes and project post-mortems by Cynthia Yao.",
};

export default function BlogIndex() {
  const posts = getPosts();
  const words = posts.reduce((n, p) => n + p.words, 0);
  return (
    <>
      <header className="wrap page-head">
        <nav className="crumbs" aria-label="Breadcrumb">
          <Link href="/">~</Link>
          <span>/</span>
          <span>writing</span>
        </nav>
        <h1 className="page-title">Writing</h1>
        <p className="page-sub">
          How my projects work, what went wrong when I deployed them, and notes from security labs.
        </p>
        <div className="page-meta">
          <span className="label">
            {posts.length} posts · {words.toLocaleString("en-AU")} words
          </span>
          <Link href="/blog/rss.xml" className="label link">
            RSS
          </Link>
        </div>
      </header>
      <div className="wrap">
        <PostList posts={posts} />
      </div>
    </>
  );
}
