import React, { useState, useRef, useEffect } from "react"
import { FileTree } from "../file-tree"
import { CodeEditor } from "../code-editor"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { ActionsFrontendView } from "../actions-frontend-view"

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

export function FrontendView({ currentScreen, projectId, setIsSavedXego,isSavedXego, setCodeXego, codeXego, setCurrentFileXego, currentFileXego, saveCurrentFile }) {
  const [files, setFiles] = useState([]);
  const editorRef = useRef(null);
  const [currentTheme, setCurrentTheme] = useState('vs-dark');

  const fetchFiles = async () => {
    try {
      const response = await fetch(`/api/files?projectID=${projectId}`);
      if (!response.ok) {
        console.error("ERRORFV04 - ERROR FETCHING FILES", error);
      }
      const data = await response.json();
      const organizedFiles = buildTree(data);
      setFiles(organizedFiles);
    } catch (error) {
      console.error("ERRORFV04 - ERROR FETCHING FILES", error);
    }
  };

  useEffect(() => {
    fetchFiles();
  }, [projectId, currentScreen]);

  const handleEditorChange = (value) => {
    setCodeXego(value);
    setIsSavedXego(false);
  };

  const handleFileSelect = async (fileName) => {
    console.log("SAVEFV01 - FILE SELECTION CHANGED.");
    if (!isSavedXego && currentFileXego) {
      try {
        await saveCurrentFile(currentFileXego, codeXego);
      } catch (error) {
        console.error("ERRORFV01 - FILE SELECTION ERROR", error);
      }
    }
    try {
      const response = await fetch(`/api/files?projectID=${projectId}&fileName=${fileName}`);
      const fileData = await response.json();
      const content = fileData.content || `// No content available for ${fileName}`;
      setCodeXego(content);
      setCurrentFileXego(fileData); 
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

  const handleFileCreated = async (newFile) => {
    const response = await fetch('/api/files', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newFile),
    });

    if (response.ok) {
      await fetchFiles();
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