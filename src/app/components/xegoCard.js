"use client"
import React from 'react';
import { useRouter } from "next/navigation"

const XegoCard = ({ xego }) => {
  const router = useRouter();

  const handleClick = () => {
    router.push(`/${xego.id}/xego`)
  };

  return (
    <div onClick={handleClick} className="border rounded-lg p-4 w-80 h-96 flex flex-col cursor-pointer">
      <div className="flex justify-between mb-2">
        <span className="bg-gray-200 px-2 py-1 rounded text-sm">
          {xego.difficulty}
        </span>
        <span className="bg-gray-100 px-2 py-1 rounded text-sm">
          {xego.category}
        </span>
      </div>
      
      <h2 className="text-xl font-bold mb-2">{xego.title}</h2>
      
      <p className="text-gray-600 mb-4 flex-grow overflow-hidden">
        {xego.description}
      </p>
      
      <div className="mb-4">
        <h3 className="font-semibold mb-2">Technologies:</h3>
        <div className="flex flex-wrap gap-1">
          {xego.technologies.map((tech, index) => (
            <span 
              key={index} 
              className="bg-gray-100 px-1 py-0.5 rounded text-xs"
            >
              {tech}
            </span>
          ))}
        </div>
      </div>
      
      <div className="text-sm text-gray-500">
        {xego.views} Views
      </div>
    </div>
  );
};

export default XegoCard;