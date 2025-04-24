import React, { useState } from "react";
import { File, Folder, Tree } from "@/components/ui/file-tree";
import { FileDock } from "./file-dock";
import DeleteConfirmationModal from "./DeleteConfirmationModal";
import { ProiconsDelete } from 'src/components/icons';

// Recursive function to render tree items
const renderTreeItem = (item, onSelect, onDelete, currentFile) => {
  const isFile = item.type === 'file';
  const isCurrentFile = currentFile && item.name === currentFile.name && item.path === currentFile.path;

  return (
    <div key={item._id || `${item.path}-${item.name}`} className="relative group">
      {isFile ? (
        <File 
          value={item.name} 
          onClick={() => onSelect(item)}
          className={`${isCurrentFile ? 'bg-gray-200 !w-full ' : ''} hover:bg-accent/30 transition-colors duration-200`}
        >
          <p>{item.name}</p>
        </File>
      ) : (
        <Folder value={item.name} element={item.name}>
          {(item.children || []).map(child => 
            renderTreeItem(child, onSelect, onDelete, currentFile)
          )}
        </Folder>
      )}
      <button
        className="icon-delete absolute right-0 top-0 opacity-0 group-hover:opacity-100 cursor-pointer"
        onClick={(e) => {
          e.stopPropagation();
          onDelete(item);
        }}
      >
        <ProiconsDelete />
      </button>
    </div>
  );
};

export function FileTree({ onSelect, currentScreen, files, projectId, handleCreateFile, onDelete, itemToDelete, setItemToDelete, currentFile }) {
  const [showModal, setShowModal] = useState(false);

  const handleDelete = (item) => {
    setItemToDelete(item);
    setShowModal(true);
  };

  const cancelDelete = () => {
    setItemToDelete(null);
    setShowModal(false);
  };

  const confirmDelete = () => {
    if (itemToDelete) {
      onDelete(itemToDelete);
      setShowModal(false);
      setItemToDelete(null);
    }
  };

  return (
    <div className="flex flex-col h-full">
      <div style={{ height: "calc(100vh - 146px)" }} className="relative flex w-full flex-col overflow-hidden rounded-lg border bg-background md:shadow-xl">
        <FileDock projectId={projectId} handleCreateFile={handleCreateFile} files={files} />
        <Tree
          className="overflow-auto rounded-md bg-background p-2"
          elements={files}
        >
          {files.map((item) => renderTreeItem(item, onSelect, handleDelete, currentFile))}
        </Tree>
      </div>

      <DeleteConfirmationModal
        isOpen={showModal}
        onClose={cancelDelete}
        onConfirm={confirmDelete}
        itemType={itemToDelete?.type}
      />
    </div>
  );
}
