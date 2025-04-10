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

    const files = [];

      files.push(
        {
          idxego: xegoId,
          name: "App.jsx",
          content: `import React, { useEffect, useState } from "react";

export default function App() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");

  const fetchTasks = () => {
    fetch("/api/tasks")
      .then(res => res.json())
      .then(data => setTasks(data))
      .catch(err => console.error(err));
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const handleDelete = async (id) => {
    await fetch(\`/api/tasks/\${id}\`, { method: "DELETE" });
    fetchTasks();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await fetch("/api/tasks", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title: newTask }),
    });
    setNewTask("");
    fetchTasks();
  };

  return (
    <div>
      <h1>My App</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text" 
          value={newTask} 
          onChange={(e) => setNewTask(e.target.value)} 
        />
        <button type="submit">Add Task</button>
      </form>
      <ul>
        {tasks.map((task) => (
          <li key={task._id}>
            {task.title}
            <button onClick={() => handleDelete(task._id)}>Delete</button>
            <button>Edit</button>
          </li>
        ))}
      </ul>
    </div>
  );
}`,
          path: "/src/App.jsx",
          language: "javascript",
          type: "file",
          step: 14,
        },
        {
          idxego: xegoId,
          name: "App.jsx",
          content: `import React, { useEffect, useState } from "react";

export default function App() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");
  const [editingTaskId, setEditingTaskId] = useState(null);

  const fetchTasks = () => {
    fetch("/api/tasks")
      .then(res => res.json())
      .then(data => setTasks(data))
      .catch(err => console.error(err));
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const handleDelete = async (id) => {
    await fetch(\`/api/tasks/\${id}\`, { method: "DELETE" });
    fetchTasks();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await fetch("/api/tasks", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title: newTask }),
    });
    setNewTask("");
    fetchTasks();
  };

  return (
    <div>
      <h1>My App</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text" 
          value={newTask} 
          onChange={(e) => setNewTask(e.target.value)} 
        />
        <button type="submit">Add Task</button>
      </form>
      <ul>
        {tasks.map((task) => (
          <li key={task._id}>
            {task.title}
            <button onClick={() => handleDelete(task._id)}>Delete</button>
            <button onClick={() => setEditingTaskId(task._id)}>Edit</button>
          </li>
        ))}
      </ul>
    </div>
  );
}`,
          path: "/src/App.jsx",
          language: "javascript",
          type: "file",
          step: 15,
        },
        {
          idxego: xegoId,
          name: "App.jsx",
          content: `import React, { useEffect, useState } from "react";

export default function App() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");
  const [editingTaskId, setEditingTaskId] = useState(null);
  const [editingValue, setEditingValue] = useState("");

  const fetchTasks = () => {
    fetch("/api/tasks")
      .then(res => res.json())
      .then(data => setTasks(data))
      .catch(err => console.error(err));
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const handleDelete = async (id) => {
    await fetch(\`/api/tasks/\${id}\`, { method: "DELETE" });
    fetchTasks();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await fetch("/api/tasks", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title: newTask }),
    });
    setNewTask("");
    fetchTasks();
  };

  return (
    <div>
      <h1>My App</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text" 
          value={newTask} 
          onChange={(e) => setNewTask(e.target.value)} 
        />
        <button type="submit">Add Task</button>
      </form>
      <ul>
        {tasks.map((task) => (
          <li key={task._id}>
            {editingTaskId === task._id ? (
              <input
                value={editingValue}
                onChange={(e) => setEditingValue(e.target.value)}
              />
            ) : (
              task.title
            )}
            <button onClick={() => handleDelete(task._id)}>Delete</button>
            <button onClick={() => {
              setEditingTaskId(task._id);
              setEditingValue(task.title);
            }}>Edit</button>
          </li>
        ))}
      </ul>
    </div>
  );
}`,
          path: "/src/App.jsx",
          language: "javascript",
          type: "file",
          step: 16,
        },
        {
          idxego: xegoId,
          name: "App.jsx",
          content: `import React, { useEffect, useState } from "react";

export default function App() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");
  const [editingTaskId, setEditingTaskId] = useState(null);
  const [editingValue, setEditingValue] = useState("");

  const fetchTasks = () => {
    fetch("/api/tasks")
      .then(res => res.json())
      .then(data => setTasks(data))
      .catch(err => console.error(err));
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const handleDelete = async (id) => {
    await fetch(\`/api/tasks/\${id}\`, { method: "DELETE" });
    fetchTasks();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await fetch("/api/tasks", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title: newTask }),
    });
    setNewTask("");
    fetchTasks();
  };

  const handleEditSubmit = async (id) => {
    await fetch(\`/api/tasks/\${id}\`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title: editingValue }),
    });
    setEditingTaskId(null);
    setEditingValue("");
    fetchTasks();
  };

  return (
    <div>
      <h1>My App</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text" 
          value={newTask} 
          onChange={(e) => setNewTask(e.target.value)} 
        />
        <button type="submit">Add Task</button>
      </form>
      <ul>
        {tasks.map((task) => (
          <li key={task._id}>
            {editingTaskId === task._id ? (
              <>
                <input
                  value={editingValue}
                  onChange={(e) => setEditingValue(e.target.value)}
                />
                <button onClick={() => handleEditSubmit(task._id)}>Save</button>
              </>
            ) : (
              <>
                {task.title}
                <button onClick={() => handleDelete(task._id)}>Delete</button>
                <button onClick={() => {
                  setEditingTaskId(task._id);
                  setEditingValue(task.title);
                }}>Edit</button>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}`,
          path: "/src/App.jsx",
          language: "javascript",
          type: "file",
          step: 17,
        }
      );
    

    await XegoFile.insertMany(files);
    console.log("✅ XegoFiles created successfully.");
  } catch (error) {
    console.error("❌ Error creating XegoFiles:", error);
  } finally {
    await mongoose.disconnect();
  }
}

run();