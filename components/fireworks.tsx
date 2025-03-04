"use client"

import { useEffect, useRef } from "react"

export const Fireworks = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    let particlesArray: Particle[] = []
    const numberOfParticles = 200

    canvas.width = window.innerWidth
    canvas.height = window.innerHeight

    class Particle {
      x: number
      y: number
      size: number
      speedX: number
      speedY: number
      color: string
      constructor() {
        this.x = Math.random() * canvas.width
        this.y = canvas.height
        this.size = Math.random() * 5 + 1
        this.speedX = Math.random() * 3 - 1.5
        this.speedY = Math.random() * -5 - 1
        this.color = `hsl(${Math.random() * 360}, 100%, 50%)`
      }
      update() {
        this.x += this.speedX
        this.y += this.speedY
        if (this.size > 0.2) this.size -= 0.1
      }
      draw() {
        ctx.fillStyle = this.color
        ctx.beginPath()
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2)
        ctx.closePath()
        ctx.fill()
      }
    }

    function init() {
      particlesArray = []
      for (let i = 0; i < numberOfParticles; i++) {
        particlesArray.push(new Particle())
      }
    }

    function animate() {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      particlesArray.forEach((particle, index) => {
        particle.update()
        particle.draw()
        if (particle.size <= 0.2) {
          particlesArray.splice(index, 1)
          particlesArray.push(new Particle())
        }
      })
      requestAnimationFrame(animate)
    }

    init()
    animate()

    window.addEventListener("resize", () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
      init()
    })
  }, [])

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        pointerEvents: "none",
        zIndex: 100,
      }}
    />
  )
}

