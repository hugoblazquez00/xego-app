"use client"
 import React, { useEffect, useState } from 'react';
 import { useRouter } from "next/navigation"
 
 const difficultyColors = {
   Easy: 'bg-green-200',
   Intermediate: 'bg-yellow-200',
   Hard: 'bg-red-200',
 };
 
 const categoryColors = {
   Frontend: 'bg-blue-200',
   Backend: 'bg-purple-200',
   Database: 'bg-orange-200',
 };
 
 function getRandomColor() {
  const colorConfigs = [
    { bg: 'bg-[#ff27a6]', text: 'text-white' },
    { bg: 'bg-[#fe27ff]', text: 'text-white' },
    { bg: 'bg-[#a427ff]', text: 'text-white' },
    { bg: 'bg-[#27ffec]', text: 'text-black' },
    { bg: 'bg-[#27ff92]', text: 'text-black' },
    { bg: 'bg-[#27ff38]', text: 'text-black' },
  ];
  return colorConfigs[Math.floor(Math.random() * colorConfigs.length)];
}
 
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
     <div onClick={handleClick} className="border border-[#275eff] bg-[#3b72ff] rounded-lg p-4 w-80 h-96 flex flex-col cursor-pointer">
       <div className="flex justify-between mb-2">
         <span className={`px-2 py-1 rounded text-sm ${difficultyColors[xegoData?.difficulty]}`}>
           {xegoData?.difficulty}
         </span>
         <span className={`px-2 py-1 rounded text-sm ${categoryColors[xegoData?.category]}`}>
           {xegoData?.category}
         </span>
       </div>
       
       <h2 className="text-xl font-bold text-[#e8f1ff] mb-2">{project.name}</h2>
       
       <p className="text-gray-200 mb-4 flex-grow overflow-hidden">
         {project.description}
       </p>
       
       <div className="mb-4">
         <h3 className="font-semibold text-white mb-2">Technologies:</h3>
         <div className="flex flex-wrap gap-1">
           {xegoData?.technologies.map((tech, index) => {
             const color = getRandomColor();
             return (
               <span 
                 key={index} 
                 className={`px-1 py-0.5 rounded text-xs ${color.bg} ${color.text}`}
               >
                 {tech}
               </span>
             );
           })}
         </div>
       </div>
       
       <div className="text-sm text-[#bbd3ff]">
         {project.views} Views
       </div>
     </div>
   );
 };
 
 export default ProjectCard; 