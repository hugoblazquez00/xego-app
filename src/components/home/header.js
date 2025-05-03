"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "./ui/button"
import { Menu, X } from "lucide-react"
import { ModeToggle } from "./mode-toggle"

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <header className="fixed top-0 z-50 w-full bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-6">
          <Link href="/" className="flex items-center space-x-2">
            <span className="text-2xl font-bold tracking-tight text-platinum-400">XEGO</span>
          </Link>

          <nav className="hidden md:flex gap-6">
            <Link href="#features" className="text-sm font-medium transition-colors hover:text-platinum-400">
              Features
            </Link>
            <Link href="#platform" className="text-sm font-medium transition-colors hover:text-platinum-400">
              Platform
            </Link>
            <Link href="#testimonials" className="text-sm font-medium transition-colors hover:text-platinum-400">
              Testimonials
            </Link>
            <Link href="#pricing" className="text-sm font-medium transition-colors hover:text-platinum-400">
              Pricing
            </Link>
          </nav>
        </div>

        <div className="hidden md:flex items-center gap-4">
          <ModeToggle />
          <Button variant="outline" size="sm" asChild>
            <Link href="/login">Log in</Link>
          </Button>
          <Button size="sm" className="bg-platinum-400 hover:bg-platinum-500 text-white" asChild>
            <Link href="/register">Get XEGO</Link>
          </Button>
        </div>

        <div className="md:hidden flex items-center gap-4">
          <ModeToggle />
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          >
            {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden container py-4 bg-background/95">
          <nav className="flex flex-col space-y-4">
            <Link
              href="#features"
              className="text-sm font-medium transition-colors hover:text-platinum-400"
              onClick={() => setIsMenuOpen(false)}
            >
              Features
            </Link>
            <Link
              href="#platform"
              className="text-sm font-medium transition-colors hover:text-platinum-400"
              onClick={() => setIsMenuOpen(false)}
            >
              Platform
            </Link>
            <Link
              href="#testimonials"
              className="text-sm font-medium transition-colors hover:text-platinum-400"
              onClick={() => setIsMenuOpen(false)}
            >
              Testimonials
            </Link>
            <Link
              href="#pricing"
              className="text-sm font-medium transition-colors hover:text-platinum-400"
              onClick={() => setIsMenuOpen(false)}
            >
              Pricing
            </Link>
            <div className="flex flex-col space-y-2 pt-2">
              <Button variant="outline" size="sm" asChild>
                <Link href="/login">Log in</Link>
              </Button>
              <Button size="sm" className="bg-platinum-400 hover:bg-platinum-500 text-white" asChild>
                <Link href="/register">Get XEGO</Link>
              </Button>
            </div>
          </nav>
        </div>
      )}
    </header>
  )
}
