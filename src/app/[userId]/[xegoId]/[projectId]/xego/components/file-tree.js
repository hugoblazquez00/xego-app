import React, { useState } from "react";
import { File, Folder, Tree } from "@/components/ui/file-tree";
import { FileDock } from "./file-dock";
import DeleteConfirmationModal from "./DeleteConfirmationModal";
import { ShimmerButton } from "@/components/magicui/shimmer-button";

// Recursive function to render tree items
const renderTreeItem = (item, onSelect, onDelete) => {
  const isFile = item.type === 'file';

  return (
    <div key={item.name} className="relative group">
      {isFile ? (
        <File value={item.name} onClick={() => onSelect(item.name)}>
          <p>{item.name}</p>
        </File>
      ) : (
        <Folder value={item.name} element={item.name}>
          {(item.children || []).map(child => renderTreeItem(child, onSelect, onDelete))}
        </Folder>
      )}
      <span
        className="icon-delete absolute right-0 top-0 opacity-0 group-hover:opacity-100 cursor-pointer"
        onClick={() => onDelete(item)}
      >
        🏠
      </span>
    </div>
  );
};

export function FileTree({ onSelect, currentScreen, files, projectId, onFileCreated }) {
  const [showModal, setShowModal] = useState(false);
  const [itemToDelete, setItemToDelete] = useState(null);

  const handleDelete = (item) => {
    setItemToDelete(item);
    setShowModal(true);
  };

  const confirmDelete = async () => {
    try {
      console.log(itemToDelete?.type);
      const response = await fetch(`/api/files?fileId=${itemToDelete._id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        console.log("Item deleted:", itemToDelete);
        onFileCreated(); // O cualquier función que actualice la lista de archivos
      } else {
        console.error("Error deleting item");
      }
    } catch (error) {
      console.error("Error deleting item:", error);
    } finally {
      setShowModal(false);
    }
  };

  const cancelDelete = () => {
    setItemToDelete(null);
    setShowModal(false);
  };

  return (
    <div className="flex flex-col h-full">
      <div style={{ height: "calc(100vh - 146px)" }} className="relative flex w-full flex-col overflow-hidden rounded-lg border bg-background md:shadow-xl">
        <FileDock projectId={projectId} newFile={onFileCreated} files={files} />
        <Tree
          className="overflow-auto rounded-md bg-background p-2"
          elements={files}
        >
          {files.map((item) => renderTreeItem(item, onSelect, handleDelete))}
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
