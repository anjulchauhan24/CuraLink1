"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

const mockCandidates = [
  {
    id: 1,
    name: "Michael Thompson",
    avatar: "👨‍💼",
    age: 48,
    condition: "Type 2 Diabetes",
    matchScore: 94,
    location: "San Francisco, CA",
    status: "Interested",
    lastActive: "Today",
  },
  {
    id: 2,
    name: "Jennifer Martinez",
    avatar: "👩‍🦱",
    age: 52,
    condition: "Hypertension, Type 2 Diabetes",
    matchScore: 88,
    location: "Oakland, CA",
    status: "Invited",
    lastActive: "2 days ago",
  },
  {
    id: 3,
    name: "Robert Davis",
    avatar: "👨‍🦱",
    age: 61,
    condition: "Type 2 Diabetes",
    matchScore: 85,
    location: "San Jose, CA",
    status: "New",
    lastActive: "1 hour ago",
  },
]

export default function CandidateDiscovery() {
  const [selectedConditions, setSelectedConditions] = useState(["Diabetes"])

  const conditions = ["Diabetes", "Heart Disease", "Hypertension", "Cancer"]

  return (
    <div className="space-y-4">
      <div>
        <h2 className="text-3xl font-bold text-foreground mb-2">Find Candidates</h2>
        <p className="text-foreground/70">Discover potential participants for your trials</p>
      </div>

      <Card className="p-6 space-y-4">
        <div>
          <label className="block text-sm font-medium mb-3 text-foreground">Filter by Condition</label>
          <div className="flex flex-wrap gap-2">
            {conditions.map((condition) => (
              <button
                key={condition}
                onClick={() =>
                  setSelectedConditions(
                    selectedConditions.includes(condition)
                      ? selectedConditions.filter((c) => c !== condition)
                      : [...selectedConditions, condition],
                  )
                }
                className={`px-4 py-2 rounded-lg border transition ${
                  selectedConditions.includes(condition)
                    ? "border-primary bg-primary/10 text-primary"
                    : "border-border bg-card text-foreground/70 hover:border-primary/50"
                }`}
              >
                {condition}
              </button>
            ))}
          </div>
        </div>
        <div>
          <Input placeholder="Search by name or location..." className="w-full" />
        </div>
      </Card>

      <div className="space-y-4">
        {mockCandidates.map((candidate) => (
          <Card key={candidate.id} className="p-6 hover:border-primary/50 transition">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-4 flex-1">
                <div className="text-4xl">{candidate.avatar}</div>
                <div>
                  <h3 className="font-semibold text-lg text-foreground">{candidate.name}</h3>
                  <p className="text-sm text-foreground/70">
                    {candidate.age} • {candidate.location}
                  </p>
                </div>
              </div>
              <div className="text-right">
                <div className="text-2xl font-bold text-primary">{candidate.matchScore}%</div>
                <p className="text-xs text-foreground/50">Match</p>
              </div>
            </div>

            <div className="mb-4">
              <p className="text-sm text-foreground/70 mb-2">Conditions: {candidate.condition}</p>
              <span
                className={`inline-block text-xs font-bold px-2 py-1 rounded-full ${
                  candidate.status === "New"
                    ? "bg-accent/20 text-accent"
                    : candidate.status === "Interested"
                      ? "bg-primary/20 text-primary"
                      : "bg-secondary/20 text-secondary"
                }`}
              >
                {candidate.status}
              </span>
            </div>

            <div className="text-xs text-foreground/50 mb-4">Last active: {candidate.lastActive}</div>

            <div className="flex gap-3">
              <Button variant="outline" className="flex-1 bg-transparent">
                View Profile
              </Button>
              <Button className="flex-1">Send Invitation</Button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  )
}
