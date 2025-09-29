import fs from "fs";
import path from "path";
import matter from "gray-matter";
import Link from "next/link";
import Footer from "@/components/layout/footer-box";
import TopNavigationMenu from "@/components/layout/top-navigation-menu";
import ModeToggle from "@/components/layout/theme-toggle";

import { paths } from "@/lib/paths";

const Title = () => {
  return (
    <section className="flex flex-col items-end justify-center text-center min-h-[70vh] px-6">
      <h1 className="text-5xl md:text-7xl font-mono font-thin mb-12 text-foreground">
        Blogs
      </h1>
      <p className="text-lg md:text-base max-w-2xl font-mono text-muted-foreground whitespace-pre-line">
        This is my blogs page.
      </p>
    </section>
  );
};

type PostMeta = {
  slug: string;
  title: string;
  date: string;
  description: string;
  tags: string[];
  readingTime: string;
  wordCount: number;
};

function getPosts(): PostMeta[] {
  const blogDir = path.join(process.cwd(), paths.blogs_dir);
  const files = fs.readdirSync(blogDir);

  return files.map((filename) => {
    const slug = filename.replace(".mdx", "");
    const source = fs.readFileSync(path.join(blogDir, filename), "utf-8");
    const { data, content } = matter(source);

    // Estimate reading time (200 words per minute)
    const words = content.split(/\s+/).filter(Boolean).length;
    const minutes = Math.max(1, Math.ceil(words / 200));

    return {
      slug,
      title: data.title as string,
      date: data.date as string,
      description: data.description as string,
      tags: (data.tags as string[]) || [],
      readingTime: `${minutes} min read`,
      wordCount: words,
    };
  });
}

export default function Blog() {
  const posts = getPosts();

  return (
    <div>
      <div className="p-6 flex items-center">
        <div className="flex-1" />
        <div>
          <TopNavigationMenu />
        </div>
        <div className="flex-1 flex justify-end">
          <ModeToggle />
        </div>
      </div>
      <Title />
      <section className="max-w-4xl mx-auto px-6 py-12">
        <h1 className="text-3xl font-bold mb-6">All Blogs</h1>
        <div className="grid gap-6 font-sans mt-12 mb-16 space-y-4">
          {posts.map((post) => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              className="block p-4 border rounded-lg hover:bg-accent"
            >
              <h2 className="font-mono text-lg md:text-xl text-foreground m-4 mt-2 mb-2 font-semibold">
                {post.title}
              </h2>
              <p className="font-light text-sm leading-5 m-4 text-muted-foreground">
                {post.description}
              </p>
              <div className="flex flex-wrap gap-2 m-4 mb-2">
                {post.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-2 py-0.5 text-xs rounded-full bg-popover text-foreground"
                  >
                    {tag}
                  </span>
                ))}
              </div>
              <div className="flex justify-between items-center m-4">
                <span className="text-xs text-muted-foreground">{post.date}</span>
                <span className="text-xs text-muted-foreground">
                  {post.readingTime} ({post.wordCount} words)
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>
      <Footer />
    </div>
  );
}
