import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import { remark } from "remark";
import remarkGfm from "remark-gfm";
import remarkBreaks from "remark-breaks";
import remarkRehype from "remark-rehype";
import rehypeSlug from "rehype-slug";
import rehypeAutolink from "rehype-autolink-headings";
import rehypeHighlight from "rehype-highlight";
import rehypeStringify from "rehype-stringify";
import type { Root, Element, Text } from "hast";

/**
 * Blog posts live in content/blog/*.mdx (plain Markdown is fine).
 * The file name is the URL slug. Front matter:
 *   title, date (YYYY-MM-DD), description, tags[], draft?: true, featured?: true
 */
const DIR = path.join(process.cwd(), "content", "blog");

export type PostMeta = {
  slug: string;
  title: string;
  date: string;
  description: string;
  tags: string[];
  featured: boolean;
  words: number;
  minutes: number;
};

export type Heading = { id: string; text: string; depth: number };

function read(file: string) {
  const src = fs.readFileSync(path.join(DIR, file), "utf8");
  const { data, content } = matter(src);
  const words = content.split(/\s+/).filter(Boolean).length;
  const meta: PostMeta = {
    slug: file.replace(/\.mdx?$/, ""),
    title: String(data.title ?? file),
    date: String(data.date ?? ""),
    description: String(data.description ?? ""),
    tags: Array.isArray(data.tags) ? data.tags.map(String) : [],
    featured: Boolean(data.featured),
    words,
    minutes: Math.max(1, Math.round(words / 220)),
  };
  return { meta, content, draft: Boolean(data.draft) };
}

export function getPosts(): PostMeta[] {
  const showDrafts = process.env.NODE_ENV === "development";
  return fs
    .readdirSync(DIR)
    .filter((f) => /\.mdx?$/.test(f))
    .map(read)
    .filter((p) => showDrafts || !p.draft)
    .map((p) => p.meta)
    .sort((a, b) => b.date.localeCompare(a.date));
}

function textOf(node: Element): string {
  return node.children
    .map((c) => (c.type === "text" ? (c as Text).value : c.type === "element" ? textOf(c as Element) : ""))
    .join("");
}

/** Collects h1–h3 ids for the table of contents (runs after rehype-slug). */
function collectHeadings(out: Heading[]) {
  return () => (tree: Root) => {
    const walk = (n: Root | Element) => {
      for (const c of n.children) {
        if (c.type !== "element") continue;
        const m = /^h([1-3])$/.exec(c.tagName);
        if (m && c.properties?.id) {
          out.push({ id: String(c.properties.id), text: textOf(c).trim(), depth: Number(m[1]) });
        }
        walk(c);
      }
    };
    walk(tree);
  };
}

export async function getPost(slug: string) {
  const file = fs.readdirSync(DIR).find((f) => f.replace(/\.mdx?$/, "") === slug);
  if (!file) return null;
  const { meta, content, draft } = read(file);
  if (draft && process.env.NODE_ENV !== "development") return null;
  const headings: Heading[] = [];
  const html = String(
    await remark()
      .use(remarkGfm)
      .use(remarkBreaks)
      .use(remarkRehype, { allowDangerousHtml: true })
      .use(rehypeSlug)
      .use(collectHeadings(headings))
      .use(rehypeAutolink, {
        behavior: "append",
        properties: { className: ["anchor"], ariaHidden: "true", tabIndex: -1 },
        content: { type: "text", value: "#" },
      })
      .use(rehypeHighlight, { detect: false })
      .use(rehypeStringify, { allowDangerousHtml: true })
      .process(content)
  );
  // Normalise so the shallowest heading level used in the post is the TOC's top level.
  const top = Math.min(...headings.map((h) => h.depth), 3);
  const toc = headings.map((h) => ({ ...h, depth: h.depth === top ? 2 : 3 })).filter((h) => h.depth === 2 || headings.length < 14);
  return { meta, html, headings: toc };
}
