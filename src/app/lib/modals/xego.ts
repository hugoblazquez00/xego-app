import { Schema, model, models } from "mongoose";

const XegoSchema = new Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    difficulty: { type: String, enum: ["Beginner", "Intermediate", "Advanced"], required: true },
    category: { type: String, required: true },
    technologies: [{ type: String, required: true }],
    steps: [
      {
        stepNumber: { type: Number, required: true },
        instruction: { type: String, required: true },
        codeSnippet: { type: String },
      },
    ],
    createdBy: { type: Schema.Types.ObjectId, ref: "User", required: true },
    aiEnabled: { type: Boolean, default: true },
    views: { type: Number, default: 0 },
    downloads: { type: Number, default: 0 },
    isPublished: { type: Boolean, default: false },
    files: [{ type: Schema.Types.ObjectId, ref: "XegoFile" }],
  },
  {
    timestamps: true,
  }
);

const Xego = models.Xego || model("Xego", XegoSchema, "xegos");

export default Xego;