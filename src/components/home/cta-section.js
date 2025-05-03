"use client"

import { useState } from "react"
import { Button } from "./ui/button"
import { Input } from "./ui/input"
import Link from "next/link"

export default function CtaSection() {
  const [email, setEmail] = useState("")

  const handleSubmit = (e) => {
    e.preventDefault()
    // Handle form submission
    console.log("Email submitted:", email)
    // Reset form
    setEmail("")
  }

  return (
    <section className="py-20 bg-background">
      <div className="container">
        <div className="bg-gradient-to-r from-[#a5c4ff] to-[#5084ff] text-[#0e2b80] rounded-lg p-8 md:p-12 lg:p-16 text-center">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4 text-white">
              Start your coding journey today
            </h2>
            <p className="text-xl mb-8 text-white">
              Join thousands of beginners already building real projects with XEGO.
            </p>
            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row max-w-md mx-auto gap-2 mb-4">
              <Input
                type="email"
                placeholder="Enter your email"
                className="h-12 bg-white text-[#0e2b80] placeholder:text-[#5084ff] border-none"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <Button type="submit" className="h-12 bg-[#275eff] text-white hover:bg-[#1a44be]">
                Get Started
              </Button>
            </form>
            <p className="text-sm text-[#0e2b80]">
              Already have an account?{" "}
              <Link href="/login" className="underline underline-offset-2 hover:text-[#0e2b80]">
                Log in
              </Link>
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
