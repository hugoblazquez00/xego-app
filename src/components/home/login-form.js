"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { loginUser } from "@/app/utils/api";
import { signIn } from "next-auth/react";
import { Mail, Lock, Github } from 'lucide-react';
import { FaGoogle } from "react-icons/fa";

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

  const handleSocialLogin = async (provider) => {
    try {
      await signIn(provider, { callbackUrl: "/post-auth" });
    } catch (error) {
      setError("Social login failed. Please try again.");
    }
  };

  return (
    <div className="min-h-screen   flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-[#275eff] rounded-2xl mb-6">
            <Lock className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2  dark:text-white">Welcome back</h1>
          <p className="text-gray-600 dark:text-[#275eff]">Sign in to your account to continue</p>
        </div>

        {/* Main Card */}
        <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Username Field */}
            <div>
              <label htmlFor="username" className="block text-sm font-semibold text-gray-700 mb-2">
                Username
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="username"
                  name="username"
                  type="text"
                  autoComplete="username"
                  required
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#275eff] focus:border-transparent transition-all duration-200 bg-gray-50 focus:bg-white"
                  placeholder="Enter your username"
                />
              </div>
            </div>

            {/* Password Field */}
            <div>
              <label htmlFor="password" className="block text-sm font-semibold text-gray-700 mb-2">
                Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#275eff] focus:border-transparent transition-all duration-200 bg-gray-50 focus:bg-white"
                  placeholder="Enter your password"
                />
              </div>
            </div>

            {/* Error/Success Messages */}
            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl text-sm">
                {error}
              </div>
            )}
            {success && (
              <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-xl text-sm">
                {success}
              </div>
            )}

            {/* Sign In Button */}
            <button
              type="submit"
              className="w-full bg-[#275eff] hover:bg-[#1e4cd1] text-white font-semibold py-3 px-4 rounded-xl transition-all duration-200 transform hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-[#275eff] focus:ring-offset-2 shadow-lg"
            >
              Sign in
            </button>
          </form>

          {/* Divider */}
          <div className="my-8">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-200" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="bg-white px-4 text-gray-500 font-medium">Or continue with</span>
              </div>
            </div>
          </div>

          {/* Social Login Buttons */}
          <div className="grid grid-cols-2 gap-4">
            <button
              onClick={() => handleSocialLogin("google")}
              type="button"
              className="flex items-center justify-center px-4 py-3 border border-gray-200 rounded-xl hover:bg-gray-50 transition-all duration-200 group"
            >
              <FaGoogle className="h-5 w-5 text-red-500 group-hover:scale-110 transition-transform" />
              <span className="ml-2 text-sm font-medium text-gray-700">Google</span>
            </button>

            <button
              onClick={() => handleSocialLogin("github")}
              type="button"
              className="flex items-center justify-center px-4 py-3 border border-gray-200 rounded-xl hover:bg-gray-50 transition-all duration-200 group"
            >
              <Github className="h-5 w-5 text-gray-700 group-hover:scale-110 transition-transform" />
              <span className="ml-2 text-sm font-medium text-gray-700">GitHub</span>
            </button>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center mt-8">
          <p className="text-gray-600 dark:text-white">
            {"Don't have an account? "}
            <a href="/register" className="text-[#275eff] hover:text-[#1e4cd1] font-semibold transition-colors">
              Sign up
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
