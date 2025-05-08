"use client"
import { useState } from "react"
import { Slider } from "./slider"

const categories = [
  { id: "web-dev", label: "Web development" },
  { id: "business-app", label: "Business App" },
  { id: "data-science", label: "Data science" },
  { id: "ai", label: "Artificial Intelligence" },
]

const levels = [
  { id: "kids", label: "Kids" },
  { id: "easy", label: "Easy" },
  { id: "medium", label: "Medium" },
  { id: "hard", label: "Hard" },
]

const technologies = [
  { id: "react", label: "ReactJS" },
  { id: "angular", label: "Angular" },
  { id: "vue", label: "Vue" },
  { id: "node", label: "NodeJS" },
  { id: "spring", label: "Springboot" },
  { id: "django", label: "Django" },
  { id: "flask", label: "Flask" },
  { id: "sql", label: "SQLite" },
  { id: "mongo", label: "MongoDB" },
]

export default function FilterSidebar({
  priceRange,
  onPriceChange,
  selectedCategories,
  onCategoryChange,
  selectedLevels,
  onLevelChange,
  selectedTechnologies,
  onTechnologyChange,
}) {
  const [expandedSections, setExpandedSections] = useState({
    technologies: false,
  })

  const toggleSection = (section) => {
    setExpandedSections({
      ...expandedSections,
      [section]: !expandedSections[section],
    })
  }

  const handleSliderChange = (value) => {
    onPriceChange(value)
  }

  return (
    <aside className="w-full md:w-64 bg-white rounded-lg border border-gray-200 p-6 h-fit sticky top-6">
      <h2 className="text-xl font-bold text-gray-900 mb-6">Filter</h2>

      {/* Price Range */}
      <div className="mb-6">
        <h3 className="font-medium text-gray-900 mb-4">Price</h3>
        <div className="px-2">
          <Slider
            defaultValue={priceRange}
            min={0}
            max={100}
            step={1}
            value={priceRange}
            onValueChange={handleSliderChange}
            className="mb-2"
          />
          <div className="flex justify-between text-sm text-gray-500">
            <span>{priceRange[0]}€</span>
            <span>{priceRange[1]}€</span>
          </div>
        </div>
      </div>

      <div className="h-px bg-gray-200 my-4" />

      {/* Categories */}
      <div className="mb-6">
        <h3 className="font-medium text-gray-900 mb-4">Categories</h3>
        <div className="space-y-2">
          {categories.map((category) => (
            <label key={category.id} className="flex items-center">
              <input
                type="checkbox"
                className="rounded border-gray-300 text-[#275eff] focus:ring-[#275eff] h-4 w-4"
                checked={selectedCategories.includes(category.label)}
                onChange={(e) => onCategoryChange(category.label, e.target.checked)}
              />
              <span className="ml-2 text-gray-700">{category.label}</span>
            </label>
          ))}
        </div>
      </div>

      <div className="h-px bg-gray-200 my-4" />

      {/* Level */}
      <div className="mb-6">
        <h3 className="font-medium text-gray-900 mb-4">Level</h3>
        <div className="space-y-2">
          {levels.map((level) => (
            <label key={level.id} className="flex items-center">
              <input
                type="checkbox"
                className="rounded border-gray-300 text-[#275eff] focus:ring-[#275eff] h-4 w-4"
                checked={selectedLevels.includes(level.label)}
                onChange={(e) => onLevelChange(level.label, e.target.checked)}
              />
              <span className="ml-2 text-gray-700">{level.label}</span>
            </label>
          ))}
        </div>
      </div>

      <div className="h-px bg-gray-200 my-4" />

      {/* Technologies */}
      <div>
        <div className="flex justify-between items-center mb-4">
          <h3 className="font-medium text-gray-900">Technologies</h3>
          <button onClick={() => toggleSection("technologies")} className="text-gray-500 hover:text-[#275eff]">
            {expandedSections.technologies ? "Show less" : "Show more"}
          </button>
        </div>
        <div className="space-y-2">
          {technologies.slice(0, expandedSections.technologies ? technologies.length : 5).map((tech) => (
            <label key={tech.id} className="flex items-center">
              <input
                type="checkbox"
                className="rounded border-gray-300 text-[#275eff] focus:ring-[#275eff] h-4 w-4"
                checked={selectedTechnologies.includes(tech.label)}
                onChange={(e) => onTechnologyChange(tech.label, e.target.checked)}
              />
              <span className="ml-2 text-gray-700">{tech.label}</span>
            </label>
          ))}
        </div>
      </div>
    </aside>
  )
}
