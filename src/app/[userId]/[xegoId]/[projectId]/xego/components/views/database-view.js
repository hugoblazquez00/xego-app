import React, { useEffect, useState } from "react"
import { TablesView } from "../tables-view"
import { QueryExecutor } from "../query-executor"
import { fetchProjectDetails } from '@/app/utils/api'

export function DatabaseView({ currentScreen, projectId }) {
  const [schemaId, setSchemaId] = useState(null)
  const [queryType, setQueryType] = useState(null)
  const [shouldRefreshTables, setShouldRefreshTables] = useState(0)

  useEffect(() => {
    const getSchemaId = async () => {
      try {
        if (currentScreen === "project") {
          // Si estamos en la pantalla de proyecto, el schemaId es el projectId
          setSchemaId(projectId)
          setQueryType('project')
        } else {
          // Si estamos en instrucciones, necesitamos obtener el xegoId
          const projectDetails = await fetchProjectDetails(projectId)
          const xegoId = projectDetails[0]?.idxego
          if (xegoId) {
            setSchemaId(xegoId)
            setQueryType('xego')
          }
        }
      } catch (error) {
        console.error('Error obteniendo schemaId:', error)
      }
    }

    getSchemaId()
  }, [currentScreen, projectId])

  // Función para forzar la actualización de las tablas
  const refreshTables = () => {
    setShouldRefreshTables(prev => prev + 1)
  }

  return (
    <div className="flex-1 flex h-[calc(100vh-8rem)]"> {/* Altura calculada restando navbar y viewselector */}
      <div className="flex gap-4 w-full p-4">
        <div className="w-1/2">
          {schemaId && (
            <TablesView 
              schemaId={schemaId} 
              queryType={queryType} 
              refreshTrigger={shouldRefreshTables}
            />
          )}
        </div>
        <div className="w-1/2">
          {schemaId && (
            <QueryExecutor 
              schemaId={schemaId} 
              queryType={queryType}
              onQueryExecuted={refreshTables}
            />
          )}
        </div>
      </div>
    </div>
  )
} 