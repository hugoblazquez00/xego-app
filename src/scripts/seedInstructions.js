const mongoose = require("mongoose");
require("dotenv").config();

const InstructionSchema = new mongoose.Schema({
  xegoId: { type: mongoose.Schema.Types.ObjectId, ref: "Xego", required: true },
  step: { type: Number, required: true },
  activityTitle: { type: String, required: true },
  taskTitle: { type: String, required: true },
  description: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

const Instruction = mongoose.models.Instruction || mongoose.model("Instruction", InstructionSchema);

async function run() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);

    const xegoId = new mongoose.Types.ObjectId("67ae561601ba5bfb4eb4a9d2");

    const instructions = [
      {
        xegoId,
        step: 0,
        activityTitle: "Start the project",
        taskTitle: "Understand the App.js file",
        description: "`App.js` is already created for you inside the `src/` folder. You will use this file as the main entry point of your app, and later you'll import your own components from it to keep things organized.",
      },
      {
        xegoId,
        step: 1,
        activityTitle: "Start the project",
        taskTitle: "Add basic content",
        description: "Inside `App.js`, add a `<div>` with a simple title like 'My App'. Then switch to the Website View to confirm it displays correctly.",
      },
      {
        xegoId,
        step: 2,
        activityTitle: "Display data",
        taskTitle: "Import dependencies",
        description: "At the top of `App.js`, add `import { useEffect, useState } from 'react';` to prepare for data fetching and state handling.",
      },
      {
        xegoId,
        step: 3,
        activityTitle: "Display data",
        taskTitle: "Create a state variable",
        description: "Add `const [tasks, setTasks] = useState([]);` below the imports in `App.js` to store the list of tasks.",
      },
      {
        xegoId,
        step: 4,
        activityTitle: "Display data",
        taskTitle: "Use useEffect to fetch data",
        description: "Inside a `useEffect`, add code to fetch data from `/api/tasks`. You can check the XegoFile for a sample around line 10.",
      },
      {
        xegoId,
        step: 5,
        activityTitle: "Display data",
        taskTitle: "Display the list",
        description: "Use the `.map()` function to render each task inside a `<ul>`. You can see an example near line 20 in the XegoFile.",
      },
      {
        xegoId,
        step: 6,
        activityTitle: "Add items",
        taskTitle: "Create an input field",
        description: "Inside the render section, add an `<input>` and `<button>` inside a `<form>`. Refer to line 30 in the XegoFile for an example.",
      },
      {
        xegoId,
        step: 7,
        activityTitle: "Add items",
        taskTitle: "Store the input value",
        description: "Create a state for the input: `const [newTask, setNewTask] = useState('');`. Use it to control the value of the input field.",
      },
      {
        xegoId,
        step: 8,
        activityTitle: "Add items",
        taskTitle: "Handle form submission",
        description: "In the form’s `onSubmit`, send a POST request to `/api/tasks` using the input value. See line 40 in the XegoFile.",
      },
      {
        xegoId,
        step: 9,
        activityTitle: "Add items",
        taskTitle: "Refresh the list after creation",
        description: "After adding a task, re-fetch the list using `setTasks`. This makes the new task appear on the screen.",
      },
      {
        xegoId,
        step: 10,
        activityTitle: "Delete items",
        taskTitle: "Add a Delete button",
        description: "Inside the map function, add a Delete `<button>` next to each task to allow removal. It can say 'Delete'.",
      },
      {
        xegoId,
        step: 11,
        activityTitle: "Delete items",
        taskTitle: "Implement deletion logic",
        description: "When the Delete button is clicked, send a DELETE request to `/api/tasks`. Look at line 55 in the XegoFile for an example.",
      },
      {
        xegoId,
        step: 12,
        activityTitle: "Delete items",
        taskTitle: "Update the list",
        description: "After deleting a task, re-fetch the list to update the display. Use the Website View to confirm the change.",
      },
      {
        xegoId,
        step: 13,
        activityTitle: "Edit items",
        taskTitle: "Add an Edit button",
        description: "Next to each task, add a button labeled 'Edit'. You’ll use it to enter edit mode for that task.",
      },
      {
        xegoId,
        step: 14,
        activityTitle: "Edit items",
        taskTitle: "Use a temporary input",
        description: "When a task is in edit mode, replace its text with an `<input>` to allow editing.",
      },
      {
        xegoId,
        step: 15,
        activityTitle: "Edit items",
        taskTitle: "Send the update",
        description: "When the user clicks Save, send a PUT or PATCH request with the new task text. You can check line 70 of the XegoFile for guidance.",
      },
      {
        xegoId,
        step: 16,
        activityTitle: "Edit items",
        taskTitle: "Show the updated list",
        description: "After editing a task, refresh the list to reflect the changes. You should see the updated content in the Website View.",
      },
    ];

    await Instruction.insertMany(instructions);

    console.log("Instructions successfully created");
  } catch (error) {
    console.error(" Error creating instructions:", error);
  } finally {
    await mongoose.disconnect();
  }
}

run();