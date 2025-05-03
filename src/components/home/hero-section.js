"use client"

import { useState } from "react"
import Image from "next/image"
import { Button } from "./ui/button"
import { Input } from "./ui/input"
import { ArrowRight } from "lucide-react"

export default function HeroSection() {
  const [email, setEmail] = useState("")

  const handleSubmit = (e) => {
    e.preventDefault()
    // Handle form submission
    console.log("Email submitted:", email)
    // Reset form
    setEmail("")
  }

  return (
    <section className="relative pt-32 pb-20 md:pt-40 md:pb-32 overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-platinum-100 via-platinum-50/70 to-background dark:from-platinum-900/20 dark:via-platinum-800/10 dark:to-background pointer-events-none" />

      <div className="container relative z-10">
        <div className="flex flex-col items-center text-center max-w-4xl mx-auto">
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-platinum-400/10 text-platinum-600 mb-8">
            <span className="text-sm font-medium">Introducing XEGO</span>
            <ArrowRight className="ml-2 h-4 w-4" />
          </div>

          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-6">
            Your guided journey to <span className="text-platinum-500">coding mastery</span>
          </h1>

          <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl mb-10">
            XEGO is a step-by-step platform that helps non-programmers build real projects through guided tutorials.
          </p>

          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row w-full max-w-md gap-2 mb-8">
            <Input
              type="email"
              placeholder="Enter your email"
              className="h-12"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <Button type="submit" className="h-12 bg-platinum-500 text-white hover:bg-platinum-600">
              Get Started
            </Button>
          </form>

          <p className="text-sm text-muted-foreground mb-16">Free to get started. No credit card required.</p>

          <div className="relative w-full max-w-5xl h-[400px] md:h-[500px] lg:h-[600px] rounded-lg overflow-hidden shadow-2xl">
            <Image
              src="/home/xego04.png"
              alt="XEGO platform interface showing code editor and preview"
              fill
              className="object-cover"

                sizes="(max-width: 1500px) 100vw, 1500px"
              priority
            />
            
          </div>
        </div>
      </div>
    </section>
  )
}
