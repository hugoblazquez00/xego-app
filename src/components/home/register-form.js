"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { signIn } from "next-auth/react"
import { Eye, EyeOff, Mail, Lock, User, AlertCircle } from "lucide-react"
import { FaGoogle } from "react-icons/fa"
import { Github } from "lucide-react"

export default function RegisterForm() {
  const router = useRouter()
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [error, setError] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError("")

    if (password !== confirmPassword) {
      setError("Passwords do not match")
      return
    }

    setIsLoading(true)
    try {
      const response = await fetch("/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          email,
          password,
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.message || "Registration failed")
      }

      const result = await signIn("credentials", {
        redirect: false,
        email,
        password,
      })

      if (result?.error) {
        setError("Registration successful, but failed to log in.")
        router.push("/login")
      } else {
        router.push("/post-auth")
      }
    } catch (error) {
      console.error("Registration error:", error)
      setError(error.message || "An unexpected error occurred. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  const handleSocialLogin = async (provider) => {
    setIsLoading(true)
    try {
      await signIn(provider, { callbackUrl: "/post-auth" })
    } catch (error) {
      console.error(`${provider} login error:`, error)
      setError(`Failed to register with ${provider}. Please try again.`)
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen  flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-[#275eff] rounded-2xl mb-6">
            <User className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2 dark:text-white">Create account</h1>
          <p className="text-gray-600 dark:text-[#275eff]">
            Already have an account?{" "}
            <Link href="/login" className="text-[#275eff] hover:text-[#1e4cd1] dark:text-white font-semibold transition-colors">
              Sign in
            </Link>
          </p>
        </div>

        {/* Main Card */}
        <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-8">
          {/* Error Message */}
          {error && (
            <div className="mb-6 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl flex items-center">
              <AlertCircle className="h-5 w-5 mr-2 flex-shrink-0" />
              <span className="text-sm">{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Name Field */}
            <div>
              <label htmlFor="name" className="block text-sm font-semibold text-gray-700 mb-2">
                Full name
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <User className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="name"
                  name="name"
                  type="text"
                  autoComplete="name"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#275eff] focus:border-transparent transition-all duration-200 bg-gray-50 focus:bg-white"
                  placeholder="John Doe"
                />
              </div>
            </div>

            {/* Email Field */}
            <div>
              <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-2">
                Email address
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#275eff] focus:border-transparent transition-all duration-200 bg-gray-50 focus:bg-white"
                  placeholder="you@example.com"
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
                  type={showPassword ? "text" : "password"}
                  autoComplete="new-password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-12 pr-12 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#275eff] focus:border-transparent transition-all duration-200 bg-gray-50 focus:bg-white"
                  placeholder="Create a strong password"
                />
                <div className="absolute inset-y-0 right-0 pr-4 flex items-center">
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="text-gray-400 hover:text-gray-600 focus:outline-none transition-colors"
                  >
                    {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                  </button>
                </div>
              </div>
            </div>

            {/* Confirm Password Field */}
            <div>
              <label htmlFor="confirmPassword" className="block text-sm font-semibold text-gray-700 mb-2">
                Confirm password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="confirmPassword"
                  name="confirmPassword"
                  type={showConfirmPassword ? "text" : "password"}
                  autoComplete="new-password"
                  required
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="w-full pl-12 pr-12 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#275eff] focus:border-transparent transition-all duration-200 bg-gray-50 focus:bg-white"
                  placeholder="Confirm your password"
                />
                <div className="absolute inset-y-0 right-0 pr-4 flex items-center">
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="text-gray-400 hover:text-gray-600 focus:outline-none transition-colors"
                  >
                    {showConfirmPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                  </button>
                </div>
              </div>
            </div>

            {/* Terms Checkbox */}
            <div className="flex items-start">
              <input
                id="terms"
                name="terms"
                type="checkbox"
                required
                className="h-4 w-4 text-[#275eff] focus:ring-[#275eff] border-gray-300 rounded mt-1"
              />
              <label htmlFor="terms" className="ml-3 block text-sm text-gray-700">
                I agree to the{" "}
                <Link href="/terms" className="text-[#275eff] hover:text-[#1e4cd1] font-semibold transition-colors">
                  Terms of Service
                </Link>{" "}
                and{" "}
                <Link href="/privacy" className="text-[#275eff] hover:text-[#1e4cd1] font-semibold transition-colors">
                  Privacy Policy
                </Link>
              </label>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-[#275eff] hover:bg-[#1e4cd1] text-white font-semibold py-3 px-4 rounded-xl transition-all duration-200 transform hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-[#275eff] focus:ring-offset-2 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
            >
              {isLoading ? (
                <div className="flex items-center justify-center">
                  <svg
                    className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  Creating account...
                </div>
              ) : (
                "Create account"
              )}
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
              disabled={isLoading}
              className="flex items-center justify-center px-4 py-3 border border-gray-200 rounded-xl hover:bg-gray-50 transition-all duration-200 group disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <FaGoogle className="h-5 w-5 text-red-500 group-hover:scale-110 transition-transform" />
              <span className="ml-2 text-sm font-medium text-gray-700">Google</span>
            </button>

            <button
              onClick={() => handleSocialLogin("github")}
              type="button"
              disabled={isLoading}
              className="flex items-center justify-center px-4 py-3 border border-gray-200 rounded-xl hover:bg-gray-50 transition-all duration-200 group disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Github className="h-5 w-5 text-gray-700 group-hover:scale-110 transition-transform" />
              <span className="ml-2 text-sm font-medium text-gray-700">GitHub</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
