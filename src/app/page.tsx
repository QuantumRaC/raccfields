"use client"
import * as React from "react"
import { ReactTyped } from "react-typed"

import Link from "next/link"
import { CircleCheckIcon, CircleHelpIcon, CircleIcon } from "lucide-react"

import TopNavigationMenu from "@/components/layout/top-navigation-menu"
import ModeToggle from "@/components/layout/theme-toggle"

import { paths } from "@/lib/paths"

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

      <p className="text-lg md:text-base max-w-2xl font-mono font-semithin text-muted-foreground whitespace-pre-line">
        <Link href={paths.security} className="hover:underline">
          Cybersecurity enthusiast
        </Link>
        {`, `}
        <Link href={paths.dev} className="hover:underline">
          full-stack developer, and AI/ML engineer.
        </Link>
        {`
  Junior Computer Science major at the University of Florida.
  This is my space — welcome to raccfields.`}
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
    </div>
  );
}
