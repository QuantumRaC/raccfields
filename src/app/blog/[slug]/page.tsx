import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { remark } from "remark";
import html from "remark-html";
import Footer from "@/components/layout/footer-box";
import TopNavigationMenu from "@/components/layout/top-navigation-menu";
import ModeToggle from "@/components/layout/theme-toggle";

export default async function BlogPost({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const filePath = path.join(process.cwd(), "content", "blog", `${slug}.mdx`);
    const source = fs.readFileSync(filePath, "utf-8");
    const { content, data } = matter(source);

    // ✅ Convert markdown -> HTML with remark
    const processedContent = await remark()
        .use(html, { sanitize: false })
        .process(content);
    const contentHtml = processedContent.toString();

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

            <div className="mb-16">
                <article>
                    <div className="max-w-5xl w-[90%] mx-auto">
                        <h1 className="text-6xl md:text-7xl font-mono font-thin mt-12 mb-4 text-foreground ">
                            {data.title}
                        </h1>
                        <p className="text-lg md:text-base max-w-2xl font-mono text-muted-foreground whitespace-pre-line mb-20">
                            {data.date}
                        </p>
                    </div>

                    {/* Inject parsed markdown as HTML */}
                    <div
  dangerouslySetInnerHTML={{ __html: contentHtml }}
  className="
    prose max-w-4xl w-[80%] mx-auto
    text-foreground

    prose-h1:text-foreground prose-h1:text-4xl prose-h1:font-mono prose-h1:m-4 prose-h1:mt-12 prose-h1:font-thin

    prose-h2:text-foreground prose-h2:text-3xl prose-h2:font-mono prose-h2:m-4 prose-h2:mt-12 prose-h2:font-thin

    prose-h3:text-muted-foreground prose-h3:text-3xl prose-h3:font-mono prose-h3:m-4 prose-h3:mt-12 prose-h3:font-thin

    prose-p:whitespace-pre-line prose-p:text-foreground prose-p:font-thin
    prose-li:font-thin prose-li:text-foreground
    prose-a:font-thin prose-a:text-foreground
    prose-blockquote:font-thin prose-blockquote:text-foreground
    prose-strong:font-normal prose-strong:text-foreground

    prose-code:font-thin prose-code:text-foreground prose-code:bg-popover prose-code:px-1 prose-code:rounded

    prose-pre:bg-popover prose-pre:text-foreground prose-pre:p-4 prose-pre:rounded-lg prose-pre:overflow-auto
  "
/>



                </article>
            </div>
            <Footer />
        </div>
    );
}
