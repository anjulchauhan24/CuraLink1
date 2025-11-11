"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { MessageSquare, Plus, Search, ThumbsUp, User } from "lucide-react"
import Link from "next/link"

interface ForumTopic {
  id: string
  title: string
  disease: string
  author: string
  authorType: "patient" | "researcher"
  replies: number
  likes: number
  createdAt: string
  excerpt: string
  tags: string[]
}

const mockTopics: ForumTopic[] = [
  {
    id: "1",
    title: "What are the latest advances in deep brain stimulation for Parkinson's?",
    disease: "Parkinson's Disease",
    author: "John Smith",
    authorType: "patient",
    replies: 12,
    likes: 24,
    createdAt: "2024-01-15",
    excerpt:
      "I've been reading about adaptive DBS and would love to hear from researchers about the current state of this technology...",
    tags: ["Deep Brain Stimulation", "Treatment", "Technology"],
  },
  {
    id: "2",
    title: "Looking for research collaborators on stem cell therapy for Parkinson's",
    disease: "Parkinson's Disease",
    author: "Dr. Sarah Johnson",
    authorType: "researcher",
    replies: 8,
    likes: 18,
    createdAt: "2024-01-14",
    excerpt: "We're conducting a multi-center study on dopaminergic neuron replacement therapy...",
    tags: ["Stem Cells", "Collaboration", "Clinical Trial"],
  },
  {
    id: "3",
    title: "Questions about diet and Parkinson's progression",
    disease: "Parkinson's Disease",
    author: "Emma Davis",
    authorType: "patient",
    replies: 15,
    likes: 32,
    createdAt: "2024-01-13",
    excerpt: "Has anyone seen research on Mediterranean diet impact on disease progression?",
    tags: ["Diet", "Lifestyle", "Prevention"],
  },
  {
    id: "4",
    title: "Neurofeedback training for ADHD - seeking patient perspectives",
    disease: "ADHD",
    author: "Dr. Jan Buitelaar",
    authorType: "researcher",
    replies: 20,
    likes: 45,
    createdAt: "2024-01-12",
    excerpt:
      "We're researching the efficacy of neurofeedback training and would love to hear from patients who have tried it...",
    tags: ["Neurofeedback", "Treatment", "Patient Experience"],
  },
  {
    id: "5",
    title: "TMS therapy for treatment-resistant depression - experiences?",
    disease: "Depression",
    author: "Michael Brown",
    authorType: "patient",
    replies: 18,
    likes: 38,
    createdAt: "2024-01-11",
    excerpt: "Considering TMS treatment after medication hasn't worked. Looking for others who have tried this...",
    tags: ["TMS", "Treatment-Resistant", "Brain Stimulation"],
  },
]

export default function ForumPage() {
  const [topics, setTopics] = useState<ForumTopic[]>(mockTopics)
  const [filterDisease, setFilterDisease] = useState<string>("all")
  const [searchQuery, setSearchQuery] = useState("")
  const [newTopic, setNewTopic] = useState({
    title: "",
    disease: "",
    content: "",
    tags: "",
  })

  const diseases = ["All Diseases", "Parkinson's Disease", "ADHD", "Depression", "Breast Cancer", "Glioma"]

  const filteredTopics = topics.filter((topic) => {
    const matchesDisease = filterDisease === "all" || topic.disease === filterDisease
    const matchesSearch =
      searchQuery === "" ||
      topic.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      topic.excerpt.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesDisease && matchesSearch
  })

  const handleCreateTopic = () => {
    const topic: ForumTopic = {
      id: Date.now().toString(),
      title: newTopic.title,
      disease: newTopic.disease,
      author: "Current User",
      authorType: "patient",
      replies: 0,
      likes: 0,
      createdAt: new Date().toISOString().split("T")[0],
      excerpt: newTopic.content.slice(0, 150) + "...",
      tags: newTopic.tags.split(",").map((t) => t.trim()),
    }
    setTopics([topic, ...topics])
    setNewTopic({ title: "", disease: "", content: "", tags: "" })
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-10">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-3xl font-bold">Community Forum</h1>
            <Dialog>
              <DialogTrigger asChild>
                <Button size="lg">
                  <Plus className="h-5 w-5 mr-2" />
                  New Topic
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-2xl">
                <DialogHeader>
                  <DialogTitle>Create New Discussion Topic</DialogTitle>
                  <DialogDescription>Ask questions or start a discussion with the community</DialogDescription>
                </DialogHeader>
                <div className="space-y-4 mt-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Title</label>
                    <Input
                      placeholder="What would you like to discuss?"
                      value={newTopic.title}
                      onChange={(e) => setNewTopic({ ...newTopic, title: e.target.value })}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Disease Category</label>
                    <Select
                      value={newTopic.disease}
                      onValueChange={(value) => setNewTopic({ ...newTopic, disease: value })}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select disease" />
                      </SelectTrigger>
                      <SelectContent>
                        {diseases.slice(1).map((disease) => (
                          <SelectItem key={disease} value={disease}>
                            {disease}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Content</label>
                    <Textarea
                      placeholder="Describe your question or topic in detail..."
                      rows={6}
                      value={newTopic.content}
                      onChange={(e) => setNewTopic({ ...newTopic, content: e.target.value })}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Tags (comma separated)</label>
                    <Input
                      placeholder="e.g., Treatment, Clinical Trial, Diet"
                      value={newTopic.tags}
                      onChange={(e) => setNewTopic({ ...newTopic, tags: e.target.value })}
                    />
                  </div>
                  <Button
                    onClick={handleCreateTopic}
                    className="w-full"
                    disabled={!newTopic.title || !newTopic.disease || !newTopic.content}
                  >
                    Create Topic
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
          </div>

          <div className="flex gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Search discussions..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={filterDisease} onValueChange={setFilterDisease}>
              <SelectTrigger className="w-[200px]">
                <SelectValue placeholder="Filter by disease" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Diseases</SelectItem>
                {diseases.slice(1).map((disease) => (
                  <SelectItem key={disease} value={disease}>
                    {disease}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="grid gap-6">
          {filteredTopics.map((topic) => (
            <Link key={topic.id} href={`/forum/${topic.id}`}>
              <Card className="p-6 hover:shadow-lg transition-shadow cursor-pointer">
                <div className="flex items-start gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <Badge variant="secondary">{topic.disease}</Badge>
                      <Badge variant={topic.authorType === "researcher" ? "default" : "outline"}>
                        {topic.authorType === "researcher" ? "Researcher" : "Patient"}
                      </Badge>
                    </div>
                    <h3 className="text-xl font-semibold mb-2 hover:text-primary transition-colors">{topic.title}</h3>
                    <p className="text-muted-foreground text-sm mb-3">{topic.excerpt}</p>
                    <div className="flex flex-wrap gap-2 mb-3">
                      {topic.tags.map((tag, idx) => (
                        <Badge key={idx} variant="outline" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                    <div className="flex items-center gap-6 text-sm text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <User className="h-4 w-4" />
                        <span>{topic.author}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <MessageSquare className="h-4 w-4" />
                        <span>{topic.replies} replies</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <ThumbsUp className="h-4 w-4" />
                        <span>{topic.likes} likes</span>
                      </div>
                      <span>Posted {topic.createdAt}</span>
                    </div>
                  </div>
                </div>
              </Card>
            </Link>
          ))}
        </div>

        {filteredTopics.length === 0 && (
          <div className="text-center py-12 text-muted-foreground">
            No discussions found.{" "}
            {searchQuery || filterDisease !== "all"
              ? "Try adjusting your filters."
              : "Be the first to start a discussion!"}
          </div>
        )}
      </div>
    </div>
  )
}
