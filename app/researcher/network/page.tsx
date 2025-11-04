"use client"

import { useState } from "react"
import Navigation from "@/components/navigation"
import ExpertNetwork from "@/components/expert-network"
import PublicationTracking from "@/components/publication-tracking"

export default function NetworkPage() {
  const [activeTab, setActiveTab] = useState<"experts" | "publications">("experts")

  return (
    <div className="min-h-screen bg-background">
      <Navigation showNotifications={true} />
      <div className="pt-24 pb-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-foreground mb-2">Research Network</h1>
            <p className="text-foreground/70">Connect with experts and track publications</p>
          </div>

          {/* Tabs */}
          <div className="flex gap-4 mb-8 border-b border-border">
            <button
              onClick={() => setActiveTab("experts")}
              className={`px-4 py-3 font-medium border-b-2 transition ${
                activeTab === "experts"
                  ? "border-primary text-primary"
                  : "border-transparent text-foreground/70 hover:text-foreground"
              }`}
            >
              Expert Network
            </button>
            <button
              onClick={() => setActiveTab("publications")}
              className={`px-4 py-3 font-medium border-b-2 transition ${
                activeTab === "publications"
                  ? "border-primary text-primary"
                  : "border-transparent text-foreground/70 hover:text-foreground"
              }`}
            >
              Publications
            </button>
          </div>

          {activeTab === "experts" && <ExpertNetwork />}
          {activeTab === "publications" && <PublicationTracking />}
        </div>
      </div>
    </div>
  )
}
