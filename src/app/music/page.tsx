"use client"
import * as React from "react"

import TopNavigationMenu from "@/components/layout/top-navigation-menu"
import ModeToggle from "@/components/layout/theme-toggle"

import { paths } from "@/lib/paths"

const Title = () => {
  return (
    <section className="flex flex-col items-end justify-center text-center min-h-[80vh] px-6">
      <h1 className="text-5xl md:text-7xl font-mono font-thin mb-12 text-foreground">
        Music
      </h1>

      <p className="text-lg md:text-base max-w-2xl font-mono font-semibold text-muted-foreground whitespace-pre-line">
        This is my music page.
      </p>

    </section>
  )
};

export default function Sec() {
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
      <Title />
    </div>
  );
}
