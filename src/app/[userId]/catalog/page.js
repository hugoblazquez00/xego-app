"use client"
import { useState, useEffect } from "react"

import XegoCard from "@/app/[userId]/[xegoId]/[projectId]/xego/components/xegoCard"
import FilterSidebar from "@/app/[userId]/[xegoId]/[projectId]/xego/components/FilterSidebar"
import Navbar from "@/app/[userId]/[xegoId]/[projectId]/xego/components/navbarHome"
import { fetchAllXegos } from '@/app/utils/api';
import Link from "next/link";
import Image from "next/image";

export default function Catalog({ params }) {
  const { userId } = params

  const [xegos, setXegos] = useState([])
  const [filteredXegos, setFilteredXegos] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  // Filter states
  const [priceRange, setPriceRange] = useState([0, 100])
  const [selectedCategories, setSelectedCategories] = useState([])
  const [selectedLevels, setSelectedLevels] = useState([])
  const [selectedTechnologies, setSelectedTechnologies] = useState([])

  useEffect(() => {
    const loadXegos = async () => {
      try {
        const data = await fetchAllXegos()
        setXegos(data)
        setFilteredXegos(data)
      } catch (error) {
        console.error("Error fetching xegos:", error)
        setError(error.message)
      } finally {
        setLoading(false)
      }
    }

    loadXegos()
  }, [])

  useEffect(() => {
    // Apply filters whenever filter states change
    applyFilters()
  }, [priceRange, selectedCategories, selectedLevels, selectedTechnologies])

  const applyFilters = () => {
    let filtered = [...xegos]

    // Filter by price
    filtered = filtered.filter((xego) => xego.price >= priceRange[0] && xego.price <= priceRange[1])

    // Filter by categories
    if (selectedCategories.length > 0) {
      filtered = filtered.filter((xego) => selectedCategories.includes(xego.category))
    }

    // Filter by level
    if (selectedLevels.length > 0) {
      filtered = filtered.filter((xego) => {
        // Map difficulty to level
        const levelMap = {
          Easy: "Easy",
          Intermediate: "Medium",
          Hard: "Hard",
          Beginner: "Kids",
        }
        return selectedLevels.includes(levelMap[xego.difficulty])
      })
    }

    // Filter by technologies
    if (selectedTechnologies.length > 0) {
      filtered = filtered.filter((xego) => xego.technologies.some((tech) => selectedTechnologies.includes(tech)))
    }

    setFilteredXegos(filtered)
  }

  const handlePriceChange = (newRange) => {
    setPriceRange(newRange)
  }

  const handleCategoryChange = (category, checked) => {
    if (checked) {
      setSelectedCategories([...selectedCategories, category])
    } else {
      setSelectedCategories(selectedCategories.filter((c) => c !== category))
    }
  }

  const handleLevelChange = (level, checked) => {
    if (checked) {
      setSelectedLevels([...selectedLevels, level])
    } else {
      setSelectedLevels(selectedLevels.filter((l) => l !== level))
    }
  }

  const handleTechnologyChange = (technology, checked) => {
    if (checked) {
      setSelectedTechnologies([...selectedTechnologies, technology])
    } else {
      setSelectedTechnologies(selectedTechnologies.filter((t) => t !== technology))
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex justify-center items-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#275eff]"></div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex justify-center items-center">
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
          <strong className="font-bold">Error: </strong>
          <span className="block sm:inline">{error}</span>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 py-4 px-6">
        <div className="container mx-auto flex justify-between items-center">
          <Link href="/" className="flex items-center space-x-2">
            <Image src="/home/xego_logo_gif_blue.gif" alt="XEGO" width={150} height={150} className="object-contain" />
          </Link>
          <div className="flex space-x-4">
            <button className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center">
              <span className="sr-only">Notifications</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 text-gray-600"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
                />
              </svg>
            </button>
            <button className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center">
              <span className="sr-only">Profile</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 text-gray-600"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                />
              </svg>
            </button>
          </div>
        </div>
      </header>

      {/* Navigation */}
      <Navbar userId={userId} />

      <div className="container mx-auto px-6 pb-12">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Filter Sidebar */}
          <FilterSidebar
            priceRange={priceRange}
            onPriceChange={handlePriceChange}
            selectedCategories={selectedCategories}
            onCategoryChange={handleCategoryChange}
            selectedLevels={selectedLevels}
            onLevelChange={handleLevelChange}
            selectedTechnologies={selectedTechnologies}
            onTechnologyChange={handleTechnologyChange}
          />

          {/* Xego Grid */}
          <div className="flex-1">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredXegos.length > 0 ? (
                filteredXegos.map((xego) => <XegoCard key={xego._id} xego={xego} />)
              ) : (
                <div className="col-span-3 py-12 text-center text-gray-500">
                  No xegos found matching your filters. Try adjusting your criteria.
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
