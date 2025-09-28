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
};

function getPosts(): PostMeta[] {
  // process.cwd() points to project root
  const blogDir = path.join(process.cwd(), paths.blogs_dir);
  const files = fs.readdirSync(blogDir);

  return files.map((filename) => {
    const slug = filename.replace(".mdx", "");
    const source = fs.readFileSync(path.join(blogDir, filename), "utf-8");
    const { data } = matter(source);

    return {
      slug,
      title: data.title as string,
      date: data.date as string,
      description: data.description as string,
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
              <h2 className="font-mono text-lg md:text-xl text-foreground m-4 mt-2 mb-6 font-semibold">{post.title}</h2>
              <p className="font-light text-sm leading-5 m-4 text-muted-foreground">{post.description}</p>
              <span className="text-xs text-foreground">{post.date}</span>
            </Link>
          ))}
        </div>
      </section>
      <Footer />
    </div>
  );
}
