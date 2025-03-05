"use client"
import { useState, useEffect } from "react"
import Link from "next/link"
import Timer from "@/components/timer"
import { Fireworks } from "@/components/fireworks"

const FinalEscapePuzzle = () => {
  const [input, setInput] = useState("")
  const [isComplete, setIsComplete] = useState(false)
  const [attempts, setAttempts] = useState(5)
  const [showHints, setShowHints] = useState(false)
  const [terminalOutput, setTerminalOutput] = useState<string[]>([
    "> INITIATING FINAL SECURITY PROTOCOL...",
    "> MULTIPLE ENCRYPTION LAYERS DETECTED...",
    "> AWAITING MASTER KEY SEQUENCE...",
  ])
  const [isTimerExpired, setIsTimerExpired] = useState(false)
  const [showFireworks, setShowFireworks] = useState(false)

  // Final answer after decoding all three layers
  const correctAnswer = "QUANTUM-2718-CIPHER"

  const problemStatement = [
    "Through layers of time, secrets entwine",
    "First the rails split truth into lines",
    "Then Bacon's art transforms each part",
    "Last Fibonacci's spiral divine",
    "Three keys unite to set you free",
    "Unlock the gates of infinity",
  ]

  const encryptedLayers = [
    {
      name: "Temporal Serpent's Path",
      data: "QMIPNTAUHER", // Rail fence with 3 rails (QUANTUM)
      note: "The serpent weaves through three dimensions of time",
      key: "Follow the serpent's trail across parallel realities",
    },
    {
      name: "The Eternal Constant",
      data: "2718", // Euler's number reference
      note: "Numbers whispered by the universe itself",
      key: "Nature's mathematical signature remains unaltered",
    },
    {
      name: "The Binary Oracle",
      data: "ABAAB ABBBA ABBAB ABBAA ABAAA ABBAB", // Encodes to CIPHER
      note: "Ancient wisdom encoded in duality",
      key: "Five signals dance between light and shadow",
    },
  ]

  const layerHints = [
    {
      name: "Temporal Serpent's Path - Rail Fence Prophecy",
      hints: [
        "The serpent slithers across three planes of existence",
        "Its path forms a sacred zigzag through reality",
        "Read the truth horizontally when the pattern emerges",
      ],
    },
    {
      name: "The Eternal Constant - Nature's Code",
      hints: [
        "A number revered by the ancient mathematicians",
        "The foundation of natural logarithms",
        "Euler's divine revelation",
      ],
    },
    {
      name: "The Binary Oracle - Bacon's Secret Language",
      hints: [
        "Two states of being combine to reveal truth",
        "Five signals form the sacred patterns",
        "A and B dance in mysterious harmony",
      ],
    },
  ]

  const visualElements = {
    quantum: "⚛️",
    time: "⌛",
    lock: "🔒",
    unlock: "🔓",
    warning: "⚠️",
    key: "🔑",
  }

  useEffect(() => {
    if (isComplete) {
      setTimeout(() => {
        setShowFireworks(true)
      }, 1000)
    }
  }, [isComplete])

  const addTerminalOutput = (text: string) => {
    setTerminalOutput((prev) => [...prev, `> ${text}`])
  }

  const handleShowHints = () => {
    setShowHints(!showHints)
    if (!showHints) {
      addTerminalOutput("ACCESSING CRYPTOGRAPHIC ARCHIVES...")
      addTerminalOutput("RETRIEVING HISTORICAL CIPHERS...")
      setTimeout(() => {
        addTerminalOutput("DECRYPTION REFERENCES AVAILABLE")
      }, 1000)
    }
  }

  const handleSubmit = () => {
    if (attempts <= 0) {
      addTerminalOutput("SECURITY LOCKDOWN INITIATED")
      return
    }

    if (input.trim().toUpperCase() === correctAnswer) {
      setIsComplete(true)
      addTerminalOutput("QUANTUM ENCRYPTION BROKEN")
      addTerminalOutput("TEMPORAL SEALS DISABLED")
      addTerminalOutput("SYSTEM ACCESS GRANTED")
    } else {
      setAttempts((prev) => prev - 1)
      addTerminalOutput(`DECRYPTION FAILED - ${attempts - 1} attempts remaining`)

      if (attempts === 2) {
        addTerminalOutput("HINT: Start with the rails, end with binary")
      } else if (attempts === 1) {
        addTerminalOutput("CRITICAL: Five signals form one letter in final sequence")
      }
    }
  }

  const handleTimeExpire = () => {
    setIsTimerExpired(true)
    addTerminalOutput("CRITICAL: TIME LIMIT EXCEEDED")
    addTerminalOutput("INITIATING EMERGENCY SHUTDOWN")
    addTerminalOutput("ALL SYSTEMS LOCKED")
    setAttempts(0)
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white p-8 relative">
      {showFireworks && <Fireworks />}

      <div className="fixed top-4 right-4 z-10">
        <Timer onTimeExpire={handleTimeExpire} isStarted={true} totalSeconds={7200} />
      </div>

      <div className="max-w-2xl mx-auto relative z-10">
        <h1 className="text-3xl font-bold mb-4">
          <span className="mr-2">{visualElements.quantum}</span>
          Round 7: Quantum Encryption Matrix
        </h1>

        <div className="bg-gray-800 p-4 rounded mb-6 text-center italic">
          {problemStatement.map((line, index) => (
            <p key={index} className="text-purple-400 my-1">
              {line}
            </p>
          ))}
        </div>

        <div className="bg-black p-6 rounded-lg font-mono relative overflow-hidden">
          {/* Add quantum effect background */}
          <div
            className="absolute inset-0 opacity-5 pointer-events-none select-none overflow-hidden"
            style={{
              fontFamily: "monospace",
              fontSize: "14px",
              lineHeight: "14px",
              whiteSpace: "pre-wrap",
            }}
          >
            {"⌬∰⌬∯⌬".repeat(200)}
          </div>

          <div className="relative">
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
                  <span className="mr-2">{visualElements.time}</span>
                  Quantum Encrypted Data:
                </h2>
                {encryptedLayers.map((layer, index) => (
                  <div key={index} className="mb-4 border-b border-gray-700 pb-4">
                    <div className="text-yellow-500">{layer.name}:</div>
                    <div className="text-white font-bold my-1 font-mono">{layer.data}</div>
                    <div className="text-sm text-gray-400">{layer.note}</div>
                    <div className="text-xs text-blue-400 mt-1">{layer.key}</div>
                  </div>
                ))}
              </div>

              {showHints && (
                <div className="bg-gray-800 p-4 rounded">
                  <h2 className="text-lg text-green-500 mb-4">
                    <span className="mr-2">{visualElements.key}</span>
                    Cryptographic Archives:
                  </h2>
                  {layerHints.map((section, index) => (
                    <div key={index} className="mb-4">
                      <div className="text-yellow-500 mb-2">{section.name}</div>
                      <ul className="list-disc list-inside text-sm text-gray-400">
                        {section.hints.map((hint, hintIndex) => (
                          <li key={hintIndex} className="ml-4">
                            {hint}
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              )}

              <div className="flex gap-4 mb-4">
                <button
                  onClick={handleShowHints}
                  className="bg-blue-700 px-4 py-2 rounded hover:bg-blue-600 transition-colors"
                >
                  {showHints ? "Hide Archives" : "Access Archives"}
                </button>
              </div>

              <div className="flex gap-4">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  className="flex-1 p-2 bg-gray-800 border border-gray-700 text-white focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition-all"
                  placeholder="Enter quantum key sequence"
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

              {attempts <= 0 && !isComplete && (
                <div className="bg-red-900 p-4 rounded animate-pulse">
                  <p className="font-bold">
                    <span className="mr-2">{visualElements.warning}</span>
                    QUANTUM LOCKDOWN INITIATED
                  </p>
                  <p>Maximum attempts exceeded. System sealed.</p>
                </div>
              )}

              {isComplete && (
                <div className="bg-green-800 p-4 rounded animate-fade-in">
                  <h3 className="text-xl font-bold mb-2">
                    <span className="mr-2">{visualElements.unlock}</span>
                    Quantum Barrier Disabled
                  </h3>
                  <p className="mb-4">All security protocols bypassed. Freedom achieved.</p>
                  <div className="text-center">
                    <p className="text-2xl font-bold text-yellow-400 mb-4">🎉 CONGRATULATIONS 🎉</p>
                    <p>You have successfully completed all challenges!</p>
                    <Link
                      href="/"
                      className="mt-6 inline-block bg-green-600 px-6 py-3 rounded hover:bg-green-700 transition-colors"
                    >
                      Return to Mission Control
                    </Link>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {isTimerExpired && (
          <div className="fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center z-50">
            <div className="bg-red-900 p-8 rounded-lg text-center max-w-md">
              <h2 className="text-2xl font-bold mb-4">Time Expired!</h2>
              <p className="mb-6">The challenge time limit has been reached. All systems are now locked.</p>
              <Link
                href="/"
                className="bg-red-700 hover:bg-red-600 text-white font-bold py-2 px-4 rounded transition-colors"
              >
                Return to Overview
              </Link>
            </div>
          </div>
        )}
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

export default FinalEscapePuzzle

