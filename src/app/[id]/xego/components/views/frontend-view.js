import React, { useState, useRef } from "react"
import { FileTree } from "../file-tree"
import { CodeEditor } from "../code-editor"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { ActionsFrontendView } from "../actions-frontend-view"

export function FrontendView({ currentScreen }) {
  const [code, setCode] = useState('// Selecciona un archivo para editar');
  const editorRef = useRef(null);
  const [currentTheme, setCurrentTheme] = useState('vs-dark');

  const handleFileSelect = async (fileName) => {
    try {
      // Código comentado para solicitar el contenido de los ficheros
      /*
      const res = await fetch(`/api/getFileContent?fileName=${fileName}`);
      const data = await res.json();
      setCode(data.content);
      console.log("Archivo seleccionado:", fileName);
      */
      
      // Contenido falso de prueba
      const fakeContent = `// Este es un contenido de prueba para el archivo: ${fileName}\nconsole.log('Hola, mundo!');`;
      setCode(fakeContent);
      console.log("Archivo seleccionado:", fileName);
    } catch (error) {
      console.error("Error al cargar el archivo:", error);
    }
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
    <div className="frontend-view flex flex-col gap-4 p-4">
     
      <div className="flex">
        <div className="w-1/3">
          <FileTree onSelect={handleFileSelect} />
        </div>
        <div className="w-2/3 relative">
          <CodeEditor ref={editorRef} code={code} setCode={setCode} theme={currentTheme} />
          <ActionsFrontendView editorRef={editorRef} currentTheme={currentTheme} toggleTheme={toggleTheme} />
        </div>
      </div>
    </div>
  )
} 