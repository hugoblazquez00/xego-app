import React, { useState, useRef, useEffect } from "react"
import { FileTree } from "../file-tree"
import { CodeEditor } from "../code-editor"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { ActionsFrontendView } from "../actions-frontend-view"

// Utility function to build the tree structure
const buildTree = (files) => {
  const tree = [];

  files.forEach(file => {
    const parts = file.path.split('/').filter(Boolean); // Split the path and remove empty parts
    let currentLevel = tree;

    parts.forEach((part, index) => {
      // Check if the part already exists in the current level
      let existingFolder = currentLevel.find(item => item.name === part);

      if (!existingFolder) {
        // Create a new folder or file object
        existingFolder = {
          name: part,
          type: index === parts.length - 1 ? file.type : 'folder', // Last part is a file, others are folders
          children: []
        };
        currentLevel.push(existingFolder);
      }

      currentLevel = existingFolder.children; // Move to the next level
    });
  });

  return tree;
};

export function FrontendView({ currentScreen, projectId, setIsSavedXego,isSavedXego, setCodeXego, codeXego, setCurrentFile, saveCurrentFile }) {
  const [localCode, setLocalCode] = useState('// Selecciona un archivo para editar');
  const [files, setFiles] = useState([]);
  const [currentFile, setCurrentFileState] = useState(null);
  const editorRef = useRef(null);
  const [currentTheme, setCurrentTheme] = useState('vs-dark');

  const fetchFiles = async () => {
    try {
      const response = await fetch(`/api/files?projectID=${projectId}`);
      if (!response.ok) {
        throw new Error('Error fetching files');
      }
      const data = await response.json();
      const organizedFiles = buildTree(data); // Organize the fetched files
      setFiles(organizedFiles); // Store the organized files in state
    } catch (error) {
      console.error("Error fetching files:", error);
    }
  };

  useEffect(() => {
    fetchFiles(); // Fetch files when the component mounts
  }, [projectId, currentScreen]);

  const handleEditorChange = (value) => {
    setLocalCode(value);
    setCodeXego(value);
    setIsSavedXego(false);
  };

  const handleFileSelect = async (fileName) => {
    if (!isSavedXego && currentFile) {
      console.log("SAVEFV01 - FILE SELECTION CHANGED.");
      await saveCurrentFile(currentFile, localCode);
    }
    try {
      const response = await fetch(`/api/files?projectID=${projectId}&fileName=${fileName}`);
      const fileData = await response.json();
      const content = fileData.content || `// No content available for ${fileName}`;
      setLocalCode(content);
      setCodeXego(content);
      setCurrentFileState(fileData);
      setCurrentFile(fileData); 
      setIsSavedXego(true);
      console.log("Archivo seleccionado:", fileName);
    } catch (error) {
      console.error("Error al cargar el archivo:", error);
    }
  };

  useEffect(() => {
    const interval = setInterval(async () => {
      console.log("isSavedXego: ", isSavedXego);
      if (!isSavedXego && currentFile) {
        console.log("SAVEFV01 - AUTO-SAVING FILE.");
        try {
          await saveCurrentFile(currentFile, localCode);
        } catch (error) {
          console.error("Error al guardar el archivo automáticamente:", error);
        }
      }
    }, 5000);

    return () => clearInterval(interval);
  }, [localCode, isSavedXego, currentFile, saveCurrentFile]);

  const handleFileCreated = async (newFile) => {
    const response = await fetch('/api/files', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newFile),
    });

    if (response.ok) {
      // Re-fetch the files to update the tree
      await fetchFiles(); // Call the fetch function to refresh the tree
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
          <CodeEditor ref={editorRef} code={localCode} setCode={handleEditorChange} theme={currentTheme} />
        </div>
        <ActionsFrontendView 
          editorRef={editorRef} 
          currentTheme={currentTheme} 
          toggleTheme={toggleTheme} 
        />
      </div>
      {/* <div className="save-status">
        <button onClick={saveFileContent} disabled={isSaved}>
          {isSaved ? "Archivo guardado" : "Guardar archivo"}
        </button>
      </div> */}
    </div>
  )
} 