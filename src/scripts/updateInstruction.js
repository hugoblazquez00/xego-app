const mongoose = require("mongoose");
require("dotenv").config();
const Instruction = require("../app/lib/modals/instruction.js");

(async function run() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);

    const instructionId = "67f54ef4a712bd907058372b";

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
      console.log("⚠️ Instruction not found");
    } else {
      console.log("✅ Instruction updated:", updatedInstruction);
    }
  } catch (error) {
    console.error("❌ Error updating instruction:", error);
  } finally {
    await mongoose.disconnect();
  }
})();