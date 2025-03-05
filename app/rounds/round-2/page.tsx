"use client"
import { useState } from "react"
import Link from "next/link"
import Timer from "@/components/timer"

const MorseCodePuzzle = () => {
  const [input, setInput] = useState("")
  const [attempts, setAttempts] = useState(5)
  const [isComplete, setIsComplete] = useState(false)
  const [isLocked, setIsLocked] = useState(false)
  const [result, setResult] = useState("")
  const [terminalOutput, setTerminalOutput] = useState<string[]>([
    "> ACCESSING TRANSMISSION LOGS...",
    "> MORSE CODE SEQUENCE DETECTED...",
    "> INITIALIZING DECODER...",
  ])

  const morseCode = {
    A: ".-",
    B: "-...",
    C: "-.-.",
    D: "-..",
    E: ".",
    F: "..-.",
    G: "--.",
    H: "....",
    I: "..",
    J: ".---",
    K: "-.-",
    L: ".-..",
    M: "--",
    N: "-.",
    O: "---",
    P: ".--.",
    Q: "--.-",
    R: ".-.",
    S: "...",
    T: "-",
    U: "..-",
    V: "...-",
    W: ".--",
    X: "-..-",
    Y: "-.--",
    Z: "--..",
    "1": ".----",
    "2": "..---",
    "3": "...--",
    "4": "....-",
    "5": ".....",
    "6": "-....",
    "7": "--...",
    "8": "---..",
    "9": "----.",
    "0": "-----",
  }

  const encryptedMessage = "... . -.-. .-. . - / ..--- ...-- .---- / ..-. --- ..- -. -.."
  const correctAnswer = "SECRET-231-FOUND"

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
      setResult("ACCESS GRANTED: Transmission successfully decoded.")
      addTerminalOutput("Decryption complete. Proceeding to next security level.")
    } else {
      setAttempts((prev) => prev - 1)
      setResult(`Invalid code. ${attempts - 1} attempts remaining.`)
      addTerminalOutput("ACCESS DENIED - Invalid decryption sequence")

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
        <h1 className="text-3xl font-bold mb-6">Encrypted Transmission Logs</h1>

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
              <h3 className="text-lg text-green-500 mb-4">Intercepted Transmission</h3>
              <code className="block text-yellow-500 text-lg mb-4">{encryptedMessage}</code>
              <div className="space-y-2 text-gray-300">
                <p className="text-blue-400 italic">"Listen to the rhythm of dots and dashes..."</p>
                <p>🔍 Morse Code Reference:</p>
                <div className="grid grid-cols-2 gap-2 text-sm mt-2">
                  {Object.entries(morseCode)
                    .slice(0, 10)
                    .map(([letter, code]) => (
                      <div key={letter} className="flex justify-between">
                        <span className="text-yellow-500">{letter}</span>: {code}
                      </div>
                    ))}
                </div>
                <p className="text-gray-400 mt-2">Format: [WORD]-[NUMBER]-[WORD]</p>
              </div>
            </div>

            <div className="flex gap-4">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                className="flex-1 p-2 bg-gray-800 border border-gray-700 text-white"
                placeholder="Enter decoded message"
              />
              <button
                onClick={handleSubmit}
                className="bg-green-700 px-4 py-2 rounded hover:bg-green-600"
                disabled={attempts <= 0}
              >
                Decode
              </button>
            </div>

            {result && <div className={`mt-4 p-4 rounded ${isComplete ? "bg-green-800" : "bg-red-900"}`}>{result}</div>}

            {isComplete && (
              <div className="mt-6 p-4 bg-green-800 rounded">
                <h3 className="text-xl font-bold mb-2">🔓 Access Granted</h3>
                <p className="mb-4">Transmission successfully decoded. Proceeding to neural pattern analysis.</p>
                <Link href="/rounds/round-3" className="inline-block bg-blue-600 px-4 py-2 rounded hover:bg-blue-700">
                  Access Neural Patterns
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default MorseCodePuzzle

