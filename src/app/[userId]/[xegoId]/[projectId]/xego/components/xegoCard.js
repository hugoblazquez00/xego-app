"use client"

import { useRouter } from "next/navigation"

const getTechColor = (tech) => {
  const colors = {
    ReactJS: "bg-blue-100 text-blue-600",
    Angular: "bg-red-100 text-red-600",
    Vue: "bg-green-100 text-green-600",
    NodeJS: "bg-green-100 text-green-600",
    Springboot: "bg-green-100 text-green-600",
    Django: "bg-purple-100 text-purple-600",
    Flask: "bg-gray-100 text-gray-600",
    SQLite: "bg-blue-100 text-blue-600",
    MongoDB: "bg-green-100 text-green-600",
  }
  return colors[tech] || "bg-gray-100 text-gray-600"
}

export default function XegoCard({ xego }) {
  const router = useRouter()

  const handleStartProject = () => {
    // This would typically open the new project modal
    // For now, we'll just log to console
    console.log("Starting new project with xego:", xego._id)
  }

  return (
    <div className="bg-white rounded-lg border border-gray-200 overflow-hidden hover:shadow-md transition-shadow">
      {/* Card Image */}
      <div className="w-full h-40 bg-gray-100 flex items-center justify-center">
        {xego.imageUrl ? (
          <img src={xego.imageUrl || "/placeholder.svg"} alt={xego.name} className="w-full h-full object-cover" />
        ) : (
          <div className="text-gray-400">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-16 w-16"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
              />
            </svg>
          </div>
        )}
      </div>

      {/* Card Content */}
      <div className="p-6">
        <h3 className="text-lg font-bold text-gray-900 mb-2">{xego.name}</h3>
        <p className="text-gray-600 text-sm mb-4 line-clamp-3">{xego.description}</p>

        {/* Technologies */}
        <div className="flex flex-wrap gap-1 mb-4">
          {xego.technologies.map((tech, index) => (
            <span key={index} className={`px-2 py-1 rounded-full text-xs font-medium ${getTechColor(tech)}`}>
              {tech}
            </span>
          ))}
        </div>

        {/* Price and Difficulty */}
        <div className="flex justify-between items-center mb-4">
          <span className="text-sm font-medium text-gray-900">{xego.price === 0 ? "Free" : `${xego.price}€`}</span>
          <span
            className={`px-2 py-1 rounded-full text-xs font-medium ${
              xego.difficulty === "Easy"
                ? "bg-green-100 text-green-600"
                : xego.difficulty === "Intermediate"
                  ? "bg-yellow-100 text-yellow-600"
                  : "bg-red-100 text-red-600"
            }`}
          >
            {xego.difficulty}
          </span>
        </div>

        {/* Action Button */}
        <button
          onClick={handleStartProject}
          className="w-full py-2 bg-[#275eff] text-white rounded-md hover:bg-[#1e4cd1] transition-colors"
        >
          Start Project
        </button>
      </div>
    </div>
  )
}
