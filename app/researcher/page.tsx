"use client"

import { useState } from "react"
import Navigation from "@/components/navigation"
import ResearcherOnboarding from "@/components/researcher-onboarding"

export default function ResearcherPage() {
  const [currentStep, setCurrentStep] = useState(0)

  const steps = [
    { title: "Credentials", icon: "📜" },
    { title: "Institution", icon: "🏫" },
    { title: "Research Areas", icon: "🔬" },
    { title: "Trials", icon: "📋" },
  ]

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <div className="pt-20 pb-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="mb-8 text-center">
            <h1 className="text-5xl font-bold text-foreground mb-4">Researcher Registration</h1>
            <p className="text-xl text-muted-foreground">
              Post your clinical trials and find engaged research participants
            </p>
          </div>

          <div className="flex justify-between mb-12">
            {steps.map((step, idx) => (
              <div key={idx} className="flex items-center flex-1">
                <div className={`flex items-center gap-3 flex-1 ${idx <= currentStep ? "opacity-100" : "opacity-50"}`}>
                  <div
                    className={`w-12 h-12 rounded-full flex items-center justify-center font-bold text-xl transition-all ${
                      idx <= currentStep
                        ? "bg-primary text-primary-foreground shadow-lg"
                        : "bg-muted text-foreground/50"
                    }`}
                  >
                    {step.icon}
                  </div>
                  <span
                    className={`text-sm font-medium hidden sm:block ${idx <= currentStep ? "text-foreground" : "text-foreground/50"}`}
                  >
                    {step.title}
                  </span>
                </div>
                {idx < steps.length - 1 && (
                  <div
                    className={`h-0.5 flex-1 mx-2 transition-all ${idx < currentStep ? "bg-primary" : "bg-border"}`}
                  ></div>
                )}
              </div>
            ))}
          </div>

          <ResearcherOnboarding currentStep={currentStep} setCurrentStep={setCurrentStep} />
        </div>
      </div>
    </div>
  )
}
