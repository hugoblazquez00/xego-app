"use client"

import { useState, useEffect } from "react"
import { Workspace } from "./components/workspace"
import { ViewSelector } from "./components/view-selector"
import { XegoNavbar } from "./components/XegoNavbar"
import { InstructionsCard } from "./components/instructions-card"
import { Confetti } from "@/components/magicui/confetti"
import React from "react"
import { fetchFiles, fetchProjectDetails } from '@/app/utils/api';

export default function XegoPage({ params }) {
  const [currentView, setCurrentView] = useState("website")
  const [currentScreen, setCurrentScreen] = useState("instructions")
  const [files, setFiles] = useState([]);
  const [isSavedXego, setIsSavedXego] = useState(true);
  const [codeXego, setCodeXego] = useState('');
  const [currentFileXego, setCurrentFileXego] = useState(null);
  const [currentStep, setCurrentStep] = useState(null);
  const [showConfetti, setShowConfetti] = useState(false);
  
  const projectId = params.projectId
  const userId = params.userId

  useEffect(() => {
    const loadFiles = async () => {
      try {
        const data = await fetchFiles(projectId);
        setFiles(data);
      } catch (error) {
        console.error("Error loading files:", error);
      }
    };

    const loadCurrentStep = async () => {
      try {
        const projectDetails = await fetchProjectDetails(projectId);
        if (projectDetails && projectDetails[0]) {
          setCurrentStep(projectDetails[0].currentXegoStep);
        }
      } catch (error) {
        console.error("Error loading current step:", error);
      }
    };

    loadFiles();
    loadCurrentStep();
  }, [projectId]);

  useEffect(() => {
    if (showConfetti) {
      const interval = setInterval(() => {
        setShowConfetti(false);
        setTimeout(() => setShowConfetti(true), 50);
      }, 2500);

      return () => clearInterval(interval);
    }
  }, [showConfetti]);

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

  const handleLastStep = (isLast) => {
    setShowConfetti(isLast);
  };

  return (
    <div className="h-screen flex flex-col relative">
      {showConfetti && (
        <>
          <Confetti
            className="fixed inset-0 w-full h-full pointer-events-none"
            particleCount={150}
            spread={160}
            angle={90}
            origin={{ x: 0.5, y: 0 }}
            colors={['#26ccff', '#a25afd', '#ff5e7e', '#88ff5a', '#fcff42', '#ffa62d', '#ff36ff']}
            startVelocity={45}
            gravity={0.35}
            drift={0}
            ticks={400}
            decay={0.92}
          />
          <Confetti
            className="fixed inset-0 w-full h-full pointer-events-none"
            particleCount={80}
            spread={100}
            angle={0}
            origin={{ x: 0, y: 0.5 }}
            colors={['#26ccff', '#a25afd', '#ff5e7e', '#88ff5a', '#fcff42', '#ffa62d', '#ff36ff']}
            startVelocity={45}
            gravity={0.35}
            drift={2}
            ticks={400}
            decay={0.92}
          />
          <Confetti
            className="fixed inset-0 w-full h-full pointer-events-none"
            particleCount={80}
            spread={100}
            angle={180}
            origin={{ x: 1, y: 0.5 }}
            colors={['#26ccff', '#a25afd', '#ff5e7e', '#88ff5a', '#fcff42', '#ffa62d', '#ff36ff']}
            startVelocity={45}
            gravity={0.35}
            drift={-2}
            ticks={400}
            decay={0.92}
          />
        </>
      )}
      <XegoNavbar 
        currentScreen={currentScreen}
        onToggle={toggleScreen}
        isSavedXego={isSavedXego}
        onSave={handleSave}
        projectId={projectId}
        userId={userId}
        files={files} 
      />
      <main className="flex-1 flex flex-col overflow-hidden">
        <div className="flex-1 overflow-hidden">
          <Workspace 
            className="flex-1" 
            currentScreen={currentScreen} 
            currentView={currentView} 
            projectId={projectId} 
            currentStep={currentStep}
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
      {currentScreen === "instructions" && (
        <div className="absolute bottom-6 right-6 z-50 w-[400px]">
          <InstructionsCard 
            projectId={projectId}
            onStepChange={setCurrentStep}
            onLastStep={handleLastStep}
          />
        </div>
      )}
    </div>
  )
}