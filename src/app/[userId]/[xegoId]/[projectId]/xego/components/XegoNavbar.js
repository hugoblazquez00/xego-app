"use client"

import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { BoldComputer, EmptyComputer, OnComputer } from '@/components/icons'
import { ScreenSelector } from './screen-selector'
import { fetchProjectDetails} from '../../../../../utils/api';

export function XegoNavbar({ currentScreen, onToggle, isSavedXego, onSave, projectId, userId }) {
  const router = useRouter()
  const [projectName, setProjectName] = useState('')
  const [xegoName, setXegoName] = useState('')
  const [isSaving, setIsSaving] = useState(false)

  useEffect(() => {
    const fetchProjectAndXegoInfo = async () => {
      try {
        // Fetch project info
        const projectData = await fetchProjectDetails(projectId);
        
        //const projectData = await projectResponse.json();
        // Since we get an array with one object, we take the first element
        const project = projectData[0];
        setProjectName(project.name);

        // Fetch xego info using the xego ID from the project
        const xegoResponse = await fetch(`/api/xegos?xegoID=${project.idxego}`)
        if (xegoResponse.ok) {
          const xegoData = await xegoResponse.json()
          setXegoName(xegoData.title)
        }
        
      } catch (error) {
        console.error('Error fetching project/xego info:', error)
      }
    }

    fetchProjectAndXegoInfo()
  }, [projectId])

  const handleSave = async () => {
    setIsSaving(true)
    await onSave()
    // Add a small delay to show the saving state
    setTimeout(() => {
      setIsSaving(false)
    }, 500)
  }

  // Effect to handle the saving state when auto-saving occurs
  useEffect(() => {
    if (!isSavedXego) {
      setIsSaving(true)
    } else {
      // Add a small delay to show the saving state
      setTimeout(() => {
        setIsSaving(false)
      }, 500)
    }
  }, [isSavedXego])

  return (
    <header className="border-b p-4">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-4">
          {/* Logo/Home button */}
          <button 
            onClick={() => router.push(`/${userId}/home`)}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="w-6 h-6"
            >
              <path d="M11.47 3.84a.75.75 0 011.06 0l8.69 8.69a.75.75 0 101.06-1.06l-8.689-8.69a2.25 2.25 0 00-3.182 0l-8.69 8.69a.75.75 0 001.061 1.06l8.69-8.69z" />
              <path d="M12 5.432l8.159 8.159c.03.03.06.058.091.086v6.198c0 1.035-.84 1.875-1.875 1.875H15a.75.75 0 01-.75-.75v-4.5a.75.75 0 00-.75-.75h-3a.75.75 0 00-.75.75V21a.75.75 0 01-.75.75H5.625a1.875 1.875 0 01-1.875-1.875v-6.198a2.29 2.29 0 00.091-.086L12 5.43z" />
            </svg>
          </button>

          {/* Project and Xego names */}
          <div className="flex items-baseline gap-2">
            <h1 className="text-2xl font-bold">{projectName}</h1>
            <span className="text-lg text-gray-600">/ {xegoName}</span>
          </div>
        </div>

        {/* Center - Screen Selector */}
        <div className="absolute left-1/2 transform -translate-x-1/2">
          <ScreenSelector currentScreen={currentScreen} onToggle={onToggle} />
        </div>

        {/* Right - Save Button with Status */}
        <div className="flex items-center gap-2">
          {isSaving && (
            <span className="text-sm text-gray-500 animate-fade-in">
              Unsave...
            </span>
          )}
          <button
            onClick={handleSave}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            title={isSavedXego ? "Proyecto guardado" : "Guardar proyecto"}
          >
            {isSaving ? (
              <OnComputer className="w-6 h-6" />
            ) : isSavedXego ? (
              <BoldComputer className="w-6 h-6" />
            ) : (
              <EmptyComputer className="w-6 h-6" />
            )}
          </button>
        </div>
      </div>
    </header>
  )
} 