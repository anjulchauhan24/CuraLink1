"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function HeroSection() {
  return (
    <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="grid md:grid-cols-2 gap-12 items-center">
        <div className="space-y-6">
          <h1 className="text-5xl md:text-6xl font-bold leading-tight text-foreground">
            Connect Patients to <span className="text-primary">Life-Changing</span> Research
          </h1>
          <p className="text-xl text-foreground/70 leading-relaxed">
            CuraLink bridges the gap between patients seeking clinical trials and researchers advancing medical science.
            Discover opportunities that could transform your health journey.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 pt-4">
            <Link href="/join">
              <Button size="lg" className="w-full sm:w-auto">
                Join as Patient
              </Button>
            </Link>
            <Link href="/researcher">
              <Button size="lg" variant="outline" className="w-full sm:w-auto bg-transparent">
                Register as Researcher
              </Button>
            </Link>
          </div>
        </div>
        <div className="bg-gradient-to-br from-primary/10 via-secondary/5 to-accent/10 rounded-2xl p-8 h-96 flex items-center justify-center">
          <div className="text-center space-y-4">
            <div className="text-6xl">🔬</div>
            <p className="text-foreground/60 font-medium">AI-Powered Trial Matching</p>
          </div>
        </div>
      </div>
    </section>
  )
}
