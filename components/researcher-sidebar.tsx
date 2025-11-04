"use client"

import { Card } from "@/components/ui/card"

interface ResearcherSidebarProps {
  activeTab: string
  setActiveTab: (tab: string) => void
}

export default function ResearcherSidebar({ activeTab, setActiveTab }: ResearcherSidebarProps) {
  const researcher = {
    name: "Dr. Emily Chen",
    avatar: "👩‍⚕️",
    institution: "Stanford Medical Center",
    trials: 3,
    candidates: 24,
    messages: 5,
  }

  const menuItems = [
    { id: "trials", label: "My Trials", icon: "📋", count: researcher.trials },
    { id: "candidates", label: "Find Candidates", icon: "🔍", count: researcher.candidates },
    { id: "messages", label: "Messages", icon: "💬", count: researcher.messages },
  ]

  return (
    <div className="lg:col-span-1 space-y-4">
      <Card className="p-6">
        <div className="text-center mb-4">
          <div className="text-6xl mb-3">{researcher.avatar}</div>
          <h3 className="font-semibold text-lg text-foreground">{researcher.name}</h3>
          <p className="text-sm text-foreground/70 mt-1">{researcher.institution}</p>
        </div>
      </Card>

      <Card className="p-0 overflow-hidden">
        {menuItems.map((item) => (
          <button
            key={item.id}
            onClick={() => setActiveTab(item.id)}
            className={`w-full px-6 py-4 text-left flex items-center justify-between transition ${
              activeTab === item.id ? "bg-primary text-primary-foreground" : "text-foreground/70 hover:bg-muted"
            }`}
          >
            <span className="flex items-center gap-3">
              <span className="text-xl">{item.icon}</span>
              {item.label}
            </span>
            {item.count && (
              <span
                className={`text-xs font-bold px-2 py-1 rounded-full ${
                  activeTab === item.id ? "bg-primary-foreground/20" : "bg-primary/20"
                }`}
              >
                {item.count}
              </span>
            )}
          </button>
        ))}
      </Card>
    </div>
  )
}
