import React from "react";
import { File, Folder, Tree } from "@/components/ui/file-tree";
import { FileDock } from "./file-dock";

// Recursive function to render tree items
const renderTreeItem = (item, onSelect) => {
  if (item.type === 'folder') {
    return (
      <Folder key={item.name} value={item.name} element={item.name}>
        {(item.children || []).map(child => renderTreeItem(child, onSelect))}
      </Folder>
    );
  } else {
    return (
      <File key={item.name} value={item.name} onClick={() => onSelect(item.name)}>
        <p>{item.name}</p>
      </File>
    );
  }
};

export function FileTree({ onSelect, currentScreen, files, projectId, onFileCreated }) {
  // Build the tree structure from the flat list of files
  const treeData = files; // Use the organized tree data directly

  return (
    <div className="flex flex-col h-full">
      <div style={{ height: "calc(100vh - 146px)" }} className="relative flex w-full flex-col overflow-hidden rounded-lg border bg-background md:shadow-xl">
        <FileDock projectId={projectId} newFile={onFileCreated} files = {files}/>
        <Tree
          className="overflow-auto rounded-md bg-background p-2"
          elements={treeData} // Use the organized tree data
        >
          {treeData.map((item) => renderTreeItem(item, onSelect))}
        </Tree>
      </div>
    </div>
  );
}
