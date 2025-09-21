"use client"
import * as React from "react"

import TopNavigationMenu from "@/components/layout/top-navigation-menu"
import ModeToggle from "@/components/layout/theme-toggle"

import { paths } from "@/lib/paths"


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
    </div>
  );
}
