import React from "react"

export function ScreenSelector({ currentScreen, onToggle }) {
  const buttonText = currentScreen === "instructions" ? "Project Screen" : "Instruction Screen"

  return (
    <button
      onClick={onToggle}
      className="px-4 py-2 rounded-lg bg-secondary hover:bg-secondary-dark"
    >
      {buttonText}
    </button>
  )
} 