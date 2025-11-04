"use client"

import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

const mockTrials = [
  {
    id: 1,
    title: "New Diabetes Management Protocol (Phase 3)",
    institution: "Stanford Medical Center",
    matchScore: 95,
    locations: "San Francisco, CA",
    compensation: "$150/visit",
    visits: "4 visits over 12 weeks",
    description: "Evaluating a new medication for Type 2 diabetes management",
    status: "New",
  },
  {
    id: 2,
    title: "Cardiovascular Health Study",
    institution: "Johns Hopkins University",
    matchScore: 82,
    locations: "Baltimore, MD",
    compensation: "$200/visit",
    visits: "6 visits over 6 months",
    description: "Long-term study on heart health interventions",
    status: "Ongoing",
  },
  {
    id: 3,
    title: "Diabetes Prevention Research",
    institution: "Mayo Clinic",
    matchScore: 78,
    locations: "Minneapolis, MN",
    compensation: "$100/visit",
    visits: "3 visits over 8 weeks",
    description: "Testing preventive approaches for pre-diabetes",
    status: "New",
  },
]

export default function TrialMatches() {
  return (
    <div className="space-y-4">
      <div>
        <h2 className="text-3xl font-bold text-foreground mb-2">Matched Trials</h2>
        <p className="text-foreground/70">Clinical trials selected based on your health profile</p>
      </div>

      {mockTrials.map((trial) => (
        <Card key={trial.id} className="p-6 space-y-4 hover:border-primary/50 transition cursor-pointer">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-2">
                <h3 className="text-xl font-semibold text-foreground">{trial.title}</h3>
                <span
                  className={`text-xs font-bold px-2 py-1 rounded-full ${
                    trial.status === "New" ? "bg-accent/20 text-accent" : "bg-secondary/20 text-secondary"
                  }`}
                >
                  {trial.status}
                </span>
              </div>
              <p className="text-sm text-foreground/70 mb-3">{trial.institution}</p>
            </div>
            <div className="text-right">
              <div className="text-3xl font-bold text-primary">{trial.matchScore}%</div>
              <p className="text-xs text-foreground/50">Match</p>
            </div>
          </div>

          <p className="text-foreground/70 text-sm">{trial.description}</p>

          <div className="grid grid-cols-3 gap-4 py-4 border-t border-border pt-4">
            <div>
              <p className="text-xs text-foreground/50 font-medium">LOCATION</p>
              <p className="text-sm font-medium text-foreground">{trial.locations}</p>
            </div>
            <div>
              <p className="text-xs text-foreground/50 font-medium">TIME COMMITMENT</p>
              <p className="text-sm font-medium text-foreground">{trial.visits}</p>
            </div>
            <div>
              <p className="text-xs text-foreground/50 font-medium">COMPENSATION</p>
              <p className="text-sm font-medium text-accent">{trial.compensation}</p>
            </div>
          </div>

          <div className="flex gap-3 pt-2">
            <Button variant="outline" className="flex-1 bg-transparent">
              Learn More
            </Button>
            <Button className="flex-1">Express Interest</Button>
          </div>
        </Card>
      ))}
    </div>
  )
}
