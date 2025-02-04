"use client"

import { useState } from "react"
import { Workspace } from "./components/workspace"
import { ViewSelector } from "./components/view-selector"
import { ScreenSelector } from "./components/screen-selector"

export default function XegoPage({ params }) {
  const [currentView, setCurrentView] = useState("website")
  const [currentScreen, setCurrentScreen] = useState("instructions")

  const toggleScreen = () => {
    setCurrentScreen(prevScreen => prevScreen === "instructions" ? "project" : "instructions")
  }

  return (
    <div className="h-screen flex flex-col">
      <header className="border-b p-4">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold">Full-Stack Website Set A</h1>
          <div className="flex gap-2">
            <ScreenSelector currentScreen={currentScreen} onToggle={toggleScreen} />
          </div>
        </div>
      </header>
      <main className="flex-1 flex flex-col overflow-hidden">
        {/* <FileTree className="w-64 border-r p-4" /> */}
        <Workspace className="flex-1" currentScreen={currentScreen} currentView={currentView} />
        <ViewSelector currentView={currentView} onViewChange={setCurrentView} className="mt-auto" />
        {/* <InstructionsCard className="w-80 border-l p-4" /> */}
      </main>
    </div>
  )
}