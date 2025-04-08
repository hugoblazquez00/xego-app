import { Schema, model, models } from "mongoose";

const XegoFileSchema = new Schema({
  idxego: { type: Schema.Types.ObjectId, ref: "Xego", required: true },
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

const XegoFile = models.XegoFile || model("XegoFile", XegoFileSchema, "xegofiles");

export default XegoFile; 