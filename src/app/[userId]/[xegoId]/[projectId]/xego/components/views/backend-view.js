import React from "react"

export function BackendView({ currentScreen }) {
  return (
    <div className="backend-view">
      {/* Contenido diferente según la pantalla */}
      {currentScreen === "instructions" ? (
        <div className="text-center">Instrucciones para el proyecto</div>
      ) : (
        <div>Contenido del backend</div>
      )}
    </div>
  )
} 