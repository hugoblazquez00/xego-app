import { Schema, model, models } from "mongoose";

const XegoSchema = new Schema(
  {
    title: { type: String, required: true }, // Título del Xego (nombre del proyecto)
    description: { type: String, required: true }, // Descripción del Xego
    difficulty: { type: String, enum: ["Beginner", "Intermediate", "Advanced"], required: true }, // Nivel de dificultad
    category: { type: String, required: true }, // Categoría del Xego (ej. "Full-stack", "Backend", "Database")
    technologies: [{ type: String, required: true }], // Lista de tecnologías utilizadas (ej. "React", "MongoDB")
    steps: [
      {
        stepNumber: { type: Number, required: true }, // Número del paso
        instruction: { type: String, required: true }, // Instrucción del paso
        codeSnippet: { type: String }, // Fragmento de código para el paso
      },
    ], // Lista de pasos que guían el proyecto
    createdBy: { type: Schema.Types.ObjectId, ref: "User", required: true }, // Referencia al usuario que lo creó
    aiEnabled: { type: Boolean, default: true }, // Si incluye o no asistencia con IA
    views: { type: Number, default: 0 }, // Contador de visualizaciones
    downloads: { type: Number, default: 0 }, // Contador de descargas
    isPublished: { type: Boolean, default: false }, // Estado de publicación
    files: [{ type: Schema.Types.ObjectId, ref: "XegoFile" }],
  },
  {
    timestamps: true, // Agrega campos "createdAt" y "updatedAt" automáticamente
  }
);

// Comprueba si ya existe el modelo
const Xego = models.Xego || model("Xego", XegoSchema, "xegos");

export default Xego;