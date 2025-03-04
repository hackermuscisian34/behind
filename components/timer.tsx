"use client"

import { useState, useEffect } from "react"
import { Clock } from "lucide-react"

interface TimerProps {
  onTimeExpire: () => void
  isStarted: boolean
  totalSeconds?: number
}

export default function Timer({ onTimeExpire, isStarted, totalSeconds = 16 }: TimerProps) {
  const [timeLeft, setTimeLeft] = useState(totalSeconds)
  const [isRunning, setIsRunning] = useState(false)

  useEffect(() => {
    if (isStarted && !isRunning) {
      setIsRunning(true)
    }
  }, [isStarted, isRunning])

  useEffect(() => {
    let interval: NodeJS.Timeout

    if (isRunning && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((prevTime) => {
          if (prevTime <= 1) {
            clearInterval(interval)
            onTimeExpire()
            return 0
          }
          return prevTime - 1
        })
      }, 1000)
    }

    return () => {
      if (interval) clearInterval(interval)
    }
  }, [isRunning, timeLeft, onTimeExpire])

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60)
    const secs = seconds % 60

    return `${minutes.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`
  }

  const getColorClass = () => {
    const percentage = timeLeft / totalSeconds
    if (percentage > 0.5) return "text-green-500"
    if (percentage > 0.25) return "text-yellow-500"
    return "text-red-500"
  }

  return (
    <div className="flex items-center gap-2 font-mono text-lg">
      <Clock className={`h-5 w-5 ${getColorClass()}`} />
      <span className={`${getColorClass()} font-bold`}>{formatTime(timeLeft)}</span>
    </div>
  )
}