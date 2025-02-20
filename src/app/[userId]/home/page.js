"use client";
import { useEffect, useState } from 'react';
import ProjectCard from '@/app/components/projectCard';
import React from 'react';
import { fetchProjects } from '../../utils/api';

export default function Home({ params }) {
  const userId = React.use(params).userId; 
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadProjects = async () => {
      try {
        const data = await fetchProjects(userId); // Usar la función importada
        console.log("----------------------------------------\nHome - (/home) - List of Projects for user id ", userId, ": ", data, "\n----------------------------------------\n");
        setProjects(data);
      } catch (error) {
        console.error("Error fetching projects:", error); 
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    loadProjects();
  }, [userId]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="grid grid-cols-4 gap-2 p-4">
      {projects.map((project, index) => (
        <ProjectCard key={index} project={project} />
      ))}
    </div>
  );
}