"use client"

import React from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Trophy, Code, Users, Calendar, ExternalLink } from "lucide-react"
import type { Competition } from "@/lib/types"

// Generate future dates dynamically to avoid negative countdowns
const generateFutureDate = (daysFromNow: number): Date => {
  const date = new Date()
  date.setDate(date.getDate() + daysFromNow)
  date.setHours(23, 59, 59, 999)
  return date
}

const activeCompetitions: Competition[] = [
  {
    id: "1",
    type: "tshirt",
    title: "New T-Shirt Design Contest",
    description: "Design the next Pangea Tech official t-shirt!",
    deadline: generateFutureDate(7), // 7 days from now
    submissions: [],
    prize: "Your design on official merch + ₹5000",
    status: "active"
  },
  {
    id: "2",
    type: "open_challenge",
    title: "Open Challenge: Real-time Data Pipeline",
    description: "Build a scalable real-time data processing system",
    deadline: generateFutureDate(21), // 21 days from now
    submissions: [],
    prize: "Job offer + ₹50,000 bonus",
    status: "active"
  }
]

const getTimeRemaining = (deadline: Date) => {
  const now = new Date().getTime()
  const deadlineTime = new Date(deadline).getTime()
  const difference = deadlineTime - now
  
  if (difference <= 0) {
    return "Deadline passed"
  }
  
  const days = Math.floor(difference / (1000 * 60 * 60 * 24))
  const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
  
  if (days === 0) {
    return `${hours} hours left`
  } else if (days === 1) {
    return "1 day left"
  } else {
    return `${days} days left`
  }
}

export const Competitions = () => {
  return (
    <div className="space-y-3">
      {activeCompetitions.map((competition) => (
        <Card key={competition.id} className="p-4 hover:shadow-md transition-shadow">
          <div className="space-y-3">
            {/* Header */}
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-2">
                {competition.type === 'tshirt' ? (
                  <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#7209B7] to-[#B5179E] flex items-center justify-center text-white">
                    <Trophy className="h-4 w-4" />
                  </div>
                ) : (
                  <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#F4A261] to-[#FED9A6] flex items-center justify-center text-white">
                    <Code className="h-4 w-4" />
                  </div>
                )}
                <div>
                  <h4 className="font-semibold text-sm">{competition.title}</h4>
                  <Badge variant="secondary" className="text-xs mt-1">
                    {getTimeRemaining(competition.deadline)}
                  </Badge>
                </div>
              </div>
            </div>

            {/* Description */}
            <p className="text-xs text-muted-foreground">
              {competition.description}
            </p>

            {/* Prize */}
            <div className="flex items-center gap-2 text-xs">
              <span className="text-2xl">🎁</span>
              <span className="font-medium">{competition.prize}</span>
            </div>

            {/* Stats */}
            <div className="flex items-center justify-between text-xs text-muted-foreground">
              <div className="flex items-center gap-1">
                <Users className="h-3 w-3" />
                {competition.submissions.length} submissions
              </div>
              <div className="flex items-center gap-1">
                <Calendar className="h-3 w-3" />
                {new Date(competition.deadline).toLocaleDateString()}
              </div>
            </div>

            {/* Actions */}
            <div className="flex gap-2">
              {competition.type === 'open_challenge' ? (
                <Button size="sm" variant="default" className="flex-1 text-xs">
                  <ExternalLink className="h-3 w-3 mr-1" />
                  View Challenge
                </Button>
              ) : (
                <Button size="sm" variant="default" className="flex-1 text-xs">
                  Submit Entry
                </Button>
              )}
              <Button size="sm" variant="outline" className="text-xs">
                View All
              </Button>
            </div>
          </div>
        </Card>
      ))}
    </div>
  )
}