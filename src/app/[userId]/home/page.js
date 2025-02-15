"use client";
import { useEffect, useState } from 'react';
import ProjectCard from '@/app/components/projectCard';
import React from 'react';

export default function Home({ params }) {
  const userId = React.use(params).userId; 
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await fetch(`/api/projects?userID=${userId}`); 
       
        if (response.ok) {
          const data = await response.json();
          console.log("----------------------------------------\nHome - (/home) - List of Projects for user id ", userId, ": ", data, "\n----------------------------------------\n");
      
          setProjects(data);
        } else {
          throw new Error("Error fetching projects");
        }
      } catch (error) {
        console.error("Error fetching projects:", error); 
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, [userId]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="grid grid-cols-2">
      {projects.map((project, index) => (
        <ProjectCard key={index} project={project} />
      ))}
    </div>
  );
}