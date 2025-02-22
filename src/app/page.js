"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { verifyUser } from './utils/api';

export default function HomePage() {
  const [userId, setUserId] = useState("");
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (userId) {
      try {
        const user = await verifyUser(userId);
        console.log("----------------------------------------\nLogin - (/) - User: ", user, "\n----------------------------------------\n");
        if (user) {
          router.push(`/${userId}/home`);
        } else {
          alert("User not found, verify userid");
        }
      } catch (error) {
        alert("UserId Verification error.");
        console.error(error);
      }
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-2xl font-bold mb-4">Ingrese su ID de Usuario =  67ae59b48b24598b6bafaa29</h1>
      <form onSubmit={handleSubmit} className="flex flex-col items-center">
        <input
          type="text"
          value={userId}
          onChange={(e) => setUserId(e.target.value)}
          placeholder="ID de Usuario"
          className="border p-2 mb-4"
        />
        <button type="submit" className="bg-blue-500 text-white p-2 rounded">
          Enviar
        </button>
      </form>
    </div>
  );
}
