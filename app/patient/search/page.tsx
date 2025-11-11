"use client"

import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { SearchBar } from "@/components/search-bar"
import { ResearcherCard } from "@/components/researcher-card"
import { PublicationCard } from "@/components/publication-card"
import { TrialCard } from "@/components/trial-card"
import { Loader2 } from "lucide-react"
import type { Researcher } from "@/lib/api/researchers"
import type { Publication } from "@/lib/api/pubmed"
import type { ClinicalTrial } from "@/lib/api/clinicaltrials"

export default function PatientSearchPage() {
  const [activeTab, setActiveTab] = useState("researchers")
  const [query, setQuery] = useState("")
  const [loading, setLoading] = useState(false)

  // Mock patient data - would come from auth context
  const patientData = {
    name: "John Smith",
    disease: "Parkinson's disease",
    location: "Toronto, Canada",
  }

  const [researchers, setResearchers] = useState<Researcher[]>([])
  const [publications, setPublications] = useState<Publication[]>([])
  const [trials, setTrials] = useState<ClinicalTrial[]>([])

  const handleSearch = async (searchQuery: string) => {
    setQuery(searchQuery)
    setLoading(true)

    try {
      if (activeTab === "researchers") {
        const response = await fetch(
          `/api/search/researchers?query=${encodeURIComponent(searchQuery)}&disease=${encodeURIComponent(patientData.disease)}&location=${encodeURIComponent(patientData.location)}`,
        )
        const data = await response.json()
        setResearchers(data.researchers || [])
      } else if (activeTab === "publications") {
        const response = await fetch(
          `/api/search/publications?query=${encodeURIComponent(searchQuery)}&disease=${encodeURIComponent(patientData.disease)}`,
        )
        const data = await response.json()
        setPublications(data.publications || [])
      } else if (activeTab === "trials") {
        const response = await fetch(
          `/api/search/trials?query=${encodeURIComponent(searchQuery)}&disease=${encodeURIComponent(patientData.disease)}&location=${encodeURIComponent(patientData.location)}`,
        )
        const data = await response.json()
        setTrials(data.trials || [])
      }
    } catch (error) {
      console.error("Search error:", error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-10">
        <div className="container mx-auto px-4 py-6">
          <h1 className="text-3xl font-bold mb-2">Search</h1>
          <p className="text-muted-foreground mb-6">
            Disease of Interest: <span className="font-semibold text-foreground">{patientData.disease}</span>
            {" • "}
            Location: <span className="font-semibold text-foreground">{patientData.location}</span>
          </p>
          <SearchBar onSearch={handleSearch} placeholder={`Search ${activeTab}...`} />
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-8">
            <TabsTrigger value="researchers">Researchers</TabsTrigger>
            <TabsTrigger value="publications">Publications</TabsTrigger>
            <TabsTrigger value="trials">Clinical Trials</TabsTrigger>
          </TabsList>

          <TabsContent value="researchers">
            {loading ? (
              <div className="flex justify-center items-center py-12">
                <Loader2 className="h-8 w-8 animate-spin" />
              </div>
            ) : researchers.length > 0 ? (
              <div className="grid gap-6">
                {researchers.map((researcher) => (
                  <ResearcherCard key={researcher.id} researcher={researcher} />
                ))}
              </div>
            ) : query ? (
              <div className="text-center py-12 text-muted-foreground">
                No researchers found. Try a different search term.
              </div>
            ) : (
              <div className="text-center py-12 text-muted-foreground">
                Enter a search term to find researchers (e.g., "deep brain stimulation", "stem cell therapy")
              </div>
            )}
          </TabsContent>

          <TabsContent value="publications">
            {loading ? (
              <div className="flex justify-center items-center py-12">
                <Loader2 className="h-8 w-8 animate-spin" />
              </div>
            ) : publications.length > 0 ? (
              <div className="grid gap-6">
                {publications.map((publication) => (
                  <PublicationCard key={publication.id} publication={publication} />
                ))}
              </div>
            ) : query ? (
              <div className="text-center py-12 text-muted-foreground">
                No publications found. Try a different search term.
              </div>
            ) : (
              <div className="text-center py-12 text-muted-foreground">
                Enter a search term to find publications (e.g., "stem cell therapy", "diet")
              </div>
            )}
          </TabsContent>

          <TabsContent value="trials">
            {loading ? (
              <div className="flex justify-center items-center py-12">
                <Loader2 className="h-8 w-8 animate-spin" />
              </div>
            ) : trials.length > 0 ? (
              <div className="grid gap-6">
                {trials.map((trial) => (
                  <TrialCard key={trial.id} trial={trial} />
                ))}
              </div>
            ) : query ? (
              <div className="text-center py-12 text-muted-foreground">
                No clinical trials found. Try a different search term.
              </div>
            ) : (
              <div className="text-center py-12 text-muted-foreground">
                Enter a search term to find clinical trials (e.g., "multiple system atrophy")
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
