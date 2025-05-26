"use client"
import { useEffect } from "react"
import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"

export default function PostAuth() {
  const { data: session, status } = useSession()
  const router = useRouter()

  useEffect(() => {
    if (status === "loading") return

    if (session?.user?.id) {
      router.push(`/${session.user.id}/home`)
    } else {
      router.push("/login") 
    }
  }, [session, status, router])

  return <p className="text-center mt-10 text-gray-600">Redirecting...</p>
}