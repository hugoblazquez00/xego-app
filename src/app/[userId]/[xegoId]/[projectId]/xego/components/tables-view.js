import React, { useEffect, useState } from 'react'
import { fetchTableNames, fetchTableData } from '@/app/utils/api'

export function TablesView({ schemaId, refreshTrigger }) {
  const [tableNames, setTableNames] = useState([])
  const [selectedTable, setSelectedTable] = useState(null)
  const [tableData, setTableData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  // Cargar nombres de tablas
  useEffect(() => {
    const loadTableNames = async () => {
      try {
        setLoading(true)
        const response = await fetchTableNames(schemaId)
        if (response.success) {
          setTableNames(response.data)
          setSelectedTable(null)
          setTableData(null)
        } else {
          setError(response.error)
        }
      } catch (err) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    loadTableNames()
  }, [schemaId, refreshTrigger])

  // Cargar datos de la tabla seleccionada
  const handleTableSelect = async (tableName) => {
    try {
      setSelectedTable(tableName)
      setLoading(true)
      setError(null)

      const response = await fetchTableData(schemaId, tableName)
      if (response.success) {
        setTableData(response.data)
      } else {
        setError(response.error)
      }
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  const renderColumnHeader = (column) => {
    const properties = []
    if (column.is_primary_key) properties.push('PK')
    if (column.is_identity === 'YES') properties.push('Serial')
    if (column.is_nullable === 'NO') properties.push('Required')

    return (
      <div className="flex flex-col">
        <span className="font-medium">{column.column_name}</span>
        <span className="text-xs text-gray-500">{column.data_type}</span>
        {properties.length > 0 && (
          <div className="flex gap-1 mt-1">
            {properties.map((prop, index) => (
              <span
                key={index}
                className={`text-xs px-1.5 py-0.5 rounded ${
                  prop === 'PK' 
                    ? 'bg-blue-100 text-blue-700'
                    : prop === 'Serial'
                    ? 'bg-purple-100 text-purple-700'
                    : 'bg-gray-100 text-gray-700'
                }`}
              >
                {prop}
              </span>
            ))}
          </div>
        )}
      </div>
    )
  }

  // if (loading) return <div className="w-full h-full p-4">Loading tables...</div>
  // if (error) return <div className="w-full h-full p-4 text-red-500">Error: {error}</div>

  return (
    <div className="w-full h-full flex">
      {/* Panel izquierdo - Lista de tablas */}
      <div className="w-1/4 border-r border-gray-200 overflow-y-auto">
        <div className="p-4">
          <h2 className="text-lg font-semibold mb-4">Tables</h2>
          <div className="space-y-2">
            {tableNames.map((tableName) => (
              <button
                key={tableName}
                onClick={() => handleTableSelect(tableName)}
                className={`w-full text-left px-3 py-2 rounded ${
                  selectedTable === tableName
                    ? 'bg-blue-500 text-white'
                    : 'hover:bg-gray-100'
                }`}
              >
                {tableName}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Panel derecho - Tabla con datos */}
      <div className="flex-1 p-4 overflow-y-auto">
        {loading && <div>Loading...</div>}
        {error && <div className="text-red-500">Error: {error}</div>}
        {!loading && !error && tableData ? (
          <div>
            <h2 className="text-xl font-bold mb-4">{selectedTable}</h2>
            <div className="overflow-x-auto">
              <table className="min-w-full border border-gray-300">
                <thead className="bg-gray-50">
                  <tr>
                    {tableData.columns.map((column) => (
                      <th key={column.column_name} className="px-4 py-2 border-b">
                        {renderColumnHeader(column)}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {tableData.records.map((record, rowIndex) => (
                    <tr key={rowIndex} className={rowIndex % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                      {tableData.columns.map((column) => (
                        <td key={column.column_name} className="px-4 py-2 border-b">
                          {record[column.column_name] === null 
                            ? <span className="text-gray-400">NULL</span>
                            : String(record[column.column_name])}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        ) : (
          <div className="text-gray-500">Select a table to view its data</div>
        )}
      </div>
    </div>
  )
} 