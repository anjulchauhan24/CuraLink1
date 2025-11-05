"use client"

import Navigation from "@/components/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight, Users, FlaskConical, Sparkles } from "lucide-react"

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <section className="min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 pt-16">
        <div className="max-w-7xl mx-auto w-full">
          <div className="text-center space-y-12">
            {/* Main headline */}
            <div className="space-y-6">
              <h1 className="text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-bold tracking-tight">
                <span className="block text-foreground">Clinical Trials</span>
                <span className="block bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
                  Reimagined
                </span>
              </h1>
              <p className="text-xl sm:text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
                Connecting patients with life-changing research opportunities through intelligent matching
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center pt-8">
              <Link href="/join" className="w-full sm:w-auto">
                <Button
                  size="lg"
                  className="w-full sm:w-auto text-lg px-12 py-8 rounded-2xl shadow-lg hover:shadow-xl transition-all"
                >
                  <Users className="mr-3 h-6 w-6" />
                  Join as Patient
                  <ArrowRight className="ml-3 h-6 w-6" />
                </Button>
              </Link>
              <Link href="/researcher" className="w-full sm:w-auto">
                <Button
                  size="lg"
                  variant="outline"
                  className="w-full sm:w-auto text-lg px-12 py-8 rounded-2xl border-2 hover:bg-accent/5 transition-all bg-transparent"
                >
                  <FlaskConical className="mr-3 h-6 w-6" />
                  Register as Researcher
                  <ArrowRight className="ml-3 h-6 w-6" />
                </Button>
              </Link>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-8 max-w-4xl mx-auto pt-16">
              <div className="space-y-2">
                <div className="text-4xl sm:text-5xl font-bold text-primary">10K+</div>
                <div className="text-sm text-muted-foreground">Active Trials</div>
              </div>
              <div className="space-y-2">
                <div className="text-4xl sm:text-5xl font-bold text-secondary">50K+</div>
                <div className="text-sm text-muted-foreground">Patients Matched</div>
              </div>
              <div className="space-y-2">
                <div className="text-4xl sm:text-5xl font-bold text-accent">95%</div>
                <div className="text-sm text-muted-foreground">Match Accuracy</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-32 px-4 sm:px-6 lg:px-8 bg-muted/30">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-4xl sm:text-5xl font-bold mb-4">Why CuraLink</h2>
            <p className="text-xl text-muted-foreground">Intelligent matching powered by AI</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-background rounded-3xl p-8 space-y-4 border border-border hover:border-primary/50 transition-all">
              <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center">
                <Sparkles className="h-7 w-7 text-primary" />
              </div>
              <h3 className="text-2xl font-bold">AI Matching</h3>
              <p className="text-muted-foreground leading-relaxed">
                Advanced algorithms match patients with trials based on medical history, conditions, and preferences
              </p>
            </div>

            <div className="bg-background rounded-3xl p-8 space-y-4 border border-border hover:border-secondary/50 transition-all">
              <div className="w-14 h-14 rounded-2xl bg-secondary/10 flex items-center justify-center">
                <Users className="h-7 w-7 text-secondary" />
              </div>
              <h3 className="text-2xl font-bold">Patient First</h3>
              <p className="text-muted-foreground leading-relaxed">
                Simple onboarding, clear communication, and full control over your health data and participation
              </p>
            </div>

            <div className="bg-background rounded-3xl p-8 space-y-4 border border-border hover:border-accent/50 transition-all">
              <div className="w-14 h-14 rounded-2xl bg-accent/10 flex items-center justify-center">
                <FlaskConical className="h-7 w-7 text-accent" />
              </div>
              <h3 className="text-2xl font-bold">Research Tools</h3>
              <p className="text-muted-foreground leading-relaxed">
                Comprehensive dashboard for researchers to manage trials, discover candidates, and track progress
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center text-sm text-muted-foreground">
          <p>&copy; 2025 CuraLink. Connecting patients with life-changing research.</p>
        </div>
      </footer>
    </div>
  )
}
