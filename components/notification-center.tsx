"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Bell, Check, X } from "lucide-react"
import { type Notification, getMockNotifications } from "@/lib/notifications"
import Link from "next/link"

export default function NotificationCenter() {
  const [isOpen, setIsOpen] = useState(false)
  const [notifications, setNotifications] = useState<Notification[]>([])

  useEffect(() => {
    setNotifications(getMockNotifications())
  }, [])

  const unreadCount = notifications.filter((n) => !n.read).length

  const markAsRead = (id: string) => {
    setNotifications((prev) => prev.map((n) => (n.id === id ? { ...n, read: true } : n)))
  }

  const markAllAsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })))
  }

  const deleteNotification = (id: string) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id))
  }

  const getTimeAgo = (timestamp: Date) => {
    const seconds = Math.floor((Date.now() - timestamp.getTime()) / 1000)
    if (seconds < 60) return "Just now"
    if (seconds < 3600) return `${Math.floor(seconds / 60)}m ago`
    if (seconds < 86400) return `${Math.floor(seconds / 3600)}h ago`
    return `${Math.floor(seconds / 86400)}d ago`
  }

  return (
    <div className="relative">
      {/* Bell Icon Button */}
      <Button variant="ghost" size="icon" onClick={() => setIsOpen(!isOpen)} className="relative">
        <Bell className="h-5 w-5" />
        {unreadCount > 0 && (
          <span className="absolute -top-1 -right-1 h-5 w-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center font-bold">
            {unreadCount > 9 ? "9+" : unreadCount}
          </span>
        )}
      </Button>

      {/* Notification Dropdown */}
      {isOpen && (
        <>
          <div className="fixed inset-0 z-40" onClick={() => setIsOpen(false)} />
          <Card className="absolute right-0 top-12 w-96 max-h-[600px] shadow-2xl z-50 flex flex-col">
            {/* Header */}
            <div className="p-4 border-b flex items-center justify-between">
              <div>
                <h3 className="font-semibold">Notifications</h3>
                <p className="text-xs text-muted-foreground">{unreadCount} unread</p>
              </div>
              {unreadCount > 0 && (
                <Button variant="ghost" size="sm" onClick={markAllAsRead} className="text-xs">
                  Mark all read
                </Button>
              )}
            </div>

            {/* Notifications List */}
            <div className="flex-1 overflow-y-auto">
              {notifications.length === 0 ? (
                <div className="p-8 text-center text-muted-foreground">
                  <Bell className="h-12 w-12 mx-auto mb-3 opacity-20" />
                  <p className="text-sm">No notifications yet</p>
                </div>
              ) : (
                <div className="divide-y">
                  {notifications.map((notification) => (
                    <div
                      key={notification.id}
                      className={`p-4 hover:bg-muted/50 transition ${!notification.read ? "bg-accent/5" : ""}`}
                    >
                      <div className="flex gap-3">
                        <div className="text-2xl flex-shrink-0">{notification.icon}</div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between gap-2 mb-1">
                            <p className="font-semibold text-sm">{notification.title}</p>
                            {!notification.read && (
                              <div className="h-2 w-2 bg-accent rounded-full flex-shrink-0 mt-1" />
                            )}
                          </div>
                          <p className="text-sm text-muted-foreground mb-2">{notification.message}</p>
                          <div className="flex items-center justify-between">
                            <span className="text-xs text-muted-foreground">{getTimeAgo(notification.timestamp)}</span>
                            <div className="flex gap-1">
                              {!notification.read && (
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  onClick={() => markAsRead(notification.id)}
                                  className="h-7 px-2"
                                >
                                  <Check className="h-3 w-3" />
                                </Button>
                              )}
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => deleteNotification(notification.id)}
                                className="h-7 px-2"
                              >
                                <X className="h-3 w-3" />
                              </Button>
                            </div>
                          </div>
                          {notification.actionUrl && (
                            <Link href={notification.actionUrl}>
                              <Button
                                variant="outline"
                                size="sm"
                                className="w-full mt-2 h-7 text-xs bg-transparent"
                                onClick={() => {
                                  markAsRead(notification.id)
                                  setIsOpen(false)
                                }}
                              >
                                View Details
                              </Button>
                            </Link>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </Card>
        </>
      )}
    </div>
  )
}
