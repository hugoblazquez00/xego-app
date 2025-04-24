'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { FaPlay, FaSun, FaMoon, FaCode, FaPaintBrush } from 'react-icons/fa';

export function ActionsFrontendView({ editorRef, currentTheme, toggleTheme }) {
  const [selectedLanguage, setSelectedLanguage] = useState('javascript');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLanguageMenuOpen, setIsLanguageMenuOpen] = useState(false);
  const [timeoutId, setTimeoutId] = useState(null);
  const [languageTimeoutId, setLanguageTimeoutId] = useState(null);

  const handleLanguageChange = (language) => {
    setSelectedLanguage(language);
    if (editorRef.current) {
      editorRef.current.changeLanguage(language);
    }
  };

  const handleMouseEnter = () => {
    setIsMenuOpen(true);
    if (timeoutId) {
      clearTimeout(timeoutId);
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
      clearTimeout(languageTimeoutId); 
    }
  };

  const handleLanguageMouseLeave = () => {
    const id = setTimeout(() => {
      setIsLanguageMenuOpen(false);
    }, 2000); 
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
              {currentTheme === 'vs-dark' ? <FaSun className="mr-2" /> : <FaMoon className="mr-2" />} Change theme
            </Button>
            <div className="">
              <Button 
                className="bg-green-600 hover:bg-green-700 flex items-center"
                onMouseEnter={handleLanguageMouseEnter} 
                onMouseLeave={handleLanguageMouseLeave}
              >
                <FaCode className="mr-2" /> Select Language
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
              <FaPaintBrush className="mr-2" /> Format Code
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}