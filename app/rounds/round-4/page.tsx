"use client"
import { useState } from "react"
import Link from "next/link"
import Timer from "@/components/timer"

const ColorPalettePuzzle = () => {
  const [input, setInput] = useState("")
  const [isComplete, setIsComplete] = useState(false)
  const [attempts, setAttempts] = useState(3)
  const [showPalette, setShowPalette] = useState(false)
  const [hintLevel, setHintLevel] = useState(0)
  const [isLocked, setIsLocked] = useState(false)
  const [terminalOutput, setTerminalOutput] = useState<string[]>([
    "> INITIALIZING COLOR DECODER...",
    "> LOADING PALETTE DATABASE...",
    "> ENCRYPTED MESSAGE DETECTED",
    "> COLOR SEQUENCE ANALYSIS REQUIRED",
  ])

  // The answer is encoded in hex colors where each pair represents ASCII values
  const correctCode = "KEY-231-LAB"

  const colorPalettes = [
    {
      name: "Sequence Alpha",
      colors: [{ hex: "#4B4559" }, { hex: "#455945" }, { hex: "#594559" }],
    },
    {
      name: "Sequence Beta",
      colors: [{ hex: "#323332" }, { hex: "#333333" }, { hex: "#313131" }],
    },
    {
      name: "Sequence Gamma",
      colors: [{ hex: "#4C4C4C" }, { hex: "#414141" }, { hex: "#424242" }],
    },
  ]

  const colorRules = [
    {
      id: "A",
      name: "Protocol 1",
      rule: "Analyze hex pairs",
      note: "Convert to ASCII",
    },
    {
      id: "B",
      name: "Protocol 2",
      rule: "Monitor grayscale",
      note: "Observe patterns",
    },
    {
      id: "C",
      name: "Protocol 3",
      rule: "Extract RGB data",
      note: "Combine channels",
    },
  ]

  const decodingHints = [
    "Hex values contain hidden data",
    "Patterns emerge in neutral tones",
    "Channel combinations reveal truth",
    "Sequence order matters",
    "All codes are interconnected",
  ]

  const addTerminalOutput = (text: string) => {
    setTerminalOutput((prev) => [...prev, `> ${text}`])
  }

  const handleShowPalette = () => {
    setShowPalette(!showPalette)
    if (!showPalette) {
      addTerminalOutput("LOADING COLOR PALETTES...")
      addTerminalOutput("ANALYZING COLOR RELATIONSHIPS...")
      setTimeout(() => {
        addTerminalOutput("COLOR PATTERNS READY FOR ANALYSIS")
      }, 1000)
    }
  }

  const handleRequestHint = () => {
    if (hintLevel < 3) {
      setHintLevel((prev) => prev + 1)
      switch (hintLevel + 1) {
        case 1:
          addTerminalOutput("ANALYZING HEX CODES...")
          addTerminalOutput("First segment contains ASCII values in hex pairs")
          break
        case 2:
          addTerminalOutput("CHECKING GRAYSCALE VALUES...")
          addTerminalOutput("Numeric sequence hidden in neutral tones")
          break
        case 3:
          addTerminalOutput("EXAMINING RGB CHANNELS...")
          addTerminalOutput("Final segment requires channel combination")
          break
      }
    } else {
      addTerminalOutput("MAXIMUM HINT LEVEL REACHED")
    }
  }

  const handleSubmit = () => {
    if (attempts <= 0) {
      addTerminalOutput("ACCESS DENIED - Too many failed attempts")
      return
    }

    if (input.trim().toUpperCase() === correctCode) {
      setIsComplete(true)
      addTerminalOutput("COLOR SEQUENCE DECODED")
      addTerminalOutput("MESSAGE SUCCESSFULLY EXTRACTED")
      addTerminalOutput("ACCESS GRANTED")
    } else {
      setAttempts((prev) => prev - 1)
      addTerminalOutput(`DECODING ERROR - ${attempts - 1} attempts remaining`)

      if (attempts === 2) {
        addTerminalOutput("HINT: Focus on hex code pairs")
      } else if (attempts === 1) {
        addTerminalOutput("CRITICAL: Convert hex to ASCII")
      }
    }
  }

  const handleTimeExpire = () => {
    setIsLocked(true)
    addTerminalOutput("CRITICAL: TIME LIMIT EXCEEDED")
    addTerminalOutput("INITIATING EMERGENCY SHUTDOWN")
    addTerminalOutput("ALL SYSTEMS LOCKED")
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
        <h1 className="text-3xl font-bold mb-6">Round 4: Color Palette Decoder</h1>

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
              <h2 className="text-lg text-green-500 mb-4">Color Rules:</h2>
              {colorRules.map((rule) => (
                <div key={rule.id} className="mb-4">
                  <div className="text-yellow-500">{rule.name}</div>
                  <div className="text-sm text-gray-400">
                    <div>Rule: {rule.rule}</div>
                    <div>Note: {rule.note}</div>
                  </div>
                </div>
              ))}
            </div>

            {showPalette && (
              <div className="bg-gray-800 p-4 rounded">
                <h2 className="text-lg text-green-500 mb-4">Color Palettes:</h2>
                {colorPalettes.map((palette, index) => (
                  <div key={index} className="mb-6">
                    <div className="text-yellow-500 mb-2">{palette.name}</div>
                    <div className="flex flex-wrap gap-4">
                      {palette.colors.map((color, i) => (
                        <div key={i} className="flex flex-col items-center">
                          <div className="w-12 h-12 rounded-lg mb-2" style={{ backgroundColor: color.hex }} />
                          <div className="text-xs text-gray-400">{color.hex}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            )}

            <div className="bg-gray-800 p-4 rounded">
              <h2 className="text-lg text-green-500 mb-4">Decoding Guide:</h2>
              <div className="text-sm text-gray-400">
                {decodingHints.map((hint, index) => (
                  <div key={index} className="mb-2">
                    • {hint}
                  </div>
                ))}
              </div>
            </div>

            <div className="flex gap-4">
              <button onClick={handleShowPalette} className="bg-blue-700 px-4 py-2 rounded hover:bg-blue-600">
                {showPalette ? "Hide Color Palettes" : "Show Color Palettes"}
              </button>
              <button
                onClick={handleRequestHint}
                className="bg-purple-700 px-4 py-2 rounded hover:bg-purple-600"
                disabled={hintLevel >= 3}
              >
                Request Hint {hintLevel}/3
              </button>
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
                Submit Code
              </button>
            </div>

            <div className="text-gray-400 text-sm">
              <p>Format: [KEY]-[NUMBER]-[LOCATION]</p>
              <p>Note: All letters must be uppercase</p>
            </div>

            {attempts <= 0 && (
              <div className="bg-red-900 p-4 rounded">
                <p className="font-bold">DECODING FAILED</p>
                <p>Color sequence corrupted. System locked.</p>
              </div>
            )}

            {isComplete && (
              <div className="bg-green-800 p-4 rounded">
                <h3 className="text-xl font-bold mb-2">🎨 Color Code Decrypted</h3>
                <p className="mb-4">Message successfully decoded. Proceed to synaptic cascade.</p>
                <Link href="/rounds/round-5" className="inline-block bg-blue-600 px-4 py-2 rounded hover:bg-blue-700">
                  Access Round 5: Security Camera Analysis
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default ColorPalettePuzzle

