import { Schema, model, models } from "mongoose";

const FileSchema = new Schema({
  idproject: { type: Schema.Types.ObjectId, ref: "Project", required: true },
  name: { type: String, required: true }, // Nombre del archivo
  content: { type: String, required: true }, // Contenido del archivo
  path: { type: String, required: true }, // Ruta del archivo dentro del proyecto
  language: { type: String, required: true }, // Lenguaje de programación del archivo
  type: { type: String, required: true }, // Tipo de archivo (ej. "file", "folder")
  __v: { type: Number, default: 0 },
  modtime: { type: Date, default: Date.now }, // Última modificación
  createdAt: { type: Date, default: Date.now }, // Fecha de creación
  updatedAt: { type: Date, default: Date.now }, // Fecha de última actualización
});

const File = models.File || model("File", FileSchema, "files");

export default File; 