"use client"
import * as React from "react"
import Link from "next/link"
import Footer from "@/components/layout/footer-box"
import TopNavigationMenu from "@/components/layout/top-navigation-menu"
import ModeToggle from "@/components/layout/theme-toggle"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

import { paths } from "@/lib/paths"

const Title = () => {
  return (
    <section className="flex flex-col items-end justify-center text-center min-h-[70vh] px-6">
      <h1 className="text-5xl md:text-7xl font-mono font-thin mb-12 text-foreground">
        Dev
      </h1>
      <p className="text-lg md:text-base max-w-2xl font-mono text-muted-foreground whitespace-pre-line">
        Projects and experiments across web dev, AI/NLP, and graphics/rendering.
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

      <div className="font-sans mt-12 mb-16 w-[90%] max-w-5xl mx-auto space-y-4">

        {/* About Section */}
        <Card className="bg-background border border-muted-foreground/20">
          <CardHeader>
            <CardTitle className="font-mono text-lg md:text-xl text-foreground">
              About My Development Work
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="font-light text-sm leading-5 mt-4 mb-4 text-muted-foreground">
              I’m a <strong>full-stack developer and AI/ML enthusiast</strong> building projects that
              bridge research and practice. My work spans <strong>secure web applications</strong>,
              <strong> NLP/AI-powered tools</strong>, and <strong>graphics/rendering engines</strong>.
            </p>
            <p className="font-light text-sm leading-5 mt-4 mb-4 text-muted-foreground">
              I focus on combining modern frameworks, cloud deployment, and data-driven methods to
              make applications that are both technically robust and user-friendly.
            </p>
            {/* Blog Link */}
            <Link href="/blog/building-my-site" className="block p-3 border rounded-lg hover:bg-accent">
              <h3 className="font-semibold">Building My Site</h3>
              <p className="text-xs text-muted-foreground mt-1">From `npm run dev` to secure deployment on Vercel + Render.</p>
            </Link>
          </CardContent>
        </Card>

        {/* WriteLike / NLP Project */}
        <Card className="bg-background border border-muted-foreground/20">
          <CardHeader>
            <CardTitle className="font-mono text-lg md:text-xl text-foreground">
              <Link href={paths.textanlys} className="hover:underline">
                WriteLike — Web Dev / NLP Project
              </Link>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="list-disc list-inside font-light text-sm mt-4 mb-4 space-y-1 leading-5 text-muted-foreground">
              <li>Lightweight text analysis tool using <strong>spaCy</strong>, <strong>statistical metrics</strong>, and <strong>Google Gemini</strong>.</li>
              <li>Analyzes <strong>style, grammar, and sentiment</strong> and gives interpretable, human-readable feedback.</li>
              <li>Supports <strong>English and Simplified Chinese</strong>, with a modular backend built in FastAPI.</li>
              <li>Deployed on <strong>Render + Next.js frontend</strong> hosted on Vercel.</li>
              <li>GitHub: <Link href="https://github.com/QuantumRaC/T3xtAnlys" className="hover:underline text-foreground">T3xtAnlys</Link></li>
            </ul>

            {/* Blog Links */}
            <div className="grid gap-2 sm:grid-cols-2 mt-6">
              <Link href="/blog/building-writelike" className="block p-3 border rounded-lg hover:bg-accent">
                <h3 className="font-semibold">The Story of WriteLike</h3>
                <p className="text-xs text-muted-foreground mt-1">Motivation, experiments, and lessons learned while building.</p>
              </Link>
              <Link href="/blog/why-writelike-works" className="block p-3 border rounded-lg hover:bg-accent">
                <h3 className="font-semibold">How it Works, Why it Works</h3>
                <p className="text-xs text-muted-foreground mt-1">Technical backbone: NLP pipeline, feature engineering, ethics.</p>
              </Link>
            </div>

            {/* Direct button for mobile users */}
            <div className="mt-6">
              <Button asChild>
                <Link href={paths.textanlys}>Launch WriteLike</Link>
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Graphics / Mesh Renderer */}
        <Card className="bg-background border border-muted-foreground/20">
          <CardHeader>
            <CardTitle className="font-mono text-lg md:text-xl text-foreground">
              Mesh Renderer — Graphics / Rendering
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="list-disc list-inside font-light text-sm mt-4 mb-4 space-y-1 leading-5 text-muted-foreground">
              <li>Built an <strong>OpenGL-based 3D engine</strong> supporting OBJ model loading, texture mapping, and real-time rendering.</li>
              <li>Implemented <strong>UV-mapped textures</strong>, backface culling, subdivision, and projection transforms.</li>
              <li>Focused on performance, modular design, and practical graphics workflows.</li>
              <li>GitHub: <Link href={paths.obj_renderer} className="hover:underline text-foreground">OBJ-Mesh-Renderer</Link></li>
            </ul>

            {/* Direct button for mobile users */}
            <div className="mt-6">
              <Button asChild variant="secondary">
                <Link href={paths.obj_renderer}>View on GitHub</Link>
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Full-Stack Web Dev Project */}
        <Card className="bg-background border border-muted-foreground/20">
          <CardHeader>
            <CardTitle className="font-mono text-lg md:text-xl text-foreground">
              ChompChompCar — Full-Stack Web Dev Project
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="list-disc list-inside font-light text-sm mt-4 mb-4 space-y-1 leading-5 text-muted-foreground">
              <li>MERN stack app for carpool coordination, serving as <strong>Team Lead & Full-Stack Developer</strong>.</li>
              <li>Integrated Google Places API, responsive UI with TailwindCSS, and calendar scheduling features.</li>
              <li>Deployed secure backend with Express & MongoDB, including authentication and data protection.</li>
              <li>GitHub: <Link href="https://github.com/QuantumRaC/SWEProject" className="hover:underline text-foreground">SWEProject</Link></li>
            </ul>
            {/* Direct button for mobile users */}
            <div className="mt-6">
              <Button asChild variant="secondary">
                <Link href="https://github.com/QuantumRaC/SWEProject">View on GitHub</Link>
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Skills Section */}
        <Card className="bg-background border border-muted-foreground/20">
          <CardHeader>
            <CardTitle className="font-mono text-lg md:text-xl text-foreground">Skills & Tools</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="list-disc list-inside font-light text-sm mt-4 mb-4 space-y-1 leading-5 text-muted-foreground">
              <li><strong>Programming & Frameworks:</strong> Python, C++, C, JavaScript, React.js, Node.js, Express, MongoDB, TailwindCSS</li>
              <li><strong>AI & NLP:</strong> spaCy, Google Gemini, TextBlob, prompt engineering, multilingual support</li>
              <li><strong>Graphics & Rendering:</strong> OpenGL, SFML, 3D engine design, mesh rendering</li>
              <li><strong>Other Tools:</strong> Git, Linux/Windows systems, secure coding practices</li>
            </ul>
          </CardContent>
        </Card>
      </div>

      <Footer />
    </div>
  )
}
