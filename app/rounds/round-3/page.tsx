"use client"
import { useState } from "react"
import Link from "next/link"
import Timer from "@/components/timer"

const NeuralPatternPuzzle = () => {
  const [input, setInput] = useState("")
  const [attempts, setAttempts] = useState(3)
  const [isComplete, setIsComplete] = useState(false)
  const [isLocked, setIsLocked] = useState(false)
  const [result, setResult] = useState("")
  const [terminalOutput, setTerminalOutput] = useState<string[]>([
    "> INITIALIZING NEURAL PATTERN SCANNER...",
    "> QUANTUM INTERFERENCE DETECTED...",
    "> ANALYZING BRAIN WAVE PATTERNS...",
  ])

  const correctAnswer = "THETA-231-OMEGA"

  const handleTimeExpire = () => {
    setIsLocked(true)
    addTerminalOutput("CRITICAL: TIME LIMIT EXCEEDED")
    addTerminalOutput("INITIATING EMERGENCY SHUTDOWN")
    addTerminalOutput("ALL SYSTEMS LOCKED")
  }

  const addTerminalOutput = (text: string) => {
    setTerminalOutput((prev) => [...prev, `> ${text}`])
  }

  const handleSubmit = () => {
    if (attempts <= 0 || isLocked) {
      setResult("SYSTEM LOCKED. Please contact security administrator.")
      return
    }

    if (input.trim().toUpperCase() === correctAnswer) {
      setIsComplete(true)
      setResult("ACCESS GRANTED: Neural pattern successfully decoded.")
      addTerminalOutput("Neural synchronization complete. Proceeding to quantum state analysis.")
    } else {
      setAttempts((prev) => prev - 1)
      setResult(`Invalid pattern. ${attempts - 1} attempts remaining.`)
      addTerminalOutput("SYNCHRONIZATION FAILED - Neural pattern mismatch")

      if (attempts - 1 <= 0) {
        setIsLocked(true)
      }
    }
  }

  if (isLocked) {
    return (
      <div className="min-h-screen bg-red-900 text-white p-8 flex items-center justify-center">
        <div className="max-w-md text-center">
          <h1 className="text-4xl font-bold mb-4">🔒 SYSTEM LOCKED</h1>
          <p className="mb-4">Security protocol activated. System administrator notification sent.</p>
          <p className="text-sm">Please wait 10 minutes before attempting access again.</p>
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
        <h1 className="text-3xl font-bold mb-6">Neural Pattern Analysis</h1>

        <div className="bg-black p-6 rounded-lg font-mono">
          <div className="bg-gray-900 p-4 rounded mb-6 h-48 overflow-y-auto">
            {terminalOutput.map((line, index) => (
              <div key={index} className="text-green-500">
                {line}
              </div>
            ))}
          </div>

          <div className="space-y-6">
            <div className="bg-gray-800 p-4 rounded">
              <h3 className="text-lg text-green-500 mb-4">Brain Wave Patterns</h3>
              <div className="space-y-4">
                <div className="border border-gray-700 p-4 rounded">
                  <p className="text-yellow-500 mb-2">Pattern Alpha:</p>
                  <code className="block text-blue-400">⊗ → ⊕ → θ → ∅</code>
                  <p className="text-gray-400 mt-2 text-sm italic">"Follow the transformation sequence..."</p>
                </div>
                <div className="border border-gray-700 p-4 rounded">
                  <p className="text-yellow-500 mb-2">Pattern Beta:</p>
                  <code className="block text-blue-400">α → β → Ω → ∞</code>
                  <p className="text-gray-400 mt-2 text-sm italic">"The end holds the key..."</p>
                </div>
                <div className="text-gray-300 mt-4">
                  <p>🧠 Neural Key Format: [WAVE]-[PATIENT]-[STATE]</p>
                  <p className="text-sm text-gray-400 mt-2">Note: All letters must be uppercase</p>
                </div>
              </div>
            </div>

            <div className="flex gap-4">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                className="flex-1 p-2 bg-gray-800 border border-gray-700 text-white"
                placeholder="Enter neural pattern"
              />
              <button
                onClick={handleSubmit}
                className="bg-green-700 px-4 py-2 rounded hover:bg-green-600"
                disabled={attempts <= 0}
              >
                Synchronize
              </button>
            </div>

            {result && <div className={`mt-4 p-4 rounded ${isComplete ? "bg-green-800" : "bg-red-900"}`}>{result}</div>}

            {isComplete && (
              <div className="mt-6 p-4 bg-green-800 rounded">
                <h3 className="text-xl font-bold mb-2">🔓 Neural Sync Complete</h3>
                <p className="mb-4">Brain wave patterns matched. Proceeding to quantum analysis.</p>
                <Link href="/rounds/round-4" className="inline-block bg-blue-600 px-4 py-2 rounded hover:bg-blue-700">
                  Access Quantum States
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default NeuralPatternPuzzle

