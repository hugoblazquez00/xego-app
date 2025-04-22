import React, { useEffect, useState } from "react"
import { TablesView } from "../tables-view"
import { QueryExecutor } from "../query-executor"
import { fetchProjectDetails } from '@/app/utils/api'

export function DatabaseView({ currentScreen, projectId }) {
  const [schemaId, setSchemaId] = useState(null)

  useEffect(() => {
    const getSchemaId = async () => {
      try {
        if (currentScreen === "project") {
          // Si estamos en la pantalla de proyecto, el schemaId es el projectId
          setSchemaId(projectId)
        } else {
          // Si estamos en instrucciones, necesitamos obtener el xegoId
          const projectDetails = await fetchProjectDetails(projectId)
          const xegoId = projectDetails[0]?.idxego
          if (xegoId) {
            setSchemaId(xegoId)
          }
        }
      } catch (error) {
        console.error('Error obteniendo schemaId:', error)
      }
    }

    getSchemaId()
  }, [currentScreen, projectId])

  return (
    <div className="database-view w-full">
      <div className="flex gap-4 h-full">
        <div className="w-1/2">
          {schemaId && <TablesView schemaId={schemaId} />}
        </div>
        <div className="w-1/2">
          {schemaId && <QueryExecutor schemaId={schemaId} />}
        </div>
      </div>
    </div>
  )
} 