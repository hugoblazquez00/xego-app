"use client";

import React, { useState } from "react";
import { Dock, DockIcon } from "@/components/magicui/dock";

export function FileDock({ projectId, onFileCreated }) {
  const [newFileName, setNewFileName] = useState("");

  const handleCreateFile = async () => {
    console.log("HOLAA\n\n\n\n\n\n")
    if (!newFileName) return;

    const response = await fetch('/api/files', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        idproject: projectId,
        name: newFileName,
        content: '',
        path: '',
        language: 'javascript',
        type: 'file',
      }),
    });

    if (response.ok) {
      const data = await response.json();
      console.log("Archivo creado:", data.file);
      onFileCreated(data.file); 
    } else {
      console.error("Error al crear el archivo");
    }
  };

  const handleCreateFolder = () => {
    console.log("Crear carpeta");
  };

  const handleToggleFolders = () => {
    console.log("Abrir/Cerrar carpetas");
  };

  return (
    <div className="relative flex items-center justify-center " style={{height: "calc(100vh - 600px)"}} >
      <Dock direction="middle">
        <DockIcon onClick={handleCreateFile}>
          <span>File</span>
        </DockIcon>
        <DockIcon onClick={handleCreateFolder}>
          <span>Folder</span>
        </DockIcon>
        <DockIcon onClick={handleToggleFolders}>
          <span>Toggle</span>
        </DockIcon>
      </Dock>
      {/* <div className="flex justify-between p-2">
        <input 
          type="text" 
          value={newFileName} 
          onChange={(e) => setNewFileName(e.target.value)} 
          placeholder="Nombre del nuevo archivo" 
          className="border rounded p-1"
        />
      </div> */}
    </div>
  );
} 