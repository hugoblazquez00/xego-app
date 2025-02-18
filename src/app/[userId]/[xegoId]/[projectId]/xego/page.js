"use client"

import { useState, useEffect } from "react"
import { Workspace } from "./components/workspace"
import { ViewSelector } from "./components/view-selector"
import { XegoNavbar } from "./components/XegoNavbar"
import React from "react"

export default function XegoPage({ params }) {
  const [currentView, setCurrentView] = useState("website")
  const [currentScreen, setCurrentScreen] = useState("instructions")
  const [files, setFiles] = useState([]);
  const [isSavedXego, setIsSavedXego] = useState(true);
  const [codeXego, setCodeXego] = useState('');
  const [currentFileXego, setCurrentFileXego] = useState(null);
  
  const projectId = React.use(params).projectId
  const userId = React.use(params).userId

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

  const saveCurrentFile = async (file, content) => {
    if (file) {
      try {
        const response = await fetch(`/api/files`, {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ fileId: file._id, newContent: content }),
        });
        if (response.ok) {
          setIsSavedXego(true);
          console.log("SAVEXP00 - FILE SAVED:", file.name);
        } else {
          console.error("ERRORX00 - ERROR SAVING FILE", error);
        }
      } catch (error) {
        console.error("ERRORX00 - ERROR SAVING FILE", error);
      }
    }
  }

  const handleSave = () => {
    console.log("SAVEXP01 - PROYECT SAVE BUTTON PRESSED.");
    saveCurrentFile(currentFileXego, codeXego);
  }

  return (
    <div className="h-screen flex flex-col">
      <XegoNavbar 
        currentScreen={currentScreen}
        onToggle={toggleScreen}
        isSavedXego={isSavedXego}
        onSave={handleSave}
        projectId={projectId}
        userId={userId}
      />
      <main className="flex-1 flex flex-col overflow-hidden">
        <div className="flex-1 overflow-hidden">
          <Workspace 
            className="flex-1" 
            currentScreen={currentScreen} 
            currentView={currentView} 
            projectId={projectId} 
            files={files} 
            setIsSavedXego={setIsSavedXego} 
            isSavedXego={isSavedXego}
            setCodeXego={setCodeXego}
            codeXego={codeXego}
            setCurrentFileXego={setCurrentFileXego}
            currentFileXego={currentFileXego}
            saveCurrentFile={saveCurrentFile}
          />
        </div>
        <ViewSelector currentView={currentView} onViewChange={setCurrentView} className="border-t p-4" />
      </main>
    </div>
  )
}