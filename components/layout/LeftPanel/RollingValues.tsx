"use client"

import React, { useState, useEffect } from "react"
import { Card } from "@/components/ui/card"
import { ChevronLeft, ChevronRight, Pause, Play } from "lucide-react"
import { Button } from "@/components/ui/button"
import type { Value } from "@/lib/types"

// PANGEA Values with GOATs
const values: Value[] = [
  {
    letter: "P",
    value: "Performance",
    description: "Consistency beats talent",
    goat: {
      name: "Tom Brady",
      quote: "Consistency beats talent when talent doesn't work hard",
      image: "/goats/brady.jpg",
      achievement: "7 Super Bowl Championships"
    },
    champion: {
      name: "Sarah K.",
      photo: "/team/sarah.jpg",
      achievement: "Shipped 47 features this quarter",
      month: "January 2025"
    },
    icon: "🏆",
    color: "from-blue-500 to-blue-600"
  },
  {
    letter: "A",
    value: "Adaptability",
    description: "Change is the only constant",
    goat: {
      name: "Michael Jordan",
      quote: "I've failed over and over... that's why I succeed",
      image: "/goats/jordan.jpg",
      achievement: "6 NBA Championships, 5 MVPs"
    },
    champion: {
      name: "Raj M.",
      photo: "/team/raj.jpg",
      achievement: "Pivoted our ML pipeline in 2 days",
      month: "January 2025"
    },
    icon: "🏀",
    color: "from-red-500 to-red-600"
  },
  {
    letter: "N",
    value: "Never Settle",
    description: "Excellence is a journey",
    goat: {
      name: "Wayne Gretzky",
      quote: "You miss 100% of the shots you don't take",
      image: "/goats/gretzky.jpg",
      achievement: "Most goals in NHL history"
    },
    champion: {
      name: "Lisa C.",
      photo: "/team/lisa.jpg",
      achievement: "Proposed 23 innovation ideas this year",
      month: "January 2025"
    },
    icon: "🏒",
    color: "from-cyan-500 to-cyan-600"
  },
  {
    letter: "G",
    value: "Greatness",
    description: "Be legendary",
    goat: {
      name: "Sachin Tendulkar",
      quote: "Enjoy the game and chase your dreams",
      image: "/goats/sachin.jpg",
      achievement: "Most runs in cricket history"
    },
    champion: {
      name: "Ahmad S.",
      photo: "/team/ahmad.jpg",
      achievement: "Mentored 8 junior developers",
      month: "January 2025"
    },
    icon: "🏏",
    color: "from-green-500 to-green-600"
  },
  {
    letter: "E",
    value: "Excellence",
    description: "Quality in everything",
    goat: {
      name: "Steve Jobs",
      quote: "Be a yardstick of quality",
      image: "/goats/jobs.jpg",
      achievement: "Revolutionized personal computing"
    },
    champion: {
      name: "Priya T.",
      photo: "/team/priya.jpg",
      achievement: "Zero bugs in production for 6 months",
      month: "January 2025"
    },
    icon: "🍎",
    color: "from-gray-600 to-gray-700"
  },
  {
    letter: "A",
    value: "Ambition",
    description: "Dream big, achieve bigger",
    goat: {
      name: "Serena Williams",
      quote: "I really think a champion is defined not by their wins but by how they can recover when they fall",
      image: "/goats/serena.jpg",
      achievement: "23 Grand Slam singles titles"
    },
    champion: {
      name: "James L.",
      photo: "/team/james.jpg",
      achievement: "Led impossible client turnaround",
      month: "January 2025"
    },
    icon: "🎾",
    color: "from-purple-500 to-purple-600"
  }
]

export const RollingValues = () => {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isPlaying, setIsPlaying] = useState(true)

  useEffect(() => {
    if (!isPlaying) return

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % values.length)
    }, 10000) // Change every 10 seconds

    return () => clearInterval(interval)
  }, [isPlaying])

  const currentValue = values[currentIndex]

  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev - 1 + values.length) % values.length)
  }

  const goToNext = () => {
    setCurrentIndex((prev) => (prev + 1) % values.length)
  }

  return (
    <Card className="p-4 bg-gradient-to-br from-background to-muted/20 border-2">
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-lg font-semibold">Our Values</h3>
        <div className="flex items-center gap-1">
          <Button
            variant="ghost"
            size="icon"
            className="h-6 w-6"
            onClick={() => setIsPlaying(!isPlaying)}
          >
            {isPlaying ? <Pause className="h-3 w-3" /> : <Play className="h-3 w-3" />}
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="h-6 w-6"
            onClick={goToPrevious}
          >
            <ChevronLeft className="h-3 w-3" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="h-6 w-6"
            onClick={goToNext}
          >
            <ChevronRight className="h-3 w-3" />
          </Button>
        </div>
      </div>

      <div className="space-y-4">
        {/* Value Header */}
        <div className="flex items-center gap-3">
          <div className={`w-12 h-12 rounded-lg bg-gradient-to-br ${currentValue.color} flex items-center justify-center text-white font-bold text-2xl`}>
            {currentValue.letter}
          </div>
          <div>
            <h4 className="font-bold text-xl">{currentValue.value}</h4>
            <p className="text-sm text-muted-foreground">{currentValue.description}</p>
          </div>
        </div>

        {/* GOAT Section */}
        <div className="bg-muted/30 rounded-lg p-3">
          <div className="flex items-center gap-3 mb-2">
            <span className="text-2xl">{currentValue.icon}</span>
            <div className="flex-1">
              <p className="font-semibold">{currentValue.goat.name}</p>
              <p className="text-xs text-muted-foreground">{currentValue.goat.achievement}</p>
            </div>
          </div>
          <p className="text-sm italic">"{currentValue.goat.quote}"</p>
        </div>

        {/* Pangea Champion */}
        <div className="bg-primary/5 rounded-lg p-3">
          <p className="text-xs font-semibold text-primary mb-1">Pangea Champion</p>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#2D6A4F] to-[#89D4CF] flex items-center justify-center text-white font-bold">
              {currentValue.champion.name.charAt(0)}
            </div>
            <div className="flex-1">
              <p className="font-semibold text-sm">{currentValue.champion.name}</p>
              <p className="text-xs text-muted-foreground">{currentValue.champion.achievement}</p>
            </div>
          </div>
        </div>

        {/* Progress Dots */}
        <div className="flex justify-center gap-1 pt-2">
          {values.map((_, index) => (
            <div
              key={index}
              className={`h-1.5 w-1.5 rounded-full transition-all ${
                index === currentIndex 
                  ? "w-4 bg-primary" 
                  : "bg-muted-foreground/30"
              }`}
            />
          ))}
        </div>
      </div>
    </Card>
  )
}