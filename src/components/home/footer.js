import Link from "next/link"
import { Facebook, Twitter, Instagram, Linkedin, Github } from "lucide-react"

export default function Footer() {
  return (
    <footer className="border-t py-12 md:py-16 bg-background w-full">
      <div className="container ml-24">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 md:gap-12">
          <div className="md:col-span-1">
            <Link href="/" className="text-2xl font-bold tracking-tight mb-4 inline-block text-[#275eff]">
              XEGO
            </Link>
            <p className="dark:text-white mt-2 mb-4">Learn to code through guided tutorials.</p>
            <div className="flex space-x-4">
              <Link href="#" aria-label="Facebook">
                <Facebook className="h-5 w-5 text-[#14379e] hover:text-[#5084ff] transition-colors" />
              </Link>
              <Link href="#" aria-label="Twitter">
                <Twitter className="h-5 w-5 text-[#14379e] hover:text-[#5084ff] transition-colors" />
              </Link>
              <Link href="#" aria-label="Instagram">
                <Instagram className="h-5 w-5 text-[#14379e] hover:text-[#5084ff] transition-colors" />
              </Link>
              <Link href="#" aria-label="LinkedIn">
                <Linkedin className="h-5 w-5 text-[#14379e] hover:text-[#5084ff] transition-colors" />
              </Link>
              <Link href="#" aria-label="GitHub">
                <Github className="h-5 w-5 text-[#14379e] hover:text-[#5084ff] transition-colors" />
              </Link>
            </div>
          </div>

          <div>
            <h3 className="font-semibold mb-3 text-[#5084ff]">Platform</h3>
            <ul className="space-y-2">
              <li>
                <Link href="#" className="dark:text-white hover:text-[#d2e2ff] transition-colors">
                  Features
                </Link>
              </li>
              <li>
                <Link href="#" className="dark:text-white hover:text-[#d2e2ff] transition-colors">
                  Xego Catalog
                </Link>
              </li>
              <li>
                <Link href="#" className="dark:text-white hover:text-[#d2e2ff] transition-colors">
                  AI Assistance
                </Link>
              </li>
              <li>
                <Link href="#" className="dark:text-white hover:text-[#d2e2ff] transition-colors">
                  For Educators
                </Link>
              </li>
              <li>
                <Link href="#" className="dark:text-white hover:text-[#d2e2ff] transition-colors">
                  Documentation
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-3 text-[#5084ff]">Company</h3>
            <ul className="space-y-2">
              <li>
                <Link href="#" className="dark:text-white hover:text-[#d2e2ff] transition-colors">
                  About
                </Link>
              </li>
              <li>
                <Link href="#" className="dark:text-white hover:text-[#d2e2ff] transition-colors">
                  Blog
                </Link>
              </li>
              <li>
                <Link href="#" className="dark:text-white hover:text-[#d2e2ff] transition-colors">
                  Careers
                </Link>
              </li>
              <li>
                <Link href="#" className="dark:text-white hover:text-[#d2e2ff] transition-colors">
                  Press
                </Link>
              </li>
              <li>
                <Link href="#" className="dark:text-white hover:text-[#d2e2ff] transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-3 text-[#5084ff]">Legal</h3>
            <ul className="space-y-2">
              <li>
                <Link href="#" className="dark:text-white hover:text-[#d2e2ff] transition-colors">
                  Terms
                </Link>
              </li>
              <li>
                <Link href="#" className="dark:text-white hover:text-[#d2e2ff] transition-colors">
                  Privacy
                </Link>
              </li>
              <li>
                <Link href="#" className="dark:text-white hover:text-[#d2e2ff] transition-colors">
                  Cookies
                </Link>
              </li>
              <li>
                <Link href="#" className="dark:text-white hover:text-[#d2e2ff] transition-colors">
                  Licenses
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t text-center text-sm dark:text-white border-white/30">
          <p>&copy; {new Date().getFullYear()} XEGO. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
