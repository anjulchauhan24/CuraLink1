"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Check, X, MessageSquare } from "lucide-react"

interface CollaborationRequest {
  id: string
  from: string
  institution: string
  expertise: string[]
  message: string
  status: "pending" | "accepted" | "declined"
  date: string
}

export default function CollaborationPage() {
  const [requests, setRequests] = useState<CollaborationRequest[]>([
    {
      id: "1",
      from: "Dr. Alfonso Fasano",
      institution: "University of Toronto",
      expertise: ["Parkinson's Disease", "Deep Brain Stimulation"],
      message:
        "I'm interested in collaborating on your Parkinson's stem cell research. I have experience with DBS outcomes that could complement your work.",
      status: "pending",
      date: "2024-01-15",
    },
    {
      id: "2",
      from: "Dr. Jan Buitelaar",
      institution: "Radboud University Medical Center",
      expertise: ["ADHD", "Neurofeedback", "Neuroimaging"],
      message:
        "Your work on brain stimulation protocols is fascinating. Would you be interested in exploring cross-disorder applications?",
      status: "pending",
      date: "2024-01-14",
    },
    {
      id: "3",
      from: "Dr. Brenda Penninx",
      institution: "VU University Amsterdam",
      expertise: ["Depression", "Long-term Outcomes"],
      message: "I think our research on depression biomarkers could align well with your clinical trial work.",
      status: "accepted",
      date: "2024-01-10",
    },
  ])

  const handleAccept = (id: string) => {
    setRequests(requests.map((req) => (req.id === id ? { ...req, status: "accepted" as const } : req)))
  }

  const handleDecline = (id: string) => {
    setRequests(requests.map((req) => (req.id === id ? { ...req, status: "declined" as const } : req)))
  }

  const pendingRequests = requests.filter((r) => r.status === "pending")
  const acceptedRequests = requests.filter((r) => r.status === "accepted")

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">Collaboration Requests</h1>

        <Tabs defaultValue="pending" className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-8">
            <TabsTrigger value="pending">Pending ({pendingRequests.length})</TabsTrigger>
            <TabsTrigger value="accepted">Accepted ({acceptedRequests.length})</TabsTrigger>
          </TabsList>

          <TabsContent value="pending">
            {pendingRequests.length > 0 ? (
              <div className="grid gap-6">
                {pendingRequests.map((request) => (
                  <Card key={request.id} className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1">
                        <h3 className="text-xl font-semibold mb-1">{request.from}</h3>
                        <p className="text-muted-foreground text-sm mb-3">{request.institution}</p>
                        <div className="flex flex-wrap gap-2 mb-4">
                          {request.expertise.map((exp, idx) => (
                            <Badge key={idx} variant="secondary">
                              {exp}
                            </Badge>
                          ))}
                        </div>
                      </div>
                      <Badge variant="outline">Pending</Badge>
                    </div>

                    <p className="text-sm mb-6 bg-muted/50 p-4 rounded-lg">{request.message}</p>

                    <div className="flex items-center gap-3">
                      <Button onClick={() => handleAccept(request.id)} className="flex-1">
                        <Check className="h-4 w-4 mr-2" />
                        Accept
                      </Button>
                      <Button onClick={() => handleDecline(request.id)} variant="outline" className="flex-1">
                        <X className="h-4 w-4 mr-2" />
                        Decline
                      </Button>
                    </div>

                    <p className="text-xs text-muted-foreground mt-4">Received on {request.date}</p>
                  </Card>
                ))}
              </div>
            ) : (
              <div className="text-center py-12 text-muted-foreground">No pending collaboration requests</div>
            )}
          </TabsContent>

          <TabsContent value="accepted">
            {acceptedRequests.length > 0 ? (
              <div className="grid gap-6">
                {acceptedRequests.map((request) => (
                  <Card key={request.id} className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1">
                        <h3 className="text-xl font-semibold mb-1">{request.from}</h3>
                        <p className="text-muted-foreground text-sm mb-3">{request.institution}</p>
                        <div className="flex flex-wrap gap-2 mb-4">
                          {request.expertise.map((exp, idx) => (
                            <Badge key={idx} variant="secondary">
                              {exp}
                            </Badge>
                          ))}
                        </div>
                      </div>
                      <Badge className="bg-green-500">Accepted</Badge>
                    </div>

                    <p className="text-sm mb-6 bg-muted/50 p-4 rounded-lg">{request.message}</p>

                    <Button className="w-full">
                      <MessageSquare className="h-4 w-4 mr-2" />
                      Open Chat
                    </Button>

                    <p className="text-xs text-muted-foreground mt-4">Accepted on {request.date}</p>
                  </Card>
                ))}
              </div>
            ) : (
              <div className="text-center py-12 text-muted-foreground">No accepted collaborations yet</div>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
