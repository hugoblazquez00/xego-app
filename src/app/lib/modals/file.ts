import { Schema, model, models } from "mongoose";

const FileSchema = new Schema({
  idproject: { type: Schema.Types.ObjectId, ref: "Project", required: true },
  name: { type: String, required: true },
  content: { type: String, required: false },
  path: { type: String, required: true },
  language: { type: String, required: false },
  type: { type: String, required: true },
  __v: { type: Number, default: 0 },
  modtime: { type: Date, default: Date.now },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

const File = models.File || model("File", FileSchema, "files");

export default File; 