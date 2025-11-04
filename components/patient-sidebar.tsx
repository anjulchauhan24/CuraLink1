"use client"

import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Flame } from "lucide-react"

interface PatientSidebarProps {
  activeTab: string
  setActiveTab: (tab: string) => void
}

export default function PatientSidebar({ activeTab, setActiveTab }: PatientSidebarProps) {
  const patient = {
    name: "Sarah Johnson",
    avatar: "👩‍🦰",
    condition: "Type 2 Diabetes",
    matches: 7,
    messages: 3,
    level: 3,
    streak: 5,
  }

  const menuItems = [
    { id: "trials", label: "Trial Matches", icon: "🔬", count: patient.matches },
    { id: "profile", label: "Health Profile", icon: "🏥" },
    { id: "achievements", label: "Achievements", icon: "🏆" },
    { id: "messages", label: "Messages", icon: "💬", count: patient.messages },
  ]

  return (
    <div className="lg:col-span-1 space-y-4">
      <Card className="p-6">
        <div className="text-center mb-4">
          <div className="text-6xl mb-3">{patient.avatar}</div>
          <h3 className="font-semibold text-lg text-foreground">{patient.name}</h3>
          <p className="text-sm text-foreground/70 mt-1">{patient.condition}</p>

          <div className="flex items-center justify-center gap-3 mt-3">
            <Badge variant="secondary" className="bg-accent/20 text-accent">
              Level {patient.level}
            </Badge>
            <Badge
              variant="secondary"
              className="bg-orange-500/20 text-orange-700 border-orange-500/30 flex items-center gap-1"
            >
              <Flame className="h-3 w-3" />
              {patient.streak} days
            </Badge>
          </div>
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
