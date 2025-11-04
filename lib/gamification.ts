export interface Badge {
  id: string
  name: string
  description: string
  icon: string
  unlockedAt?: Date
  progress?: number
  total?: number
}

export interface Achievement {
  id: string
  title: string
  points: number
  timestamp: Date
}

export interface GamificationStats {
  totalPoints: number
  currentStreak: number
  longestStreak: number
  level: number
  badges: Badge[]
  recentAchievements: Achievement[]
  profileCompletion: number
}

export const BADGES: Record<string, Omit<Badge, "unlockedAt" | "progress">> = {
  PROFILE_COMPLETE: {
    id: "profile_complete",
    name: "Profile Master",
    description: "Complete your health profile",
    icon: "🎯",
  },
  FIRST_MATCH: {
    id: "first_match",
    name: "Trial Explorer",
    description: "View your first trial match",
    icon: "🔍",
  },
  WEEK_STREAK: {
    id: "week_streak",
    name: "Committed",
    description: "Maintain a 7-day check-in streak",
    icon: "🔥",
  },
  MONTH_STREAK: {
    id: "month_streak",
    name: "Dedicated",
    description: "Maintain a 30-day check-in streak",
    icon: "⭐",
  },
  FIRST_APPLICATION: {
    id: "first_application",
    name: "Taking Action",
    description: "Apply to your first clinical trial",
    icon: "📝",
  },
  RESEARCH_HERO: {
    id: "research_hero",
    name: "Research Hero",
    description: "Participate in 3 clinical trials",
    icon: "🦸",
  },
  COMMUNITY_MEMBER: {
    id: "community_member",
    name: "Community Member",
    description: "Connect with 5 other patients",
    icon: "🤝",
  },
  HEALTH_TRACKER: {
    id: "health_tracker",
    name: "Health Tracker",
    description: "Log health updates for 14 days",
    icon: "📊",
  },
}

export function calculateLevel(points: number): number {
  return Math.floor(Math.sqrt(points / 100)) + 1
}

export function getPointsForNextLevel(currentLevel: number): number {
  return currentLevel * currentLevel * 100
}

export function getMockGamificationStats(): GamificationStats {
  return {
    totalPoints: 450,
    currentStreak: 5,
    longestStreak: 12,
    level: 3,
    profileCompletion: 85,
    badges: [
      { ...BADGES.PROFILE_COMPLETE, unlockedAt: new Date("2024-01-15") },
      { ...BADGES.FIRST_MATCH, unlockedAt: new Date("2024-01-16") },
      { ...BADGES.WEEK_STREAK, unlockedAt: new Date("2024-01-22") },
      { ...BADGES.FIRST_APPLICATION, unlockedAt: new Date("2024-01-20") },
      { ...BADGES.HEALTH_TRACKER, progress: 10, total: 14 },
      { ...BADGES.MONTH_STREAK, progress: 5, total: 30 },
      { ...BADGES.RESEARCH_HERO, progress: 1, total: 3 },
    ],
    recentAchievements: [
      {
        id: "1",
        title: "Daily Check-in",
        points: 10,
        timestamp: new Date(),
      },
      {
        id: "2",
        title: "Profile Updated",
        points: 25,
        timestamp: new Date(Date.now() - 86400000),
      },
      {
        id: "3",
        title: "Trial Application Submitted",
        points: 100,
        timestamp: new Date(Date.now() - 172800000),
      },
    ],
  }
}
