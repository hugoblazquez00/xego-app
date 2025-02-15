"use client";

import React from "react";
import TestDockPage from "./test-dock"; // Importar el componente de prueba

const TestPage = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-2xl mb-4">Página de Prueba del Dock</h1>
      <TestDockPage /> {/* Renderizar el componente de prueba */}
    </div>
  );
};

export default TestPage;
