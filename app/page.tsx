"use client"

import { Suspense, lazy } from "react"
import dynamic from "next/dynamic"
import { MainLayout } from "@/components/layout"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

// Dynamic imports for better performance
const NewsCarousel = dynamic(() => import("@/components/sections/News/NewsCarousel").then(mod => ({ default: mod.NewsCarousel })), {
  loading: () => <Card className="h-96 animate-pulse bg-muted" />
})

const LiveTicker = dynamic(() => import("@/components/sections/Analytics/LiveTicker").then(mod => ({ default: mod.LiveTicker })), {
  loading: () => <Card className="h-16 animate-pulse bg-muted" />
})

const AwardsSection = dynamic(() => import("@/components/sections/Awards/AwardsSection").then(mod => ({ default: mod.AwardsSection })), {
  loading: () => <Card className="h-96 animate-pulse bg-muted" />
})

const NumbersDashboard = dynamic(() => import("@/components/sections/Analytics/NumbersDashboard").then(mod => ({ default: mod.NumbersDashboard })), {
  loading: () => <Card className="h-96 animate-pulse bg-muted" />
})

const LegendaryLeaderboards = dynamic(() => import("@/components/sections/Leaderboards/LegendaryLeaderboards").then(mod => ({ default: mod.LegendaryLeaderboards })), {
  loading: () => <Card className="h-96 animate-pulse bg-muted" />
})
import { 
  Trophy, 
  Clock, 
  TrendingUp, 
  Users, 
  Code, 
  Zap,
  Calendar,
  Star
} from "lucide-react"

import { ProtectedRoute } from "@/components/auth/ProtectedRoute"

export default function TheMantleDashboard() {
  return (
    <ProtectedRoute>
      <MainLayout>
      <div className="space-y-6 max-w-full">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold bg-gradient-to-r from-[#0A1628] to-[#1E3A5F] bg-clip-text text-transparent">
            Welcome to The Mantle
          </h1>
          <p className="text-base md:text-lg text-muted-foreground mt-2">
            Where data meets delight, and legends are made
          </p>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card className="p-6 bg-gradient-to-br from-[#0A1628]/10 to-[#1E3A5F]/10 border-[#1E3A5F]/20">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Active Pangeans</p>
                <p className="text-3xl font-bold">32</p>
                <p className="text-xs text-green-600">+2 this month</p>
              </div>
              <Users className="h-12 w-12 text-[#1E3A5F] opacity-50" />
            </div>
          </Card>

          <Card className="p-6 bg-gradient-to-br from-[#2D6A4F]/10 to-[#89D4CF]/10 border-[#2D6A4F]/20">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Lines of Code</p>
                <p className="text-3xl font-bold">47.3K</p>
                <p className="text-xs text-green-600">↑ 12% this week</p>
              </div>
              <Code className="h-12 w-12 text-[#2D6A4F] opacity-50" />
            </div>
          </Card>

          <Card className="p-6 bg-gradient-to-br from-[#F4A261]/10 to-[#FED9A6]/10 border-[#F4A261]/20">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Agent Hours Saved</p>
                <p className="text-3xl font-bold">847</p>
                <p className="text-xs text-green-600">↑ 23% efficiency</p>
              </div>
              <Zap className="h-12 w-12 text-[#F4A261] opacity-50" />
            </div>
          </Card>

          <Card className="p-6 bg-gradient-to-br from-[#7209B7]/10 to-[#B5179E]/10 border-[#7209B7]/20">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Awards Given</p>
                <p className="text-3xl font-bold">12</p>
                <p className="text-xs text-purple-600">3 this month</p>
              </div>
              <Trophy className="h-12 w-12 text-[#7209B7] opacity-50" />
            </div>
          </Card>
        </div>

        {/* News Carousel */}
        <section>
          <NewsCarousel />
        </section>

        {/* Live Analytics Ticker */}
        <section>
          <LiveTicker />
        </section>

        {/* Awards Section with Betting */}
        <section>
          <AwardsSection />
        </section>

        {/* Pangea By Numbers Dashboard */}
        <section>
          <NumbersDashboard />
        </section>

        {/* Legendary Leaderboards */}
        <section>
          <LegendaryLeaderboards />
        </section>
      </div>
    </MainLayout>
    </ProtectedRoute>
  )
}