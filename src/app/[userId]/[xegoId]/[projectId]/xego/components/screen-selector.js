"use client"

import React from "react"
import { ShimmerButton } from "@/components/magicui/shimmer-button"

export function ScreenSelector({ currentScreen, onToggle }) {
  const buttonText = currentScreen === "instructions" ? "Instruction Screen" : "Project Screen"

  return (
    <ShimmerButton
      onClick={onToggle}
      className="bg-white dark:bg-blue-400"
    >
      {buttonText}
    </ShimmerButton>
  )
} 