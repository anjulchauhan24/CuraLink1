"use client"

import { Card } from "@/components/ui/card"

const mockMessages = [
  {
    id: 1,
    from: "Michael Thompson",
    role: "Potential Participant",
    trial: "New Diabetes Management Protocol",
    lastMessage: "Interested in your trial. Can you tell me more about the time commitment?",
    timestamp: "1 hour ago",
    unread: true,
    avatar: "👨‍💼",
  },
  {
    id: 2,
    from: "CuraLink Support",
    role: "Platform Support",
    trial: "General",
    lastMessage: "Your trial has been verified and is now live on the platform.",
    timestamp: "1 day ago",
    unread: false,
    avatar: "🤖",
  },
]

export default function ResearcherMessages() {
  return (
    <div className="space-y-4">
      <div>
        <h2 className="text-3xl font-bold text-foreground mb-2">Messages</h2>
        <p className="text-foreground/70">Connect with potential participants</p>
      </div>

      {mockMessages.map((message) => (
        <Card
          key={message.id}
          className={`p-4 cursor-pointer hover:border-primary/50 transition ${
            message.unread ? "border-primary/50 bg-primary/5" : ""
          }`}
        >
          <div className="flex items-start gap-4">
            <div className="text-3xl">{message.avatar}</div>
            <div className="flex-1">
              <div className="flex items-center justify-between mb-1">
                <h4 className="font-semibold text-foreground">{message.from}</h4>
                <span className="text-xs text-foreground/50">{message.timestamp}</span>
              </div>
              <p className="text-xs text-foreground/60 mb-2">
                {message.role} • {message.trial}
              </p>
              <p className="text-sm text-foreground/70">{message.lastMessage}</p>
            </div>
            {message.unread && <div className="w-3 h-3 rounded-full bg-primary mt-1"></div>}
          </div>
        </Card>
      ))}
    </div>
  )
}
