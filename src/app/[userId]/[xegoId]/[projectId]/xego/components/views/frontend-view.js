import React, { useState, useRef, useEffect } from "react"
import { FileTree } from "../file-tree"
import { CodeEditor } from "../code-editor"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { ActionsFrontendView } from "../actions-frontend-view"
import { fetchFiles, fetchXegoFiles, createFile, deleteFile, fetchFile,fetchXegoFile } from '../../../../../../utils/api';

const buildTree = (files) => {
  const tree = [];
  const fileMap = {};

  files.forEach(file => {
    fileMap[file.path] = {
      ...file,
      children: []
    };
  });

  files.forEach(file => {
    const parts = file.path.split('/').filter(Boolean); 
    let currentLevel = tree;

    parts.forEach((part, index) => {
      const isLastPart = index === parts.length - 1;

      let existingFolder = currentLevel.find(item => item.name === part && item.type === (isLastPart ? 'file' : 'folder'));

      if (!existingFolder) {
        existingFolder = {
          name: part,
          type: isLastPart ? file.type : 'folder',
          path: file.path, 
          _id: isLastPart ? file._id : `${file._id}-${part}`,
          children: []
        };
        currentLevel.push(existingFolder);
      }

      currentLevel = existingFolder.children; 
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
        response = await fetchFile(projectId, file.name);
      } else {
        response = await fetchXegoFile(projectId, file.name);
      }
      const fileData =  response;
      
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
      if (newFile) {
        await loadFiles();
      }
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
          handleCreateFile={handleCreateFile}
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