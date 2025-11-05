"use client"

import Navigation from "@/components/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import {
  ArrowRight,
  Users,
  FlaskConical,
  Sparkles,
  Search,
  MessageSquare,
  CheckCircle,
  TrendingUp,
  Heart,
  Award,
} from "lucide-react"

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      {/* Hero Section */}
      <section className="min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 pt-16">
        <div className="max-w-7xl mx-auto w-full">
          <div className="text-center space-y-12">
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

      <section id="features" className="py-32 px-4 sm:px-6 lg:px-8 bg-muted/30">
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

      <section id="how-it-works" className="py-32 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-4xl sm:text-5xl font-bold mb-4">How It Works</h2>
            <p className="text-xl text-muted-foreground">Simple steps to get started</p>
          </div>

          <div className="grid md:grid-cols-4 gap-8">
            <div className="text-center space-y-4">
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto">
                <Users className="h-8 w-8 text-primary" />
              </div>
              <div className="text-3xl font-bold text-primary">01</div>
              <h3 className="text-xl font-bold">Create Profile</h3>
              <p className="text-muted-foreground">
                Sign up and complete your health profile with medical history and conditions
              </p>
            </div>

            <div className="text-center space-y-4">
              <div className="w-16 h-16 rounded-full bg-secondary/10 flex items-center justify-center mx-auto">
                <Search className="h-8 w-8 text-secondary" />
              </div>
              <div className="text-3xl font-bold text-secondary">02</div>
              <h3 className="text-xl font-bold">Get Matched</h3>
              <p className="text-muted-foreground">
                Our AI analyzes your profile and finds relevant clinical trials for you
              </p>
            </div>

            <div className="text-center space-y-4">
              <div className="w-16 h-16 rounded-full bg-accent/10 flex items-center justify-center mx-auto">
                <MessageSquare className="h-8 w-8 text-accent" />
              </div>
              <div className="text-3xl font-bold text-accent">03</div>
              <h3 className="text-xl font-bold">Connect</h3>
              <p className="text-muted-foreground">
                Communicate directly with researchers and ask questions about trials
              </p>
            </div>

            <div className="text-center space-y-4">
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto">
                <CheckCircle className="h-8 w-8 text-primary" />
              </div>
              <div className="text-3xl font-bold text-primary">04</div>
              <h3 className="text-xl font-bold">Participate</h3>
              <p className="text-muted-foreground">
                Join trials that match your goals and contribute to medical research
              </p>
            </div>
          </div>
        </div>
      </section>

      <section id="testimonials" className="py-32 px-4 sm:px-6 lg:px-8 bg-muted/30">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-4xl sm:text-5xl font-bold mb-4">Real Impact</h2>
            <p className="text-xl text-muted-foreground">Stories from our community</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mb-16">
            <div className="bg-background rounded-3xl p-8 space-y-6 border border-border">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                  <Heart className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <div className="font-bold">Sarah M.</div>
                  <div className="text-sm text-muted-foreground">Patient</div>
                </div>
              </div>
              <p className="text-muted-foreground leading-relaxed">
                "CuraLink helped me find a clinical trial that changed my life. The matching process was seamless and
                the support was incredible."
              </p>
              <div className="flex gap-1">
                {[...Array(5)].map((_, i) => (
                  <Award key={i} className="h-4 w-4 fill-primary text-primary" />
                ))}
              </div>
            </div>

            <div className="bg-background rounded-3xl p-8 space-y-6 border border-border">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-secondary/10 flex items-center justify-center">
                  <FlaskConical className="h-6 w-6 text-secondary" />
                </div>
                <div>
                  <div className="font-bold">Dr. James Chen</div>
                  <div className="text-sm text-muted-foreground">Researcher</div>
                </div>
              </div>
              <p className="text-muted-foreground leading-relaxed">
                "As a researcher, CuraLink has revolutionized how we recruit participants. The quality of matches is
                outstanding."
              </p>
              <div className="flex gap-1">
                {[...Array(5)].map((_, i) => (
                  <Award key={i} className="h-4 w-4 fill-secondary text-secondary" />
                ))}
              </div>
            </div>

            <div className="bg-background rounded-3xl p-8 space-y-6 border border-border">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center">
                  <TrendingUp className="h-6 w-6 text-accent" />
                </div>
                <div>
                  <div className="font-bold">Michael R.</div>
                  <div className="text-sm text-muted-foreground">Patient</div>
                </div>
              </div>
              <p className="text-muted-foreground leading-relaxed">
                "I never thought participating in research could be this easy. CuraLink made the entire process
                transparent and supportive."
              </p>
              <div className="flex gap-1">
                {[...Array(5)].map((_, i) => (
                  <Award key={i} className="h-4 w-4 fill-accent text-accent" />
                ))}
              </div>
            </div>
          </div>

          <div className="text-center">
            <Link href="/join">
              <Button size="lg" className="text-lg px-12 py-6 rounded-2xl shadow-lg">
                Start Your Journey
                <ArrowRight className="ml-3 h-5 w-5" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <footer className="border-t border-border py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center text-sm text-muted-foreground">
          <p>&copy; 2025 CuraLink. Connecting patients with life-changing research.</p>
        </div>
      </footer>
    </div>
  )
}
