"use client"

import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { HomeIcon, BoldComputer, EmptyComputer, OnComputer, AiHelperIcon} from '@/components/icons'
import { ScreenSelector } from './screen-selector'
import { fetchProjectDetails, fetchXegoDetails} from '@/app/utils/api';
import { AiHelperModal } from './AiHelperModal'
import Image from "next/image"
export function XegoNavbar({ currentScreen, onToggle, isSavedXego, onSave, projectId, userId, files }) {
  const router = useRouter()
  const [projectName, setProjectName] = useState('')
  const [xegoName, setXegoName] = useState('')
  const [isSaving, setIsSaving] = useState(false)
  const [isAiHelperOpen, setIsAiHelperOpen] = useState(false)

  useEffect(() => {
    const fetchProjectAndXegoInfo = async () => {
      try {
        // Fetch project info
        const projectData = await fetchProjectDetails(projectId);
        
        // Since we get an array with one object, we take the first element
        const project = projectData[0];
        setProjectName(project.name);

        const xegoData = await fetchXegoDetails(project.idxego);
        setXegoName(xegoData.title);
        
        
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
    <>
      <header className="border-b-2 border-[#2051de] p-4 bg-white  ">
        <div className="flex justify-between items-center ">
          <div className="flex items-center gap-4">
          <button 
            onClick={() => router.push(`/${userId}/home`)}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors "
          >
            <div className="relative w-10 h-10">
              <Image
                src="/home/x_logo_blue.png"
                alt="Xego logo"
                fill
                className="object-contain "
              />
            </div>
          </button>

            {/* Project and Xego names */}
            <div className="flex items-baseline gap-2">
              <h1 className="text-2xl text-[#275eff] font-bold">{projectName}</h1>
              <span className="text-lg text-[#6595ff]">/ {xegoName}</span>
            </div>
          </div>

          {/* Center - Screen Selector */}
          <div className="absolute left-1/2 transform -translate-x-1/2">
            <ScreenSelector currentScreen={currentScreen} onToggle={onToggle} />
          </div>

          {/* Right - Save Button with Status */}
          <div className="flex items-center gap-2">
            {isSaving && (
              <span className="text-sm text-[#275eff] animate-fade-in">
                Unsave...
              </span>
            )}
            <button
              onClick={handleSave}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors"
              title={isSavedXego ? "Project saved" : "Save project"}
            >
              {isSaving ? (
                <OnComputer className="w-6 h-6 text-[#275eff]" />
              ) : isSavedXego ? (
                <BoldComputer className="w-6 h-6 text-[#275eff]" />
              ) : (
                <EmptyComputer className="w-6 h-6 text-[#275eff]" />
              )}
            </button>
            <button
              onClick={() => setIsAiHelperOpen(true)}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            >
              <AiHelperIcon className="w-6 h-6 text-[#275eff]" />
            </button>
          </div>
        </div>
      </header>
      <AiHelperModal 
        isOpen={isAiHelperOpen}
        onClose={() => setIsAiHelperOpen(false)}
        projectId={projectId}
        files={files}
      />
    </>
  )
}