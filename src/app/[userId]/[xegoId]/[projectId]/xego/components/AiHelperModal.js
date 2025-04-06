"use client"

import React from 'react';

export function AiHelperModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
      onClick={onClose}
    >
      <div 
        className="bg-white p-6 rounded-lg shadow-xl w-[500px] max-w-[90%]"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="text-xl font-bold mb-4">AI Helper</h2>
        <p>Content del AI Helper</p>
      </div>
    </div>
  );
} 