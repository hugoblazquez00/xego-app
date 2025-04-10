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
        name: "src",
        path: "/src",
        type: "folder",
        step: 1,
      },
      {
        idxego: xegoId,
        name: "index.jsx",
        content: `import * as React from "react";
import * as ReactDOM from "react-dom/client";
import App from "./App.js";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);`,
        path: "/src/index.jsx",
        language: "javascript",
        type: "file",
        step: 1,
      },
      {
        idxego: xegoId,
        name: "App.js",
        content: `import React from "react";

export default function App() {
  return <div>My App</div>;
}`,
        path: "/src/App.js",
        language: "javascript",
        type: "file",
        step: 1,
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