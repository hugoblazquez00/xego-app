"use client"

import { useState } from "react"
import { Button } from "./ui/button"
import { Input } from "./ui/input"
import { ArrowRight } from "lucide-react"

export default function HeroSection() {
  const [email, setEmail] = useState("")

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log("Email submitted:", email)
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

          {/* 💻 Hero mockup con vídeo dentro del portátil */}
          <div className="relative w-full max-w-5xl mx-auto">

          <div class="relative mx-auto border-gray-800 dark:border-gray-800 bg-gray-800 border-[8px] rounded-t-xl h-[172px] max-w-[301px] md:h-[294px] md:max-w-[512px]">
              <div class="rounded-lg overflow-hidden h-[156px] md:h-[278px] bg-white dark:bg-gray-800">
                  {/* <img src="https://flowbite.s3.amazonaws.com/docs/device-mockups/laptop-screen.png" class="dark:hidden h-[156px] md:h-[278px] w-full rounded-lg" alt=""></img>
                  <img src="https://flowbite.s3.amazonaws.com/docs/device-mockups/laptop-screen-dark.png" class="hidden dark:block h-[156px] md:h-[278px] w-full rounded-lg" alt=""></img> */}
                  <video
                autoPlay
                loop
                muted
                playsInline
                className="w-full h-full object-cover"
                src="https://www.w3schools.com/html/mov_bbb.mp4" // 🔁 cámbialo por tu vídeo real
              />
              </div>
          </div>
          <div class="relative mx-auto bg-gray-900 dark:bg-gray-700 rounded-b-xl rounded-t-sm h-[17px] max-w-[351px] md:h-[21px] md:max-w-[597px]">
              <div class="absolute left-1/2 top-0 -translate-x-1/2 rounded-b-xl w-[56px] h-[5px] md:w-[96px] md:h-[8px] bg-gray-800"></div>
          </div>

            
          </div>
        </div>
      </div>
    </section>
  )
}