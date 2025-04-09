const mongoose = require("mongoose");
require("dotenv").config();

const XegoFileSchema = new mongoose.Schema({
  idxego: { type: mongoose.Schema.Types.ObjectId, ref: "Xego", required: true },
  name: { type: String, required: true },
  content: { type: String, required: false },
  path: { type: String, required: true },
  language: { type: String, required: false },
  type: { type: String, required: true },
  step: { type: Number, required: true },
  __v: { type: Number, default: 0 },
  modtime: { type: Date, default: Date.now },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

const XegoFile = mongoose.models.XegoFile || mongoose.model("XegoFile", XegoFileSchema, "xegofiles");

async function run() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);

    const xegoId = new mongoose.Types.ObjectId("67ae561601ba5bfb4eb4a9d2");

    const files = [
      {
        idxego: xegoId,
        name: "App.js",
        content: `import React from "react";

export default function App() {
  return <div>My App</div>;
}`,
        path: "/src/App.js",
        language: "javascript",
        type: "frontend",
        step: 0,
      },
      {
        idxego: xegoId,
        name: "App.js",
        content: `import React, { useEffect, useState } from "react";

export default function App() {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    fetch("/api/tasks")
      .then(res => res.json())
      .then(data => setTasks(data));
  }, []);

  return (
    <ul>
      {tasks.map(task => (
        <li key={task.id}>{task.text}</li>
      ))}
    </ul>
  );
}`,
        path: "/src/App.js",
        language: "javascript",
        type: "frontend",
        step: 5,
      },
    ];

    await XegoFile.insertMany(files);
    console.log("✅ XegoFiles created successfully.");
  } catch (error) {
    console.error("❌ Error creating XegoFiles:", error);
  } finally {
    await mongoose.disconnect();
  }
}

run();