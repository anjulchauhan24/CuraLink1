"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import NotificationCenter from "@/components/notification-center"

export default function Navigation() {
  return (
    <nav className="fixed top-0 w-full bg-background/95 backdrop-blur border-b border-border z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
        <Link href="/" className="font-bold text-xl text-primary">
          CuraLink
        </Link>
        <div className="flex items-center gap-8">
          <div className="hidden md:flex gap-8 text-sm">
            <Link href="#features" className="text-foreground/70 hover:text-foreground transition">
              Features
            </Link>
            <Link href="#how-it-works" className="text-foreground/70 hover:text-foreground transition">
              How It Works
            </Link>
            <Link href="#testimonials" className="text-foreground/70 hover:text-foreground transition">
              Impact
            </Link>
          </div>
          <div className="flex items-center gap-3">
            <NotificationCenter />
            <Link href="/login">
              <Button variant="outline">Sign In</Button>
            </Link>
            <Link href="/join">
              <Button>Get Started</Button>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  )
}
