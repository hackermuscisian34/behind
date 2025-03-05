"use client"
import type React from "react"
import { useState, useEffect } from "react"
import Link from "next/link"
import Timer from "@/components/timer"

const EmergencyCodePuzzle = () => {
  const [step, setStep] = useState(1)
  const [inputs, setInputs] = useState({
    emergencyCode: "",
    securityPin: "",
    patientStatus: "",
    finalCode: "",
  })
  const [terminalOutput, setTerminalOutput] = useState<string[]>([])
  const [isLocked, setIsLocked] = useState(false)
  const [attempts, setAttempts] = useState(5)
  const [result, setResult] = useState("")
  const [isComplete, setIsComplete] = useState(false)
  const [isTimerExpired, setIsTimerExpired] = useState(false)

  // Correct answers for different steps
  const answers = {
    emergencyCode: "CODE-231",
    securityPin: "7231",
    patientStatus: "CRITICAL",
    finalCode: "QCH-7231-231",
  }

  // Emergency codes and their meanings
  const emergencyCodes = {
    "CODE RED": "Fire",
    "CODE BLUE": "Medical Emergency",
    "CODE BLACK": "Bomb Threat",
    "CODE GREY": "System Failure",
    "CODE 231": "Classified Patient",
  }

  useEffect(() => {
    // Initialize terminal output
    setTerminalOutput([
      "INITIALIZING SECURE CONNECTION...",
      "ACCESSING HOSPITAL DATABASE...",
      "FIREWALL BYPASSED...",
      "CONNECTED TO QUICK CURE HOSPITAL NETWORK",
      "SECURITY LEVEL 1 ACTIVE: EMERGENCY CODE REQUIRED",
    ])
  }, [])

  const handleTimeExpire = () => {
    setIsTimerExpired(true)
    setIsLocked(true)
    addTerminalOutput("CRITICAL: TIME LIMIT EXCEEDED")
    addTerminalOutput("INITIATING EMERGENCY SHUTDOWN")
    addTerminalOutput("ALL SYSTEMS LOCKED")
  }

  const handleInputChange = (field: keyof typeof inputs) => (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputs((prev) => ({
      ...prev,
      [field]: e.target.value,
    }))
  }

  const addTerminalOutput = (text: string) => {
    setTerminalOutput((prev) => [...prev, `> ${text}`])
  }

  const checkStepAnswer = (field: keyof typeof inputs) => {
    if (attempts <= 0 || isLocked) {
      setResult("SYSTEM LOCKED. Please contact security administrator.")
      return
    }

    const userAnswer = inputs[field].trim().toUpperCase()
    const correctAnswer = answers[field].toUpperCase()

    if (userAnswer === correctAnswer) {
      if (field === "finalCode") {
        setIsComplete(true)
        setResult("ACCESS GRANTED: Patient file successfully decrypted.")
        addTerminalOutput("Decryption complete. Access granted to Patient 231 files.")
      } else {
        setStep((prev) => prev + 1)
        setResult("Code accepted. Proceeding to next security level.")
        addTerminalOutput(`Security level ${step} cleared. Proceeding...`)
      }
    } else {
      setAttempts((prev) => prev - 1)
      setResult(`Invalid code. ${attempts - 1} attempts remaining.`)
      addTerminalOutput("ACCESS DENIED - Invalid security credentials")

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
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">Quick Cure Hospital - Security Terminal</h1>
        </div>

        <div className="bg-black p-6 rounded-lg font-mono">
          {/* Terminal Output */}
          <div className="bg-gray-900 p-4 rounded mb-6 h-48 overflow-y-auto">
            {terminalOutput.map((line, index) => (
              <div key={index} className="text-green-500">
                {line}
              </div>
            ))}
          </div>

          <div className="space-y-6">
            {/* Step 1: Emergency Code */}
            {step === 1 && (
              <div>
                <h3 className="text-lg text-green-500 mb-2">SECURITY LEVEL 1: Emergency Code Verification</h3>
                <div className="bg-gray-800 p-4 rounded mb-4">
                  <p className="text-gray-300 mb-2">Active Emergency Codes:</p>
                  {Object.entries(emergencyCodes).map(([code, meaning]) => (
                    <div key={code} className="text-sm">
                      <span className="text-yellow-500">{code}</span>: {meaning}
                    </div>
                  ))}
                  <p className="text-blue-400 mt-2 text-sm italic">
                    "In times of crisis, numbers speak louder than words. Look for the classified pattern."
                  </p>
                </div>
                <input
                  type="text"
                  value={inputs.emergencyCode}
                  onChange={handleInputChange("emergencyCode")}
                  className="w-full p-2 bg-gray-800 border border-gray-700 text-white mb-2"
                  placeholder="Format: CODE-ANSWER"
                />
                <button
                  onClick={() => checkStepAnswer("emergencyCode")}
                  className="bg-green-700 px-4 py-2 rounded hover:bg-green-600"
                >
                  Verify Code
                </button>
              </div>
            )}

            {/* Step 2: Security PIN */}
            {step === 2 && (
              <div>
                <h3 className="text-lg text-green-500 mb-2">SECURITY LEVEL 2: Access PIN Required</h3>
                <div className="bg-gray-800 p-4 rounded mb-4">
                  <p className="text-yellow-500">HINT: The Security Protocol</p>
                  <div className="space-y-2 text-gray-300 mt-2">
                    <p className="text-blue-400 italic">"Seven keys protect the sacred halls..."</p>
                    <p className="text-blue-400 italic">"Patient's code holds the remaining truth..."</p>
                    <p className="text-blue-400 italic">"Follow the numbers as they appear..."</p>
                  </div>
                  <div className="mt-4 text-gray-400 text-sm">
                    <p>🔍 Decode the pattern:</p>
                    <ul className="list-disc list-inside space-y-1">
                      <li>First: The sacred number of security</li>
                      <li>Remaining: Hidden in plain sight within the classified code</li>
                      <li>Remember: Some numbers tell their own story</li>
                    </ul>
                    <p className="text-yellow-500 mt-2 text-xs">Look carefully at the classified patient code...</p>
                  </div>
                </div>
                <input
                  type="password"
                  value={inputs.securityPin}
                  onChange={handleInputChange("securityPin")}
                  className="w-full p-2 bg-gray-800 border border-gray-700 text-white mb-2"
                  placeholder="Enter 4-digit PIN"
                  maxLength={4}
                />
                <button
                  onClick={() => checkStepAnswer("securityPin")}
                  className="bg-green-700 px-4 py-2 rounded hover:bg-green-600"
                >
                  Submit PIN
                </button>
              </div>
            )}

            {/* Step 3: Patient Status */}
            {step === 3 && (
              <div>
                <h3 className="text-lg text-green-500 mb-2">SECURITY LEVEL 3: Patient Status Verification</h3>
                <div className="bg-gray-800 p-4 rounded mb-4">
                  <p className="text-gray-300">Encrypted Status Report:</p>
                  <code className="block text-yellow-500 mt-2">67 82 73 84 73 67 65 76</code>
                  <div className="mt-4 space-y-2">
                    <p className="text-blue-400 italic">"When machines whisper, they speak in numbers..."</p>
                    <p className="text-gray-400">💡 Each number holds a letter's essence in ASCII</p>
                    <p className="text-gray-400">🔑 Decimal values hold the key to human text</p>
                  </div>
                </div>
                <input
                  type="text"
                  value={inputs.patientStatus}
                  onChange={handleInputChange("patientStatus")}
                  className="w-full p-2 bg-gray-800 border border-gray-700 text-white mb-2"
                  placeholder="Enter Patient Status"
                />
                <button
                  onClick={() => checkStepAnswer("patientStatus")}
                  className="bg-green-700 px-4 py-2 rounded hover:bg-green-600"
                >
                  Verify Status
                </button>
              </div>
            )}

            {/* Final Step */}
            {step === 4 && (
              <div>
                <h3 className="text-lg text-green-500 mb-2">FINAL SECURITY LEVEL: File Access Code</h3>
                <div className="bg-gray-800 p-4 rounded mb-4">
                  <p className="text-gray-300">Assemble the Master Key:</p>
                  <div className="space-y-3">
                    <p className="text-blue-400 italic">"Three fragments unite to reveal the truth..."</p>
                    <ul className="list-disc list-inside text-gray-300">
                      <li>
                        The hospital's mark: <span className="text-yellow-500">QCH</span>
                      </li>
                      <li>
                        The guardian's number: <span className="text-yellow-500">Your verified PIN</span>
                      </li>
                      <li>
                        The patient's shadow: <span className="text-yellow-500">The classified code</span>
                      </li>
                    </ul>
                    <p className="text-gray-400 mt-2">🔒 Format: [HOSPITAL]-[PIN]-[PATIENT]</p>
                  </div>
                </div>
                <input
                  type="text"
                  value={inputs.finalCode}
                  onChange={handleInputChange("finalCode")}
                  className="w-full p-2 bg-gray-800 border border-gray-700 text-white mb-2"
                  placeholder="Enter Final Access Code"
                />
                <button
                  onClick={() => checkStepAnswer("finalCode")}
                  className="bg-green-700 px-4 py-2 rounded hover:bg-green-600"
                >
                  Decrypt Files
                </button>
              </div>
            )}
          </div>

          {result && <div className={`mt-4 p-4 rounded ${isComplete ? "bg-green-800" : "bg-red-900"}`}>{result}</div>}

          {isComplete && (
            <div className="mt-6 p-4 bg-green-800 rounded">
              <h3 className="text-xl font-bold mb-2">🔓 Access Granted</h3>
              <p className="mb-4">Patient file decryption successful. Proceeding to encrypted transmissions.</p>
              <Link href="/rounds/round-2" className="inline-block bg-blue-600 px-4 py-2 rounded hover:bg-blue-700">
                Access Transmission Logs
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default EmergencyCodePuzzle

