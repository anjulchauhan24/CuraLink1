"use client"

import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ExternalLink, MapPin, Calendar, Users } from "lucide-react"
import type { ClinicalTrial } from "@/lib/api/clinicaltrials"

interface TrialCardProps {
  trial: ClinicalTrial
}

export function TrialCard({ trial }: TrialCardProps) {
  const statusColor =
    trial.status === "RECRUITING"
      ? "bg-green-500"
      : trial.status === "ACTIVE_NOT_RECRUITING"
        ? "bg-blue-500"
        : trial.status === "COMPLETED"
          ? "bg-gray-500"
          : "bg-yellow-500"

  return (
    <Card className="p-6 hover:shadow-lg transition-shadow">
      <a href={trial.url} target="_blank" rel="noopener noreferrer" className="block">
        <div className="flex items-start justify-between mb-3">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              <Badge className={`${statusColor} text-white`}>{trial.status.replace(/_/g, " ")}</Badge>
              <Badge variant="outline">{trial.phase}</Badge>
            </div>
            <h3 className="text-lg font-semibold hover:text-primary transition-colors">{trial.title}</h3>
          </div>
          <ExternalLink className="h-5 w-5 text-muted-foreground ml-2 flex-shrink-0" />
        </div>

        <p className="text-sm text-muted-foreground mb-4 line-clamp-2">{trial.summary}</p>

        <div className="space-y-2 mb-4">
          <div className="flex flex-wrap gap-2">
            {trial.conditions.slice(0, 3).map((condition, idx) => (
              <Badge key={idx} variant="secondary">
                {condition}
              </Badge>
            ))}
          </div>
          {trial.interventions.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {trial.interventions.slice(0, 3).map((intervention, idx) => (
                <Badge key={idx} variant="outline">
                  {intervention}
                </Badge>
              ))}
            </div>
          )}
        </div>

        <div className="space-y-2 text-sm text-muted-foreground">
          {trial.locations.length > 0 && (
            <div className="flex items-start gap-2">
              <MapPin className="h-4 w-4 mt-0.5 flex-shrink-0" />
              <span>
                {trial.locations[0].city}, {trial.locations[0].country}
                {trial.locations.length > 1 && ` +${trial.locations.length - 1} more`}
              </span>
            </div>
          )}
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1">
              <Calendar className="h-4 w-4" />
              <span>Start: {trial.startDate || "TBD"}</span>
            </div>
            <div className="flex items-center gap-1">
              <Users className="h-4 w-4" />
              <span>{trial.enrollmentCount} participants</span>
            </div>
          </div>
        </div>

        <div className="mt-3 text-xs text-muted-foreground">
          NCT ID: {trial.nctId} • Sponsor: {trial.sponsor}
        </div>
      </a>
    </Card>
  )
}
