import React from "react";
import { File, Folder, Tree } from "@/components/ui/file-tree";
import { FileDock } from "./file-dock";

export function FileTree({ onSelect, currentScreen, files, projectId, onFileCreated }) {
  return (
    <div>
      
      <div style={{height: "calc(100vh - 146px)"}} className="relative flex w-full flex-col overflow-hidden rounded-lg border bg-background md:shadow-xl">
      <FileDock projectId={projectId} onFileCreated={onFileCreated} />
        <Tree
          className="overflow-auto rounded-md bg-background p-2"
          initialSelectedId="7"
          initialExpandedItems={files.map(file => file._id)}
          elements={files}
        >
          {files.map(file => (
            <File key={file._id} value={file._id} onClick={() => onSelect(file.name)}>
              <p>{file.name}</p>
            </File>
          ))}
        </Tree>
      </div>
    </div>
  );
}
