"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

const mockExperts = [
  {
    id: 1,
    name: "Dr. James Chen",
    avatar: "👨‍⚕️",
    institution: "Stanford Medical Center",
    specialty: "Cardiology",
    expertise: ["Cardiovascular Disease", "Hypertension", "Device Testing"],
    publications: 47,
    citationIndex: 2340,
    connected: false,
    bio: "Pioneering research in cardiovascular interventions with 15+ years of clinical experience.",
  },
  {
    id: 2,
    name: "Dr. Rebecca Martinez",
    avatar: "👩‍⚕️",
    institution: "MIT Medical Research Institute",
    specialty: "Oncology",
    expertise: ["Cancer Research", "Drug Development", "Gene Therapy"],
    publications: 83,
    citationIndex: 4120,
    connected: true,
    bio: "Leading researcher in targeted cancer therapies and personalized medicine approaches.",
  },
  {
    id: 3,
    name: "Dr. Sarah Patel",
    avatar: "👩‍🔬",
    institution: "Johns Hopkins University",
    specialty: "Neurology",
    expertise: ["Alzheimer's Research", "Cognitive Decline", "Neuroimaging"],
    publications: 62,
    citationIndex: 3210,
    connected: false,
    bio: "Focused on neurodegenerative disease prevention and early intervention strategies.",
  },
  {
    id: 4,
    name: "Dr. Michael Thompson",
    avatar: "👨‍🔬",
    institution: "Harvard Medical School",
    specialty: "Endocrinology",
    expertise: ["Diabetes Research", "Metabolic Disorders", "Obesity Management"],
    publications: 55,
    citationIndex: 2890,
    connected: true,
    bio: "Expert in metabolic disease mechanisms and therapeutic interventions.",
  },
]

export default function ExpertNetwork() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedSpecialty, setSelectedSpecialty] = useState<string | null>(null)
  const [connected, setConnected] = useState(new Set(mockExperts.filter((e) => e.connected).map((e) => e.id)))

  const specialties = [...new Set(mockExperts.map((e) => e.specialty))]

  const filteredExperts = mockExperts.filter((expert) => {
    const matchesSearch =
      expert.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      expert.specialty.toLowerCase().includes(searchTerm.toLowerCase()) ||
      expert.expertise.some((e) => e.toLowerCase().includes(searchTerm.toLowerCase()))
    const matchesSpecialty = !selectedSpecialty || expert.specialty === selectedSpecialty
    return matchesSearch && matchesSpecialty
  })

  const toggleConnection = (id: number) => {
    setConnected((prev) => {
      const newSet = new Set(prev)
      if (newSet.has(id)) {
        newSet.delete(id)
      } else {
        newSet.add(id)
      }
      return newSet
    })
  }

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <Input
          placeholder="Search experts by name, specialty, or expertise..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <div className="flex gap-2 flex-wrap">
          <button
            onClick={() => setSelectedSpecialty(null)}
            className={`px-4 py-2 rounded-lg border transition ${
              selectedSpecialty === null
                ? "border-primary bg-primary/10 text-primary"
                : "border-border bg-card text-foreground/70 hover:border-primary/50"
            }`}
          >
            All Specialties
          </button>
          {specialties.map((specialty) => (
            <button
              key={specialty}
              onClick={() => setSelectedSpecialty(selectedSpecialty === specialty ? null : specialty)}
              className={`px-4 py-2 rounded-lg border transition ${
                selectedSpecialty === specialty
                  ? "border-primary bg-primary/10 text-primary"
                  : "border-border bg-card text-foreground/70 hover:border-primary/50"
              }`}
            >
              {specialty}
            </button>
          ))}
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {filteredExperts.map((expert) => (
          <Card key={expert.id} className="p-6 space-y-4 hover:border-primary/50 transition">
            <div className="flex items-start justify-between">
              <div className="flex items-start gap-4 flex-1">
                <div className="text-5xl">{expert.avatar}</div>
                <div className="flex-1">
                  <h3 className="font-semibold text-lg text-foreground">{expert.name}</h3>
                  <p className="text-sm text-foreground/70 mb-1">{expert.institution}</p>
                  <p className="text-xs text-primary font-medium">{expert.specialty}</p>
                </div>
              </div>
              {connected.has(expert.id) && (
                <span className="text-xs font-bold px-2 py-1 rounded-full bg-primary/20 text-primary">Connected</span>
              )}
            </div>

            <p className="text-sm text-foreground/70">{expert.bio}</p>

            <div>
              <p className="text-xs text-foreground/50 font-medium mb-2">EXPERTISE AREAS</p>
              <div className="flex flex-wrap gap-2">
                {expert.expertise.map((exp) => (
                  <span key={exp} className="text-xs bg-secondary/20 text-secondary px-2 py-1 rounded">
                    {exp}
                  </span>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 py-4 border-t border-border">
              <div>
                <p className="text-xs text-foreground/50 font-medium">PUBLICATIONS</p>
                <p className="text-lg font-bold text-primary">{expert.publications}</p>
              </div>
              <div>
                <p className="text-xs text-foreground/50 font-medium">H-INDEX</p>
                <p className="text-lg font-bold text-accent">{expert.citationIndex}</p>
              </div>
            </div>

            <Button
              onClick={() => toggleConnection(expert.id)}
              variant={connected.has(expert.id) ? "default" : "outline"}
              className="w-full"
            >
              {connected.has(expert.id) ? "Connected" : "Connect"}
            </Button>
          </Card>
        ))}
      </div>
    </div>
  )
}
