"use client"

import { useState } from "react"
import { use } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Textarea } from "@/components/ui/textarea"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { ThumbsUp, MessageSquare, ArrowLeft } from "lucide-react"
import Link from "next/link"

interface Reply {
  id: string
  author: string
  authorType: "patient" | "researcher"
  content: string
  likes: number
  createdAt: string
}

export default function ForumTopicPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params)
  const [newReply, setNewReply] = useState("")
  const [replies, setReplies] = useState<Reply[]>([
    {
      id: "1",
      author: "Dr. Alfonso Fasano",
      authorType: "researcher",
      content:
        "Adaptive DBS is indeed an exciting development. We've seen promising results in clinical trials where the stimulation parameters are adjusted in real-time based on brain signals. The technology is still being refined, but early data suggests it may provide better symptom control with fewer side effects compared to conventional DBS.",
      likes: 18,
      createdAt: "2024-01-15",
    },
    {
      id: "2",
      author: "Sarah Johnson",
      authorType: "patient",
      content: "Thank you for the information! Are there any trials currently recruiting for adaptive DBS?",
      likes: 5,
      createdAt: "2024-01-15",
    },
    {
      id: "3",
      author: "Dr. Andres Lozano",
      authorType: "researcher",
      content:
        "Yes, we have an ongoing trial at Toronto Western Hospital. The adaptive algorithms can detect movement-related brain signals and adjust stimulation accordingly. I'd be happy to discuss eligibility if you're interested.",
      likes: 22,
      createdAt: "2024-01-16",
    },
  ])

  const handlePostReply = () => {
    if (!newReply.trim()) return

    const reply: Reply = {
      id: Date.now().toString(),
      author: "Current User",
      authorType: "patient",
      content: newReply,
      likes: 0,
      createdAt: new Date().toISOString().split("T")[0],
    }
    setReplies([...replies, reply])
    setNewReply("")
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <Link href="/forum">
          <Button variant="ghost" className="mb-6">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Forum
          </Button>
        </Link>

        {/* Original Post */}
        <Card className="p-8 mb-8">
          <div className="flex items-start gap-4 mb-4">
            <Avatar className="h-12 w-12">
              <AvatarFallback>JS</AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-2">
                <h3 className="font-semibold">John Smith</h3>
                <Badge variant="outline">Patient</Badge>
                <Badge variant="secondary">Parkinson's Disease</Badge>
              </div>
              <p className="text-sm text-muted-foreground">Posted on January 15, 2024</p>
            </div>
          </div>

          <h1 className="text-2xl font-bold mb-4">
            What are the latest advances in deep brain stimulation for Parkinson's?
          </h1>

          <div className="prose prose-sm max-w-none mb-6">
            <p>
              I've been reading about adaptive DBS and would love to hear from researchers about the current state of
              this technology. My father has had traditional DBS for 5 years now, and while it's been helpful, we're
              interested in understanding what new developments might offer better symptom control or fewer side
              effects.
            </p>
            <p>Specifically, I'm curious about:</p>
            <ul>
              <li>How adaptive DBS differs from conventional DBS</li>
              <li>Current clinical trial results</li>
              <li>Availability and eligibility criteria</li>
              <li>Long-term outcomes data</li>
            </ul>
            <p>
              Any insights from researchers or patients who have participated in these trials would be greatly
              appreciated!
            </p>
          </div>

          <div className="flex flex-wrap gap-2 mb-4">
            <Badge variant="outline">Deep Brain Stimulation</Badge>
            <Badge variant="outline">Treatment</Badge>
            <Badge variant="outline">Technology</Badge>
          </div>

          <div className="flex items-center gap-6 text-sm text-muted-foreground">
            <button className="flex items-center gap-1 hover:text-foreground transition-colors">
              <ThumbsUp className="h-4 w-4" />
              <span>24 likes</span>
            </button>
            <div className="flex items-center gap-1">
              <MessageSquare className="h-4 w-4" />
              <span>{replies.length} replies</span>
            </div>
          </div>
        </Card>

        {/* Replies */}
        <div className="space-y-4 mb-8">
          <h2 className="text-xl font-semibold mb-4">Replies</h2>
          {replies.map((reply) => (
            <Card key={reply.id} className="p-6">
              <div className="flex items-start gap-4 mb-4">
                <Avatar className="h-10 w-10">
                  <AvatarFallback>
                    {reply.author
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <h4 className="font-semibold">{reply.author}</h4>
                    <Badge variant={reply.authorType === "researcher" ? "default" : "outline"}>
                      {reply.authorType === "researcher" ? "Researcher" : "Patient"}
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground">Posted on {reply.createdAt}</p>
                </div>
              </div>
              <p className="text-sm mb-4">{reply.content}</p>
              <button className="flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground transition-colors">
                <ThumbsUp className="h-4 w-4" />
                <span>{reply.likes} likes</span>
              </button>
            </Card>
          ))}
        </div>

        {/* Reply Form */}
        <Card className="p-6">
          <h3 className="font-semibold mb-4">Post a Reply</h3>
          <Textarea
            placeholder="Share your thoughts or experiences..."
            rows={6}
            value={newReply}
            onChange={(e) => setNewReply(e.target.value)}
            className="mb-4"
          />
          <Button onClick={handlePostReply} disabled={!newReply.trim()}>
            Post Reply
          </Button>
        </Card>
      </div>
    </div>
  )
}
