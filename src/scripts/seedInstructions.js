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
        step: 14,
        activityTitle: "Edit items",
        taskTitle: "Add an edit button",
        description: "Next to each task, add a button labeled 'Edit'. This will allow users to modify tasks.",
      },
      {
        xegoId,
        step: 15,
        activityTitle: "Edit items",
        taskTitle: "Track the task being edited",
        description: "Create a state variable `editingTaskId` to keep track of which task is currently being edited.",
      },
      {
        xegoId,
        step: 16,
        activityTitle: "Edit items",
        taskTitle: "Render input for editing",
        description: "If a task is being edited, show an input field instead of the title and update its state.",
      },
      {
        xegoId,
        step: 17,
        activityTitle: "Edit items",
        taskTitle: "Save edited task",
        description: "When the edit form is submitted, send a PUT request to `/api/tasks/{id}` and refresh the task list.",
      }
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