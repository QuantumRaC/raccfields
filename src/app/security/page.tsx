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

      <p className="text-lg md:text-base max-w-2xl font-mono font-semibold text-muted-foreground whitespace-pre-line">
        This is my security page.
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
      <div className="font-sans mt-12 mb-16 w-[90%] max-w-5xl mx-auto space-y-6">

        {/* About Section */}
        <Card className="bg-background border border-muted-foreground/20">
          <CardHeader>
            <CardTitle className="font-mono text-lg md:text-xl text-foreground">About My Security Work</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="font-light text-sm leading-6 mt-2 mb-2 text-muted-foreground">
              I am a <strong>cybersecurity enthusiast</strong> and a Junior Computer Science major at the University of Florida.
            </p>
            <p className="font-light text-sm leading-6 mt-2 mb-2 text-muted-foreground">
              My focus is on <strong>practical security skills</strong>, including vulnerability assessment, reverse engineering, cryptography, and secure system design.
              I have gained hands-on experience through internships, self-study, and personal projects, applying theoretical concepts in real-world environments.
            </p>
          </CardContent>
        </Card>

        {/* Internship Section */}
        <Card className="bg-background border border-muted-foreground/20">
          <CardHeader>
            <CardTitle className="font-mono text-lg md:text-xl text-foreground">Internship Experience</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="font-light text-sm leading-6 mt-2 mb-2 text-muted-foreground">
              <strong>Cybersecurity Engineer Intern — Huifu Payment Limited | Shanghai, China | June – July 2025</strong>
            </p>
            <ul className="list-disc list-inside font-light text-sm mt-2 mb-2 space-y-1 leading-6 text-muted-foreground">
              <li>Prepared and submitted vulnerability assessment reports and security documentation for certification processes.</li>
              <li>Monitored bastion host environments and reviewed firewall rules for compliance with security standards.</li>
              <li>Gained exposure to reverse engineering, SQL & command injection testing, cryptography, and access control analysis.</li>
            </ul>
            <p className="font-light text-sm mt-2 mb-2 leading-6 text-muted-foreground">
              This experience gave me a strong foundation in <strong>enterprise network security</strong> and practical attack/defense techniques.
            </p>
          </CardContent>
        </Card>

        {/* Projects Section */}
        <Card className="bg-background border border-muted-foreground/20">
          <CardHeader>
            <CardTitle className="font-mono text-lg md:text-xl text-foreground">Projects & Self-Study</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="font-light text-sm leading-6 mt-2 mb-2 text-muted-foreground">
              <strong>Cybersecurity Self-Study Program — Independent Learning | Jan 2025 – Present</strong>
            </p>
            <ul className="list-disc list-inside font-light text-sm mt-2 mb-2 space-y-1 leading-6 text-muted-foreground">
              <li>Completed 20+ modules on PWN.College and TryHackMe “Cybersecurity 101” learning path.</li>
              <li>Documented practical Linux & Windows commands, workflows, and best practices in a public GitHub repo.</li>
              <li>Preparing for CompTIA Security+ certification (October 2025).</li>
              <li>GitHub: <Link href="https://github.com/QuantumRaC/Cybersec-Archive" className="hover:underline text-foreground">Cybersec-Archive</Link></li>
            </ul>
            <p className="font-light text-sm mt-2 mb-2 leading-6 text-muted-foreground">
              This program allows me to continuously sharpen my <strong>hands-on security skills</strong> while exploring new attack vectors and defensive techniques.
            </p>
          </CardContent>
        </Card>

        {/* Skills Section */}
        <Card className="bg-background border border-muted-foreground/20">
          <CardHeader>
            <CardTitle className="font-mono text-lg md:text-xl text-foreground">Skills & Tools</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="list-disc list-inside font-light text-sm mt-2 mb-2 space-y-1 leading-6 text-muted-foreground">
              <li><strong>Programming & Scripting:</strong> Python, C++, Bash, PowerShell, SQL, ARM</li>
              <li><strong>Cybersecurity & Systems:</strong> Vulnerability assessment, Reverse engineering basics, Firewall auditing, Cryptography, Linux/Windows administration</li>
              <li><strong>Platforms & Learning:</strong> TryHackMe, PWN.College, GitHub for documenting projects and workflows</li>
              <li><strong>Frameworks & Tools:</strong> Secure coding practices, network monitoring, penetration testing techniques</li>
            </ul>
          </CardContent>
        </Card>

        {/* GitHub / Documentation */}
        <Card className="bg-background border border-muted-foreground/20">
          <CardContent>
            <p className="font-light text-sm leading-6 mt-2 mb-2 text-muted-foreground">
              For full documentation, hands-on exercises, and writeups, see my <Link href="https://github.com/QuantumRaC/Cybersec-Archive" className="hover:underline text-foreground">GitHub repository</Link>.
            </p>
          </CardContent>
        </Card>

      </div>

      <Footer />
    </div>
  );
}
