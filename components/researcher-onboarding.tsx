"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { X } from "lucide-react"

interface ResearcherOnboardingProps {
  currentStep: number
  setCurrentStep: (step: number) => void
}

export default function ResearcherOnboarding({ currentStep, setCurrentStep }: ResearcherOnboardingProps) {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    firstName: "",
    lastName: "",
    title: "",
    license: "",
    specialties: [] as string[],
    institution: "",
    department: "",
    website: "",
    phone: "",
    publicationLink: "",
    trialName: "",
    phase: "",
    conditions: [],
    description: "",
    enrollment: "",
  })

  const [customSpecialty, setCustomSpecialty] = useState("")
  const [customInstitution, setCustomInstitution] = useState("")

  const specialties = [
    "Cardiology",
    "Oncology",
    "Neurology",
    "Endocrinology",
    "Immunology",
    "Dermatology",
    "Infectious Disease",
    "Psychiatry",
    "Pulmonology",
    "Gastroenterology",
    "Nephrology",
    "Rheumatology",
    "Hematology",
    "Pediatrics",
    "Geriatrics",
    "Orthopedics",
  ]

  const commonInstitutions = [
    "Stanford Medical Center",
    "Mayo Clinic",
    "Johns Hopkins Hospital",
    "Cleveland Clinic",
    "Massachusetts General Hospital",
    "UCLA Medical Center",
    "UCSF Medical Center",
    "Duke University Hospital",
    "Northwestern Memorial Hospital",
    "University of Toronto",
  ]

  const phases = ["Phase 1", "Phase 2", "Phase 3", "Phase 4"]

  const handleSpecialtyToggle = (specialty: string) => {
    setFormData((prev) => ({
      ...prev,
      specialties: prev.specialties.includes(specialty)
        ? prev.specialties.filter((s) => s !== specialty)
        : [...prev.specialties, specialty],
    }))
  }

  const handleAddCustomSpecialty = () => {
    if (customSpecialty.trim() && !formData.specialties.includes(customSpecialty.trim())) {
      setFormData((prev) => ({
        ...prev,
        specialties: [...prev.specialties, customSpecialty.trim()],
      }))
      setCustomSpecialty("")
    }
  }

  const renderStep = () => {
    switch (currentStep) {
      case 0:
        return (
          <Card className="p-8 space-y-6">
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
            <div>
              <label className="block text-sm font-medium mb-2 text-foreground">Email</label>
              <Input
                type="email"
                placeholder="you@institution.edu"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2 text-foreground">Password</label>
              <Input
                type="password"
                placeholder="Create a secure password"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2 text-foreground">Title/Position</label>
                <Input
                  placeholder="e.g., Principal Investigator"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2 text-foreground">License Number</label>
                <Input
                  placeholder="Your medical license"
                  value={formData.license}
                  onChange={(e) => setFormData({ ...formData, license: e.target.value })}
                />
              </div>
            </div>
          </Card>
        )

      case 1:
        return (
          <Card className="p-8 space-y-6">
            <div>
              <label className="block text-sm font-medium mb-2 text-foreground">Institution</label>
              <select
                className="w-full px-3 py-2 border border-input rounded-lg bg-background text-foreground mb-2"
                value={formData.institution}
                onChange={(e) => {
                  if (e.target.value === "custom") {
                    setFormData({ ...formData, institution: "" })
                    setCustomInstitution("")
                  } else {
                    setFormData({ ...formData, institution: e.target.value })
                  }
                }}
              >
                <option value="">Select institution...</option>
                {commonInstitutions.map((inst) => (
                  <option key={inst} value={inst}>
                    {inst}
                  </option>
                ))}
                <option value="custom">Other (Enter custom)</option>
              </select>
              {(formData.institution === "" || !commonInstitutions.includes(formData.institution)) && (
                <Input
                  placeholder="Enter your institution name"
                  value={customInstitution || formData.institution}
                  onChange={(e) => {
                    setCustomInstitution(e.target.value)
                    setFormData({ ...formData, institution: e.target.value })
                  }}
                />
              )}
            </div>
            <div>
              <label className="block text-sm font-medium mb-2 text-foreground">Department</label>
              <Input
                placeholder="e.g., Cardiology"
                value={formData.department}
                onChange={(e) => setFormData({ ...formData, department: e.target.value })}
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2 text-foreground">Contact Phone</label>
              <Input
                placeholder="Your institutional phone number"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2 text-foreground">Institution Website</label>
              <Input
                placeholder="https://your-institution.edu"
                value={formData.website}
                onChange={(e) => setFormData({ ...formData, website: e.target.value })}
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-4 text-foreground">Clinical Specialties</label>

              {/* Selected specialties pills */}
              {formData.specialties.length > 0 && (
                <div className="flex flex-wrap gap-2 mb-4">
                  {formData.specialties.map((specialty) => (
                    <div
                      key={specialty}
                      className="px-3 py-1.5 bg-primary/10 text-foreground rounded-full text-sm flex items-center gap-2"
                    >
                      {specialty}
                      <button
                        onClick={() => handleSpecialtyToggle(specialty)}
                        className="text-primary hover:text-primary/80"
                      >
                        <X className="h-3 w-3" />
                      </button>
                    </div>
                  ))}
                </div>
              )}

              {/* Specialty grid */}
              <div className="grid grid-cols-2 gap-3 mb-3">
                {specialties.map((specialty) => (
                  <button
                    key={specialty}
                    onClick={() => handleSpecialtyToggle(specialty)}
                    className={`p-3 rounded-lg border transition text-sm ${
                      formData.specialties.includes(specialty)
                        ? "border-primary bg-primary/10 text-foreground"
                        : "border-border bg-card text-foreground/70 hover:border-primary/50"
                    }`}
                  >
                    {specialty}
                  </button>
                ))}
              </div>

              {/* Custom specialty input */}
              <div className="flex gap-2">
                <Input
                  placeholder="Add custom specialty..."
                  value={customSpecialty}
                  onChange={(e) => setCustomSpecialty(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault()
                      handleAddCustomSpecialty()
                    }
                  }}
                />
                <Button type="button" onClick={handleAddCustomSpecialty} variant="outline">
                  Add
                </Button>
              </div>
            </div>
          </Card>
        )

      case 2:
        return (
          <Card className="p-8 space-y-6">
            <div>
              <h3 className="font-semibold text-lg text-foreground mb-4">Research Focus Areas</h3>
              <p className="text-sm text-foreground/70 mb-4">
                Selected specialties will help us match you with appropriate candidates
              </p>
              <div className="space-y-2">
                {formData.specialties.map((specialty) => (
                  <div
                    key={specialty}
                    className="p-3 bg-primary/10 rounded-lg text-foreground flex items-center justify-between"
                  >
                    <span>{specialty}</span>
                    <button
                      onClick={() => handleSpecialtyToggle(specialty)}
                      className="text-primary hover:text-primary/80 font-bold"
                    >
                      ×
                    </button>
                  </div>
                ))}
              </div>
              {formData.specialties.length === 0 && (
                <p className="text-sm text-foreground/50 italic">Go back to select specialties</p>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium mb-2 text-foreground">Publication Link (Optional)</label>
              <Input
                placeholder="Link to your publication or research profile"
                type="url"
                value={formData.publicationLink}
                onChange={(e) => setFormData({ ...formData, publicationLink: e.target.value })}
              />
            </div>
          </Card>
        )

      case 3:
        return (
          <Card className="p-8 space-y-6">
            <div>
              <label className="block text-sm font-medium mb-2 text-foreground">Trial Name</label>
              <Input
                placeholder="e.g., New Diabetes Management Protocol"
                value={formData.trialName}
                onChange={(e) => setFormData({ ...formData, trialName: e.target.value })}
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2 text-foreground">Phase</label>
                <select
                  className="w-full px-3 py-2 border border-input rounded-lg bg-background text-foreground"
                  value={formData.phase}
                  onChange={(e) => setFormData({ ...formData, phase: e.target.value })}
                >
                  <option value="">Select phase...</option>
                  {phases.map((phase) => (
                    <option key={phase} value={phase}>
                      {phase}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium mb-2 text-foreground">Target Enrollment</label>
                <Input
                  type="number"
                  placeholder="e.g., 100"
                  value={formData.enrollment}
                  onChange={(e) => setFormData({ ...formData, enrollment: e.target.value })}
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium mb-2 text-foreground">Trial Description</label>
              <textarea
                placeholder="Brief description of your clinical trial"
                className="w-full px-3 py-2 border border-input rounded-lg bg-background text-foreground resize-none"
                rows={4}
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              />
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
        return (
          formData.email &&
          formData.password &&
          formData.firstName &&
          formData.lastName &&
          formData.title &&
          formData.license
        )
      case 1:
        return formData.institution && formData.department && formData.phone && formData.specialties.length > 0
      case 2:
        return formData.specialties.length > 0
      case 3:
        return formData.trialName && formData.phase && formData.enrollment && formData.description
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
              alert("Registration complete! Redirecting to dashboard...")
              window.location.href = "/researcher/dashboard"
            }}
          >
            Complete Registration
          </Button>
        )}
      </div>
    </div>
  )
}
