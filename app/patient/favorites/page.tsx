"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Star, FileText, Trash2 } from "lucide-react"

interface FavoriteItem {
  id: string
  type: "researcher" | "publication" | "trial"
  title: string
  subtitle: string
  tags: string[]
  selected: boolean
}

export default function FavoritesPage() {
  const [favorites, setFavorites] = useState<FavoriteItem[]>([
    {
      id: "1",
      type: "researcher",
      title: "Dr. Alfonso Fasano",
      subtitle: "University of Toronto • Parkinson's Disease Specialist",
      tags: ["Deep Brain Stimulation", "Movement Disorders"],
      selected: false,
    },
    {
      id: "2",
      type: "publication",
      title: "Adaptive Deep Brain Stimulation for Parkinson's Disease",
      subtitle: "Nature Medicine • 2024",
      tags: ["Clinical Trial", "DBS", "Technology"],
      selected: false,
    },
    {
      id: "3",
      type: "trial",
      title: "Stem Cell Therapy for Parkinson's Disease",
      subtitle: "Toronto Western Hospital • Recruiting",
      tags: ["Phase 2", "Stem Cells"],
      selected: false,
    },
    {
      id: "4",
      type: "researcher",
      title: "Dr. Andres Lozano",
      subtitle: "University of Toronto • Neurosurgeon",
      tags: ["DBS", "Neuromodulation"],
      selected: false,
    },
    {
      id: "5",
      type: "publication",
      title: "Mediterranean Diet and Parkinson's Progression",
      subtitle: "Journal of Neurology • 2023",
      tags: ["Diet", "Lifestyle"],
      selected: false,
    },
  ])

  const [showSummary, setShowSummary] = useState(false)

  const toggleSelection = (id: string) => {
    setFavorites(favorites.map((fav) => (fav.id === id ? { ...fav, selected: !fav.selected } : fav)))
  }

  const removeFavorite = (id: string) => {
    setFavorites(favorites.filter((fav) => fav.id !== id))
  }

  const selectedFavorites = favorites.filter((f) => f.selected)

  const generateSummary = () => {
    setShowSummary(true)
  }

  const researchers = favorites.filter((f) => f.type === "researcher")
  const publications = favorites.filter((f) => f.type === "publication")
  const trials = favorites.filter((f) => f.type === "trial")

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold">My Favorites</h1>
          {selectedFavorites.length > 0 && (
            <Button onClick={generateSummary}>
              <FileText className="h-4 w-4 mr-2" />
              Generate Summary ({selectedFavorites.length})
            </Button>
          )}
        </div>

        {showSummary && selectedFavorites.length > 0 && (
          <Card className="p-6 mb-8 bg-primary/5 border-primary/20">
            <h2 className="text-xl font-semibold mb-4">Summary for Your Doctor</h2>
            <div className="prose prose-sm max-w-none mb-4">
              <p className="text-sm text-muted-foreground mb-4">
                This summary is ready to share with your healthcare provider to discuss potential treatment options.
              </p>

              <div className="space-y-4">
                {selectedFavorites.filter((f) => f.type === "researcher").length > 0 && (
                  <div>
                    <h3 className="font-semibold text-base mb-2">Recommended Experts:</h3>
                    <ul className="list-disc list-inside space-y-1">
                      {selectedFavorites
                        .filter((f) => f.type === "researcher")
                        .map((fav) => (
                          <li key={fav.id} className="text-sm">
                            {fav.title} - {fav.subtitle}
                          </li>
                        ))}
                    </ul>
                  </div>
                )}

                {selectedFavorites.filter((f) => f.type === "trial").length > 0 && (
                  <div>
                    <h3 className="font-semibold text-base mb-2">Clinical Trials of Interest:</h3>
                    <ul className="list-disc list-inside space-y-1">
                      {selectedFavorites
                        .filter((f) => f.type === "trial")
                        .map((fav) => (
                          <li key={fav.id} className="text-sm">
                            {fav.title} - {fav.subtitle}
                          </li>
                        ))}
                    </ul>
                  </div>
                )}

                {selectedFavorites.filter((f) => f.type === "publication").length > 0 && (
                  <div>
                    <h3 className="font-semibold text-base mb-2">Relevant Research:</h3>
                    <ul className="list-disc list-inside space-y-1">
                      {selectedFavorites
                        .filter((f) => f.type === "publication")
                        .map((fav) => (
                          <li key={fav.id} className="text-sm">
                            {fav.title} - {fav.subtitle}
                          </li>
                        ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>
            <div className="flex gap-3">
              <Button>Download PDF</Button>
              <Button variant="outline">Copy to Clipboard</Button>
              <Button variant="ghost" onClick={() => setShowSummary(false)}>
                Close
              </Button>
            </div>
          </Card>
        )}

        <Tabs defaultValue="all" className="w-full">
          <TabsList className="grid w-full grid-cols-4 mb-8">
            <TabsTrigger value="all">All ({favorites.length})</TabsTrigger>
            <TabsTrigger value="researchers">Researchers ({researchers.length})</TabsTrigger>
            <TabsTrigger value="publications">Publications ({publications.length})</TabsTrigger>
            <TabsTrigger value="trials">Trials ({trials.length})</TabsTrigger>
          </TabsList>

          <TabsContent value="all">
            <div className="grid gap-4">
              {favorites.map((favorite) => (
                <Card key={favorite.id} className="p-6">
                  <div className="flex items-start gap-4">
                    <Checkbox
                      checked={favorite.selected}
                      onCheckedChange={() => toggleSelection(favorite.id)}
                      className="mt-1"
                    />
                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <Badge variant="outline" className="mb-2">
                            {favorite.type.charAt(0).toUpperCase() + favorite.type.slice(1)}
                          </Badge>
                          <h3 className="font-semibold text-lg">{favorite.title}</h3>
                          <p className="text-sm text-muted-foreground">{favorite.subtitle}</p>
                        </div>
                        <Button variant="ghost" size="sm" onClick={() => removeFavorite(favorite.id)}>
                          <Trash2 className="h-4 w-4 text-destructive" />
                        </Button>
                      </div>
                      <div className="flex flex-wrap gap-2 mt-3">
                        {favorite.tags.map((tag, idx) => (
                          <Badge key={idx} variant="secondary" className="text-xs">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="researchers">
            <div className="grid gap-4">
              {researchers.map((favorite) => (
                <Card key={favorite.id} className="p-6">
                  <div className="flex items-start gap-4">
                    <Checkbox
                      checked={favorite.selected}
                      onCheckedChange={() => toggleSelection(favorite.id)}
                      className="mt-1"
                    />
                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <h3 className="font-semibold text-lg">{favorite.title}</h3>
                          <p className="text-sm text-muted-foreground">{favorite.subtitle}</p>
                        </div>
                        <Button variant="ghost" size="sm" onClick={() => removeFavorite(favorite.id)}>
                          <Trash2 className="h-4 w-4 text-destructive" />
                        </Button>
                      </div>
                      <div className="flex flex-wrap gap-2 mt-3">
                        {favorite.tags.map((tag, idx) => (
                          <Badge key={idx} variant="secondary" className="text-xs">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="publications">
            <div className="grid gap-4">
              {publications.map((favorite) => (
                <Card key={favorite.id} className="p-6">
                  <div className="flex items-start gap-4">
                    <Checkbox
                      checked={favorite.selected}
                      onCheckedChange={() => toggleSelection(favorite.id)}
                      className="mt-1"
                    />
                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <h3 className="font-semibold text-lg">{favorite.title}</h3>
                          <p className="text-sm text-muted-foreground">{favorite.subtitle}</p>
                        </div>
                        <Button variant="ghost" size="sm" onClick={() => removeFavorite(favorite.id)}>
                          <Trash2 className="h-4 w-4 text-destructive" />
                        </Button>
                      </div>
                      <div className="flex flex-wrap gap-2 mt-3">
                        {favorite.tags.map((tag, idx) => (
                          <Badge key={idx} variant="secondary" className="text-xs">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="trials">
            <div className="grid gap-4">
              {trials.map((favorite) => (
                <Card key={favorite.id} className="p-6">
                  <div className="flex items-start gap-4">
                    <Checkbox
                      checked={favorite.selected}
                      onCheckedChange={() => toggleSelection(favorite.id)}
                      className="mt-1"
                    />
                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <h3 className="font-semibold text-lg">{favorite.title}</h3>
                          <p className="text-sm text-muted-foreground">{favorite.subtitle}</p>
                        </div>
                        <Button variant="ghost" size="sm" onClick={() => removeFavorite(favorite.id)}>
                          <Trash2 className="h-4 w-4 text-destructive" />
                        </Button>
                      </div>
                      <div className="flex flex-wrap gap-2 mt-3">
                        {favorite.tags.map((tag, idx) => (
                          <Badge key={idx} variant="secondary" className="text-xs">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>

        {favorites.length === 0 && (
          <div className="text-center py-12 text-muted-foreground">
            <Star className="h-12 w-12 mx-auto mb-4 opacity-50" />
            <p>No favorites yet. Start exploring and save items for later!</p>
          </div>
        )}
      </div>
    </div>
  )
}
