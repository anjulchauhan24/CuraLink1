"use client"

import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { MapPin, BookOpen, Award } from "lucide-react"
import Link from "next/link"
import type { Researcher } from "@/lib/api/researchers"

interface ResearcherCardProps {
  researcher: Researcher
  showMatchScore?: boolean
}

export function ResearcherCard({ researcher, showMatchScore = true }: ResearcherCardProps) {
  const matchColor =
    (researcher.matchScore || 0) >= 80
      ? "bg-green-500"
      : (researcher.matchScore || 0) >= 60
        ? "bg-blue-500"
        : (researcher.matchScore || 0) >= 40
          ? "bg-yellow-500"
          : "bg-gray-500"

  return (
    <Link href={`/researcher/${researcher.id}`}>
      <Card className="p-6 hover:shadow-lg transition-shadow cursor-pointer">
        <div className="flex items-start justify-between mb-4">
          <div className="flex-1">
            <h3 className="text-xl font-semibold mb-1">{researcher.name}</h3>
            <p className="text-muted-foreground text-sm mb-2">{researcher.institution}</p>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <MapPin className="h-4 w-4" />
              <span>
                {researcher.location.city}, {researcher.location.country}
              </span>
            </div>
          </div>
          {showMatchScore && researcher.matchScore !== undefined && (
            <div className="flex flex-col items-end">
              <div className={`${matchColor} text-white px-3 py-1 rounded-full text-sm font-semibold`}>
                {researcher.matchScore}% Match
              </div>
            </div>
          )}
        </div>

        <p className="text-sm text-muted-foreground mb-4 line-clamp-2">{researcher.bio}</p>

        <div className="flex flex-wrap gap-2 mb-4">
          {researcher.expertise.slice(0, 4).map((exp, idx) => (
            <Badge key={idx} variant="secondary">
              {exp}
            </Badge>
          ))}
        </div>

        <div className="flex items-center gap-6 text-sm text-muted-foreground">
          <div className="flex items-center gap-1">
            <BookOpen className="h-4 w-4" />
            <span>{researcher.publications} publications</span>
          </div>
          <div className="flex items-center gap-1">
            <Award className="h-4 w-4" />
            <span>h-index: {researcher.hIndex}</span>
          </div>
        </div>
      </Card>
    </Link>
  )
}
