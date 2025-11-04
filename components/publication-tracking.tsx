"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

const mockPublications = [
  {
    id: 1,
    title: "Novel Approaches to Cardiovascular Risk Reduction in Diabetic Patients",
    authors: "Chen, J., Rodriguez, A., Patel, S.",
    journal: "New England Journal of Medicine",
    year: 2024,
    citations: 145,
    doi: "10.1056/NEJMoa2302890",
    relatedTrials: ["Cardiovascular Health Study"],
    impact: "High",
  },
  {
    id: 2,
    title: "AI-Powered Clinical Trial Matching: A Retrospective Analysis",
    authors: "Martinez, R., Thompson, M., Chen, J.",
    journal: "Lancet Digital Health",
    year: 2024,
    citations: 89,
    doi: "10.1016/S2589-7500(24)00012-1",
    relatedTrials: ["Multiple trials"],
    impact: "Medium",
  },
  {
    id: 3,
    title: "Real-World Effectiveness of New Diabetes Management Protocols",
    authors: "Patel, S., Kim, D., Lee, J.",
    journal: "Diabetes Care",
    year: 2024,
    citations: 67,
    doi: "10.2337/dc24-0312",
    relatedTrials: ["New Diabetes Management Protocol"],
    impact: "High",
  },
  {
    id: 4,
    title: "Early Biomarkers for Cognitive Decline: A Prospective Study",
    authors: "Thompson, M., Patel, S., Rodriguez, A.",
    journal: "Journal of Neurology",
    year: 2023,
    citations: 34,
    doi: "10.1007/s00415-023-11234-8",
    relatedTrials: ["Alzheimer's Early Detection Study"],
    impact: "Medium",
  },
]

export default function PublicationTracking() {
  const [sortBy, setSortBy] = useState<"recent" | "citations">("recent")
  const [selectedImpact, setSelectedImpact] = useState<string | null>(null)

  const sortedPublications = [...mockPublications].sort((a, b) => {
    if (sortBy === "recent") {
      return b.year - a.year
    } else {
      return b.citations - a.citations
    }
  })

  const filteredPublications = selectedImpact
    ? sortedPublications.filter((p) => p.impact === selectedImpact)
    : sortedPublications

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row gap-4 justify-between">
        <div className="flex gap-2">
          <button
            onClick={() => setSortBy("recent")}
            className={`px-4 py-2 rounded-lg border transition ${
              sortBy === "recent"
                ? "border-primary bg-primary/10 text-primary"
                : "border-border bg-card text-foreground/70 hover:border-primary/50"
            }`}
          >
            Most Recent
          </button>
          <button
            onClick={() => setSortBy("citations")}
            className={`px-4 py-2 rounded-lg border transition ${
              sortBy === "citations"
                ? "border-primary bg-primary/10 text-primary"
                : "border-border bg-card text-foreground/70 hover:border-primary/50"
            }`}
          >
            Most Cited
          </button>
        </div>
        <div className="flex gap-2">
          {["High", "Medium", "Low"].map((impact) => (
            <button
              key={impact}
              onClick={() => setSelectedImpact(selectedImpact === impact ? null : impact)}
              className={`px-4 py-2 rounded-lg border transition text-sm ${
                selectedImpact === impact
                  ? "border-accent bg-accent/10 text-accent"
                  : "border-border bg-card text-foreground/70 hover:border-accent/50"
              }`}
            >
              {impact} Impact
            </button>
          ))}
        </div>
      </div>

      <div className="space-y-4">
        {filteredPublications.map((pub) => (
          <Card key={pub.id} className="p-6 space-y-4 hover:border-primary/50 transition">
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1">
                <h3 className="font-semibold text-lg text-foreground mb-2 leading-tight">{pub.title}</h3>
                <p className="text-sm text-foreground/70 mb-2">{pub.authors}</p>
                <div className="flex items-center gap-4 text-xs text-foreground/60">
                  <span className="font-medium">{pub.journal}</span>
                  <span>•</span>
                  <span>{pub.year}</span>
                  <span>•</span>
                  <span className="text-primary font-medium">{pub.citations} citations</span>
                </div>
              </div>
              <span
                className={`text-xs font-bold px-3 py-1 rounded-full whitespace-nowrap ${
                  pub.impact === "High"
                    ? "bg-accent/20 text-accent"
                    : pub.impact === "Medium"
                      ? "bg-secondary/20 text-secondary"
                      : "bg-muted text-foreground/70"
                }`}
              >
                {pub.impact} Impact
              </span>
            </div>

            <div className="pt-4 border-t border-border">
              <p className="text-xs text-foreground/50 font-medium mb-2">RELATED TRIALS</p>
              <div className="flex flex-wrap gap-2">
                {pub.relatedTrials.map((trial) => (
                  <span key={trial} className="text-xs bg-primary/10 text-primary px-2 py-1 rounded">
                    {trial}
                  </span>
                ))}
              </div>
            </div>

            <div className="flex gap-3 pt-2">
              <Button variant="outline" size="sm" className="flex-1 bg-transparent">
                View DOI
              </Button>
              <Button variant="outline" size="sm" className="flex-1 bg-transparent">
                Read Paper
              </Button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  )
}
