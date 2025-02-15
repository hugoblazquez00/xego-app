"use client"
import React, { useEffect, useState } from 'react';
import { useRouter } from "next/navigation"

const ProjectCard = ({ project }) => {
  const router = useRouter();
  const [xegoData, setXegoData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchXegoData = async () => {
      try {
        console.log("Xegos data received");
        console.log("Xegos data received:", project.idxego);
        
        const response = await fetch(`/api/xegos?xegoID=${project.idxego}`);
        if (response.ok) {
          const data = await response.json();
          console.log("----------------------------------------\nHome - (/home) - Xego with idProject  ", project.idxego, ": ", data, "\n----------------------------------------\n");      
          setXegoData(data);
        } else {
          throw new Error("Error fetching Xego data");
        }
      } catch (error) {
        console.error("Error fetching Xego data:", error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchXegoData();
  }, [project.idxego]);

  const handleClick = () => {
    router.push(`/${project.iduser}/${project.idxego}/${project._id}/xego`);
  };

  if (loading) return <div>Loading Xego data...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div onClick={handleClick} className="border rounded-lg p-4 w-80 h-96 flex flex-col cursor-pointer">
      <div className="flex justify-between mb-2">
        <span className="bg-gray-200 px-2 py-1 rounded text-sm">
          {xegoData?.difficulty}
        </span>
        <span className="bg-gray-100 px-2 py-1 rounded text-sm">
          {xegoData?.category}
        </span>
      </div>
      
      <h2 className="text-xl font-bold mb-2">{project.name}</h2>
      
      <p className="text-gray-600 mb-4 flex-grow overflow-hidden">
        {project.description}
      </p>
      
      <div className="mb-4">
        <h3 className="font-semibold mb-2">Technologies:</h3>
        <div className="flex flex-wrap gap-1">
          {xegoData?.technologies.map((tech, index) => (
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
        {project.views} Views
      </div>
    </div>
  );
};

export default ProjectCard; 