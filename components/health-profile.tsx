"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { X, Plus } from "lucide-react"
import HealthTimeline from "@/components/health-timeline"
import DocumentUpload from "@/components/document-upload"

export default function HealthProfile() {
  const [profileData, setProfileData] = useState({
    conditions: ["Type 2 Diabetes", "Hypertension"],
    medications: ["Metformin 1000mg", "Lisinopril 10mg"],
    allergies: ["Penicillin"],
    surgeries: ["Appendectomy (2010)"],
    lifestyle: {
      exercise: "3-4 times per week",
      smoking: "Never",
      alcohol: "Moderate",
    },
  })

  const [isEditing, setIsEditing] = useState(false)
  const [newCondition, setNewCondition] = useState("")
  const [newMedication, setNewMedication] = useState("")
  const [newAllergy, setNewAllergy] = useState("")

  const addCondition = () => {
    if (newCondition.trim()) {
      setProfileData((prev) => ({
        ...prev,
        conditions: [...prev.conditions, newCondition.trim()],
      }))
      setNewCondition("")
    }
  }

  const removeCondition = (condition: string) => {
    setProfileData((prev) => ({
      ...prev,
      conditions: prev.conditions.filter((c) => c !== condition),
    }))
  }

  const addMedication = () => {
    if (newMedication.trim()) {
      setProfileData((prev) => ({
        ...prev,
        medications: [...prev.medications, newMedication.trim()],
      }))
      setNewMedication("")
    }
  }

  const removeMedication = (medication: string) => {
    setProfileData((prev) => ({
      ...prev,
      medications: prev.medications.filter((m) => m !== medication),
    }))
  }

  const addAllergy = () => {
    if (newAllergy.trim()) {
      setProfileData((prev) => ({
        ...prev,
        allergies: [...prev.allergies, newAllergy.trim()],
      }))
      setNewAllergy("")
    }
  }

  const removeAllergy = (allergy: string) => {
    setProfileData((prev) => ({
      ...prev,
      allergies: prev.allergies.filter((a) => a !== allergy),
    }))
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
          <div className="flex flex-wrap gap-2 mb-3">
            {profileData.conditions.map((condition) => (
              <span
                key={condition}
                className="inline-flex items-center gap-1 bg-primary/10 text-primary px-3 py-1 rounded-full text-sm font-medium"
              >
                {condition}
                {isEditing && (
                  <button onClick={() => removeCondition(condition)} className="hover:bg-primary/20 rounded-full p-0.5">
                    <X className="h-3 w-3" />
                  </button>
                )}
              </span>
            ))}
          </div>
          {isEditing && (
            <div className="flex gap-2">
              <Input
                placeholder="Add another condition..."
                value={newCondition}
                onChange={(e) => setNewCondition(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && addCondition()}
                className="flex-1"
              />
              <Button size="sm" onClick={addCondition}>
                <Plus className="h-4 w-4" />
              </Button>
            </div>
          )}
        </div>

        <div>
          <h3 className="font-semibold text-lg text-foreground mb-3">Current Medications</h3>
          <ul className="space-y-2 mb-3">
            {profileData.medications.map((med) => (
              <li key={med} className="text-sm text-foreground/70 flex items-center justify-between gap-2">
                <span className="flex items-center gap-2">
                  <span className="text-primary">•</span> {med}
                </span>
                {isEditing && (
                  <button
                    onClick={() => removeMedication(med)}
                    className="text-destructive hover:bg-destructive/10 rounded-full p-1"
                  >
                    <X className="h-3 w-3" />
                  </button>
                )}
              </li>
            ))}
          </ul>
          {isEditing && (
            <div className="flex gap-2">
              <Input
                placeholder="Add medication with dosage..."
                value={newMedication}
                onChange={(e) => setNewMedication(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && addMedication()}
                className="flex-1"
              />
              <Button size="sm" onClick={addMedication}>
                <Plus className="h-4 w-4" />
              </Button>
            </div>
          )}
        </div>

        <div>
          <h3 className="font-semibold text-lg text-foreground mb-3">Allergies</h3>
          <div className="flex flex-wrap gap-2 mb-3">
            {profileData.allergies.map((allergy) => (
              <span
                key={allergy}
                className="inline-flex items-center gap-1 bg-destructive/10 text-destructive px-3 py-1 rounded-full text-sm font-medium"
              >
                {allergy}
                {isEditing && (
                  <button onClick={() => removeAllergy(allergy)} className="hover:bg-destructive/20 rounded-full p-0.5">
                    <X className="h-3 w-3" />
                  </button>
                )}
              </span>
            ))}
          </div>
          {isEditing && (
            <div className="flex gap-2">
              <Input
                placeholder="Add allergy..."
                value={newAllergy}
                onChange={(e) => setNewAllergy(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && addAllergy()}
                className="flex-1"
              />
              <Button size="sm" onClick={addAllergy}>
                <Plus className="h-4 w-4" />
              </Button>
            </div>
          )}
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

        <Button onClick={() => setIsEditing(!isEditing)}>{isEditing ? "Save Changes" : "Edit Profile"}</Button>
      </Card>

      <HealthTimeline />
    </div>
  )
}
