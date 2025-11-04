"use client"

import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import HealthTimeline from "@/components/health-timeline"
import DocumentUpload from "@/components/document-upload"

export default function HealthProfile() {
  const profileData = {
    conditions: ["Type 2 Diabetes", "Hypertension"],
    medications: ["Metformin 1000mg", "Lisinopril 10mg"],
    allergies: ["Penicillin"],
    surgeries: ["Appendectomy (2010)"],
    lifestyle: {
      exercise: "3-4 times per week",
      smoking: "Never",
      alcohol: "Moderate",
    },
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold text-foreground mb-2">Your Health Profile</h2>
        <p className="text-foreground/70">Keep your information updated for accurate trial matches</p>
      </div>

      <DocumentUpload />

      <Card className="p-6 space-y-6">
        <div>
          <h3 className="font-semibold text-lg text-foreground mb-3">Current Conditions</h3>
          <div className="flex flex-wrap gap-2">
            {profileData.conditions.map((condition) => (
              <span key={condition} className="bg-primary/10 text-primary px-3 py-1 rounded-full text-sm font-medium">
                {condition}
              </span>
            ))}
          </div>
        </div>

        <div>
          <h3 className="font-semibold text-lg text-foreground mb-3">Current Medications</h3>
          <ul className="space-y-2">
            {profileData.medications.map((med) => (
              <li key={med} className="text-sm text-foreground/70 flex items-center gap-2">
                <span className="text-primary">•</span> {med}
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="font-semibold text-lg text-foreground mb-3">Allergies</h3>
          <p className="text-sm text-foreground/70">{profileData.allergies.join(", ")}</p>
        </div>

        <div>
          <h3 className="font-semibold text-lg text-foreground mb-3">Lifestyle</h3>
          <div className="space-y-2 text-sm">
            <p className="text-foreground/70">
              <span className="font-medium text-foreground">Exercise:</span> {profileData.lifestyle.exercise}
            </p>
            <p className="text-foreground/70">
              <span className="font-medium text-foreground">Smoking:</span> {profileData.lifestyle.smoking}
            </p>
            <p className="text-foreground/70">
              <span className="font-medium text-foreground">Alcohol:</span> {profileData.lifestyle.alcohol}
            </p>
          </div>
        </div>

        <Button>Edit Profile</Button>
      </Card>

      <HealthTimeline />
    </div>
  )
}
