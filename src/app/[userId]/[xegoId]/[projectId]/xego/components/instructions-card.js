"use client";

import { useEffect, useState } from "react";
import { PreviousInstructions, NextInstructions } from "@/components/icons";
import { Confetti } from "@/components/magicui/confetti";
import { fetchProjectDetails, fetchInstructionByStep, updateProjectStep } from '../../../../../utils/api';

export function InstructionsCard({ projectId, onStepChange, onLastStep }) {
  const [instruction, setInstruction] = useState(null);
  const [isLastStep, setIsLastStep] = useState(false);

  useEffect(() => {
    const fetchInstruction = async () => {
      try {
        const projectData = await fetchProjectDetails(projectId);
        const project = projectData[0];
        const xegoId = project.idxego;
        const currentStep = project.currentXegoStep;
        const data = await fetchInstructionByStep(xegoId, currentStep);
        
        if (!data) {
          setIsLastStep(true);
          onLastStep?.(true);
        } else {
          setIsLastStep(false);
          onLastStep?.(false);
          setInstruction(data);
        }
      } catch (error) {
        console.error("Error loading instruction:", error);
      }
    };

    fetchInstruction();
  }, [projectId, onLastStep]);

  const updateInstruction = async (action) => {
    try {
      await updateProjectStep(projectId, action);
      const projectData = await fetchProjectDetails(projectId);
      const project = projectData[0];
      const xegoId = project.idxego;
      const currentStep = project.currentXegoStep;

      const data = await fetchInstructionByStep(xegoId, currentStep);
      
      if (!data) {
        setIsLastStep(true);
        onLastStep?.(true);
      } else {
        setIsLastStep(false);
        onLastStep?.(false);
        setInstruction(data);
      }
      
      if (onStepChange) {
        onStepChange(currentStep);
      }
    } catch (err) {
      console.error(`Error updating step (${action}):`, err);
    }
  };

  const handleNext = () => updateInstruction("next");
  const handlePrev = () => updateInstruction("prev");

  if (isLastStep) {
    return (
      <div className="relative bg-white rounded-lg shadow-md px-6 py-5">
        <button
          onClick={handlePrev}
          className="absolute left-2 top-1/2 -translate-y-1/2 flex items-center justify-center hover:bg-gray-200 p-2 rounded-full"
          aria-label="Prev"
        >
          <PreviousInstructions className="pr-1 h-8 w-8 text-gray-700" />
        </button>

        <div className="text-center px-10">
          <h3 className="text-2xl font-bold text-gray-800 mb-4">Congratulations! 🎉</h3>
          <p className="text-lg text-gray-700 mb-2">You've completed the whole XEGO!</p>
          <p className="text-md text-gray-600">You reached the end of the tutorial. Good job!</p>
        </div>
      </div>
    );
  }

  if (!instruction) return null;

  return (
    <div className={`relative bg-white rounded-lg shadow-md px-6 py-5`}>
      
      <button
        onClick={handlePrev}
        className="absolute left-2 top-1/2 -translate-y-1/2 flex items-center justify-center  hover:bg-gray-200 p-2 rounded-full"
        aria-label="Prev"
      >
        <PreviousInstructions className="pr-1 h-8 w-8 text-gray-700" />
      </button>

      
      <div className="text-center px-10">
        <h4 className="text-sm text-gray-500 font-medium uppercase tracking-wide mb-1">
          Activity
        </h4>
        <h3 className="text-xl font-bold text-gray-800 mb-4">{instruction.activityTitle}</h3>

        <h5 className="text-sm text-gray-500 font-medium uppercase tracking-wide mb-1">
          Task
        </h5>
        <p className="text-md text-gray-700 font-medium">{instruction.taskTitle}</p>

        <p className="text-sm text-gray-600 mt-4">{instruction.description}</p>
      </div>


      <button
        onClick={handleNext}
        className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center justify-center  hover:bg-gray-200 p-2 rounded-full"
        aria-label="Next"
      >
        <NextInstructions className="pl-1 h-8 w-8 text-gray-700" />
      </button>
    </div>
  );
}