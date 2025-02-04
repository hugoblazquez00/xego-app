import React from "react"
import { WebsiteView } from "./views/website-view"
import { FrontendView } from "./views/frontend-view"
import { BackendView } from "./views/backend-view"
import { DatabaseView } from "./views/database-view"

export function Workspace({ className, currentScreen, currentView }) {
  const renderView = () => {
    switch (currentView) {
      case "website":
        return <WebsiteView currentScreen={currentScreen} />
      case "frontend":
        return <FrontendView currentScreen={currentScreen} />
      case "backend":
        return <BackendView currentScreen={currentScreen} />
      case "database":
        return <DatabaseView currentScreen={currentScreen} />
      default:
        return <div className="text-center text-gray-400 mt-20">Vista no encontrada</div>
    }
  }

  return (
    <div className={`bg-gray-50 ${className}`}>
     
      <div className="p-4">
        {renderView()}
      </div>
    </div>
  )
}
  
  