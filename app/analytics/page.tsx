"use client"

import { MainLayout } from "@/components/layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { NumbersDashboard } from "@/components/sections/Analytics/NumbersDashboard"
import { LiveTicker } from "@/components/sections/Analytics/LiveTicker"
import { Badge } from "@/components/ui/badge"
import { BarChart3, TrendingUp, Activity } from "lucide-react"

export default function AnalyticsPage() {
  return (
    <MainLayout>
      <div className="space-y-6 max-w-full">
        {/* Page Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <BarChart3 className="h-8 w-8 text-[#0A1628]" />
            <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold bg-gradient-to-r from-[#0A1628] to-[#1E3A5F] bg-clip-text text-transparent">
              Analytics Dashboard
            </h1>
          </div>
          <p className="text-base md:text-lg text-muted-foreground">
            Deep dive into Pangea's performance metrics and trends
          </p>
        </div>

        {/* Live Ticker */}
        <section>
          <LiveTicker />
        </section>

        {/* Key Insights */}
        <section>
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Activity className="h-5 w-5" />
                Key Insights This Week
              </CardTitle>
              <CardDescription>
                Notable trends and achievements
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <TrendingUp className="h-4 w-4 text-green-600" />
                    <span className="font-semibold text-green-900 dark:text-green-100">Productivity Surge</span>
                  </div>
                  <p className="text-sm text-green-700 dark:text-green-300">
                    Code commits up 45% compared to last week
                  </p>
                </div>
                <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <TrendingUp className="h-4 w-4 text-blue-600" />
                    <span className="font-semibold text-blue-900 dark:text-blue-100">SonOrca Adoption</span>
                  </div>
                  <p className="text-sm text-blue-700 dark:text-blue-300">
                    15K+ queries processed, saving 200+ agent hours
                  </p>
                </div>
                <div className="p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <TrendingUp className="h-4 w-4 text-purple-600" />
                    <span className="font-semibold text-purple-900 dark:text-purple-100">Team Growth</span>
                  </div>
                  <p className="text-sm text-purple-700 dark:text-purple-300">
                    2 new Pangeans joined this month
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Full Dashboard */}
        <section>
          <NumbersDashboard />
        </section>
      </div>
    </MainLayout>
  )
}