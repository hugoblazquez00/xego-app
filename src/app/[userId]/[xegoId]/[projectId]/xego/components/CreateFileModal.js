import React, { useState, useRef, useEffect } from 'react';
import { Button } from "@/components/ui/button"; // Adjust the import based on your UI library

const CreateFileModal = ({ isOpen, onClose, onCreate, type, files }) => {
  const [name, setName] = useState('');
  const [path, setPath] = useState('');
  const modalRef = useRef(null);

  const handleSubmit = (e) => {
    e.preventDefault();
  
    const fullPath = path === "/" ? `/${name}` : `${path}/${name}`;
    console.log(fullPath);
    onCreate({ name, path: fullPath, type });
    onClose(); // Cerrar el modal después de la creación
  };

  const handleClickOutside = (event) => {
    if (modalRef.current && !modalRef.current.contains(event.target)) {
      onClose();
    }
  };
  const renderFolders = (files, parentPath = "") => {
    return files.flatMap((file) => {
      if (file.type === "folder") {
        const fullPath = parentPath ? `${parentPath}/${file.name}` : file.name;
  
        return [
          <option key={fullPath} value={fullPath}>
            {fullPath}
          </option>,
          ...renderFolders(file.children || [], fullPath),
        ];
      }
      return [];
    });
  };

  useEffect(() => {
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div ref={modalRef} className="bg-white p-6 rounded shadow-lg">
        <form onSubmit={handleSubmit}>
          <h2 className="text-lg font-bold mb-4">Create New {type === 'folder' ? 'Folder' : 'File'}</h2>
          <label className="block mb-2">
            Name:
            <input 
              type="text" 
              value={name} 
              onChange={(e) => setName(e.target.value)} 
              required 
              className="border rounded p-2 w-full"
            />
          </label>
          <label className="block mb-4">
            Path:
            <select 
              value={path} 
              onChange={(e) => {
                let selectedPath = e.target.value;
                if (selectedPath !== "/") {
                  selectedPath = selectedPath.startsWith("/") ? selectedPath.substring(1) : selectedPath;
                }
                setPath(selectedPath);
              }}
              required 
              className="border rounded p-2 w-full"
            >
              <option value="">Select a folder</option>
              <option key="/" value="/">Root</option>
              {renderFolders(files)}
            </select>
          </label>
          <div className="flex justify-end">
            <Button type="submit" className="mr-2">Create</Button>
            <Button type="button" onClick={onClose}>Cancel</Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateFileModal; 