"use client";
import { useEffect, useState } from 'react';
import { useRouter } from "next/navigation";
import ProjectCard from '@/app/[userId]/[xegoId]/[projectId]/xego/components/projectCard';
import NewProjectModal from "@/app/[userId]/[xegoId]/[projectId]/xego/components//NewProjectModal"
import { fetchProjects } from '@/app/utils/api';
import { PlusCircle } from "lucide-react"
import Navbar from "@/app/[userId]/[xegoId]/[projectId]/xego/components/navbarHome"

export default function Home({ params }) {
  const userId = params.userId; 
  const router = useRouter();
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [username, setUsername] = useState("")

  useEffect(() => {
    const loadProjects = async () => {
      try {
        const data = await fetchProjects(userId);
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

  useEffect(() => {
    // Simulate fetching user data
    const fetchUserData = async () => {
      // This would be replaced with an actual API call
      setUsername("testUser")
    }

    fetchUserData()
  }, [])

  useEffect(() => {
    const loadProjects = async () => {
      try {
        const data = await fetchProjects(userId)
        console.log(
          "----------------------------------------\nHome - (/home) - List of Projects for user id ",
          userId,
          ": ",
          data,
          "\n----------------------------------------\n",
        )
        setProjects(data)
      } catch (error) {
        console.error("Error fetching projects:", error)
        setError(error.message)
      } finally {
        setLoading(false)
      }
    }

    loadProjects()
  }, [userId])

  const handleNewProject = (newProject) => {
    // This would typically involve an API call to create the project
    // For now, we'll just add it to the local state
    setProjects([...projects, newProject])
    setIsModalOpen(false)
  }

  if (loading)
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#275eff]"></div>
      </div>
    )

  if (error)
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
          <strong className="font-bold">Error: </strong>
          <span className="block sm:inline">{error}</span>
        </div>
      </div>
    )

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 py-4 px-6">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-3xl font-bold text-gray-900">XEGO</h1>
          <div className="flex space-x-4">
            <button className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center">
              <span className="sr-only">Notifications</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 text-gray-600"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
                />
              </svg>
            </button>
            <button className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center">
              <span className="sr-only">Profile</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 text-gray-600"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                />
              </svg>
            </button>
          </div>
        </div>
      </header>

      {/* Navigation */}
      <Navbar userId={userId} />

      <main className="container mx-auto px-6 pb-12">
        {/* Welcome Banner */}
        <div className="bg-[#275eff] rounded-lg p-6 mb-8">
          <h2 className="text-2xl font-bold text-white">Welcome back {username}!</h2>
        </div>

        {/* Continue with section */}
        <div className="mb-8">
          <h3 className="text-xl font-medium text-gray-800 mb-4">Continue with:</h3>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((project, index) => (
              <ProjectCard key={index} project={project} />
            ))}

            {/* New Project Button */}
            <button
              onClick={() => setIsModalOpen(true)}
              className="border-2 border-dashed border-gray-300 rounded-lg p-6 h-96 flex flex-col items-center justify-center text-gray-500 hover:border-[#275eff] hover:text-[#275eff] transition-colors"
            >
              <PlusCircle className="w-16 h-16 mb-4" />
              <span className="text-lg font-medium">Iniciar nuevo proyecto</span>
            </button>
          </div>
        </div>
      </main>

      {/* New Project Modal */}
      {isModalOpen && (
        <NewProjectModal onClose={() => setIsModalOpen(false)} onCreateProject={handleNewProject} userId={userId} />
      )}
    </div>
  )
}
