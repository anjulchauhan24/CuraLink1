"use client"

import { use, useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { MapPin, BookOpen, Award, Mail, UserPlus, ExternalLink } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Textarea } from "@/components/ui/textarea"
import Link from "next/link"

export default function ResearcherProfilePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params)
  const [requestSent, setRequestSent] = useState(false)
  const [message, setMessage] = useState("")

  // Mock researcher data
  const researcher = {
    id: "alfonso-fasano",
    name: "Alfonso Fasano",
    institution: "University of Toronto",
    department: "Neurology",
    expertise: ["Parkinson's Disease", "Movement Disorders", "Deep Brain Stimulation", "Neuromodulation"],
    location: { city: "Toronto", state: "Ontario", country: "Canada" },
    publications: 450,
    citations: 12000,
    hIndex: 65,
    email: "alfonso.fasano@uhn.ca",
    orcid: "0000-0002-3797-6019",
    bio: "Dr. Alfonso Fasano is a leading expert in Parkinson's disease and movement disorders, specializing in deep brain stimulation and advanced therapies. His research focuses on optimizing neuromodulation techniques and developing personalized treatment approaches for complex movement disorders.",
    recentPublications: [
      {
        title: "Adaptive Deep Brain Stimulation in Parkinson's Disease",
        journal: "Nature Neuroscience",
        year: "2024",
        pmid: "38234567",
      },
      {
        title: "Long-term Outcomes of DBS for Freezing of Gait",
        journal: "Movement Disorders",
        year: "2023",
        pmid: "37123456",
      },
      {
        title: "Personalized Programming Strategies for Parkinson's DBS",
        journal: "Brain Stimulation",
        year: "2023",
        pmid: "36987654",
      },
    ],
    trials: [
      {
        title: "Adaptive DBS for Advanced Parkinson's Disease",
        status: "Recruiting",
        phase: "Phase 2",
        nctId: "NCT05123456",
      },
      {
        title: "Directional DBS Leads for Movement Disorders",
        status: "Active",
        phase: "Phase 3",
        nctId: "NCT05234567",
      },
    ],
  }

  const handleSendRequest = () => {
    setRequestSent(true)
    setMessage("")
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <Link href="/patient/search">
          <Button variant="ghost" className="mb-6">
            ← Back to Search
          </Button>
        </Link>

        <Card className="p-8 mb-8">
          <div className="flex items-start justify-between mb-6">
            <div className="flex-1">
              <h1 className="text-3xl font-bold mb-2">{researcher.name}</h1>
              <p className="text-lg text-muted-foreground mb-1">{researcher.department}</p>
              <p className="text-muted-foreground mb-3">{researcher.institution}</p>
              <div className="flex items-center gap-2 text-muted-foreground mb-4">
                <MapPin className="h-4 w-4" />
                <span>
                  {researcher.location.city}, {researcher.location.country}
                </span>
              </div>
            </div>
            <Dialog>
              <DialogTrigger asChild>
                <Button size="lg">
                  <UserPlus className="h-5 w-5 mr-2" />
                  Request Collaboration
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Request Collaboration</DialogTitle>
                  <DialogDescription>Send a collaboration request to {researcher.name}</DialogDescription>
                </DialogHeader>
                {requestSent ? (
                  <div className="text-center py-6">
                    <div className="text-green-500 text-5xl mb-4">✓</div>
                    <p className="font-semibold mb-2">Request Sent!</p>
                    <p className="text-sm text-muted-foreground">{researcher.name} will be notified of your request.</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium mb-2">Why would you like to collaborate?</label>
                      <Textarea
                        placeholder="Describe your interest in collaboration..."
                        rows={6}
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                      />
                    </div>
                    <Button onClick={handleSendRequest} className="w-full" disabled={!message.trim()}>
                      Send Request
                    </Button>
                  </div>
                )}
              </DialogContent>
            </Dialog>
          </div>

          <div className="flex flex-wrap gap-2 mb-6">
            {researcher.expertise.map((exp, idx) => (
              <Badge key={idx} variant="secondary">
                {exp}
              </Badge>
            ))}
          </div>

          <p className="text-muted-foreground mb-6">{researcher.bio}</p>

          <div className="grid grid-cols-3 gap-6 mb-6">
            <div className="flex items-center gap-3">
              <BookOpen className="h-5 w-5 text-muted-foreground" />
              <div>
                <p className="text-2xl font-bold">{researcher.publications}</p>
                <p className="text-sm text-muted-foreground">Publications</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Award className="h-5 w-5 text-muted-foreground" />
              <div>
                <p className="text-2xl font-bold">{researcher.citations.toLocaleString()}</p>
                <p className="text-sm text-muted-foreground">Citations</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Award className="h-5 w-5 text-muted-foreground" />
              <div>
                <p className="text-2xl font-bold">{researcher.hIndex}</p>
                <p className="text-sm text-muted-foreground">h-index</p>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-4 text-sm">
            {researcher.email && (
              <a href={`mailto:${researcher.email}`} className="flex items-center gap-1 text-primary hover:underline">
                <Mail className="h-4 w-4" />
                {researcher.email}
              </a>
            )}
            {researcher.orcid && (
              <a
                href={`https://orcid.org/${researcher.orcid}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1 text-primary hover:underline"
              >
                <ExternalLink className="h-4 w-4" />
                ORCID: {researcher.orcid}
              </a>
            )}
          </div>
        </Card>

        <Tabs defaultValue="publications" className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-8">
            <TabsTrigger value="publications">Recent Publications</TabsTrigger>
            <TabsTrigger value="trials">Clinical Trials</TabsTrigger>
          </TabsList>

          <TabsContent value="publications">
            <div className="grid gap-4">
              {researcher.recentPublications.map((pub, idx) => (
                <Card key={idx} className="p-6">
                  <a
                    href={`https://pubmed.ncbi.nlm.nih.gov/${pub.pmid}/`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block"
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <h3 className="font-semibold text-lg mb-2 hover:text-primary transition-colors">{pub.title}</h3>
                        <p className="text-sm text-muted-foreground mb-2">
                          {pub.journal} • {pub.year}
                        </p>
                        <p className="text-xs text-muted-foreground">PMID: {pub.pmid}</p>
                      </div>
                      <ExternalLink className="h-5 w-5 text-muted-foreground ml-2 flex-shrink-0" />
                    </div>
                  </a>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="trials">
            <div className="grid gap-4">
              {researcher.trials.map((trial, idx) => (
                <Card key={idx} className="p-6">
                  <a
                    href={`https://clinicaltrials.gov/study/${trial.nctId}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block"
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <Badge className={trial.status === "Recruiting" ? "bg-green-500" : "bg-blue-500"}>
                            {trial.status}
                          </Badge>
                          <Badge variant="outline">{trial.phase}</Badge>
                        </div>
                        <h3 className="font-semibold text-lg mb-2 hover:text-primary transition-colors">
                          {trial.title}
                        </h3>
                        <p className="text-xs text-muted-foreground">NCT ID: {trial.nctId}</p>
                      </div>
                      <ExternalLink className="h-5 w-5 text-muted-foreground ml-2 flex-shrink-0" />
                    </div>
                  </a>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
