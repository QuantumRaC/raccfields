"use client"
import * as React from "react"
import { useState } from "react"
import Link from "next/link"
import TopNavigationMenu from "@/components/layout/top-navigation-menu"
import Footer from "@/components/layout/footer-box"
import ModeToggle from "@/components/layout/theme-toggle"
import TextareaWithText from "@/components/layout/text-area-with-text"
import ReactMarkdown from "react-markdown"
import remarkBreaks from "remark-breaks"
import remarkGfm from "remark-gfm"

import { paths } from "@/lib/paths"

const Title = () => {
  return (
    <section className="flex flex-col items-end justify-center text-center min-h-[70vh] px-6">
      <h1 className="text-5xl md:text-7xl font-mono font-thin mb-12 text-foreground">
        WriteLike
      </h1>

      <p className="text-lg md:text-base max-w-2xl font-mono text-muted-foreground whitespace-pre-line">
        WriteLike helps writers, editors, and researchers quickly understand the tone, style, and structure of any text. Powered by spaCy and AI, it identifies key linguistic patterns, sentiment, and readability metrics, turning complex text into actionable insights — making writing analysis faster, easier, and more effective.
      </p>
    </section>
  )
}

interface AnalysisDisplayProps {
  analysisResult: string | null
  isLoading: boolean
  error?: string
}

const AnalysisDisplay = ({ analysisResult, isLoading, error }: AnalysisDisplayProps) => {
  let content: string

  if (error) {
    content = `**Error:** ${error}`
  } else if (isLoading) {
    content = "_Waiting for analysis result.. _"
  } else if (analysisResult) {
    content = analysisResult
  } else {
    // Default sample output
    content = `
1. **Overall Style & Tone:**  
The frequent lemmas like "generalize," "war," "true," and "death" suggest a serious, reflective, analytical, or even philosophical tone. It leans formal/academic rather than conversational.  

2. **Writing Techniques & Effects:**  

**Pacing:** High oscillation ratios for both sentence and token length suggest varied pacing. Concise statements mix with longer, complex sentences to create rhythm and emphasis.  

**Clarity:** With ~1.75 clauses per sentence, the writing stays digestible while retaining nuance.  

**Guidance:** To emulate this style:  
- Vary sentence lengths for dynamic pacing.  
- Balance concise and complex vocabulary.  
- Explore abstract themes (truth, conflict, mortality).  
- Maintain a serious and analytical tone.  
    `
  }

  return (
    <div className="mt-6">
      <h2 className="text-md font-mono font-bold ml-2 mb-2 text-foreground">Analysis:</h2>
      <div className="prose max-w-none dark:prose-invert font-mono text-xs font-thin">
        <ReactMarkdown remarkPlugins={[remarkGfm, remarkBreaks]}>
          {content}
        </ReactMarkdown>
      </div>
    </div>
  )
}

export default function TextAnlys() {
  const defaultInput = `To generalize about war is like generalizing about peace. Almost everything is true. Almost nothing is true. At its core, perhaps, war is just another name for death, and yet any soldier will tell you, if he tells the truth, that proximity to death brings with it a corresponding proximity to life. After a firefight, there is always the immense pleasure of aliveness. The trees are alive. The grass, the soil—everything. All around you things are purely living, and you among them, and the aliveness makes you tremble. --The Things They Carried, by Tim O'Brien`

  const [inp, setInp] = useState(defaultInput)
  const [analysisResult, setAnalysisResult] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")

  const handleSubmit = async () => {
    setIsLoading(true)
    setError("")

    try {
      const res = await fetch(paths.textanalysis, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text: inp }),
      })

      if (!res.ok) {
        setError(`Server error: ${res.status}`)
        throw new Error(`Server error: ${res.status}`)
      }

      const data = (await res.json()) as { analysis?: string; error?: string }

      if (data.error) {
        setError(data.error)
        return
      }

      setAnalysisResult(data.analysis || "")
    } catch (err: unknown) {
      if (err instanceof TypeError && err.message === "Failed to fetch") {
        setError("Network error: Please check your connection or try again later.")
      } else if (err instanceof Error) {
        if (!error) setError(err.message || "An unknown error occurred.")
      } else {
        setError("An unknown error occurred.")
      }
    } finally {
      setIsLoading(false)
    }
  }

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
      <div className="font-mono w-[90%] mx-auto">
        <TextareaWithText
          id="text-analyze"
          label="Subject Literature"
          placeholder="Insert text to be analyzed."
          helperText="Enter text in English. (Simplified Chinese is supported experimentally.)"
          value={inp}
          buttonId="analyze-btn"
          buttonText="Analyze"
          onChange={setInp}
          onButtonClick={handleSubmit}
        />
        <div className="flex flex-col min-h-[20vh] mb-8">
          <AnalysisDisplay analysisResult={analysisResult} isLoading={isLoading} error={error} />
        </div>

        {/* ===== Your original explanatory content restored ===== */}
        <div className="text-mono mt-8 mb-16">
          <p className="font-semithin text-sm">While you wait - </p>

          <h2 className="mb-2"><u>What WriteLike does</u></h2>
          <p className="font-thin text-sm">
            WriteLike looks at the “shape” of your writing — things like sentence length, rhythm, tone,
            and word choice — and turns those patterns into clear, human-friendly feedback. It’s not about
            saying if writing is “good” or “bad,” but showing <em>how</em> it works: punchy and direct,
            reflective and flowing, descriptive, or action-driven.
          </p>

          <br />

          <h2 className="mb-2"><u>What it’s for</u></h2>
          <p className="font-thin text-sm">
            The goal is to help you ask: <strong>“Why does this passage feel the way it does?”</strong>
            WriteLike highlights the components of style so you can borrow rhythms, structures, and tones
            into your own work — while keeping your own voice. It’s a tool for exploration, learning,
            and writing more intentionally.
          </p>

          <br />

          <h2 className="mb-2"><u>Why it works</u></h2>
          <p className="font-thin text-sm">
            Behind the scenes, WriteLike blends <strong>linguistic analysis</strong> (spaCy, TextBlob, statistical
            features) with <strong>AI interpretation</strong> (Google Gemini). Think of it as a translator
            between data and storytelling: the numbers describe what’s happening, and the AI explains
            what it means for your style.
          </p>

          <br />

          <h2 className="mb-2"><u>Technical at a glance</u></h2>
          <ul className="list-disc ml-6 space-y-1 font-thin text-sm">
            <li><strong>Language Detection:</strong> langdetect (English + Simplified Chinese, experimental)</li>
            <li><strong>NLP:</strong> spaCy 3.8.7 (en_core_web_sm, zh_core_web_sm), TextBlob for sentiment</li>
            <li><strong>Features:</strong> sentence & token lengths, clause density, POS & dependency distributions, verb tense, lemma motifs, morphology samples</li>
            <li><strong>Generative AI:</strong> Google Gemini 2.5 API for style feedback</li>
            <li><strong>Backend:</strong> FastAPI microservice (Python) hosted on Render</li>
            <li><strong>Frontend:</strong> Next.js app fetching results via API</li>
          </ul>

          <br />

          <h2 className="mb-2"><u>Learn more</u></h2>
          <div className="grid gap-4 sm:grid-cols-2 mt-4">
            <Link href="/blog/building-writelike" className="block p-4 border rounded-lg hover:bg-accent">
              <h3 className="font-semibold">The Story of WriteLike</h3>
              <p className="text-xs text-muted-foreground mt-1">
                My motivation, experiments, and lessons learned while building this tool.
              </p>
            </Link>
            <Link href="/blog/why-writelike-works" className="block p-4 border rounded-lg hover:bg-accent">
              <h3 className="font-semibold">WriteLike: How it works, Why it works</h3>
              <p className="text-xs text-muted-foreground mt-1">
                A technical deep dive into the NLP pipeline, feature engineering, and ethical safeguards.
              </p>
            </Link>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  )
}
