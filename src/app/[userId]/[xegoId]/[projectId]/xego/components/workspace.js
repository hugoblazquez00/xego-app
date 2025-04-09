import React from "react"
import { WebsiteView } from "./views/website-view"
import { FrontendView } from "./views/frontend-view"
import { BackendView } from "./views/backend-view"
import { DatabaseView } from "./views/database-view"

export function Workspace({ 
  className, 
  currentScreen, 
  currentView, 
  projectId, 
  currentStep,
  setIsSavedXego, 
  isSavedXego, 
  setCodeXego, 
  codeXego, 
  setCurrentFileXego, 
  currentFileXego, 
  saveCurrentFile 
}) {
  const renderView = () => {
    switch (currentView) {
      case "website":
        return <WebsiteView currentScreen={currentScreen} projectId={projectId} />
      case "frontend":
        return <FrontendView 
                 currentScreen={currentScreen} 
                 projectId={projectId} 
                 currentStep={currentStep}
                 setIsSavedXego={setIsSavedXego} 
                 isSavedXego={isSavedXego}
                 setCodeXego={setCodeXego} 
                 codeXego={codeXego}
                 setCurrentFileXego={setCurrentFileXego} 
                 currentFileXego={currentFileXego}
                 saveCurrentFile={saveCurrentFile}
               />
      case "backend":
        return <BackendView currentScreen={currentScreen} />
      case "database":
        return <DatabaseView currentScreen={currentScreen} />
      default:
        return <div className="text-center text-gray-400 mt-20">Vista no encontrada</div>
    }
  }

  return (
    <div className={`bg-gray-50 flex ${className}`}>
      {renderView()}
    </div>
  )
}
  
  