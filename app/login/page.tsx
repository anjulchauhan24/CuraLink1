"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card } from "@/components/ui/card"
import Navigation from "@/components/navigation"
import { useAuth } from "@/lib/auth-context"

export default function LoginPage() {
  const [userType, setUserType] = useState<"patient" | "researcher" | null>(null)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()
  const { login } = useAuth()

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    // Simulate login
    setTimeout(() => {
      login({
        id: Math.random().toString(36).substr(2, 9),
        name: email.split("@")[0],
        email: email,
        type: userType!,
      })

      if (userType === "patient") {
        router.push("/patient/dashboard")
      } else if (userType === "researcher") {
        router.push("/researcher/dashboard")
      }
      setIsLoading(false)
    }, 1000)
  }

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <div className="pt-24 pb-12 px-4 sm:px-6 lg:px-8 flex items-center justify-center min-h-[calc(100vh-6rem)]">
        <div className="w-full max-w-md">
          <Card className="p-10 space-y-8 border-2 shadow-xl">
            <div className="text-center">
              <h1 className="text-4xl font-bold text-foreground mb-3">Welcome Back</h1>
              <p className="text-lg text-muted-foreground">Sign in to your account</p>
            </div>

            {!userType ? (
              <div className="space-y-4">
                <button
                  onClick={() => setUserType("patient")}
                  className="w-full p-6 rounded-2xl border-2 border-border hover:border-primary hover:bg-primary/5 transition-all space-y-3 group"
                >
                  <div className="text-4xl group-hover:scale-110 transition-transform">👤</div>
                  <h3 className="font-bold text-lg text-foreground">I'm a Patient</h3>
                  <p className="text-sm text-muted-foreground">Find clinical trials</p>
                </button>
                <button
                  onClick={() => setUserType("researcher")}
                  className="w-full p-6 rounded-2xl border-2 border-border hover:border-secondary hover:bg-secondary/5 transition-all space-y-3 group"
                >
                  <div className="text-4xl group-hover:scale-110 transition-transform">🔬</div>
                  <h3 className="font-bold text-lg text-foreground">I'm a Researcher</h3>
                  <p className="text-sm text-muted-foreground">Manage trials</p>
                </button>
              </div>
            ) : (
              <form onSubmit={handleLogin} className="space-y-6">
                <div>
                  <button
                    type="button"
                    onClick={() => setUserType(null)}
                    className="text-sm text-primary hover:text-primary/80 mb-6 font-medium"
                  >
                    ← Back
                  </button>
                  <label className="block text-sm font-semibold mb-2 text-foreground">Email</label>
                  <Input
                    type="email"
                    placeholder="you@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="h-12"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold mb-2 text-foreground">Password</label>
                  <Input
                    type="password"
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="h-12"
                  />
                </div>
                <Button type="submit" disabled={isLoading} className="w-full h-12 text-base font-semibold rounded-xl">
                  {isLoading ? "Signing in..." : "Sign In"}
                </Button>
                <div className="text-center pt-2">
                  <p className="text-sm text-muted-foreground">
                    Don't have an account?{" "}
                    <Link
                      href={userType === "patient" ? "/join" : "/researcher"}
                      className="text-primary hover:text-primary/80 font-semibold"
                    >
                      Sign up
                    </Link>
                  </p>
                </div>
              </form>
            )}
          </Card>
        </div>
      </div>
    </div>
  )
}
