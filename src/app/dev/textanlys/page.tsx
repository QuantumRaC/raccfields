"use client"
import * as React from "react"
import { useState } from "react"
import Link from "next/link"
import TopNavigationMenu from "@/components/layout/top-navigation-menu"
import ModeToggle from "@/components/layout/theme-toggle"
import TextareaWithText from "@/components/layout/text-area-with-text"
import { Loader2 } from "lucide-react"
import ReactMarkdown from "react-markdown"
import remarkBreaks from "remark-breaks"
import remarkGfm from "remark-gfm"

import { paths } from "@/lib/paths"

const Title = () => {
  return (
    <section className="flex flex-col items-end justify-center text-center min-h-[70vh] px-6">
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
        <ReactMarkdown remarkPlugins={[remarkGfm, remarkBreaks]}>
          {content}
        </ReactMarkdown>
      </div>
    </div>
  )
}

const toolDescription = `
## **What to know about this tool**  


This is a **beta release** and **a work in progress**.  
T3xtAnlys (name still subject to change) is an experimental lightweight text analysis tool that combines traditional NLP methods (spaCy, statistical metrics, language detection) with generative AI (Google Gemini) to provide insights into writing style, word choice, grammar structures, and sentiment.  

The project’s goal is to **describe writing styles in a more statistical and quantitative way**, showing how technology can bridge hard data with more sentimental and qualitative aspects of language such as tone, emotion, and style. I originally started this project while reflecting on my own writing, curious about what NLP data of different styles might reveal. Generative AI was introduced almost as a *writing instructor* interpreting the raw statistics into human-friendly feedback. I chose to implement it for both English and Simplified Chinese because these are the two languages I write in, and as a bilingual person both are equally significant to me.

### **Current limitations**  
- Occasional inaccuracies in language detection, especially with mixed-language text.  
- Generative feedback may vary in quality or verbosity, depending on the input.  
- Processing large text blocks can be memory-intensive on limited hosting environments.  

This is not a production-ready system, but a demonstration of how **classical NLP** and **modern LLMs** can work together in a cohesive workflow. Feedback and contributions are welcome. The project will continue to evolve as new techniques are explored.  

`

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
      let data: { language?: string; analysis?: string; error?: string }
      try {
        data = (await res.json()) as { language?: string; analysis?: string; error?: string }
      } catch (jsonErr) {
        console.error("[FAILURE] Invalid JSON received from backend", jsonErr)
        setError("Invalid response from server.")
        throw jsonErr
      }

      if (data.error) {
        setError(data.error)
        return
      }

      console.log("[SUCCESS] Backend response received:", data)
      setAnalysisResult(data.analysis || "")

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
        <div className="flex flex-col min-h-[20vh] mb-8">
          <AnalysisDisplay
          analysisResult={analysisResult}
            isLoading={isLoading}
            error={error}
          />
        </div>
        <div className="text-mono mt-8 mb-16">
          <h2><u>What to know about this tool</u></h2>
          <p className="font-thin text-sm">
            This is a <strong>beta release</strong> and <strong>a work in progress</strong>.<br /><br />
            T3xtAnlys (name still subject to change) is an experimental lightweight text analysis tool that combines traditional NLP methods (spaCy, statistical metrics, language detection) with generative AI (Google Gemini) to provide insights into writing style, word choice, grammar structures, and sentiment.<br /><br />
            The project’s goal is to <strong>describe writing styles in a more statistical and quantitative way</strong>, showing how technology can bridge hard data with more sentimental and qualitative aspects of language such as tone, emotion, and style. I originally started this project while reflecting on my own writing, curious about what NLP data of different styles might reveal. Generative AI was introduced almost as a <em>writing instructor</em> interpreting the raw statistics into human-friendly feedback. I chose to implement it for both English and Simplified Chinese because these are the two languages I write in, and as a bilingual person both are equally significant to me.
          </p>
          <br />
          <h2><u>Current limitations</u></h2>
          <p className="font-thin text-sm">
            - Feedback limited to 250 words/characters temporarily due to Google Gemini Limitations.<br />
            - Feedback waiting time can vary and can also be unstable due to limited backend requests and memory use, since this tool is still in beta.<br />
            - Processing large text blocks can be memory-intensive on limited hosting environments.<br /><br />
            This is not a production-ready system, but a demonstration of how <strong>classical NLP</strong> and <strong>modern LLMs</strong> can work together in a cohesive workflow. Feedback and contributions are welcome. The project will continue to evolve as new techniques are explored.
          </p>
          <br />
          <h2><u>Technical Specifications</u></h2>
          <p className="font-thin text-sm">
            This tool is available as a web service connected to the <Link href={paths.about} className="hover:underline">raccfields site</Link>,
            providing text analysis capabilities through API requests.
          </p>
          <ul className="list-disc ml-6 space-y-1 font-thin text-sm">
            - <strong>Language Detection:</strong> langdetect (supports English and Simplified Chinese)<br />
            - <strong>NLP Libraries:</strong> spaCy (3.8.7) for parsing (models: en_core_web_md-3.8.0, zh_core_web_sm-3.8.0), TextBlob for sentiment Analysis<br />
            - <strong>Statistical Features Analyzed:</strong><br />
            &nbsp;&nbsp;- Sentence lengths: average, standard deviation, range, oscillation<br />
            &nbsp;&nbsp;- Token lengths (excluding punctuation): average, standard deviation, range, oscillation<br />
            &nbsp;&nbsp;- Clauses per sentence: count and variance<br />
            &nbsp;&nbsp;- Part-of-speech distribution: frequency of major POS categories<br />
            &nbsp;&nbsp;- Dependency relations: frequency of syntactic dependencies<br />
            &nbsp;&nbsp;- Verb tense usage: counts of verbs by tense<br />
            &nbsp;&nbsp;- Lemma frequency: most common words and motifs<br />
            &nbsp;&nbsp;- Morphological features: sample token morphs for linguistic insights<br />
            - <strong>Generative AI:</strong> Google Gemini (2.5) API for human-readable style analysis<br />
            - <strong>Backend:</strong> FastAPI (Python) serving the text analysis API<br />
            - <strong>Deployment:</strong> Hosted on Render, with CORS-enabled API and client-side request handling<br />
            - For technical specifications of this site see <Link href={paths.aboutSite} className="hover:underline">About This Site</Link>.<br />
          </ul>
          <br /><p className="font-thin text-sm">For full source code and implementation details, see  
            <Link href="https://github.com/QuantumRaC/T3xtAnlys" className="hover:underline"> GitHub repository.</Link></p>
        </div>
      </div>
    </div>
  )
}