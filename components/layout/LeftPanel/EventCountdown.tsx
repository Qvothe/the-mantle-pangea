"use client"

import React, { useState, useEffect } from "react"
import { Card } from "@/components/ui/card"
import { Calendar, Users, PartyPopper } from "lucide-react"
import type { Event } from "@/lib/types"

// Generate future dates dynamically to avoid negative countdowns
const generateFutureDate = (daysFromNow: number): Date => {
  const date = new Date()
  date.setDate(date.getDate() + daysFromNow)
  date.setHours(9, 0, 0, 0)
  return date
}

const upcomingEvents: Event[] = [
  {
    id: "1",
    type: "team_outing",
    name: "Q1 Team Outing - Goa Trip",
    date: generateFutureDate(45), // 45 days from now
    description: "Annual team bonding trip to Goa",
    location: "Goa, India"
  },
  {
    id: "2",
    type: "all_hands",
    name: "Monthly All Hands",
    date: generateFutureDate(5), // 5 days from now
    description: "Company-wide sync and updates",
    location: "Virtual + Office"
  },
  {
    id: "3",
    type: "fun_event",
    name: "Friday Game Night",
    date: generateFutureDate(2), // 2 days from now
    description: "Board games, snacks, and fun!",
    location: "Office Cafeteria"
  }
]

interface TimeLeft {
  days: number
  hours: number
  minutes: number
  seconds: number
}

const EventIcon = ({ type }: { type: Event['type'] }) => {
  switch (type) {
    case 'team_outing':
      return <Calendar className="w-4 h-4" />
    case 'all_hands':
      return <Users className="w-4 h-4" />
    case 'fun_event':
      return <PartyPopper className="w-4 h-4" />
  }
}

const EventCard = ({ event }: { event: Event }) => {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({ days: 0, hours: 0, minutes: 0, seconds: 0 })

  useEffect(() => {
    const calculateTimeLeft = () => {
      const now = new Date().getTime()
      const eventTime = new Date(event.date).getTime()
      const difference = eventTime - now

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((difference % (1000 * 60)) / 1000)
        })
      } else {
        // Event has passed, show zeros
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 })
      }
    }

    calculateTimeLeft()
    const timer = setInterval(calculateTimeLeft, 1000)

    return () => clearInterval(timer)
  }, [event.date])

  const getEventColor = (type: Event['type']) => {
    switch (type) {
      case 'team_outing':
        return 'from-[#2D6A4F] to-[#89D4CF]' // TurtleMoves green
      case 'all_hands':
        return 'from-[#0A1628] to-[#1E3A5F]' // SonOrca blue
      case 'fun_event':
        return 'from-[#7209B7] to-[#B5179E]' // PitchPerfect purple
    }
  }

  return (
    <Card className="p-3 hover:shadow-md transition-shadow">
      <div className="flex items-start gap-3">
        <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${getEventColor(event.type)} flex items-center justify-center text-white`}>
          <EventIcon type={event.type} />
        </div>
        <div className="flex-1">
          <h4 className="font-semibold text-sm">{event.name}</h4>
          <p className="text-xs text-muted-foreground">{event.location}</p>
          <div className="mt-2 grid grid-cols-4 gap-1">
            <div className="text-center">
              <div className="text-lg font-bold">{timeLeft.days}</div>
              <div className="text-xs text-muted-foreground">days</div>
            </div>
            <div className="text-center">
              <div className="text-lg font-bold">{timeLeft.hours}</div>
              <div className="text-xs text-muted-foreground">hrs</div>
            </div>
            <div className="text-center">
              <div className="text-lg font-bold">{timeLeft.minutes}</div>
              <div className="text-xs text-muted-foreground">min</div>
            </div>
            <div className="text-center">
              <div className="text-lg font-bold">{timeLeft.seconds}</div>
              <div className="text-xs text-muted-foreground">sec</div>
            </div>
          </div>
        </div>
      </div>
    </Card>
  )
}

export const EventCountdown = () => {
  return (
    <div className="space-y-3">
      {upcomingEvents.map((event) => (
        <EventCard key={event.id} event={event} />
      ))}
    </div>
  )
}