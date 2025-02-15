import { Schema, model, models } from "mongoose";
import Xego from "@/app/lib/modals/xego"; 

const ProjectSchema = new Schema({
  iduser: { type: Schema.Types.ObjectId, ref: "User", required: true },
  idxego: { type: Schema.Types.ObjectId, ref: "Xego", required: true },
  name: { type: String, required: true }, 
  description: { type: String },
  files: [{ type: Schema.Types.ObjectId, ref: "File" }], 
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

const Project = models.Project || model("Project", ProjectSchema, "projects");

export default Project; 