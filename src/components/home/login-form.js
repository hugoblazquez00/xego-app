"use client"
import { useState } from "react";
import { useRouter } from "next/navigation";
import { loginUser } from "@/app/utils/api";

export default function LoginForm() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    try {
      const user = await loginUser(username, password);
      setSuccess(`Welcome, ${user.username}!`);
      router.push(`/${user.id}/home`);
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-sm mx-auto mt-10 p-6 bg-white rounded shadow">
      <h2 className="text-xl font-bold mb-4">Log in</h2>
      <div className="mb-4">
        <label className="block mb-1">Username</label>
        <input
          className="w-full border px-3 py-2 rounded"
          value={username}
          onChange={e => setUsername(e.target.value)}
          required
        />
      </div>
      <div className="mb-4">
        <label className="block mb-1">Password</label>
        <input
          type="password"
          className="w-full border px-3 py-2 rounded"
          value={password}
          onChange={e => setPassword(e.target.value)}
          required
        />
      </div>
      {error && <div className="text-red-500 mb-2">{error}</div>}
      {success && <div className="text-green-600 mb-2">{success}</div>}
      <button type="submit" className="w-full bg-platinum-400 hover:bg-platinum-500 text-white py-2 rounded">
        Log in
      </button>
    </form>
  );
}
