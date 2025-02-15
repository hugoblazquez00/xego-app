import React from "react"

export function DatabaseView({ currentScreen }) {
  return (
    <div className="database-view">
      {/* Contenido diferente según la pantalla */}
      {currentScreen === "instructions" ? (
        <div className="text-center">Instrucciones para el proyecto</div>
      ) : (
        <div>Contenido de la base de datos</div>
      )}
    </div>
  )
} 