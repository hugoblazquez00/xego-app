import React from "react"

export function WebsiteView({ currentScreen }) {
  return (
    <div className="website-view">
      {/* Contenido diferente según la pantalla */}
      {currentScreen === "instructions" ? (
        <div className="text-center">Instrucciones para el proyecto</div>
      ) : (
        <div>Contenido editable del sitio web</div>
      )}
    </div>
  )
} 