"use client"

import { Card } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Trophy, Flame, Star } from "lucide-react"
import { type GamificationStats, getPointsForNextLevel } from "@/lib/gamification"

interface GamificationWidgetProps {
  stats: GamificationStats
}

export default function GamificationWidget({ stats }: GamificationWidgetProps) {
  const nextLevelPoints = getPointsForNextLevel(stats.level)
  const currentLevelPoints = getPointsForNextLevel(stats.level - 1)
  const progressToNextLevel = ((stats.totalPoints - currentLevelPoints) / (nextLevelPoints - currentLevelPoints)) * 100

  return (
    <Card className="p-6 space-y-6">
      {/* Level & Points */}
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Trophy className="h-5 w-5 text-accent" />
            <span className="font-semibold">Level {stats.level}</span>
          </div>
          <span className="text-sm text-muted-foreground">{stats.totalPoints} points</span>
        </div>
        <Progress value={progressToNextLevel} className="h-2" />
        <p className="text-xs text-muted-foreground">
          {nextLevelPoints - stats.totalPoints} points to Level {stats.level + 1}
        </p>
      </div>

      {/* Streak */}
      <div className="flex items-center justify-between p-4 bg-gradient-to-r from-orange-500/10 to-red-500/10 rounded-lg border border-orange-500/20">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-orange-500/20 rounded-full">
            <Flame className="h-5 w-5 text-orange-500" />
          </div>
          <div>
            <p className="font-semibold">{stats.currentStreak} Day Streak</p>
            <p className="text-xs text-muted-foreground">Best: {stats.longestStreak} days</p>
          </div>
        </div>
        <Badge variant="secondary" className="bg-orange-500/20 text-orange-700 border-orange-500/30">
          Active
        </Badge>
      </div>

      {/* Profile Completion */}
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium">Profile Completion</span>
          <span className="text-sm text-muted-foreground">{stats.profileCompletion}%</span>
        </div>
        <Progress value={stats.profileCompletion} className="h-2" />
        {stats.profileCompletion < 100 && (
          <p className="text-xs text-muted-foreground">Complete your profile to unlock better trial matches</p>
        )}
      </div>

      {/* Recent Achievements */}
      <div className="space-y-3">
        <h4 className="text-sm font-semibold flex items-center gap-2">
          <Star className="h-4 w-4 text-accent" />
          Recent Achievements
        </h4>
        <div className="space-y-2">
          {stats.recentAchievements.slice(0, 3).map((achievement) => (
            <div key={achievement.id} className="flex items-center justify-between p-3 bg-muted rounded-lg">
              <div>
                <p className="text-sm font-medium">{achievement.title}</p>
                <p className="text-xs text-muted-foreground">{new Date(achievement.timestamp).toLocaleDateString()}</p>
              </div>
              <Badge variant="secondary" className="bg-accent/20 text-accent">
                +{achievement.points}
              </Badge>
            </div>
          ))}
        </div>
      </div>
    </Card>
  )
}
