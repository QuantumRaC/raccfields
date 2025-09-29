"use client"
import * as React from "react"
import Footer from "@/components/layout/footer-box"
import Link from "next/link"
import TopNavigationMenu from "@/components/layout/top-navigation-menu"
import ModeToggle from "@/components/layout/theme-toggle"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

import { paths } from "@/lib/paths"

const Title = () => {
  return (
    <section className="flex flex-col items-end justify-center text-center min-h-[70vh] px-6">
      <h1 className="text-5xl md:text-7xl font-mono font-thin mb-12 text-foreground">
        Security
      </h1>

      <p className="text-lg md:text-base max-w-2xl font-mono text-muted-foreground whitespace-pre-line">
        Exploring attack and defense through hands-on labs, self-study, and real-world experience.  
        This is my security page.
      </p>
    </section>
  )
}

export default function Sec() {
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

      <div className="font-sans mt-12 mb-16 w-[90%] max-w-5xl mx-auto space-y-6">

        {/* About Section */}
        <Card className="bg-background border border-muted-foreground/20">
          <CardHeader>
            <CardTitle className="font-mono text-lg md:text-xl text-foreground">
              About My Security Work
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="font-light text-sm leading-6 mb-3 text-muted-foreground">
              I am a <strong>cybersecurity enthusiast</strong> and Junior Computer Science major, with a focus on
              practical skills across <strong>vulnerability assessment, reverse engineering, cryptography, and secure system design</strong>.
            </p>
            <p className="font-light text-sm leading-6 text-muted-foreground">
              My approach mixes <strong>hands-on labs, writeups, and documentation</strong> with applied experience from
              internships and independent research. I like tackling both offensive and defensive sides of security to
              understand the full picture.
            </p>
          </CardContent>
        </Card>

        {/* Internship Section */}
        <Card className="bg-background border border-muted-foreground/20">
          <CardHeader>
            <CardTitle className="font-mono text-lg md:text-xl text-foreground">Internship Experience</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="font-light text-sm leading-6 mb-2 text-muted-foreground">
              <strong>Cybersecurity Engineer Intern — Huifu Payment Limited | Shanghai, China | June – July 2025</strong>
            </p>
            <ul className="list-disc list-inside font-light text-sm mb-3 space-y-1 leading-6 text-muted-foreground">
              <li>Prepared vulnerability reports and documentation for certification processes.</li>
              <li>Monitored bastion host environments and audited firewall rules for compliance.</li>
              <li>Worked with SQL injection testing, reverse engineering, and access control analysis.</li>
            </ul>
            <p className="font-light text-sm leading-6 text-muted-foreground">
              This experience strengthened my foundation in <strong>enterprise network security</strong> and gave me practical exposure to <strong>attack/defense workflows</strong>.
            </p>
          </CardContent>
        </Card>

        {/* Self-Study / Projects */}
        <Card className="bg-background border border-muted-foreground/20">
          <CardHeader>
            <CardTitle className="font-mono text-lg md:text-xl text-foreground">
              Projects & Self-Study
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="font-light text-sm leading-6 mb-2 text-muted-foreground">
              <strong>Cybersecurity Self-Study — Independent Learning | Jan 2025 – Present</strong>
            </p>
            <ul className="list-disc list-inside font-light text-sm mb-3 space-y-1 leading-6 text-muted-foreground">
              <li>Completed 20+ modules on <strong>PWN.College</strong> and <strong>TryHackMe Cybersecurity 101</strong>.</li>
              <li>Maintained a <Link href="https://github.com/QuantumRaC/Cybersec-Archive" className="hover:underline text-foreground">public GitHub repo</Link> of Linux & Windows commands, workflows, and security writeups.</li>
              <li>Preparing for <strong>CompTIA Security+</strong> certification (Oct 2025).</li>
            </ul>
            <p className="font-light text-sm leading-6 text-muted-foreground">
              This program lets me sharpen <strong>practical security skills</strong> and explore new attack vectors while building reproducible documentation.
            </p>
          </CardContent>
        </Card>

        {/* Blog Highlights */}
        <Card className="bg-background border border-muted-foreground/20">
          <CardHeader>
            <CardTitle className="font-mono text-lg md:text-xl text-foreground">Blog Highlights</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 sm:grid-cols-2 mt-2">
              <Link href="/blog/sql-injection" className="block p-4 border rounded-lg hover:bg-accent">
                <h3 className="font-semibold">SQLi: From labs to defenses</h3>
                <p className="text-xs text-muted-foreground mt-1">
                  Hands-on notes from pwn.college: UNION, blind SQLi, automation scripts, and defensive checklist.
                </p>
              </Link>
              <Link href="/blog/hardening-hobby-site" className="block p-4 border rounded-lg hover:bg-accent">
                <h3 className="font-semibold">Small Steps to Hardening My Hobby Site</h3>
                <p className="text-xs text-muted-foreground mt-1">
                  Recon, quick wins, and a simple incident-response checklist for a small web service.
                </p>
              </Link>
            </div>
            <div className="flex justify-end mt-4">
              <Link href={paths.blog} className="text-xs hover:underline text-muted-foreground">
                View all blogs →
              </Link>
            </div>
          </CardContent>
        </Card>

        {/* Skills Section */}
        <Card className="bg-background border border-muted-foreground/20">
          <CardHeader>
            <CardTitle className="font-mono text-lg md:text-xl text-foreground">Skills & Tools</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="list-disc list-inside font-light text-sm mb-2 space-y-1 leading-6 text-muted-foreground">
              <li><strong>Languages & Scripting:</strong> Python, C++, Bash, PowerShell, SQL, ARM</li>
              <li><strong>Core Security:</strong> Vulnerability assessment, Firewall auditing, Reverse engineering basics, Cryptography</li>
              <li><strong>Systems:</strong> Linux & Windows administration, secure coding practices</li>
              <li><strong>Platforms:</strong> TryHackMe, PWN.College, GitHub documentation</li>
            </ul>
          </CardContent>
        </Card>

        {/* Quick Links for Mobile */}
        <Card className="bg-background border border-muted-foreground/20">
          <CardContent>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="https://github.com/QuantumRaC/Cybersec-Archive" className="px-4 py-2 text-sm border rounded-lg hover:bg-accent">
                Visit my Cybersec GitHub Repo
              </Link>
            </div>
          </CardContent>
        </Card>

      </div>

      <Footer />
    </div>
  )
}
