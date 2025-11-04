"use client"

import type React from "react"

import { useState } from "react"
import { useChat } from "@ai-sdk/react"
import { DefaultChatTransport } from "ai"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { MessageCircle, X, Send, Sparkles } from "lucide-react"

export default function HealthAssistantChat() {
  const [isOpen, setIsOpen] = useState(false)

  const { messages, sendMessage, status } = useChat({
    transport: new DefaultChatTransport({ api: "/api/chat/health-assistant" }),
  })

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const input = (e.target as any).message.value
    if (input.trim()) {
      sendMessage({ text: input })
      ;(e.target as any).message.value = ""
    }
  }

  const suggestedQuestions = [
    "What is a clinical trial?",
    "How do I know if I'm eligible?",
    "What does 'placebo' mean?",
    "Are clinical trials safe?",
  ]

  return (
    <>
      {/* Floating Chat Button */}
      {!isOpen && (
        <Button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-6 right-6 h-14 w-14 rounded-full shadow-lg bg-primary hover:bg-primary/90 z-50"
          size="icon"
        >
          <MessageCircle className="h-6 w-6" />
        </Button>
      )}

      {/* Chat Window */}
      {isOpen && (
        <Card className="fixed bottom-6 right-6 w-96 h-[600px] shadow-2xl flex flex-col z-50 bg-background">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b bg-primary text-primary-foreground rounded-t-lg">
            <div className="flex items-center gap-2">
              <Sparkles className="h-5 w-5" />
              <div>
                <h3 className="font-semibold">Health Assistant</h3>
                <p className="text-xs opacity-90">Ask me anything about trials</p>
              </div>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsOpen(false)}
              className="hover:bg-primary-foreground/10"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.length === 0 && (
              <div className="space-y-4">
                <div className="bg-muted p-4 rounded-lg">
                  <p className="text-sm text-muted-foreground">
                    Hi! I'm your CuraLink Health Assistant. I can help you understand clinical trials, explain medical
                    terms, and answer questions about your trial matches.
                  </p>
                </div>
                <div className="space-y-2">
                  <p className="text-xs font-medium text-muted-foreground">Try asking:</p>
                  {suggestedQuestions.map((question, i) => (
                    <button
                      key={i}
                      onClick={() => sendMessage({ text: question })}
                      className="w-full text-left text-sm p-3 rounded-lg border hover:bg-muted transition-colors"
                    >
                      {question}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {messages.map((message) => (
              <div key={message.id} className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}>
                <div
                  className={`max-w-[80%] rounded-lg p-3 ${
                    message.role === "user" ? "bg-primary text-primary-foreground" : "bg-muted"
                  }`}
                >
                  {message.parts.map((part, index) => {
                    if (part.type === "text") {
                      return (
                        <p key={index} className="text-sm whitespace-pre-wrap">
                          {part.text}
                        </p>
                      )
                    }
                    return null
                  })}
                </div>
              </div>
            ))}

            {status === "in_progress" && (
              <div className="flex justify-start">
                <div className="bg-muted rounded-lg p-3">
                  <div className="flex gap-1">
                    <div className="w-2 h-2 bg-muted-foreground/50 rounded-full animate-bounce" />
                    <div className="w-2 h-2 bg-muted-foreground/50 rounded-full animate-bounce [animation-delay:0.2s]" />
                    <div className="w-2 h-2 bg-muted-foreground/50 rounded-full animate-bounce [animation-delay:0.4s]" />
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Input */}
          <form onSubmit={handleSubmit} className="p-4 border-t">
            <div className="flex gap-2">
              <Input
                name="message"
                placeholder="Ask a question..."
                disabled={status === "in_progress"}
                className="flex-1"
              />
              <Button type="submit" size="icon" disabled={status === "in_progress"}>
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </form>
        </Card>
      )}
    </>
  )
}
