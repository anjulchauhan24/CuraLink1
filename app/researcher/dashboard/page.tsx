"use client"

import { useState } from "react"
import Navigation from "@/components/navigation"
import ResearcherSidebar from "@/components/researcher-sidebar"
import TrialManagement from "@/components/trial-management"
import CandidateDiscovery from "@/components/candidate-discovery"
import ResearcherMessages from "@/components/researcher-messages"
import Link from "next/link"
import { Button } from "@/components/ui/button" // Fixed import to use named import from ui/button

export default function ResearcherDashboard() {
  const [activeTab, setActiveTab] = useState("trials")

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <div className="pt-24 pb-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            <div className="lg:col-span-1">
              <ResearcherSidebar activeTab={activeTab} setActiveTab={setActiveTab} />
              <Link href="/researcher/network">
                <Button variant="outline" className="w-full mt-4 bg-transparent">
                  🌐 Research Network
                </Button>
              </Link>
            </div>

            <div className="lg:col-span-3">
              {activeTab === "trials" && <TrialManagement />}
              {activeTab === "candidates" && <CandidateDiscovery />}
              {activeTab === "messages" && <ResearcherMessages />}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
