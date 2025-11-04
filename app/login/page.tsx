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
      <div className="pt-32 pb-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md mx-auto">
          <Card className="p-8 space-y-6">
            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold text-foreground mb-2">Welcome Back</h1>
              <p className="text-foreground/70">Sign in to your account</p>
            </div>

            {!userType ? (
              <div className="space-y-4">
                <button
                  onClick={() => setUserType("patient")}
                  className="w-full p-4 rounded-lg border-2 border-border hover:border-primary hover:bg-primary/5 transition space-y-2"
                >
                  <div className="text-3xl">👤</div>
                  <h3 className="font-semibold text-foreground">I'm a Patient</h3>
                  <p className="text-sm text-foreground/70">Find clinical trials</p>
                </button>
                <button
                  onClick={() => setUserType("researcher")}
                  className="w-full p-4 rounded-lg border-2 border-border hover:border-primary hover:bg-primary/5 transition space-y-2"
                >
                  <div className="text-3xl">🔬</div>
                  <h3 className="font-semibold text-foreground">I'm a Researcher</h3>
                  <p className="text-sm text-foreground/70">Manage trials</p>
                </button>
              </div>
            ) : (
              <form onSubmit={handleLogin} className="space-y-6">
                <div>
                  <button
                    type="button"
                    onClick={() => setUserType(null)}
                    className="text-sm text-primary hover:text-primary/80 mb-4"
                  >
                    ← Back
                  </button>
                  <label className="block text-sm font-medium mb-2 text-foreground">Email</label>
                  <Input
                    type="email"
                    placeholder="you@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2 text-foreground">Password</label>
                  <Input
                    type="password"
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>
                <Button type="submit" disabled={isLoading} className="w-full">
                  {isLoading ? "Signing in..." : "Sign In"}
                </Button>
                <div className="text-center">
                  <p className="text-sm text-foreground/70">
                    Don't have an account?{" "}
                    <Link
                      href={userType === "patient" ? "/join" : "/researcher"}
                      className="text-primary hover:text-primary/80"
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
