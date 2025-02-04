"use client";
import { useEffect, useState } from 'react';
import XegoCard from '@/app/components/xegoCard';

export default function Home() {
  const [xegoProjects, setXegoProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchXegos = async () => {
      try {
        const response = await fetch('/api/xegos');
        if (response.ok) {
          const data = await response.json();
          setXegoProjects(data);
        } else {
          throw new Error("Error fetching Xegos");
        }
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false); // Terminamos la carga
      }
    };

    fetchXegos();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="grid grid-cols-2 ">
      {xegoProjects.map((xego, index) => (
        <XegoCard key={index} xego={xego} />
      ))}
    </div>
  );
}