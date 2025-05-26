"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "./ui/button"
import { Menu, X } from "lucide-react"
import { ModeToggle } from "./mode-toggle"
import Image from "next/image"

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [user, setUser] = useState(null)

  useEffect(() => {
    const storedUser = localStorage.getItem("user")
    if (storedUser) setUser(JSON.parse(storedUser))
  }, [])

  return (
    <header className="fixed top-0 z-50 w-full bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container relative flex h-16 items-center justify-between ml-16">
        {/* Logo and nav aligned left */}
        <div className="flex items-center gap-6">
          <Link href="/" className="flex items-center space-x-2">
            <Image src="/home/XEGO PNG DEF AZUL.png " alt="XEGO" width={128} height={128} className="object-contain" />
          </Link>
          <nav className="hidden md:flex gap-6 ml-12">
            <Link href="#features" className="text-sm font-medium transition-colors hover:text-[#5084ff]">
              Features
            </Link>
            <Link href="#platform" className="text-sm font-medium transition-colors hover:text-[#5084ff]">
              Platform
            </Link>
            <Link href="#testimonials" className="text-sm font-medium transition-colors hover:text-[#5084ff]">
              Testimonials
            </Link>
            <Link href="#pricing" className="text-sm font-medium transition-colors hover:text-[#5084ff]">
              Pricing
            </Link>
          </nav>
        </div>

        {/* Right side: user info or login/register */}
        <div className="hidden md:flex items-center gap-4 absolute right-0 top-0 h-16">
          <ModeToggle />
          {user ? (
            <div className="flex items-center gap-2 pr-4">
              {/* User image if exists */}
              {user.image ? (
                <Image
                  src={user.image}
                  alt={user.username}
                  width={32}
                  height={32}
                  className="rounded-full object-cover"
                />
              ) : (
                <div className="w-8 h-8 rounded-full bg-gray-300 flex items-center justify-center text-gray-600 font-bold">
                  {user.username?.[0]?.toUpperCase() || "U"}
                </div>
              )}
              <span className="font-medium">{user.username}</span>
            </div>
          ) : (
            <>
              <Button variant="outline" size="sm" asChild>
                <Link href="/login">Log in</Link>
              </Button>
              <Button size="sm" className="bg-[#275eff] hover:bg-[#1a44be] text-white" asChild>
                <Link href="/register">Get XEGO</Link>
              </Button>
            </>
          )}
        </div>

        {/* Mobile menu button */}
        <div className="md:hidden flex items-center gap-4 absolute right-4 top-0 h-16">
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
              className="text-sm font-medium transition-colors hover:text-[#5084ff]"
              onClick={() => setIsMenuOpen(false)}
            >
              Features
            </Link>
            <Link
              href="#platform"
              className="text-sm font-medium transition-colors hover:text-[#5084ff]"
              onClick={() => setIsMenuOpen(false)}
            >
              Platform
            </Link>
            <Link
              href="#testimonials"
              className="text-sm font-medium transition-colors hover:text-[#5084ff]"
              onClick={() => setIsMenuOpen(false)}
            >
              Testimonials
            </Link>
            <Link
              href="#pricing"
              className="text-sm font-medium transition-colors hover:text-[#5084ff]"
              onClick={() => setIsMenuOpen(false)}
            >
              Pricing
            </Link>
            <div className="flex flex-col space-y-2 pt-2">
              {user ? (
                <div className="flex items-center gap-2">
                  {user.image ? (
                    <Image
                      src={user.image}
                      alt={user.username}
                      width={32}
                      height={32}
                      className="rounded-full object-cover"
                    />
                  ) : (
                    <div className="w-8 h-8 rounded-full bg-gray-300 flex items-center justify-center text-gray-600 font-bold">
                      {user.username?.[0]?.toUpperCase() || "U"}
                    </div>
                  )}
                  <span className="font-medium">{user.username}</span>
                </div>
              ) : (
                <>
                  <Button variant="outline" size="sm" asChild>
                    <Link href="/login">Log in</Link>
                  </Button>
                  <Button size="sm" className="bg-[#275eff] hover:bg-[#1a44be] text-white" asChild>
                    <Link href="/register">Get XEGO</Link>
                  </Button>
                </>
              )}
            </div>
          </nav>
        </div>
      )}
    </header>
  )
}
