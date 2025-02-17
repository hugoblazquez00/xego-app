"use client";

import * as Tooltip from '@radix-ui/react-tooltip';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import React, { useState, useRef } from 'react';
import { Dock, DockIcon } from "@/components/magicui/dock";
// import { Separator } from "@/components/ui/separator";
import { FileIcon, FolderIcon, CollapseIcon } from "@/components/icons";
import CreateFileModal from './CreateFileModal'; // Import the modal component

const SCALE = 1.5; // Scale factor for icons
const DISTANCE = 50; // Distance before mouse affects an icon
const NUDGE = 5; // Pixels icons are moved away from mouse

export function FileDock({ projectId, newFile, files }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isFolder, setIsFolder] = useState(false); // Track if creating a folder
  const [pathLastFolder, setpathLastFolder] = useState(""); // Track if creating a folder

  const handleCreateFile = async (fileData) => {
    const response = await fetch('/api/files', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        idproject: projectId,
        name: fileData.name,
        path: fileData.path,
        type: isFolder ? 'folder' : 'file',
        ...(isFolder ? {} : { content: '', language: 'javascript' }), // Only include content for files
      }),
    });
    setpathLastFolder(fileData.path);
    if (response.ok) {
      const data = await response.json();
      console.log("NewFile: ", data.file);
      newFile(data.file);
    } else {
      console.error("Error creating file/folder");
    }
  };

  const handleToggleFolders = () => {
    console.log("Abrir/Cerrar carpetas");
  };

  return (
    <div className="relative flex items-center justify-center" style={{ height: "calc(100vh - 600px)" }}>
      <Dock direction="middle">
        <DockIcon onClick={() => { setIsFolder(false); setIsModalOpen(true); }}>
          <AppIcon>
            <FileIcon className="size-4" />
          </AppIcon>
        </DockIcon>
        <DockIcon onClick={() => { setIsFolder(true); setIsModalOpen(true); }}>
          <AppIcon>
            <FolderIcon className="size-4" />
          </AppIcon>
        </DockIcon>
        <DockIcon onClick={handleToggleFolders}>
          <AppIcon>
            <CollapseIcon className="size-4" />
          </AppIcon>
        </DockIcon>
      </Dock>

      <CreateFileModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        onCreate={handleCreateFile} 
        type={isFolder ? 'folder' : 'file'}
        files={files}
      />
    </div>
  );
}

function AppIcon({ children }) {
  const ref = useRef(null);
  const distance = useTransform(() => {
    const bounds = ref.current
      ? { x: ref.current.offsetLeft, width: ref.current.offsetWidth }
      : { x: 0, width: 0 };

    return 0 - bounds.x - bounds.width / 2;
  });

  const scale = useTransform(distance, [-DISTANCE, 0, DISTANCE], [1, SCALE, 1]);
  const x = useTransform(() => {
    const d = distance.get();
    return d < -DISTANCE || d > DISTANCE ? Math.sign(d) * -1 * NUDGE : 0;
  });

  return (
    <Tooltip.Provider>
      <Tooltip.Root>
        <Tooltip.Trigger asChild>
          <motion.button
            ref={ref}
            style={{ x, scale }}
            className="flex items-center justify-center aspect-square block w-10 rounded-full bg-white shadow"
          >
            {children}
          </motion.button>
        </Tooltip.Trigger>
        <Tooltip.Content className="bg-gray-700 text-white p-2 rounded">
          {children}
          <Tooltip.Arrow />
        </Tooltip.Content>
      </Tooltip.Root>
    </Tooltip.Provider>
  );
} 