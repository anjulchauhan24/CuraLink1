"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  type TimelineEvent,
  getMockHealthTimeline,
  getTimelineIcon,
  getTimelineColor,
  getSeverityColor,
} from "@/lib/health-timeline"
import { Calendar, Filter } from "lucide-react"

export default function HealthTimeline() {
  const [timeline] = useState<TimelineEvent[]>(getMockHealthTimeline())
  const [filter, setFilter] = useState<TimelineEvent["type"] | "all">("all")

  const filteredTimeline = filter === "all" ? timeline : timeline.filter((event) => event.type === filter)

  const filterOptions: Array<{ value: TimelineEvent["type"] | "all"; label: string }> = [
    { value: "all", label: "All Events" },
    { value: "diagnosis", label: "Diagnoses" },
    { value: "medication", label: "Medications" },
    { value: "test", label: "Tests" },
    { value: "trial", label: "Trials" },
    { value: "symptom", label: "Symptoms" },
    { value: "milestone", label: "Milestones" },
  ]

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    }).format(date)
  }

  return (
    <Card className="p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-semibold flex items-center gap-2">
            <Calendar className="h-5 w-5 text-accent" />
            Health Timeline
          </h3>
          <p className="text-sm text-muted-foreground mt-1">Your complete medical journey</p>
        </div>
        <div className="flex items-center gap-2">
          <Filter className="h-4 w-4 text-muted-foreground" />
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value as any)}
            className="text-sm border rounded-md px-3 py-1.5 bg-background"
          >
            {filterOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="relative">
        {/* Timeline Line */}
        <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-border" />

        {/* Timeline Events */}
        <div className="space-y-6">
          {filteredTimeline.map((event, index) => (
            <div key={event.id} className="relative flex gap-4">
              {/* Timeline Dot */}
              <div className="relative z-10 flex-shrink-0">
                <div
                  className={`w-12 h-12 rounded-full ${getTimelineColor(event.type)} flex items-center justify-center text-2xl shadow-lg`}
                >
                  {getTimelineIcon(event.type)}
                </div>
              </div>

              {/* Event Content */}
              <div className="flex-1 pb-6">
                <div className="bg-muted/50 rounded-lg p-4 border">
                  <div className="flex items-start justify-between gap-3 mb-2">
                    <div className="flex-1">
                      <h4 className="font-semibold">{event.title}</h4>
                      <p className="text-xs text-muted-foreground mt-1">{formatDate(event.date)}</p>
                    </div>
                    <div className="flex gap-2">
                      <Badge variant="outline" className="capitalize">
                        {event.type}
                      </Badge>
                      {event.severity && (
                        <Badge variant="outline" className={getSeverityColor(event.severity)}>
                          {event.severity}
                        </Badge>
                      )}
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground">{event.description}</p>
                  {event.metadata && (
                    <div className="mt-3 p-3 bg-background rounded border">
                      <div className="grid grid-cols-2 gap-2 text-xs">
                        {Object.entries(event.metadata).map(([key, value]) => (
                          <div key={key}>
                            <span className="text-muted-foreground capitalize">{key}: </span>
                            <span className="font-medium">{value}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredTimeline.length === 0 && (
          <div className="text-center py-12 text-muted-foreground">
            <Calendar className="h-12 w-12 mx-auto mb-3 opacity-20" />
            <p className="text-sm">No events found for this filter</p>
          </div>
        )}
      </div>
    </Card>
  )
}
