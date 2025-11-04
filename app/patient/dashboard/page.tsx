"use client"

import { useState } from "react"
import Navigation from "@/components/navigation"
import PatientSidebar from "@/components/patient-sidebar"
import TrialMatches from "@/components/trial-matches"
import HealthProfile from "@/components/health-profile"
import Messages from "@/components/messages"
import HealthAssistantChat from "@/components/health-assistant-chat"
import GamificationWidget from "@/components/gamification-widget"
import BadgesShowcase from "@/components/badges-showcase"
import { getMockGamificationStats } from "@/lib/gamification"

export default function PatientDashboard() {
  const [activeTab, setActiveTab] = useState("trials")
  const gamificationStats = getMockGamificationStats()

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <div className="pt-24 pb-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            <PatientSidebar activeTab={activeTab} setActiveTab={setActiveTab} />

            <div className="lg:col-span-3">
              {activeTab === "trials" && (
                <div className="space-y-6">
                  <GamificationWidget stats={gamificationStats} />
                  <TrialMatches />
                </div>
              )}
              {activeTab === "profile" && <HealthProfile />}
              {activeTab === "achievements" && (
                <div className="space-y-6">
                  <GamificationWidget stats={gamificationStats} />
                  <BadgesShowcase badges={gamificationStats.badges} />
                </div>
              )}
              {activeTab === "messages" && <Messages />}
            </div>
          </div>
        </div>
      </div>

      <HealthAssistantChat />
    </div>
  )
}
