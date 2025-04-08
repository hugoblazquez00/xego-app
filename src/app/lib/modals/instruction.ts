import { Schema, model, models } from "mongoose";

const InstructionSchema = new Schema({
  xegoId: { type: Schema.Types.ObjectId, ref: "Xego", required: true },
  step: { type: Number, required: true },
  activityTitle: { type: String, required: true },
  taskTitle: { type: String, required: true },
  description: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

const Instruction = models.Instruction || model("Instruction", InstructionSchema, "instructions");

export default Instruction;