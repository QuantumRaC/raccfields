"use client"
import * as React from "react"
import { ReactTyped } from "react-typed"
import Link from "next/link"

import Footer from "@/components/layout/footer-box"
import TopNavigationMenu from "@/components/layout/top-navigation-menu"
import ModeToggle from "@/components/layout/theme-toggle"
import { paths } from "@/lib/paths"

const featuredPosts = [
  {
    slug: "building-my-site",
    title: "Building My Site: From npm run dev to Secure Deployment",
    date: "2025-09-20",
    description:
      "A behind-the-scenes account of the design decisions I made while building my portfolio with Next.js + Shadcn, a FastAPI microservice on Render, and Vercel & GoDaddy hosting. I walk through the accidents that forced trade-offs, the debugging steps I took in production, and the security/operational fixes I shipped.",
    tags: ["Web Dev", "Infrastructure", "Deployment", "Thought Process", "Reflection"],
  },
  {
    slug: "why-writelike-works",
    title: "WriteLike: How it works, Why it works",
    date: "2025-10-01",
    description:
      "The technical backbone of WriteLike. I show how spaCy + statistical features + Gemini combine to give explainable style analysis, why the feature engineering matters, and how I designed for robustness, efficiency, and ethical use.",
    tags: ["NLP", "AI", "Feature Engineering", "Ethics", "LLM"],
  },
  {
    slug: "hardening-hobby-site",
    title: "Small Steps to Hardening My Hobby Site",
    date: "2025-09-28",
    description:
      "Practical hardening for a small site: short recon, a few high-impact fixes, and a tiny incident-response checklist you can actually follow.",
    tags: ["Security", "Ops", "Practical"],
  },
  {
    slug: "building-writelike",
    title: "The Story of WriteLike",
    date: "2025-09-17",
    description:
      "My journey building WriteLike: from spaCy experiments to a deployed web service. My motivation, design decisions, GenAI integration, deployment stack, and the current limitations.",
    tags: ["NLP", "AI", "Thought Process", "Deployment", "Reflection"],
  },
  
  
  {
    slug: "sql-injection",
    title: "SQLi: From labs to defenses",
    date: "2025-06-29",
    description:
      "Hands-on SQL injection notes from pwn.college: UNION, boolean & time-based blind techniques, automation scripts, and a practical, testable defensive checklist.",
    tags: ["Web Dev", "Security", "Infrastructure"],
  },
]


const PageHero = () => {
  return (
    <section className="flex flex-col items-center justify-center text-center min-h-[80vh] px-6">
      <h1 className="text-5xl md:text-7xl font-mono font-thin mb-12 text-foreground">
        <ReactTyped
          strings={["Cynthia Yao", "Xīn Yī Yáo", "姚欣依"]}
          typeSpeed={140}
          backSpeed={40}
          loop={true}
          showCursor={true}
          cursorChar="_"
        />
      </h1>

      <p className="text-lg md:text-base max-w-2xl font-mono text-muted-foreground whitespace-pre-line">
        <Link href={paths.security} className="hover:underline">
          Cybersecurity enthusiast
        </Link>
        {`, `}
        <Link href={paths.dev} className="hover:underline">
          full-stack developer and AI/ML engineer.
        </Link>
        {`\n\nI explore secure systems, web applications, and graphics engines, 
        applying both research and hands-on projects to real-world problems.`}
      </p>
      <br />
      <p className="text-lg md:text-base max-w-2xl font-mono text-muted-foreground whitespace-pre-line">
        <Link href={paths.textanlys} className="hover:underline">
          <u>Try out my newest project.</u>
        </Link>
      </p>
    </section>
  )
}

export default function Home() {
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

      <PageHero />

      {/* Blog section */}
      <section className="max-w-4xl mx-auto px-6 py-12">
        <h2 className="text-3xl font-bold mb-6">Featured Blogs</h2>

        {/* Grid of 4 blog cards */}
        <div className="grid gap-6 md:grid-cols-2">
          {featuredPosts.slice(0, 4).map((post) => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              className="flex flex-col justify-between p-4 border rounded-lg hover:bg-accent"
            >
              <div>
                <h3 className="font-mono text-xl text-foreground mb-2 font-semibold">
                  {post.title}
                </h3>
                <p className="font-light text-sm text-muted-foreground mb-2">
                  {post.description}
                </p>
              </div>

              {/* Bottom section pinned */}
              <div className="mt-4">
                <div className="flex flex-wrap gap-2 mb-2">
                  {post.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-2 py-0.5 text-xs rounded-full bg-muted text-foreground"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <span className="text-xs text-muted-foreground">{post.date}</span>
              </div>
            </Link>

          ))}
        </div>

        {/* Bottom-right "View all blogs" link */}
        <div className="mt-6 flex justify-end">
          <Link
            href="/blog"
            className="text-sm font-mono hover:underline text-muted-foreground"
          >
            View all blogs →
          </Link>
        </div>
      </section>


      <Footer />
    </div>
  )
}
