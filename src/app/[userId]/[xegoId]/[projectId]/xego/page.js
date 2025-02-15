"use client"

import { useState, useEffect } from "react"
import { Workspace } from "./components/workspace"
import { ViewSelector } from "./components/view-selector"
import { ScreenSelector } from "./components/screen-selector"
import React from "react"

export default function XegoPage({ params }) {
  const [currentView, setCurrentView] = useState("website")
  const [currentScreen, setCurrentScreen] = useState("instructions")
  const [files, setFiles] = useState([]);
  
  const projectId = React.use(params).projectId

  useEffect(() => {
    const fetchFiles = async () => {
      const response = await fetch(`/api/files?projectID=${projectId}`);
      const data = await response.json();
      setFiles(data);
    };

    fetchFiles();
  }, [projectId]);

  const toggleScreen = () => {
    setCurrentScreen(prevScreen => prevScreen === "instructions" ? "project" : "instructions")
  }

  return (
    <div className="h-screen flex flex-col">
      <header className="border-b p-4">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold">Full-Stack Website Set </h1>
          <div className="flex gap-2">
            <ScreenSelector currentScreen={currentScreen} onToggle={toggleScreen} />
          </div>
        </div>
      </header>
      <main className="flex-1 flex flex-col overflow-hidden">
        <div className="flex-1 overflow-hidden">
          <Workspace className="flex-1" currentScreen={currentScreen} currentView={currentView} projectId={projectId} files={files} />
        </div>
        <ViewSelector currentView={currentView} onViewChange={setCurrentView} className="border-t p-4" />
      </main>
    </div>
  )
}