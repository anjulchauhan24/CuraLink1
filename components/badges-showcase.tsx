"use client"

import { Card } from "@/components/ui/card"
import type { Badge as BadgeType } from "@/lib/gamification"
import { Progress } from "@/components/ui/progress"
import { Lock } from "lucide-react"

interface BadgesShowcaseProps {
  badges: BadgeType[]
}

export default function BadgesShowcase({ badges }: BadgesShowcaseProps) {
  const unlockedBadges = badges.filter((b) => b.unlockedAt)
  const inProgressBadges = badges.filter((b) => !b.unlockedAt && b.progress !== undefined)
  const lockedBadges = badges.filter((b) => !b.unlockedAt && b.progress === undefined)

  return (
    <Card className="p-6 space-y-6">
      <div>
        <h3 className="text-lg font-semibold mb-1">Your Badges</h3>
        <p className="text-sm text-muted-foreground">
          {unlockedBadges.length} of {badges.length} unlocked
        </p>
      </div>

      {/* Unlocked Badges */}
      {unlockedBadges.length > 0 && (
        <div className="space-y-3">
          <h4 className="text-sm font-medium text-muted-foreground">Unlocked</h4>
          <div className="grid grid-cols-2 gap-3">
            {unlockedBadges.map((badge) => (
              <div
                key={badge.id}
                className="p-4 bg-gradient-to-br from-accent/10 to-accent/5 rounded-lg border border-accent/20"
              >
                <div className="text-3xl mb-2">{badge.icon}</div>
                <p className="font-semibold text-sm">{badge.name}</p>
                <p className="text-xs text-muted-foreground mt-1">{badge.description}</p>
                {badge.unlockedAt && (
                  <p className="text-xs text-accent mt-2">{new Date(badge.unlockedAt).toLocaleDateString()}</p>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* In Progress Badges */}
      {inProgressBadges.length > 0 && (
        <div className="space-y-3">
          <h4 className="text-sm font-medium text-muted-foreground">In Progress</h4>
          <div className="space-y-3">
            {inProgressBadges.map((badge) => (
              <div key={badge.id} className="p-4 bg-muted rounded-lg">
                <div className="flex items-start gap-3">
                  <div className="text-2xl opacity-50">{badge.icon}</div>
                  <div className="flex-1 space-y-2">
                    <div>
                      <p className="font-semibold text-sm">{badge.name}</p>
                      <p className="text-xs text-muted-foreground">{badge.description}</p>
                    </div>
                    {badge.progress !== undefined && badge.total && (
                      <div className="space-y-1">
                        <Progress value={(badge.progress / badge.total) * 100} className="h-1.5" />
                        <p className="text-xs text-muted-foreground">
                          {badge.progress} / {badge.total}
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Locked Badges */}
      {lockedBadges.length > 0 && (
        <div className="space-y-3">
          <h4 className="text-sm font-medium text-muted-foreground">Locked</h4>
          <div className="grid grid-cols-2 gap-3">
            {lockedBadges.map((badge) => (
              <div key={badge.id} className="p-4 bg-muted/50 rounded-lg border border-border opacity-60">
                <div className="flex items-center gap-2 mb-2">
                  <Lock className="h-4 w-4" />
                  <div className="text-2xl opacity-30">{badge.icon}</div>
                </div>
                <p className="font-semibold text-sm">{badge.name}</p>
                <p className="text-xs text-muted-foreground mt-1">{badge.description}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </Card>
  )
}
