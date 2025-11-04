"use client"

import { useEffect, useState } from "react"
import { Card } from "@/components/ui/card"
import { X } from "lucide-react"
import { Button } from "@/components/ui/button"

interface ToastNotificationProps {
  title: string
  message: string
  icon?: string
  duration?: number
  onClose?: () => void
}

export default function ToastNotification({
  title,
  message,
  icon = "🔔",
  duration = 5000,
  onClose,
}: ToastNotificationProps) {
  const [isVisible, setIsVisible] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false)
      onClose?.()
    }, duration)

    return () => clearTimeout(timer)
  }, [duration, onClose])

  if (!isVisible) return null

  return (
    <Card className="fixed top-20 right-6 w-96 shadow-2xl z-50 animate-in slide-in-from-right">
      <div className="p-4 flex gap-3">
        <div className="text-2xl flex-shrink-0">{icon}</div>
        <div className="flex-1 min-w-0">
          <h4 className="font-semibold text-sm mb-1">{title}</h4>
          <p className="text-sm text-muted-foreground">{message}</p>
        </div>
        <Button
          variant="ghost"
          size="icon"
          onClick={() => {
            setIsVisible(false)
            onClose?.()
          }}
          className="h-6 w-6 flex-shrink-0"
        >
          <X className="h-4 w-4" />
        </Button>
      </div>
    </Card>
  )
}
