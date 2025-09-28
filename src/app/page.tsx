"use client"
import * as React from "react"
import { ReactTyped } from "react-typed"

import Link from "next/link"
import { CircleCheckIcon, CircleHelpIcon, CircleIcon } from "lucide-react"
import Footer from "@/components/layout/footer-box"
import TopNavigationMenu from "@/components/layout/top-navigation-menu"
import ModeToggle from "@/components/layout/theme-toggle"

import { paths } from "@/lib/paths"

const PageHeroAnonymous = () => {
  return (
    <section className="flex flex-col justify-center min-h-[80vh] px-6 text-left items-start">
      <h1 className="text-5xl md:text-4xl font-mono font-thin mb-12 text-foreground">
        <ReactTyped
          strings={[
            ">_ booting sequence..",  
            ">_ system online", 
            ">_ access granted", 
            ">_ entering RaccFields..",
            ">_ user: An0nymou5",
            ">_ welcome."
          ]}
          typeSpeed={30}
          backSpeed={20}
          loop={true}
          showCursor={true}
          cursorChar="_"
        />
      </h1>

      <p className="text-lg md:text-base max-w-2xl font-mono font-semibold text-muted-foreground whitespace-pre-line">
        {`:: sys id: raccfields v1.0 ::
:: core: Next.js | TailwindCSS | Vercel | GitHub ::
:: aux: Shadcn UI ::
:: status: beta (dev) ::`}
      </p>
    </section>
  )
}

const PageHero = () => {
  return (
    <section className="flex flex-col items-center justify-center text-center min-h-[80vh] px-6">
      <h1 className="text-5xl md:text-7xl font-mono font-thin mb-12 text-foreground">
        <ReactTyped
          strings={[
            "Cynthia Yao", "Xīn Yī Yáo", "姚欣依"
          ]}
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
        {/* {`
  Junior Computer Science major at the University of Florida.  
  Passionate about applying AI, NLP, and software engineering skills to real-world problems.  
  Explore my projects, security writeups, and personal experiments — welcome to Raccfields.`} */}
  {`\n\nI explore secure systems, web applications, and graphics engines, 
  applying both research and hands-on projects to real-world problems.`}
      </p>
      <br />
      <p className="text-lg md:text-base max-w-2xl font-mono text-muted-foreground whitespace-pre-line"> 
         <Link href={paths.textanlys} className="hover:underline"><u>{`Try out my newest project.`}</u></Link>
        </p>

    </section>
  )
};

export default function Home() {
  return (
    <div>
      <div className="p-6 flex items-center">
        {/* Left side empty (spacer) */}
        <div className="flex-1" />
        <div>
          <TopNavigationMenu />
        </div>
        <div className="flex-1 flex justify-end">
          <ModeToggle />
        </div>
      </div>
      <PageHero />
      {/* <PageHeroAnonymous /> */}
      <Footer />
    </div>
  );
}
