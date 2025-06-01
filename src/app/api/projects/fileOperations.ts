import File from "@/app/lib/modals/file";
import { Types } from "mongoose";

export const createBaseFiles = async (projectId: Types.ObjectId) => {
  // Define base files structure
  const baseFiles = [
    // Create src folder
    {
      name: "src",
      path: "/src",
      type: "folder",
      language: null,
      content: null
    },
    // Create index.jsx
    {
      name: "index.jsx",
      path: "/src",
      type: "file",
      language: "javascript",
      content: `import * as React from "react";
import * as ReactDOM from "react-dom/client";
import App from "src/App.jsx";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);`
    },
    // Create App.jsx
    {
      name: "App.jsx",
      path: "/src",
      type: "file",
      language: "javascript",
      content: `import React from "react";

export default function App() {
  return (
    <div>
      {/* You can start building your app here */}
    </div>
  );
}`
    }
  ];

  // Create files
  const filePromises = baseFiles.map(async (file) => {
    const newFile = new File({
      idproject: projectId,
      name: file.name,
      content: file.content,
      path: file.path,
      language: file.language,
      type: file.type,
    });

    // Save files
    const savedFile = await newFile.save();
    return savedFile._id;
  });

  // Wait for all files to be saved
  const savedFiles = await Promise.all(filePromises);
  return savedFiles;
};
