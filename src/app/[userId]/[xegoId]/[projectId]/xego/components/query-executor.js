import React, { useState } from 'react'
import { executeQuery } from '@/app/utils/api'

export function QueryExecutor({ schemaId }) {
  const [query, setQuery] = useState('')
  const [result, setResult] = useState(null)
  const [error, setError] = useState(null)

  const handleExecute = async () => {
    try {
      setError(null)
      const textArea = document.querySelector('textarea')
      const selectedText = textArea.value.substring(textArea.selectionStart, textArea.selectionEnd)
      const queryToExecute = selectedText || query

      if (!queryToExecute.trim()) {
        setError('Por favor, introduce una consulta SQL')
        return
      }

      const response = await executeQuery(schemaId, queryToExecute)
      setResult(response)
    } catch (err) {
      setError(err.message)
    }
  }

  const renderTableResult = (data) => {
    if (!Array.isArray(data) || data.length === 0) return null

    const columns = Object.keys(data[0])

    return (
      <div className="overflow-auto max-h-full w-full">
        <table className="min-w-full bg-white border border-gray-300">
          <thead className="sticky top-0 z-10">
            <tr className="bg-gray-100">
              {columns.map((column) => (
                <th key={column} className="px-4 py-2 border-b text-left">
                  {column}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.map((row, index) => (
              <tr key={index} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                {columns.map((column) => (
                  <td key={`${index}-${column}`} className="px-4 py-2 border-b">
                    {typeof row[column] === 'boolean' 
                      ? row[column].toString() 
                      : row[column] === null 
                        ? 'NULL'
                        : row[column]}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    )
  }

  const renderResult = (result) => {
    if (!result) return null

    // Si la consulta fue exitosa
    if (result.success) {
      // Si tenemos datos y es un array (resultado tipo tabla)
      if (Array.isArray(result.data) && result.data.length > 0) {
        return renderTableResult(result.data)
      }
      
      // Si es un resultado de operación (INSERT, UPDATE, DELETE)
      if (typeof result.data === 'object' && 'rowCount' in result.data) {
        return (
          <div className="p-4 bg-green-50 text-green-700 rounded">
            Operación exitosa: {result.data.rowCount} fila(s) afectada(s)
          </div>
        )
      }

      // Para cualquier otro tipo de resultado
      return (
        <pre className="mt-4 p-4 bg-gray-100 rounded overflow-auto">
          {JSON.stringify(result.data, null, 2)}
        </pre>
      )
    }

    // Si hubo un error en la consulta
    return (
      <div className="p-4 bg-red-50 text-red-700 rounded">
        Error en la consulta: {result.error}
      </div>
    )
  }

  return (
    <div className="w-full h-full flex flex-col">
      <div className="flex-none p-4">
        <textarea
          className="w-full h-48 p-2 font-mono border border-gray-300 rounded"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Escribe tu consulta SQL aquí..."
        />
        <button
          onClick={handleExecute}
          className="mt-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Execute Query
        </button>
      </div>

      {error && (
        <div className="flex-none px-4 text-red-500">{error}</div>
      )}

      <div className="flex-1 min-h-0 p-4 overflow-auto">
        {result && renderResult(result)}
      </div>
    </div>
  )
} 