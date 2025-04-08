import mongoose from "mongoose";
import dotenv from "dotenv";
import Instruction from "@/app/lib/modals/instruction";

// Cargar variables de entorno
dotenv.config();

async function run() {
  try {
    await mongoose.connect(process.env.MONGO_URI as string);

    const xegoId = "67ae561601ba5bfb4eb4a9d2";

    const instructions = [
      {
        xegoId,
        step: 0,
        activityTitle: "Estructura inicial",
        taskTitle: "Crea el archivo App.js",
        description: "Crea un archivo llamado `App.js` dentro de la carpeta `src/` como punto de partida del proyecto.",
      },
      {
        xegoId,
        step: 1,
        activityTitle: "Diseña la cabecera",
        taskTitle: "Crea el componente Header.js",
        description: "Crea un componente `Header.js` dentro de `src/components` con un título para tu app.",
      },
      // Añade más instrucciones según lo necesites
    ];

    await Instruction.insertMany(instructions);

    console.log("Instrucciones creadas con éxito ✅");
  } catch (error) {
    console.error("Error al crear instrucciones:", error);
  } finally {
    await mongoose.disconnect();
  }
}

run();