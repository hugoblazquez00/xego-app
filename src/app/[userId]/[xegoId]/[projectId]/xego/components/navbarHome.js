// src/components/Navbar.js
"use client"
import { useRouter, usePathname } from "next/navigation"

export default function Navbar({ userId }) {
  const router = useRouter()
  const pathname = usePathname()

  return (
    <nav className="bg-white border-b border-gray-200 py-3 px-6 mb-6">
      <div className="container mx-auto flex justify-between items-center">
        <button
          onClick={() => router.push(`/${userId}/catalog`)}
          className={`font-medium text-lg transition-colors ${pathname.includes('/catalog') ? 'text-[#275eff]' : 'text-gray-700 hover:text-[#275eff]'}`}
        >
          Catalog
        </button>
        <button
          onClick={() => router.push(`/${userId}/home`)}
          className={`font-medium text-lg transition-colors ${pathname.includes('/home') ? 'text-[#275eff]' : 'text-gray-700 hover:text-[#a5c4ff]'}`}
        >
          Home
        </button>
        <button
          onClick={() => router.push(`/${userId}/my-area`)}
          className={`font-medium text-lg transition-colors ${pathname.includes('/my-area') ? 'text-[#275eff]' : 'text-gray-700 hover:text-[#275eff]'}`}
        >
          My sets & XEGOs
        </button>
      </div>
    </nav>
  )
}