import React, { useState, useRef, useEffect } from "react"
import { FileTree } from "../file-tree"
import { CodeEditor } from "../code-editor"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { ActionsFrontendView } from "../actions-frontend-view"

export function FrontendView({ currentScreen, projectId }) {
  const [code, setCode] = useState('// Selecciona un archivo para editar');
  const [files, setFiles] = useState([]);
  const editorRef = useRef(null);
  const [currentTheme, setCurrentTheme] = useState('vs-dark');

  useEffect(() => {
    const fetchFiles = async () => {
      let response;
      
      // Lógica condicional para determinar la llamada a la API
      if (currentScreen === 'project') {
        response = await fetch(`/api/files?projectID=${projectId}`); // Llamada para pantalla de proyecto
      } else if (currentScreen === 'instructions') {
        response = await fetch(`/api/files?projectID=${projectId}`); // Llamada para pantalla de instrucciones (actualmente igual)
      }

      const data = await response.json();
      setFiles(data);
    };

    fetchFiles();
  }, [projectId, currentScreen]); // Añadir currentScreen como dependencia

  const handleFileSelect = async (fileName) => {
    try {
      // Contenido falso de prueba
      const fakeContent = currentScreen === 'project' 
        ? `// Contenido del proyecto: ${fileName}\nconsole.log('Proyecto cargado!');`
        : `// Contenido de instrucciones: ${fileName}\nconsole.log('Instrucciones cargadas!');`;
      setCode(fakeContent);
      console.log("Archivo seleccionado:", fileName);
    } catch (error) {
      console.error("Error al cargar el archivo:", error);
    }
  };

  const handleFileCreated = (newFile) => {
    setFiles((prevFiles) => [...prevFiles, newFile]);
  };

  const toggleTheme = () => {
    const newTheme = currentTheme === 'vs-dark' ? 'light' : 'vs-dark';
    setCurrentTheme(newTheme);
    if (editorRef.current) {
      editorRef.current.changeTheme(newTheme);
    }
  };

  const formatCode = () => {
    if (editorRef.current) {
      editorRef.current.formatCode();
    }
  };

  const changeLanguage = (language) => {
    if (editorRef.current) {
      editorRef.current.changeLanguage(language);
    }
  };

  return (
    <div className="frontend-view flex flex-1">
      <div className="w-64 h-full border-r overflow-auto">
        <FileTree 
          onSelect={handleFileSelect} 
          currentScreen={currentScreen} 
          files={files} 
          projectId={projectId} 
          onFileCreated={handleFileCreated}
        />
      </div>
      <div className="flex flex-col flex-1 relative">
        <div className="flex-1">
          <CodeEditor ref={editorRef} code={code} setCode={setCode} theme={currentTheme} />
        </div>
        <ActionsFrontendView 
          editorRef={editorRef} 
          currentTheme={currentTheme} 
          toggleTheme={toggleTheme} 
        />
      </div>
    </div>
  )
} 