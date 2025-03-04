"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Shield, Terminal, Clock, Brain, Fingerprint, Eye, Zap, Lock } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import Timer from "@/components/timer"
import MatrixRainBackground from "@/components/matrix-rain-background"

export default function Home() {
  const [showIntro, setShowIntro] = useState(true)
  const [timerStarted, setTimerStarted] = useState(false)
  const router = useRouter()

  const challenges = [
    {
      id: 1,
      title: "Medical Records Breach",
      description: "Infiltrate the hospital database to extract patient 231's classified records.",
      icon: <Shield className="h-8 w-8 text-red-500" />,
      difficulty: "Easy",
      hint: "Emergency codes hide in plain sight. Look for patterns in the numbers.",
      path: "/rounds/round-1",
    },
    // ...other challenges...
  ]

  const handleStartChallenge = () => {
    setShowIntro(false)
    setTimerStarted(true)
    router.push(challenges[0].path)
  }

  const handleTimeExpire = () => {
    // Handle time expiration
    console.log("Time expired!")
  }

  return (
    <main className="min-h-screen bg-black text-white relative overflow-hidden">
      <MatrixRainBackground />

      <div className="relative z-10">
        {showIntro ? (
          <div className="flex flex-col items-center justify-center min-h-screen p-4 text-center">
            <div className="glitch-container mb-6">
              <h1 className="text-5xl md:text-7xl font-bold glitch-text">BEHIND THE CRIME</h1>
            </div>
            <p className="max-w-2xl mb-8 text-green-400 text-lg md:text-xl">
              A classified patient has gone missing from Quick Cure Hospital's high-security wing. As a forensic
              cybersecurity specialist, you've been secretly hired to uncover the truth. You have 2 hours to infiltrate
              their systems before your intrusion is detected
            </p>
            <div className="typing-text mb-12 h-12">
              <p className="text-xl">System vulnerability detected. Exploiting now...</p>
            </div>
            <Button
              onClick={handleStartChallenge}
              className="bg-green-600 hover:bg-green-700 text-white px-8 py-6 text-xl rounded-md border border-green-500 shadow-[0_0_15px_rgba(0,255,0,0.5)] hover:shadow-[0_0_20px_rgba(0,255,0,0.7)] transition-all"
            >
              INITIATE BREACH
            </Button>
          </div>
        ) : (
          <div className="container mx-auto p-4 pt-16">
            <div className="sticky top-0 z-20 bg-black bg-opacity-90 p-4 border-b border-green-500 mb-8">
              <div className="flex justify-between items-center">
                <h1 className="text-3xl font-bold text-green-500">BEHIND THE CRIME: MISSION CONTROL</h1>
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2">
                    <Clock className="h-5 w-5 text-red-500" />
                    <Timer onTimeExpire={handleTimeExpire} isStarted={timerStarted} totalSeconds={1680} />
                  </div>
                </div>
              </div>
            </div>

            <div className="mb-8 bg-gray-900 border border-green-500 p-6 rounded-lg shadow-[0_0_10px_rgba(0,255,0,0.3)]">
              <h2 className="text-2xl font-bold mb-4 text-green-400">MISSION BRIEFING</h2>
              <p className="mb-4">
                You've successfully breached the perimeter of a high-security medical research facility. Intelligence
                suggests they're conducting classified experiments under "Project 231". Your mission is to navigate
                through 7 increasingly difficult security systems, extract the data, and escape undetected.
              </p>
              <p className="text-yellow-400">
                WARNING: You have exactly 2 hours before the system detects the intrusion and locks you out permanently.
                Each challenge has limited attempts before triggering local security protocols.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {challenges.map((challenge) => (
                <Card
                  key={challenge.id}
                  className="bg-gray-900 border-green-500 hover:shadow-[0_0_15px_rgba(0,255,0,0.4)] transition-all duration-300"
                >
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <CardTitle className="text-xl text-white">{challenge.title}</CardTitle>
                      <Badge
                        variant="outline"
                        className={
                          challenge.difficulty === "Easy"
                            ? "bg-green-900 text-green-400"
                            : challenge.difficulty === "Medium"
                              ? "bg-yellow-900 text-yellow-400"
                              : "bg-red-900 text-red-400"
                        }
                      >
                        {challenge.difficulty}
                      </Badge>
                    </div>
                    <CardDescription className="text-gray-400">Challenge {challenge.id} of 7</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center gap-4 mb-4">
                      <div className="bg-gray-800 p-3 rounded-full">{challenge.icon}</div>
                      <p className="text-sm text-gray-300">{challenge.description}</p>
                    </div>
                    <div className="bg-black bg-opacity-50 p-3 rounded border border-dashed border-green-700">
                      <p className="text-xs text-green-400 font-mono">HINT: {challenge.hint}</p>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Link href={challenge.path} className="w-full">
                      <Button className="w-full bg-gray-800 hover:bg-green-900 border border-green-700">
                        Access Challenge
                      </Button>
                    </Link>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </div>
        )}
      </div>

      <style jsx global>{`
        .glitch-container {
          position: relative;
        }
        
        .glitch-text {
          position: relative;
          color: white;
          text-shadow: 0 0 10px rgba(0, 255, 0, 0.8);
        }
        
        .glitch-text::before,
        .glitch-text::after {
          content: "BEHIND THE CRIME";
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
        }
        
        .glitch-text::before {
          color: #0ff;
          z-index: -1;
          animation: glitch 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94) both infinite;
          animation-delay: 0.1s;
        }
        
        .glitch-text::after {
          color: #f0f;
          z-index: -2;
          animation: glitch 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94) reverse both infinite;
          animation-delay: 0.2s;
        }
        
        @keyframes glitch {
          0% {
            transform: translate(0);
          }
          20% {
            transform: translate(-3px, 3px);
          }
          40% {
            transform: translate(-3px, -3px);
          }
          60% {
            transform: translate(3px, 3px);
          }
          80% {
            transform: translate(3px, -3px);
          }
          100% {
            transform: translate(0);
          }
        }
        
        .typing-text p {
          overflow: hidden;
          border-right: 2px solid #4ade80;
          white-space: nowrap;
          margin: 0 auto;
          animation: 
            typing 3.5s steps(40, end),
            blink-caret 0.75s step-end infinite;
        }
        
        @keyframes typing {
          from { width: 0 }
          to { width: 100% }
        }
        
        @keyframes blink-caret {
          from, to { border-color: transparent }
          50% { border-color: #4ade80 }
        }
      `}</style>
    </main>
  )
}