"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { X } from "lucide-react"

interface PatientOnboardingProps {
  currentStep: number
  setCurrentStep: (step: number) => void
}

export default function PatientOnboarding({ currentStep, setCurrentStep }: PatientOnboardingProps) {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    firstName: "",
    lastName: "",
    age: "",
    gender: "",
    conditions: [] as string[],
    medications: [],
    allergies: "",
    surgeries: [],
    interestAreas: [] as string[],
    timeCommitment: "",
  })

  const [customCondition, setCustomCondition] = useState("")

  const conditions = [
    "Diabetes",
    "Heart Disease",
    "Cancer",
    "Alzheimer's",
    "Parkinson's",
    "Arthritis",
    "Asthma",
    "COPD",
  ]

  const interestAreas = [
    "Drug Development",
    "Device Testing",
    "Behavioral Research",
    "Prevention Studies",
    "Gene Therapy",
  ]

  const handleConditionToggle = (condition: string) => {
    setFormData((prev) => ({
      ...prev,
      conditions: prev.conditions.includes(condition)
        ? prev.conditions.filter((c) => c !== condition)
        : [...prev.conditions, condition],
    }))
  }

  const addCustomCondition = () => {
    if (customCondition.trim() && !formData.conditions.includes(customCondition.trim())) {
      setFormData((prev) => ({
        ...prev,
        conditions: [...prev.conditions, customCondition.trim()],
      }))
      setCustomCondition("")
    }
  }

  const removeCondition = (condition: string) => {
    setFormData((prev) => ({
      ...prev,
      conditions: prev.conditions.filter((c) => c !== condition),
    }))
  }

  const handleInterestToggle = (area: string) => {
    setFormData((prev) => ({
      ...prev,
      interestAreas: prev.interestAreas.includes(area)
        ? prev.interestAreas.filter((a) => a !== area)
        : [...prev.interestAreas, area],
    }))
  }

  const renderStep = () => {
    switch (currentStep) {
      case 0:
        return (
          <Card className="p-8 space-y-6">
            <div>
              <label className="block text-sm font-medium mb-2 text-foreground">Email</label>
              <Input
                type="email"
                placeholder="you@example.com"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2 text-foreground">Password</label>
              <Input
                type="password"
                placeholder="Create a secure password"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                className="w-full"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2 text-foreground">First Name</label>
                <Input
                  placeholder="First name"
                  value={formData.firstName}
                  onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2 text-foreground">Last Name</label>
                <Input
                  placeholder="Last name"
                  value={formData.lastName}
                  onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                />
              </div>
            </div>
          </Card>
        )

      case 1:
        return (
          <Card className="p-8 space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2 text-foreground">Age</label>
                <Input
                  type="number"
                  placeholder="Your age"
                  value={formData.age}
                  onChange={(e) => setFormData({ ...formData, age: e.target.value })}
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2 text-foreground">Gender</label>
                <select
                  className="w-full px-3 py-2 border border-input rounded-lg bg-background text-foreground"
                  value={formData.gender}
                  onChange={(e) => setFormData({ ...formData, gender: e.target.value })}
                >
                  <option value="">Select...</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                  <option value="Prefer not to say">Prefer not to say</option>
                </select>
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium mb-4 text-foreground">Current Health Conditions</label>
              {formData.conditions.length > 0 && (
                <div className="mb-4 flex flex-wrap gap-2">
                  {formData.conditions.map((condition) => (
                    <span
                      key={condition}
                      className="inline-flex items-center gap-1 bg-primary/10 text-primary px-3 py-1 rounded-full text-sm font-medium"
                    >
                      {condition}
                      <button
                        onClick={() => removeCondition(condition)}
                        className="hover:bg-primary/20 rounded-full p-0.5"
                      >
                        <X className="h-3 w-3" />
                      </button>
                    </span>
                  ))}
                </div>
              )}
              <div className="grid grid-cols-2 gap-3 mb-4">
                {conditions.map((condition) => (
                  <button
                    key={condition}
                    onClick={() => handleConditionToggle(condition)}
                    className={`p-3 rounded-lg border transition ${
                      formData.conditions.includes(condition)
                        ? "border-primary bg-primary/10 text-foreground"
                        : "border-border bg-card text-foreground/70 hover:border-primary/50"
                    }`}
                  >
                    {condition}
                  </button>
                ))}
              </div>
              <div>
                <label className="block text-sm font-medium mb-2 text-foreground">Add Other Condition</label>
                <div className="flex gap-2">
                  <Input
                    placeholder="e.g., Fibromyalgia, Lupus, etc."
                    value={customCondition}
                    onChange={(e) => setCustomCondition(e.target.value)}
                    onKeyPress={(e) => e.key === "Enter" && addCustomCondition()}
                    className="flex-1"
                  />
                  <Button type="button" onClick={addCustomCondition}>
                    Add
                  </Button>
                </div>
                <p className="text-xs text-foreground/50 mt-2">Select from common conditions above or add your own</p>
              </div>
            </div>
          </Card>
        )

      case 2:
        return (
          <Card className="p-8 space-y-6">
            <div>
              <label className="block text-sm font-medium mb-2 text-foreground">Current Medications</label>
              <Input placeholder="e.g., Metformin, Lisinopril, Aspirin" className="w-full" />
              <p className="text-xs text-foreground/50 mt-2">Enter medications separated by commas</p>
            </div>
            <div>
              <label className="block text-sm font-medium mb-2 text-foreground">Allergies</label>
              <Input
                placeholder="e.g., Penicillin, Sulfa drugs"
                value={formData.allergies}
                onChange={(e) => setFormData({ ...formData, allergies: e.target.value })}
                className="w-full"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2 text-foreground">Previous Surgeries</label>
              <Input placeholder="e.g., Appendectomy 2010, Knee surgery 2015" className="w-full" />
              <p className="text-xs text-foreground/50 mt-2">List any major procedures and approximate dates</p>
            </div>
          </Card>
        )

      case 3:
        return (
          <Card className="p-8 space-y-6">
            <div>
              <label className="block text-sm font-medium mb-4 text-foreground">Research Interests</label>
              <div className="grid grid-cols-1 gap-3">
                {interestAreas.map((area) => (
                  <button
                    key={area}
                    onClick={() => handleInterestToggle(area)}
                    className={`p-3 rounded-lg border transition text-left ${
                      formData.interestAreas.includes(area)
                        ? "border-primary bg-primary/10 text-foreground"
                        : "border-border bg-card text-foreground/70 hover:border-primary/50"
                    }`}
                  >
                    {area}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium mb-2 text-foreground">Time Commitment</label>
              <select
                className="w-full px-3 py-2 border border-input rounded-lg bg-background text-foreground"
                value={formData.timeCommitment}
                onChange={(e) => setFormData({ ...formData, timeCommitment: e.target.value })}
              >
                <option value="">Select preferred commitment level</option>
                <option value="minimal">Minimal (less than 5 hours/month)</option>
                <option value="moderate">Moderate (5-10 hours/month)</option>
                <option value="substantial">Substantial (10+ hours/month)</option>
                <option value="flexible">Very Flexible</option>
              </select>
            </div>
          </Card>
        )

      default:
        return null
    }
  }

  const isStepValid = () => {
    switch (currentStep) {
      case 0:
        return formData.email && formData.password && formData.firstName && formData.lastName
      case 1:
        return formData.age && formData.gender && formData.conditions.length > 0
      case 2:
        return true
      case 3:
        return formData.interestAreas.length > 0 && formData.timeCommitment
      default:
        return false
    }
  }

  return (
    <div className="space-y-8">
      {renderStep()}
      <div className="flex justify-between gap-4">
        <Button
          variant="outline"
          onClick={() => setCurrentStep(Math.max(0, currentStep - 1))}
          disabled={currentStep === 0}
        >
          Back
        </Button>
        {currentStep < 3 ? (
          <Button onClick={() => setCurrentStep(currentStep + 1)} disabled={!isStepValid()}>
            Next
          </Button>
        ) : (
          <Button
            onClick={() => {
              alert("Profile created! Redirecting to dashboard...")
              window.location.href = "/patient/dashboard"
            }}
          >
            Complete Profile
          </Button>
        )}
      </div>
    </div>
  )
}
