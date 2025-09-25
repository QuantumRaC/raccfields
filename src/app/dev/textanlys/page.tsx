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

interface AnalysisDisplayProps {
  analysisResult: string | null
  isLoading: boolean
  error?: string
}

const AnalysisDisplay = ({ analysisResult, isLoading, error }: AnalysisDisplayProps) => {
  let content: string = "Awaiting input text."

  if (error) {
    content = `**Error:** ${error}`
  } else if (isLoading) {
    content = "_Waiting for analysis result.. Please don't submit twice._"
  } else if (analysisResult) {
    content = analysisResult
  }

  return (
    <div className="mt-6">
      <h2 className="font-bold mb-2">Analysis:</h2>
      <div className="prose max-w-none dark:prose-invert font-mono text-xs font-thin">
        <ReactMarkdown remarkPlugins={[remarkGfm]}>
          {content}
        </ReactMarkdown>
      </div>
    </div>
  )
}

export default function TextAnlys() {
  const [inp, setInp] = useState("")
  const [analysisResult, setAnalysisResult] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")

  const handleSubmit = async () => {
    console.log("Submit button clicked.")
    console.log("Submitted text:", inp)

    setIsLoading(true)
    setError("") // clear previous error

    try {
      console.log("[DEBUG] Sending request to backend...")
      const res = await fetch(paths.textanalysis, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text: inp }),
      })

      if (!res.ok) {
        console.error(`[ERROR] Server responded with status ${res.status}`)
        setError(`Server error: ${res.status}`)
        throw new Error(`Server error: ${res.status}`)
      }

      console.log("[DEBUG] Parsing JSON response...")
      let data: any
      try {
        data = await res.json()
      } catch (jsonErr) {
        console.error("[FAILURE] Invalid JSON received from backend", jsonErr)
        setError("Invalid response from server.")
        throw jsonErr
      }

      console.log("[SUCCESS] Backend response received:", data)
      setAnalysisResult(data.analysis)

    } catch (err: unknown) {
      if (err instanceof TypeError && err.message === "Failed to fetch") {
        console.error("[FAILURE] Network error: Could not reach backend")
        setError("Network error: Please check your connection or try again later.")
      } else if (err instanceof Error) {
        console.error("[FAILURE] Error fetching analysis:", err)
        if (!error) setError(err.message || "An unknown error occurred.")
      } else {
        console.error("[FAILURE] Unknown error:", err)
        setError("An unknown error occurred.")
      }
    } finally {
      setIsLoading(false)
      console.log("[MILESTONE] Request cycle complete.")
    }
  }

  // ✅ Return JSX outside handleSubmit
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
          helperText="Enter text in English or Simplified Chinese."
          value={inp}
          buttonId="analyze-btn"
          buttonText="Analyze"
          onChange={setInp}
          onButtonClick={handleSubmit}
        />
        <AnalysisDisplay
          analysisResult={analysisResult}
          isLoading={isLoading}
          error={error}
        />
      </div>
    </div>
  )
}
