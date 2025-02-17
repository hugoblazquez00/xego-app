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
  const [isSavedXego, setIsSavedXego] = useState(true);
  const [codeXego, setCodeXego] = useState('');
  const [currentFile, setCurrentFile] = useState(null);
  
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

  const saveCurrentFile = async (file, content) => {
    if (file) {

      console.log("SAVEXP00 - FILE SAVED:", currentFile.name);
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
          console.log("Archivo guardado:", file.name);
        } else {
          console.error("Error al guardar el archivo");
        }
      } catch (error) {
        console.error("Error al guardar el archivo:", error);
      }
    }
  }

  const handleSave = () => {
    console.log("SAVEXP01 - PROYECT SAVE BUTTON PRESSED.");
    saveCurrentFile(currentFile, codeXego);
  }

  return (
    <div className="h-screen flex flex-col">
      <header className="border-b p-4">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold">Full-Stack Website Set </h1>
          <div className="flex gap-2">
            <ScreenSelector currentScreen={currentScreen} onToggle={toggleScreen} />
            <button onClick={handleSave} className="px-4 py-2 bg-blue-500 text-white rounded">
              {isSavedXego ? "Proyecto guardado" : "Guardar proyecto"}
            </button>
          </div>
        </div>
      </header>
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
            setCurrentFile={setCurrentFile}
            saveCurrentFile={saveCurrentFile}
          />
        </div>
        <ViewSelector currentView={currentView} onViewChange={setCurrentView} className="border-t p-4" />
      </main>
    </div>
  )
}