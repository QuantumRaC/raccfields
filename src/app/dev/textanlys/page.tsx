"use client"
import * as React from "react"
import { useState } from "react"
import TopNavigationMenu from "@/components/layout/top-navigation-menu"
import ModeToggle from "@/components/layout/theme-toggle"
import TextareaWithText from "@/components/layout/text-area-with-text"
import { Loader2 } from "lucide-react"
import ReactMarkdown from "react-markdown"
import remarkGfm from "remark-gfm"

import { paths } from "@/lib/paths"

const Title = () => {
  return (
    <section className="flex flex-col items-end justify-center text-center min-h-[80vh] px-6">
      <h1 className="text-5xl md:text-7xl font-mono font-thin mb-12 text-foreground">
        T3xtAnlys
      </h1>

      <p className="text-lg md:text-base max-w-2xl font-mono font-semibold text-muted-foreground whitespace-pre-line">
        A lightweight text analysis tool that examines writing style, word choice, grammatical structures, and sentiment using NLP techniques. It extracts key linguistic patterns and statistical measures to help understand how writing techniques shape the tone and style of a text with NLP and GenAI.
      </p>

    </section>
  )
};

type AnalysisDisplayProps = {
  analysisResult?: string | null
  isLoading: boolean
}

const AnalysisDisplay = ({ analysisResult, isLoading }: AnalysisDisplayProps) => {
  if (!analysisResult && !isLoading) return (
    <div className="mt-6">
      <h2 className="font-bold mb-2">Analysis:</h2>
      <div className="prose max-w-none dark:prose-invert font-mono text-sm">
        <ReactMarkdown remarkPlugins={[remarkGfm]}>
          Awaiting input text.
        </ReactMarkdown>
      </div>
    </div>
  )
  else if(!analysisResult && isLoading) return (
    <div className="mt-6">
      <h2 className="font-bold mb-2">Analysis:</h2>
      <div className="prose max-w-none dark:prose-invert font-mono text-sm">
        <ReactMarkdown remarkPlugins={[remarkGfm]}>
          Waiting for analysis result.. Please don't submit twice.
        </ReactMarkdown>
        <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
      </div>
    </div>
  )

  return (
    <div className="mt-6">
      <h2 className="font-bold mb-2">Analysis:</h2>
      <div className="prose max-w-none dark:prose-invert font-mono text-sm">
        <ReactMarkdown remarkPlugins={[remarkGfm]}>
          {analysisResult}
        </ReactMarkdown>
      </div>
    </div>
  )
}

// const res = await fetch(paths.textanalysis, {
//   method: "POST",
//   headers: { "Content-Type": "application/json" },
//   body: JSON.stringify({ text: "This is a test." })
// });

export default function TextAnlys() {
  const [inp, setInp] = useState("")
  const [analysisResult, setAnalysisResult] = useState("")

  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async () => {
    console.log("Submit button clicked.")
    console.log("Submitted text:", inp)

    setIsLoading(true)

    try {
      console.log("[DEBUG] Sending request to backend...")
      const res = await fetch(paths.textanalysis, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text: inp }),
      })

      if (!res.ok) {
        console.error(`[ERROR] Server responded with status ${res.status}`)
        throw new Error(`Server error: ${res.status}`)
      }

      console.log("[DEBUG] Parsing JSON response...")
      const data = await res.json()
      console.log("[SUCCESS] Backend response received:", data)

      setAnalysisResult(data.analysis)
    } catch (err) {
      console.error("[FAILURE] Error fetching analysis:", err)
    } finally {
      setIsLoading(false)
      console.log("[MILESTONE] Request cycle complete.")
    }
  }

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
      <div className="font-mono w-[90%] mx-auto">
        <TextareaWithText
          id="text-analyze"
          label="Subject Literature"
          placeholder="Insert text to be analyzed."
          helperText="Enter text in English or Simplified Chinese."
          value={inp}
          buttonId="analyze-btn"
          buttonText="Analyze"
          onChange={setInp}
          onButtonClick={handleSubmit}
        />
        {/* <p className="font-mono justify-center">
          Current Input Text: {inp}
        </p> */}
        <AnalysisDisplay analysisResult={analysisResult} isLoading={isLoading}/>
      </div>
    </div>
  );
}
