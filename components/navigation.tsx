"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { useAuth } from "@/lib/auth-context"
import UserMenu from "@/components/user-menu"

interface NavigationProps {
  showNotifications?: boolean
}

export default function Navigation({ showNotifications = false }: NavigationProps) {
  const { isAuthenticated } = useAuth()

  return (
    <nav className="fixed top-0 w-full bg-background/80 backdrop-blur-xl border-b border-border/50 z-50">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 h-16 flex items-center justify-between">
        <Link href="/" className="font-semibold text-xl text-foreground hover:text-primary transition-colors">
          CuraLink
        </Link>
        <div className="flex items-center gap-10">
          <div className="hidden md:flex gap-8 text-sm font-medium">
            <Link href="#features" className="text-muted-foreground hover:text-foreground transition-colors">
              Features
            </Link>
            <Link href="#how-it-works" className="text-muted-foreground hover:text-foreground transition-colors">
              How It Works
            </Link>
            <Link href="#testimonials" className="text-muted-foreground hover:text-foreground transition-colors">
              Impact
            </Link>
          </div>
          <div className="flex items-center gap-3">
            {isAuthenticated ? (
              <UserMenu />
            ) : (
              <>
                <Link href="/login">
                  <Button variant="ghost" className="font-medium">
                    Sign In
                  </Button>
                </Link>
                <Link href="/join">
                  <Button className="font-medium shadow-sm">Get Started</Button>
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  )
}
