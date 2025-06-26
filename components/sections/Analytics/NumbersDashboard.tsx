"use client"

import React, { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { 
  Code, 
  Zap, 
  MessageSquare, 
  Share2, 
  Target, 
  Brain,
  TrendingUp,
  TrendingDown,
  Calendar,
  ChevronUp,
  ChevronDown,
  BarChart3,
  LineChart,
  Users,
  DollarSign,
  ArrowRight,
  Info
} from "lucide-react"
import type { DashboardMetrics } from "@/lib/types"

// Time period selector
type TimePeriod = 'week' | 'month' | 'quarter'

// Generate mock data based on time period
const generateMetrics = (period: TimePeriod): DashboardMetrics => {
  const multiplier = period === 'week' ? 1 : period === 'month' ? 4 : 12
  
  return {
    linesOfCode: {
      total: Math.floor(47300 * multiplier),
      byLanguage: {
        TypeScript: Math.floor(28500 * multiplier),
        Python: Math.floor(12400 * multiplier),
        Rust: Math.floor(4200 * multiplier),
        Go: Math.floor(2200 * multiplier)
      },
      trend: Array.from({ length: 7 }, () => Math.floor(Math.random() * 2000 + 1000))
    },
    agentHours: {
      saved: Math.floor(847 * multiplier),
      utilized: Math.floor(1250 * multiplier),
      efficiency: 67.8
    },
    posts: {
      internal: Math.floor(147 * multiplier),
      social: Math.floor(23 * multiplier),
      engagement: 78.5
    },
    salesFunnel: {
      demos: Math.floor(8 * multiplier),
      conversions: Math.floor(3 * multiplier),
      pipeline: Math.floor(2300000 * multiplier)
    },
    sonorcaQueries: {
      total: Math.floor(12500 * multiplier),
      uniqueUsers: Math.floor(28 * multiplier),
      topTopics: ["Context Analysis", "Decision Support", "Data Pipeline", "Agent Config", "API Integration"]
    }
  }
}

// Mini chart component
const MiniChart = ({ data, color, height = 40 }: { data: number[], color: string, height?: number }) => {
  const max = Math.max(...data)
  const min = Math.min(...data)
  const range = max - min || 1
  
  return (
    <div className="relative" style={{ height }}>
      <svg className="w-full h-full">
        {data.map((value, index) => {
          const barHeight = ((value - min) / range) * height
          const barWidth = 100 / data.length
          const x = index * barWidth + '%'
          
          return (
            <rect
              key={index}
              x={x}
              y={height - barHeight}
              width={`${barWidth - 2}%`}
              height={barHeight}
              fill={color}
              opacity={0.8}
              className="hover:opacity-100 transition-opacity"
            />
          )
        })}
      </svg>
    </div>
  )
}

// Language distribution component
const LanguageBar = ({ languages }: { languages: { [key: string]: number } }) => {
  const total = Object.values(languages).reduce((acc, val) => acc + val, 0)
  const colors = {
    TypeScript: "bg-[#0A1628]",
    Python: "bg-[#2D6A4F]",
    Rust: "bg-[#F4A261]",
    Go: "bg-[#7209B7]"
  }
  
  return (
    <div className="space-y-2">
      {Object.entries(languages).map(([lang, count]) => {
        const percentage = (count / total) * 100
        return (
          <div key={lang} className="space-y-1">
            <div className="flex justify-between text-sm">
              <span className="font-medium">{lang}</span>
              <span className="text-muted-foreground">{count.toLocaleString()} ({percentage.toFixed(1)}%)</span>
            </div>
            <Progress value={percentage} className="h-2" />
          </div>
        )
      })}
    </div>
  )
}

export const NumbersDashboard = () => {
  const [period, setPeriod] = useState<TimePeriod>('week')
  const [metrics, setMetrics] = useState<DashboardMetrics>(generateMetrics('week'))
  const [previousMetrics, setPreviousMetrics] = useState<DashboardMetrics>(generateMetrics('week'))

  useEffect(() => {
    // Simulate fetching new data when period changes
    setMetrics(generateMetrics(period))
    // Generate slightly different previous metrics for comparison
    const prev = generateMetrics(period)
    setPreviousMetrics({
      ...prev,
      linesOfCode: { ...prev.linesOfCode, total: prev.linesOfCode.total * 0.9 },
      agentHours: { ...prev.agentHours, saved: prev.agentHours.saved * 0.85 },
      posts: { ...prev.posts, internal: prev.posts.internal * 0.8 },
      salesFunnel: { ...prev.salesFunnel, pipeline: prev.salesFunnel.pipeline * 0.75 }
    })
  }, [period])

  const getChange = (current: number, previous: number) => {
    const change = ((current - previous) / previous) * 100
    return {
      value: change,
      formatted: `${change > 0 ? '+' : ''}${change.toFixed(1)}%`,
      trend: change > 0 ? 'up' : change < 0 ? 'down' : 'stable'
    }
  }

  return (
    <div className="space-y-6">
      {/* Section Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold bg-gradient-to-r from-[#2D6A4F] to-[#89D4CF] bg-clip-text text-transparent">
            Pangea By The Numbers
          </h2>
          <p className="text-muted-foreground mt-1">
            Track our collective achievements and growth
          </p>
        </div>
        
        {/* Time Period Selector */}
        <div className="flex gap-2">
          {(['week', 'month', 'quarter'] as TimePeriod[]).map((p) => (
            <Button
              key={p}
              variant={period === p ? 'default' : 'outline'}
              size="sm"
              onClick={() => setPeriod(p)}
              className="capitalize"
            >
              {p === 'week' ? 'This Week' : p === 'month' ? 'This Month' : 'This Quarter'}
            </Button>
          ))}
        </div>
      </div>

      {/* Main Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Lines of Code */}
        <Card className="relative overflow-hidden">
          <CardHeader className="pb-2">
            <div className="flex items-start justify-between">
              <div className="p-2 rounded-lg bg-gradient-to-br from-[#2D6A4F]/20 to-[#89D4CF]/20">
                <Code className="h-5 w-5 text-[#2D6A4F]" />
              </div>
              <Badge variant="secondary" className="text-xs">
                <BarChart3 className="h-3 w-3 mr-1" />
                Code
              </Badge>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div>
                <p className="text-3xl font-bold">{(metrics.linesOfCode.total / 1000).toFixed(1)}K</p>
                <p className="text-xs text-muted-foreground">Lines of Code</p>
              </div>
              <div className={`flex items-center gap-1 text-sm ${
                getChange(metrics.linesOfCode.total, previousMetrics.linesOfCode.total).trend === 'up' 
                  ? 'text-green-600' : 'text-red-600'
              }`}>
                {getChange(metrics.linesOfCode.total, previousMetrics.linesOfCode.total).trend === 'up' 
                  ? <TrendingUp className="h-3 w-3" /> 
                  : <TrendingDown className="h-3 w-3" />
                }
                {getChange(metrics.linesOfCode.total, previousMetrics.linesOfCode.total).formatted}
              </div>
              <MiniChart 
                data={metrics.linesOfCode.trend} 
                color="#2D6A4F"
                height={30}
              />
            </div>
          </CardContent>
        </Card>

        {/* Agent Hours */}
        <Card className="relative overflow-hidden">
          <CardHeader className="pb-2">
            <div className="flex items-start justify-between">
              <div className="p-2 rounded-lg bg-gradient-to-br from-[#F4A261]/20 to-[#FED9A6]/20">
                <Zap className="h-5 w-5 text-[#F4A261]" />
              </div>
              <Badge variant="secondary" className="text-xs">
                <LineChart className="h-3 w-3 mr-1" />
                AI
              </Badge>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div>
                <p className="text-3xl font-bold">{metrics.agentHours.saved}</p>
                <p className="text-xs text-muted-foreground">Agent Hours Saved</p>
              </div>
              <div className={`flex items-center gap-1 text-sm text-green-600`}>
                <TrendingUp className="h-3 w-3" />
                {getChange(metrics.agentHours.saved, previousMetrics.agentHours.saved).formatted}
              </div>
              <div className="flex items-center justify-between text-xs">
                <span className="text-muted-foreground">Efficiency</span>
                <span className="font-medium">{metrics.agentHours.efficiency}%</span>
              </div>
              <Progress value={metrics.agentHours.efficiency} className="h-1.5" />
            </div>
          </CardContent>
        </Card>

        {/* Posts & Social */}
        <Card className="relative overflow-hidden">
          <CardHeader className="pb-2">
            <div className="flex items-start justify-between">
              <div className="p-2 rounded-lg bg-gradient-to-br from-[#7209B7]/20 to-[#B5179E]/20">
                <MessageSquare className="h-5 w-5 text-[#7209B7]" />
              </div>
              <Badge variant="secondary" className="text-xs">
                <Share2 className="h-3 w-3 mr-1" />
                Social
              </Badge>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div>
                <p className="text-3xl font-bold">{metrics.posts.internal + metrics.posts.social}</p>
                <p className="text-xs text-muted-foreground">Total Posts</p>
              </div>
              <div className="grid grid-cols-2 gap-2 text-xs">
                <div>
                  <p className="font-medium">{metrics.posts.internal}</p>
                  <p className="text-muted-foreground">Internal</p>
                </div>
                <div>
                  <p className="font-medium">{metrics.posts.social}</p>
                  <p className="text-muted-foreground">Social</p>
                </div>
              </div>
              <div className="flex items-center justify-between text-xs">
                <span className="text-muted-foreground">Engagement</span>
                <span className="font-medium text-green-600">{metrics.posts.engagement}%</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Sales Funnel */}
        <Card className="relative overflow-hidden">
          <CardHeader className="pb-2">
            <div className="flex items-start justify-between">
              <div className="p-2 rounded-lg bg-gradient-to-br from-green-500/20 to-green-600/20">
                <DollarSign className="h-5 w-5 text-green-600" />
              </div>
              <Badge variant="secondary" className="text-xs">
                <Target className="h-3 w-3 mr-1" />
                Sales
              </Badge>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div>
                <p className="text-3xl font-bold">${(metrics.salesFunnel.pipeline / 1000000).toFixed(1)}M</p>
                <p className="text-xs text-muted-foreground">Pipeline Value</p>
              </div>
              <div className="grid grid-cols-2 gap-2 text-xs">
                <div>
                  <p className="font-medium">{metrics.salesFunnel.demos}</p>
                  <p className="text-muted-foreground">Demos</p>
                </div>
                <div>
                  <p className="font-medium text-green-600">{metrics.salesFunnel.conversions}</p>
                  <p className="text-muted-foreground">Closed</p>
                </div>
              </div>
              <div className="text-xs">
                <span className="text-muted-foreground">Conversion: </span>
                <span className="font-medium">
                  {((metrics.salesFunnel.conversions / metrics.salesFunnel.demos) * 100).toFixed(0)}%
                </span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Detailed Sections */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Code Breakdown */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Code className="h-5 w-5" />
              Code by Language
            </CardTitle>
            <CardDescription>
              Distribution across our tech stack
            </CardDescription>
          </CardHeader>
          <CardContent>
            <LanguageBar languages={metrics.linesOfCode.byLanguage} />
            <div className="mt-4 p-3 bg-muted/50 rounded-lg">
              <p className="text-sm font-medium mb-1">Top Contributors</p>
              <div className="space-y-1 text-xs text-muted-foreground">
                <p>1. Sarah K. - 12,450 lines</p>
                <p>2. Raj M. - 9,230 lines</p>
                <p>3. Ahmad S. - 8,190 lines</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* SonOrca Insights */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Brain className="h-5 w-5" />
              SonOrca Platform Usage
            </CardTitle>
            <CardDescription>
              Context intelligence at work
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <p className="text-2xl font-bold">{(metrics.sonorcaQueries.total / 1000).toFixed(1)}K</p>
                  <p className="text-xs text-muted-foreground">Total Queries</p>
                </div>
                <div className="space-y-1">
                  <p className="text-2xl font-bold">{metrics.sonorcaQueries.uniqueUsers}</p>
                  <p className="text-xs text-muted-foreground">Active Users</p>
                </div>
              </div>
              
              <div>
                <p className="text-sm font-medium mb-2">Top Query Topics</p>
                <div className="space-y-2">
                  {metrics.sonorcaQueries.topTopics.map((topic, index) => (
                    <div key={topic} className="flex items-center justify-between">
                      <span className="text-sm">{index + 1}. {topic}</span>
                      <Badge variant="secondary" className="text-xs">
                        {Math.floor(Math.random() * 500 + 100)} queries
                      </Badge>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Bottom Stats Bar */}
      <Card className="bg-gradient-to-r from-[#0A1628] to-[#1E3A5F] text-white">
        <CardContent className="py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-8">
              <div className="flex items-center gap-2">
                <Users className="h-4 w-4" />
                <span className="text-sm">32 Active Pangeans</span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                <span className="text-sm">{period === 'week' ? '7 Days' : period === 'month' ? '30 Days' : '90 Days'} View</span>
              </div>
              <div className="flex items-center gap-2">
                <TrendingUp className="h-4 w-4 text-green-400" />
                <span className="text-sm">Overall Growth: +23%</span>
              </div>
            </div>
            <Button variant="secondary" size="sm" className="gap-2">
              Full Analytics
              <ArrowRight className="h-4 w-4" />
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}