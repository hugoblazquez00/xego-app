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

const Instruction = mongoose.models.Instruction || mongoose.model("Instruction", InstructionSchema, "instructions");

(async function run() {
  try {
    console.log("Connecting to DB:", process.env.MONGODB_URI);
    await mongoose.connect(process.env.MONGODB_URI);

    const instructionId = new mongoose.Types.ObjectId("67f54ef4a712bd907058372b");

    
    const updatedInstruction = await Instruction.findByIdAndUpdate(
      instructionId,
      {
        activityTitle: "Initial Structure Setup",
        taskTitle: "Create the App.js file",
        description: "Create a file called `App.js` inside the `src/` directory. This will serve as the entry point for your application.",
        updatedAt: new Date(),
      },
      { new: true }
    );

    if (!updatedInstruction) {
      console.log(" Instruction not found");
    } else {
      console.log(" Instruction updated:", updatedInstruction);
    }
  } catch (error) {
    console.error(" Error updating instruction:", error);
  } finally {
    await mongoose.disconnect();
  }
})();