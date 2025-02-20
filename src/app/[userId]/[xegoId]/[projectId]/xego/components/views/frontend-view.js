import React, { useState, useRef, useEffect } from "react"
import { FileTree } from "../file-tree"
import { CodeEditor } from "../code-editor"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { ActionsFrontendView } from "../actions-frontend-view"
import { fetchFiles, fetchXegoFiles, fetchProjectDetails, createFile, deleteFile } from '../../../../../../utils/api';

const buildTree = (files) => {
  const tree = [];
  const fileMap = {};

  // Primero, crear un mapa de todos los archivos
  files.forEach(file => {
    // Mantener todos los datos originales del archivo
    fileMap[file.path] = {
      ...file,
      children: [] // Inicializamos children como un array vacío
    };
  });

  // Luego, construir la estructura del árbol
  files.forEach(file => {
    const parts = file.path.split('/').filter(Boolean); // Dividir el path en partes
    let currentLevel = tree;

    parts.forEach((part, index) => {
      // Verificar si es el último elemento (archivo)
      const isLastPart = index === parts.length - 1;

      // Crear un nuevo objeto para la carpeta o usar el existente
      let existingFolder = currentLevel.find(item => item.name === part && item.type === (isLastPart ? 'file' : 'folder'));

      if (!existingFolder) {
        existingFolder = {
          name: part,
          type: isLastPart ? file.type : 'folder', // Si es el último, es un archivo
          path: file.path, // Mantener el path original
          _id: isLastPart ? file._id : `${file._id}-${part}`, // Usar el _id del archivo o generar uno para la carpeta
          children: []
        };
        currentLevel.push(existingFolder);
      }

      currentLevel = existingFolder.children; // Mover al siguiente nivel
    });
  });

  return tree;
};

export function FrontendView({ currentScreen, projectId, setIsSavedXego, isSavedXego, setCodeXego, codeXego, setCurrentFileXego, currentFileXego, saveCurrentFile }) {
  const [files, setFiles] = useState([]);
  const editorRef = useRef(null);
  const [currentTheme, setCurrentTheme] = useState('vs-dark');
  const [itemToDelete, setItemToDelete] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const loadFiles = async () => {
    try {
      let data;
      if (currentScreen === "project") {
        data = await fetchFiles(projectId);
      } else {
        data = await fetchXegoFiles(projectId);
      }
      const organizedFiles = buildTree(data);
      setFiles(organizedFiles);
    } catch (error) {
      console.error("Error loading files:", error);
    }
  };

  useEffect(() => {
    loadFiles();
  }, [projectId, currentScreen]);

  const handleEditorChange = (value) => {
    setCodeXego(value);
    setIsSavedXego(false);
  };

  const handleFileSelect = async (file) => {
    console.log("SAVEFV01 - FILE SELECTION CHANGED.");
    if (!isSavedXego && currentFileXego) {
      try {
        await saveCurrentFile(currentFileXego, codeXego);
      } catch (error) {
        console.error("ERRORFV01 - FILE SELECTION ERROR", error);
      }
    }
    try {
      let response;
      if (currentScreen === "project") {
        console.log("Fetching projects");
        response = await fetch(`/api/files?projectID=${projectId}&fileName=${file.name}`);
      } else {
        console.log("Fetching xegos");
        response = await fetch(`/api/xegofiles?xegoID=${projectId}&fileName=${file.name}`);
      }
      const fileData = await response.json();
      console.log("fileData: ", fileData);
      
      const completeFileData = {
        ...file,
        ...fileData,
        content: fileData.content || `// No content available for ${file.name}`
      };

      setCodeXego(completeFileData.content);
      setCurrentFileXego(completeFileData);
      setIsSavedXego(true);
    } catch (error) {
      console.error("ERRORFV02 - ERROR PREPARING FILES", error);
    }
  };

  useEffect(() => {
    const interval = setInterval(async () => {
      if (!isSavedXego && currentFileXego) {
        console.log("SAVEFV01 - AUTO-SAVING FILE.");
        try {
          await saveCurrentFile(currentFileXego, codeXego);
        } catch (error) {
          console.error("ERRORFV03 - ERROR WHILE AUTOSAVING FILE", error);
        }
      }
    }, 5000);

    return () => clearInterval(interval);
  }, [codeXego, isSavedXego, currentFileXego, saveCurrentFile]);

  const handleCreateFile = async (name, path, type) => {
    try {
      const newFile = await createFile(projectId, name, path, type);
      setFiles((prevFiles) => [...prevFiles, newFile]);
    } catch (error) {
      console.error("Error creating file:", error);
    }
  };

  const toggleTheme = () => {
    const newTheme = currentTheme === 'vs-dark' ? 'light' : 'vs-dark';
    setCurrentTheme(newTheme);
    if (editorRef.current) {
      editorRef.current.changeTheme(newTheme);
    }
  };

  // const formatCode = () => {
  //   if (editorRef.current) {
  //     editorRef.current.formatCode();
  //   }
  // };

  const changeLanguage = (language) => {
    if (editorRef.current) {
      editorRef.current.changeLanguage(language);
    }
  };

  const handleDelete = (item) => {
    setItemToDelete(item);
    confirmDelete();
  };

  const confirmDelete = async () => {
    if (itemToDelete) {
      try {
        await deleteFile(itemToDelete._id);
        loadFiles();
      } catch (error) {
        console.error("Error deleting file:", error);
      } finally {
        setItemToDelete(null);
      }
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
          onCreate={handleCreateFile}
          onDelete={handleDelete}
          itemToDelete={itemToDelete}
          setItemToDelete={setItemToDelete}
        />
      </div>
      <div className="flex flex-col flex-1 relative">
        <div className="flex-1">
          <CodeEditor ref={editorRef} code={codeXego} setCode={handleEditorChange} theme={currentTheme} />
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