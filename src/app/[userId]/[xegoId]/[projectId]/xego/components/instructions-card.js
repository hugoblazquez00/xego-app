"use client";

//import { NextInstructions, ChevronRightIcon } from "@heroicons/react/24/solid";

import { PreviousInstructions, NextInstructions } from "@/components/icons";
export function InstructionsCard() {
  // Datos de prueba
  const instruction = {
    activityTitle: "Mostrar datos",
    taskTitle: "Mapear la lista de tareas",
    description:
      "En esta tarea deberás tomar los datos que recibes de la API y mostrarlos en la interfaz usando un `.map()`.",
  };

  return (
    <div className={`relative bg-white rounded-lg shadow-md px-6 py-5`}>
      {/* Botón anterior */}
      <button
        //onClick={onPrev}
        className="absolute left-2 top-1/2 -translate-y-1/2  hover:bg-gray-200 p-2 rounded-full"
        aria-label="Anterior"
      >
        <PreviousInstructions className="pr-1 h-8 w-8 text-gray-700" />
        
      </button>

      {/* Contenido */}
      <div className="text-center px-10">
        <h4 className="text-sm text-gray-500 font-medium uppercase tracking-wide mb-1">
          Actividad
        </h4>
        <h3 className="text-xl font-bold text-gray-800 mb-4">{instruction.activityTitle}</h3>

        <h5 className="text-sm text-gray-500 font-medium uppercase tracking-wide mb-1">
          Tarea actual
        </h5>
        <p className="text-md text-gray-700 font-medium">{instruction.taskTitle}</p>

        <p className="text-sm text-gray-600 mt-4">{instruction.description}</p>
      </div>

      {/* Botón siguiente */}
      <button
        //onClick={onNext}
        className="absolute right-2 top-1/2 -translate-y-1/2  hover:bg-gray-200 p-2 rounded-full"
        aria-label="Siguiente"
      >
        <NextInstructions className="pl-1 h-8 w-8 text-gray-700" />
        
      </button>
    </div>
  );
}