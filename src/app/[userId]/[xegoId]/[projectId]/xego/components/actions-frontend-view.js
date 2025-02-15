'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { FaPlay, FaSun, FaMoon, FaCode, FaPaintBrush } from 'react-icons/fa'; // Opcional: Importa íconos para mejorar el UI

export function ActionsFrontendView({ editorRef, currentTheme, toggleTheme }) {
  const [selectedLanguage, setSelectedLanguage] = useState('javascript'); // Lenguaje por defecto
  const [isMenuOpen, setIsMenuOpen] = useState(false); // Estado para el menú de acciones
  const [isLanguageMenuOpen, setIsLanguageMenuOpen] = useState(false); // Estado para el menú de lenguajes
  const [timeoutId, setTimeoutId] = useState(null); // ID del temporizador
  const [languageTimeoutId, setLanguageTimeoutId] = useState(null); // ID del temporizador para el menú de lenguajes

  const handleLanguageChange = (language) => {
    setSelectedLanguage(language);
    if (editorRef.current) {
      editorRef.current.changeLanguage(language);
    }
  };

  const handleMouseEnter = () => {
    setIsMenuOpen(true);
    if (timeoutId) {
      clearTimeout(timeoutId); // Limpiar el temporizador si el mouse entra
    }
  };

  const handleMouseLeave = () => {
    const id = setTimeout(() => {
      setIsMenuOpen(false);
      setIsLanguageMenuOpen(false);
    }, 7000);
    setTimeoutId(id);
  };

  const handleLanguageMouseEnter = () => {
    setIsLanguageMenuOpen(true);
    if (languageTimeoutId) {
      clearTimeout(languageTimeoutId); // Limpiar el temporizador si el mouse entra
    }
  };

  const handleLanguageMouseLeave = () => {
    const id = setTimeout(() => {
      setIsLanguageMenuOpen(false);
    }, 2000); // Esperar 2 segundos antes de cerrar el menú de lenguajes
    setLanguageTimeoutId(id);
  };

  return (
    <div className="fixed bottom-4 right-4 w-256">
      <div className="relative group flex justify-end" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
        <Button className="bg-blue-600 hover:bg-blue-700 flex items-center">
          <FaPlay className="mr-2" /> Run
        </Button>
        {(isMenuOpen || isLanguageMenuOpen) && (
          <div className="absolute bottom-12 right-0 flex flex-col gap-2 transition-opacity duration-300">
            <Button onClick={toggleTheme} className="bg-gray-600 hover:bg-gray-700 flex items-center">
              {currentTheme === 'vs-dark' ? <FaSun className="mr-2" /> : <FaMoon className="mr-2" />} Cambiar Tema
            </Button>
            <div className="">
              <Button 
                className="bg-green-600 hover:bg-green-700 flex items-center"
                onMouseEnter={handleLanguageMouseEnter} 
                onMouseLeave={handleLanguageMouseLeave}
              >
                <FaCode className="mr-2" /> Seleccionar Lenguaje
              </Button>
              {isLanguageMenuOpen && (
                <div className="absolute left-0 mt-1 w-48 bg-white border border-gray-300 rounded shadow-lg z-10">
                  {['html', 'css', 'javascript', 'typescript', 'java', 'python'].map((language) => (
                    <Button
                      key={language}
                      onClick={() => handleLanguageChange(language)}
                      className={`w-full text-left px-4 py-2 hover:bg-gray-200 ${selectedLanguage === language ? 'font-bold' : ''}`}
                    >
                      {language.charAt(0).toUpperCase() + language.slice(1)}
                    </Button>
                  ))}
                </div>
              )}
            </div>
            <Button onClick={() => editorRef.current?.formatCode()} className="bg-purple-600 hover:bg-purple-700 flex items-center">
              <FaPaintBrush className="mr-2" /> Formatear Código
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}