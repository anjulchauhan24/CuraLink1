export interface Notification {
  id: string
  type: "trial_match" | "message" | "achievement" | "reminder" | "application_update"
  title: string
  message: string
  timestamp: Date
  read: boolean
  actionUrl?: string
  icon?: string
}

export function getMockNotifications(): Notification[] {
  return [
    {
      id: "1",
      type: "trial_match",
      title: "New Trial Match Found!",
      message: "A new diabetes trial with 95% match has been added to your dashboard.",
      timestamp: new Date(Date.now() - 300000), // 5 minutes ago
      read: false,
      actionUrl: "/patient/dashboard?tab=trials",
      icon: "🔬",
    },
    {
      id: "2",
      type: "achievement",
      title: "Badge Unlocked!",
      message: 'You earned the "5-Day Streak" badge. Keep it up!',
      timestamp: new Date(Date.now() - 3600000), // 1 hour ago
      read: false,
      icon: "🏆",
    },
    {
      id: "3",
      type: "message",
      title: "Message from Dr. Smith",
      message: "Your application for the cardiovascular study has been reviewed.",
      timestamp: new Date(Date.now() - 7200000), // 2 hours ago
      read: false,
      actionUrl: "/patient/dashboard?tab=messages",
      icon: "💬",
    },
    {
      id: "4",
      type: "application_update",
      title: "Application Status Update",
      message: 'Your application for "Diabetes Management Study" is now under review.',
      timestamp: new Date(Date.now() - 86400000), // 1 day ago
      read: true,
      icon: "📝",
    },
    {
      id: "5",
      type: "reminder",
      title: "Daily Check-in Reminder",
      message: "Don't forget to log your health update today to maintain your streak!",
      timestamp: new Date(Date.now() - 172800000), // 2 days ago
      read: true,
      icon: "⏰",
    },
  ]
}
