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
        <div className="bg-gradient-to-r from-white-400 to-white-600 text-black rounded-lg p-8 md:p-12 lg:p-16 text-center">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4 text-black">
              Start your coding journey today
            </h2>
            <p className="text-xl mb-8 text-black">
              Join thousands of beginners already building real projects with XEGO.
            </p>
            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row max-w-md mx-auto gap-2 mb-4">
              <Input
                type="email"
                placeholder="Enter your email"
                className="h-12 bg-black text-platinum-700 placeholder:text-platinum-400 border-none"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <Button type="submit" className="h-12 bg-platinum-700 text-black hover:bg-platinum-800">
                Get Started
              </Button>
            </form>
            <p className="text-sm text-black">
              Already have an account?{" "}
              <Link href="/login" className="underline underline-offset-2 hover:text-black">
                Log in
              </Link>
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
