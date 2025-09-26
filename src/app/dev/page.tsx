"use client"
import * as React from "react"
import Link from "next/link"
import Footer from "@/components/layout/footer-box"
import TopNavigationMenu from "@/components/layout/top-navigation-menu"
import ModeToggle from "@/components/layout/theme-toggle"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

import { paths } from "@/lib/paths"

const Title = () => {
  return (
    <section className="flex flex-col items-end justify-center text-center min-h-[70vh] px-6">
      <h1 className="text-5xl md:text-7xl font-mono font-thin mb-12 text-foreground">
        Dev
      </h1>

      <p className="text-lg md:text-base max-w-2xl font-mono font-semibold text-muted-foreground whitespace-pre-line">
        This is my dev page.
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
      <div className="font-sans mt-12 mb-16 w-[90%] max-w-5xl mx-auto space-y-4">

        {/* About Section */}
        <Card className="bg-background border border-muted-foreground/20">
          <CardHeader>
            <CardTitle className="font-mono text-lg md:text-xl text-foreground">About My Development Work</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="font-light text-sm leading-5 mt-4 mb-4 text-muted-foreground">
              I am a <strong>full-stack developer and AI/ML enthusiast</strong> with a focus on building practical, high-quality applications.
              My work spans web development, AI-powered tools, and graphics/rendering projects.
            </p>
            <p className="font-light text-sm leading-5 mt-4 mb-4 text-muted-foreground">
              I enjoy combining modern frameworks, cloud deployment, and AI technologies to solve real-world problems efficiently and elegantly.
            </p>
          </CardContent>
        </Card>

        {/* AI / NLP & Web Dev Project */}
        <Card className="bg-background border border-muted-foreground/20">
          <CardHeader>
            <CardTitle className="font-mono text-lg md:text-xl text-foreground">
              <Link href={paths.textanlys} className="hover:underline">
                T3xtAnlys — Web Dev / NLP Project
              </Link>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="list-disc list-inside font-light text-sm mt-4 mb-4 space-y-1 leading-5 text-muted-foreground">
              <li>Built a lightweight text analysis tool using spaCy (NLP), Google Gemini (GenAI), and multiple web frameworks.</li>
              <li>Analyzes style, grammar, and sentiment with statistical metrics and generates human-readable feedback.</li>
              <li>Supports English and Simplified Chinese and adapts to various frameworks for seamless web integration.</li>
              <li>GitHub: <Link href="https://github.com/QuantumRaC/T3xtAnlys" className="hover:underline text-foreground">T3xtAnlys</Link></li>
            </ul>
          </CardContent>
        </Card>

        {/* Graphics / Rendering Projects */}
        <Card className="bg-background border border-muted-foreground/20">
          <CardHeader>
            <CardTitle className="font-mono text-lg md:text-xl text-foreground">Graphics & Rendering</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="font-light text-sm leading-5 mt-4 mb-4 text-muted-foreground">
              <strong>OpenGL-Based 3D Textured Face Simulation | April 2025</strong>
            </p>
            <ul className="list-disc list-inside font-light text-sm mt-4 mb-4 space-y-1 leading-5 text-muted-foreground">
              <li>Built a 3D rendering engine supporting .obj model loading, texture mapping, wireframe view, and real-time rendering features.</li>
              <li>Implemented UV-mapped textures, backface culling, RN-triangle based subdivision, and projection transformations.</li>
              <li>GitHub: <Link href="https://github.com/QuantumRaC/GraphicsProject" className="hover:underline text-foreground">GraphicsProject</Link></li>
            </ul>
          </CardContent>
        </Card>

        {/* Full-Stack Web Dev Project */}
        <Card className="bg-background border border-muted-foreground/20">
          <CardHeader>
            <CardTitle className="font-mono text-lg md:text-xl text-foreground">ChompChompCar — Full-Stack Web Dev Project</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="list-disc list-inside font-light text-sm mt-4 mb-4 space-y-1 leading-5 text-muted-foreground">
              <li>Built a MERN stack web app for carpool coordination, working as Full Stack Developer & Team Lead.</li>
              <li>Integrated Google Places API for dynamic location search and implemented responsive UI with TailwindCSS.</li>
              <li>Designed and deployed a secure backend with Express & MongoDB; handled authentication and calendar scheduling.</li>
              <li>GitHub: <Link href="https://github.com/QuantumRaC/SWEProject" className="hover:underline text-foreground">SWEProject</Link></li>
            </ul>
          </CardContent>
        </Card>

        {/* Skills Section */}
        <Card className="bg-background border border-muted-foreground/20">
          <CardHeader>
            <CardTitle className="font-mono text-lg md:text-xl text-foreground">Skills & Tools</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="list-disc list-inside font-light text-sm mt-4 mb-4 space-y-1 leading-5 text-muted-foreground">
              <li><strong>Programming & Frameworks:</strong> Python, C++, JavaScript, React.js, Node.js, Express, MongoDB, TailwindCSS</li>
              <li><strong>AI & NLP:</strong> spaCy, Google Gemini, TextBlob, language detection, statistical analysis of text</li>
              <li><strong>Graphics & Rendering:</strong> OpenGL, SFML, 3D engine concepts, mesh rendering</li>
              <li><strong>Other Tools:</strong> Git, Linux/Windows administration, secure coding practices</li>
            </ul>
          </CardContent>
        </Card>

      </div>

      <Footer />
    </div>
  );
}
