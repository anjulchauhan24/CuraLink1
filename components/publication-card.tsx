"use client"

import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ExternalLink, Calendar, Users } from "lucide-react"
import type { Publication } from "@/lib/api/pubmed"

interface PublicationCardProps {
  publication: Publication
}

export function PublicationCard({ publication }: PublicationCardProps) {
  return (
    <Card className="p-6 hover:shadow-lg transition-shadow">
      <a href={publication.url} target="_blank" rel="noopener noreferrer" className="block">
        <div className="flex items-start justify-between mb-3">
          <h3 className="text-lg font-semibold flex-1 hover:text-primary transition-colors">{publication.title}</h3>
          <ExternalLink className="h-5 w-5 text-muted-foreground ml-2 flex-shrink-0" />
        </div>

        <div className="flex items-center gap-4 text-sm text-muted-foreground mb-3">
          <div className="flex items-center gap-1">
            <Users className="h-4 w-4" />
            <span>
              {publication.authors.slice(0, 3).join(", ")}
              {publication.authors.length > 3 && " et al."}
            </span>
          </div>
          <div className="flex items-center gap-1">
            <Calendar className="h-4 w-4" />
            <span>{publication.pubDate}</span>
          </div>
        </div>

        <Badge variant="outline" className="mb-3">
          {publication.journal}
        </Badge>

        {publication.abstract && <p className="text-sm text-muted-foreground line-clamp-3">{publication.abstract}</p>}

        <div className="flex items-center gap-2 mt-3 text-xs text-muted-foreground">
          <span>PMID: {publication.pmid}</span>
          {publication.doi && <span>DOI: {publication.doi}</span>}
        </div>
      </a>
    </Card>
  )
}
