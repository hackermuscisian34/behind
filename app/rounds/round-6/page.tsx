"use client"
import { useState } from "react"
import Link from "next/link"
import Timer from "@/components/timer"

const TranspositionPuzzle = () => {
  const [input, setInput] = useState("")
  const [isComplete, setIsComplete] = useState(false)
  const [attempts, setAttempts] = useState(5)
  const [showMatrix, setShowMatrix] = useState(false)
  const [isLocked, setIsLocked] = useState(false)
  const [terminalOutput, setTerminalOutput] = useState<string[]>([
    "> INITIALIZING NEURAL PATHWAYS...",
    "> SYNAPTIC PATTERNS DETECTED...",
    "> AWAITING SEQUENCE REALIGNMENT",
  ])

  // The answer will be revealed after double transposition
  const correctAnswer = "PULSE-231-SYNCH"

  const problemStatement = [
    "In the depths of medical archives, a rhythm flows",
    "Where life's force meets digital echoes",
    "First comes the beat that sustains all life",
    "Then time's marker holds steady through strife",
    "Last comes the dance of perfect timing",
    "All must align for systems' chiming",
  ]

  const encryptedData = [
    {
      name: "Sequence Alpha",
      data: "SELPU", // First transposition of "PULSE"
      note: "Life force pattern",
    },
    {
      name: "Temporal Code",
      data: "231",
      note: "Unchanging signal",
    },
    {
      name: "Sequence Beta",
      data: "CHSYN", // First transposition of "SYNCH"
      note: "Harmony sequence",
    },
  ]

  const matrixPatterns = [
    {
      id: "A",
      name: "Biorhythm Matrix",
      sequence: "3-1-4-2-5",
      note: "Primary neural pathway",
    },
    {
      id: "B",
      name: "Synaptic Grid",
      sequence: "2-5-1-4-3",
      note: "Secondary neural pathway",
    },
  ]

  const crypticHints = [
    "Letters dance in a five-step waltz",
    "What keeps blood flowing must be restored",
    "Time stands still in the middle ground",
    "The end brings harmony to chaos",
    "All capitals mark the way",
  ]

  const visualElements = {
    neuron: "⚡",
    lock: "🔒",
    unlock: "🔓",
    brain: "🧠",
    wave: "〰️",
    warning: "⚠️",
  }

  const handleTimeExpire = () => {
    setIsLocked(true)
    addTerminalOutput("CRITICAL: TIME LIMIT EXCEEDED")
    addTerminalOutput("NEURAL PATHWAYS DESTABILIZED")
    addTerminalOutput("SYSTEM LOCKED")
  }

  const addTerminalOutput = (text: string) => {
    setTerminalOutput((prev) => [...prev, `> ${text}`])
  }

  const handleShowMatrix = () => {
    setShowMatrix(!showMatrix)
    if (!showMatrix) {
      addTerminalOutput("SCANNING NEURAL PATHWAYS...")
      addTerminalOutput("MAPPING SYNAPTIC CONNECTIONS...")
      setTimeout(() => {
        addTerminalOutput("MATRIX PATTERNS IDENTIFIED")
      }, 1000)
    }
  }

  const handleSubmit = () => {
    if (attempts <= 0 || isLocked) {
      addTerminalOutput("NEURAL PATHWAY COLLAPSED")
      return
    }

    if (input.trim().toUpperCase() === correctAnswer) {
      setIsComplete(true)
      addTerminalOutput("NEURAL PATTERNS ALIGNED")
      addTerminalOutput("SYNAPTIC CONNECTIONS STABLE")
      addTerminalOutput("PATHWAY ESTABLISHED")
    } else {
      setAttempts((prev) => prev - 1)
      addTerminalOutput(`MISALIGNMENT DETECTED - ${attempts - 1} attempts remaining`)

      if (attempts === 2) {
        addTerminalOutput("HINT: Vital signs require natural ordering")
      } else if (attempts === 1) {
        addTerminalOutput("CRITICAL: Rhythm stabilization needed")
      }
    }
  }

  if (isLocked) {
    return (
      <div className="min-h-screen bg-red-900 text-white p-8 flex items-center justify-center">
        <div className="max-w-md text-center">
          <h1 className="text-4xl font-bold mb-4">
            <span className="mr-2">{visualElements.lock}</span>
            SYSTEM LOCKED
          </h1>
          <p className="mb-4">Neural pathways destabilized. Administrator notification sent.</p>
          <p className="text-sm">Please wait for pathway recalibration.</p>
          <Link href="/" className="mt-6 inline-block bg-red-700 px-4 py-2 rounded hover:bg-red-600">
            Return to Overview
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white p-8">
      <div className="fixed top-4 right-4 z-10">
        <Timer onTimeExpire={handleTimeExpire} isStarted={true} totalSeconds={7200} />
      </div>

      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold mb-4">
          <span className="mr-2">{visualElements.brain}</span>
          Round 6: Medical Cryptogram
        </h1>

        <div className="bg-gray-800 p-4 rounded mb-6 text-center italic">
          {problemStatement.map((line, index) => (
            <p key={index} className="text-cyan-400 my-1">
              {line}
            </p>
          ))}
        </div>

        <div className="bg-black p-6 rounded-lg font-mono relative overflow-hidden">
          {/* Add medical data background effect */}
          <div
            className="absolute inset-0 opacity-5 pointer-events-none select-none overflow-hidden"
            style={{
              fontFamily: "monospace",
              fontSize: "14px",
              lineHeight: "14px",
              whiteSpace: "pre-wrap",
            }}
          >
            {"♡∷♢∷♤".repeat(200)}
          </div>

          <div className="bg-gray-900 p-4 rounded mb-6 h-48 overflow-y-auto">
            {terminalOutput.map((line, index) => (
              <div key={index} className="text-green-500">
                {line}
              </div>
            ))}
          </div>

          <div className="space-y-6">
            <div className="bg-gray-800 p-4 rounded">
              <h2 className="text-lg text-green-500 mb-4">
                <span className="mr-2">{visualElements.wave}</span>
                Encrypted Sequences:
              </h2>
              {encryptedData.map((data, index) => (
                <div key={index} className="mb-4">
                  <div className="text-yellow-500">{data.name}:</div>
                  <div className="text-white font-bold my-1 font-mono">{data.data}</div>
                  <div className="text-sm text-gray-400">{data.note}</div>
                </div>
              ))}
            </div>

            {showMatrix && (
              <div className="bg-gray-800 p-4 rounded">
                <h2 className="text-lg text-green-500 mb-4">Matrix Patterns:</h2>
                {matrixPatterns.map((pattern) => (
                  <div key={pattern.id} className="mb-4">
                    <div className="text-yellow-500">{pattern.name}</div>
                    <div className="text-white font-bold my-1">{pattern.sequence}</div>
                    <div className="text-sm text-gray-400">{pattern.note}</div>
                  </div>
                ))}
              </div>
            )}

            <div className="bg-gray-800 p-4 rounded">
              <h2 className="text-lg text-green-500 mb-4">
                <span className="mr-2">💡</span>
                Ancient Scrolls Whisper:
              </h2>
              <div className="text-sm text-gray-400">
                {crypticHints.map((hint, index) => (
                  <div key={index} className="mb-2">
                    • {hint}
                  </div>
                ))}
              </div>
            </div>

            <div className="flex gap-4">
              <button onClick={handleShowMatrix} className="bg-blue-700 px-4 py-2 rounded hover:bg-blue-600">
                {showMatrix ? "Hide Matrix" : "Show Matrix"}
              </button>
            </div>

            <div className="flex gap-4">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                className="flex-1 p-2 bg-gray-800 border border-gray-700 text-white focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition-all"
                placeholder="Enter the solution"
              />
              <button
                onClick={handleSubmit}
                className="bg-green-700 px-4 py-2 rounded hover:bg-green-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                disabled={attempts <= 0}
              >
                Submit
              </button>
            </div>

            <div className="text-gray-400 text-sm">
              <p>Format: [WORD]-[NUMBER]-[WORD]</p>
              <p>Note: All letters must be uppercase</p>
            </div>

            {attempts <= 0 && (
              <div className="bg-red-900 p-4 rounded animate-pulse">
                <p className="font-bold">
                  <span className="mr-2">{visualElements.warning}</span>
                  NEURAL PATHWAY COLLAPSED
                </p>
                <p>Maximum attempts exceeded. System locked.</p>
              </div>
            )}

            {isComplete && (
              <div className="bg-green-800 p-4 rounded animate-fade-in">
                <h3 className="text-xl font-bold mb-2">
                  <span className="mr-2">{visualElements.unlock}</span>
                  Neural Pathway Established
                </h3>
                <p className="mb-4">Synaptic bridge stable. Proceed to final escape.</p>
                <Link
                  href="/rounds/round-7"
                  className="inline-block bg-blue-600 px-4 py-2 rounded hover:bg-blue-700 transition-colors"
                >
                  Access Round 7: Final Escape
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in {
          animation: fade-in 0.5s ease-out forwards;
        }
      `}</style>
    </div>
  )
}

export default TranspositionPuzzle

