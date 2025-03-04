"use client"

import { useEffect, useRef } from "react"

export default function MatrixRainBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Set canvas dimensions
    const resizeCanvas = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    resizeCanvas()
    window.addEventListener("resize", resizeCanvas)

    // Matrix rain characters
    const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789$+-*/=%\"'#&_(),.;:?!\\|{}<>[]^~"
    const fontSize = 14
    const columns = Math.floor(canvas.width / fontSize)

    // Array to track the y position of each column
    const drops: number[] = []
    for (let i = 0; i < columns; i++) {
      drops[i] = Math.floor(Math.random() * -100) // Start above the canvas
    }

    // Drawing the characters
    const draw = () => {
      // Add semi-transparent black rectangle on top of previous frame
      ctx.fillStyle = "rgba(0, 0, 0, 0.05)"
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      // Set text color and font
      ctx.fillStyle = "#0f0" // Green text
      ctx.font = `${fontSize}px monospace`

      // Loop over each column
      for (let i = 0; i < drops.length; i++) {
        // Generate a random character
        const text = characters.charAt(Math.floor(Math.random() * characters.length))

        // Calculate x position
        const x = i * fontSize

        // Calculate y position
        const y = drops[i] * fontSize

        // Add glow effect to some characters
        if (Math.random() > 0.975) {
          ctx.fillStyle = "#fff" // White text for glow effect
          ctx.shadowColor = "#0f0"
          ctx.shadowBlur = 10
        } else {
          ctx.fillStyle = "#0f0" // Regular green text
          ctx.shadowBlur = 0
        }

        // Draw the character
        ctx.fillText(text, x, y)

        // Reset if the drop is at the bottom or randomly
        if (y > canvas.height && Math.random() > 0.975) {
          drops[i] = 0
        }

        // Move the drop down
        drops[i]++
      }
    }

    // Animation loop
    const interval = setInterval(draw, 50)

    return () => {
      clearInterval(interval)
      window.removeEventListener("resize", resizeCanvas)
    }
  }, [])

  return <canvas ref={canvasRef} className="fixed top-0 left-0 w-full h-full z-0 opacity-30" />
}

