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
          setSchemaId(projectId)
          setQueryType('project')
        } else {
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

  const refreshTables = () => {
    setShouldRefreshTables(prev => prev + 1)
  }

  return (
    <div className="flex-1 flex h-[calc(100vh-8rem)]"> 
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