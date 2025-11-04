"use client"

import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

const mockTrials = [
  {
    id: 1,
    name: "New Diabetes Management Protocol",
    phase: "Phase 3",
    status: "Recruiting",
    enrolled: 47,
    target: 100,
    startDate: "Jan 2025",
    applications: 12,
    approvals: 8,
  },
  {
    id: 2,
    name: "Cardiovascular Health Study",
    phase: "Phase 2",
    status: "Ongoing",
    enrolled: 34,
    target: 50,
    startDate: "Jul 2024",
    applications: 6,
    approvals: 5,
  },
  {
    id: 3,
    name: "Novel Hypertension Treatment",
    phase: "Phase 3",
    status: "Recruiting",
    enrolled: 23,
    target: 75,
    startDate: "Mar 2025",
    applications: 18,
    approvals: 3,
  },
]

export default function TrialManagement() {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold text-foreground mb-2">Your Clinical Trials</h2>
          <p className="text-foreground/70">Manage your ongoing trials and track enrollment</p>
        </div>
        <Button>Create New Trial</Button>
      </div>

      <div className="space-y-4">
        {mockTrials.map((trial) => (
          <Card key={trial.id} className="p-6 space-y-4 hover:border-primary/50 transition cursor-pointer">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <h3 className="text-xl font-semibold text-foreground">{trial.name}</h3>
                  <span
                    className={`text-xs font-bold px-2 py-1 rounded-full ${
                      trial.status === "Recruiting" ? "bg-accent/20 text-accent" : "bg-secondary/20 text-secondary"
                    }`}
                  >
                    {trial.status}
                  </span>
                </div>
                <p className="text-sm text-foreground/70">{trial.phase}</p>
              </div>
              <div className="text-right">
                <div className="text-2xl font-bold text-primary">
                  {trial.enrolled}/{trial.target}
                </div>
                <p className="text-xs text-foreground/50">Enrolled</p>
              </div>
            </div>

            <div className="w-full bg-muted rounded-full h-2">
              <div
                className="bg-primary h-2 rounded-full"
                style={{ width: `${(trial.enrolled / trial.target) * 100}%` }}
              />
            </div>

            <div className="grid grid-cols-4 gap-4 py-4 border-t border-border pt-4">
              <div>
                <p className="text-xs text-foreground/50 font-medium">START DATE</p>
                <p className="text-sm font-medium text-foreground">{trial.startDate}</p>
              </div>
              <div>
                <p className="text-xs text-foreground/50 font-medium">APPLICATIONS</p>
                <p className="text-sm font-medium text-accent">{trial.applications}</p>
              </div>
              <div>
                <p className="text-xs text-foreground/50 font-medium">APPROVED</p>
                <p className="text-sm font-medium text-primary">{trial.approvals}</p>
              </div>
              <div>
                <p className="text-xs text-foreground/50 font-medium">CONVERSION</p>
                <p className="text-sm font-medium text-foreground">
                  {Math.round((trial.approvals / trial.applications) * 100)}%
                </p>
              </div>
            </div>

            <div className="flex gap-3 pt-2">
              <Button variant="outline" className="flex-1 bg-transparent">
                View Details
              </Button>
              <Button variant="outline" className="flex-1 bg-transparent">
                View Applicants
              </Button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  )
}
