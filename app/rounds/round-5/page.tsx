"use client"
import { useState } from "react"
import Link from "next/link"
import Timer from "@/components/timer"

const SecurityCameraPuzzle = () => {
  const [input, setInput] = useState("")
  const [isComplete, setIsComplete] = useState(false)
  const [attempts, setAttempts] = useState(3)
  const [isLocked, setIsLocked] = useState(false)
  const [terminalOutput, setTerminalOutput] = useState<string[]>([
    "> INITIALIZING SECURITY FEED...",
    "> ACCESSING CAMERA NETWORK...",
    "> RETRIEVING FOOTAGE DATA...",
  ])

  const correctTimestamp = "23:45:12-CAM-B7"

  const footageData = [
    { time: "23:42:18", event: "Movement detected in Lab 3" },
    { time: "23:43:55", event: "Door access: Basement Level" },
    { time: "23:44:30", event: "Heat signature: Corridor B" },
    { time: "23:45:12", event: "Subject spotted: Camera B7" },
    { time: "23:46:01", event: "Signal lost: Camera B7" },
    { time: "23:47:23", event: "Multiple heat signatures: Lab 7" },
  ]

  const handleTimeExpire = () => {
    setIsLocked(true)
    addTerminalOutput("CRITICAL: TIME LIMIT EXCEEDED")
    addTerminalOutput("SECURITY FEED ACCESS REVOKED")
    addTerminalOutput("SYSTEM LOCKED")
  }

  const addTerminalOutput = (text: string) => {
    setTerminalOutput((prev) => [...prev, `> ${text}`])
  }

  const handleSubmit = () => {
    if (attempts <= 0 || isLocked) {
      addTerminalOutput("ACCESS DENIED - Maximum attempts exceeded")
      return
    }

    if (input.trim().toUpperCase() === correctTimestamp) {
      setIsComplete(true)
      addTerminalOutput("TIMESTAMP VERIFIED")
      addTerminalOutput("SUBJECT LOCATION CONFIRMED")
      addTerminalOutput("ACCESS GRANTED")
    } else {
      setAttempts((prev) => prev - 1)
      addTerminalOutput(`VERIFICATION FAILED - ${attempts - 1} attempts remaining`)

      if (attempts === 2) {
        addTerminalOutput("HINT: Check camera B section logs")
      } else if (attempts === 1) {
        addTerminalOutput("CRITICAL: Focus on subject sighting")
      }
    }
  }

  if (isLocked) {
    return (
      <div className="min-h-screen bg-red-900 text-white p-8 flex items-center justify-center">
        <div className="max-w-md text-center">
          <h1 className="text-4xl font-bold mb-4">🔒 SYSTEM LOCKED</h1>
          <p className="mb-4">Security feed access revoked. Administrator notification sent.</p>
          <p className="text-sm">Please wait for security clearance reset.</p>
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
        <h1 className="text-3xl font-bold mb-6">Round 5: Security Camera Analysis</h1>

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
              <h2 className="text-lg text-green-500 mb-4">Security Log Entries:</h2>
              {footageData.map((entry, index) => (
                <div key={index} className="mb-2 text-yellow-500">
                  [{entry.time}] {entry.event}
                </div>
              ))}
              <div className="mt-4 text-gray-400">
                <p>Format: HH:MM:SS-CAM-LOCATION</p>
              </div>
            </div>

            <div>
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                className="w-full p-2 bg-gray-800 border border-gray-700 text-white mb-2"
                placeholder="Enter critical timestamp and camera ID"
              />
              <button
                onClick={handleSubmit}
                className="bg-green-700 px-4 py-2 rounded hover:bg-green-600"
                disabled={attempts <= 0}
              >
                Verify Timestamp
              </button>
            </div>

            {attempts <= 0 && (
              <div className="bg-red-900 p-4 rounded">
                <p className="font-bold">SYSTEM LOCKED</p>
                <p>Maximum attempts exceeded. Security feed access revoked.</p>
              </div>
            )}

            {isComplete && (
              <div className="bg-green-800 p-4 rounded">
                <h3 className="text-xl font-bold mb-2">🎥 Subject Located</h3>
                <p className="mb-4">Security footage analyzed. Proceed to biometric verification.</p>
                <Link href="/rounds/round-6" className="inline-block bg-blue-600 px-4 py-2 rounded hover:bg-blue-700">
                  Access Round 6: Medical Cryptogram
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default SecurityCameraPuzzle

