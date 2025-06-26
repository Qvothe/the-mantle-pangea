"use client"

import React, { useState, useEffect } from "react"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { useWebSocket } from "@/lib/websocket"
import { 
  TrendingUp, 
  TrendingDown, 
  Activity,
  Code,
  Users,
  Zap,
  MessageSquare,
  Target,
  DollarSign,
  Brain,
  Trophy,
  Clock
} from "lucide-react"

interface TickerItem {
  id: string
  icon: React.ReactElement
  label: string
  value: string | number
  change?: string
  trend?: 'up' | 'down' | 'stable'
  color: string
}

// Simulated real-time data
const generateTickerData = (): TickerItem[] => [
  {
    id: "1",
    icon: <Code className="w-4 h-4" />,
    label: "Lines of Code Today",
    value: Math.floor(1000 + Math.random() * 500),
    change: `+${Math.floor(10 + Math.random() * 20)}%`,
    trend: 'up',
    color: "text-[#2D6A4F]"
  },
  {
    id: "2",
    icon: <Zap className="w-4 h-4" />,
    label: "Agent Hours Saved",
    value: Math.floor(800 + Math.random() * 200),
    change: `+${Math.floor(15 + Math.random() * 10)}%`,
    trend: 'up',
    color: "text-[#F4A261]"
  },
  {
    id: "3",
    icon: <Brain className="w-4 h-4" />,
    label: "SonOrca Queries",
    value: `${(Math.random() * 5 + 10).toFixed(1)}K`,
    change: `+${Math.floor(20 + Math.random() * 15)}%`,
    trend: 'up',
    color: "text-[#0A1628]"
  },
  {
    id: "4",
    icon: <Trophy className="w-4 h-4" />,
    label: "Next Award",
    value: "The Hustle Award",
    change: "in 3 days",
    trend: 'stable',
    color: "text-[#7209B7]"
  },
  {
    id: "5",
    icon: <Users className="w-4 h-4" />,
    label: "Active Pangeans",
    value: 32,
    change: "+2 this month",
    trend: 'up',
    color: "text-[#1E3A5F]"
  },
  {
    id: "6",
    icon: <MessageSquare className="w-4 h-4" />,
    label: "Internal Posts",
    value: 147,
    change: "+12 today",
    trend: 'up',
    color: "text-[#89D4CF]"
  },
  {
    id: "7",
    icon: <Target className="w-4 h-4" />,
    label: "Demos Scheduled",
    value: 8,
    change: "3 this week",
    trend: 'stable',
    color: "text-[#B5179E]"
  },
  {
    id: "8",
    icon: <DollarSign className="w-4 h-4" />,
    label: "Pipeline Value",
    value: "$2.3M",
    change: "+$500K",
    trend: 'up',
    color: "text-green-600"
  }
]

// Mini sparkline component
const Sparkline = ({ data, color }: { data: number[], color: string }) => {
  const max = Math.max(...data)
  const min = Math.min(...data)
  const range = max - min
  const width = 50
  const height = 20
  
  const points = data.map((value, index) => {
    const x = (index / (data.length - 1)) * width
    const y = height - ((value - min) / range) * height
    return `${x},${y}`
  }).join(' ')
  
  return (
    <svg width={width} height={height} className="inline-block ml-2">
      <polyline
        points={points}
        fill="none"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

export const LiveTicker = () => {
  const [tickerData, setTickerData] = useState<TickerItem[]>(generateTickerData())
  const [isPaused, setIsPaused] = useState(false)
  
  // Use WebSocket for real-time metrics updates
  const metricsUpdate = useWebSocket<any>('metrics')
  
  // Update ticker when WebSocket sends metrics
  useEffect(() => {
    if (metricsUpdate && !isPaused) {
      setTickerData(prevData => {
        const newData = [...prevData]
        // Update specific metrics with real-time data
        const codeIndex = newData.findIndex(item => item.label === "Lines of Code Today")
        if (codeIndex !== -1) {
          newData[codeIndex].value = metricsUpdate.linesOfCode
        }
        const agentIndex = newData.findIndex(item => item.label === "Agent Hours Saved")
        if (agentIndex !== -1) {
          newData[agentIndex].value = metricsUpdate.agentHours
        }
        const queryIndex = newData.findIndex(item => item.label === "SonOrca Queries")
        if (queryIndex !== -1) {
          newData[queryIndex].value = `${(metricsUpdate.sonOrcaQueries / 1000).toFixed(1)}K`
        }
        return newData
      })
    }
  }, [metricsUpdate, isPaused])

  // Fallback: Simulate real-time updates
  useEffect(() => {
    const interval = setInterval(() => {
      if (!isPaused && !metricsUpdate) {
        setTickerData(generateTickerData())
      }
    }, 5000) // Update every 5 seconds

    return () => clearInterval(interval)
  }, [isPaused, metricsUpdate])

  // Duplicate items for seamless scrolling
  const scrollItems = [...tickerData, ...tickerData]

  return (
    <Card 
      className="p-4 bg-gradient-to-r from-[#0A1628] to-[#1E3A5F] text-white overflow-hidden relative"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Live Badge */}
      <div className="absolute left-4 top-1/2 -translate-y-1/2 z-10">
        <Badge variant="secondary" className="bg-white/20 text-white border-white/30 backdrop-blur-sm">
          <div className="h-2 w-2 bg-green-400 rounded-full mr-2 animate-pulse" />
          LIVE
        </Badge>
      </div>

      {/* Gradient Overlays for smooth edges */}
      <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-[#0A1628] to-transparent z-10 pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-[#1E3A5F] to-transparent z-10 pointer-events-none" />

      {/* Scrolling Content */}
      <div className="flex items-center ml-20">
        <div 
          className={`flex gap-12 ${isPaused ? '' : 'animate-scroll-left'}`}
          style={{
            animationDuration: '30s',
            animationIterationCount: 'infinite',
            animationTimingFunction: 'linear'
          }}
        >
          {scrollItems.map((item, index) => (
            <div 
              key={`${item.id}-${index}`} 
              className="flex items-center gap-3 whitespace-nowrap"
            >
              <div className={`${item.color}`}>
                {item.icon}
              </div>
              <span className="font-medium">{item.label}:</span>
              <span className="font-bold text-lg">{item.value}</span>
              {item.change && (
                <span className={`text-sm flex items-center gap-1 ${
                  item.trend === 'up' ? 'text-green-400' : 
                  item.trend === 'down' ? 'text-red-400' : 
                  'text-yellow-400'
                }`}>
                  {item.trend === 'up' && <TrendingUp className="w-3 h-3" />}
                  {item.trend === 'down' && <TrendingDown className="w-3 h-3" />}
                  {item.change}
                </span>
              )}
              {/* Mini sparkline for some metrics */}
              {['Lines of Code Today', 'Agent Hours Saved', 'SonOrca Queries'].includes(item.label) && (
                <Sparkline 
                  data={[3, 5, 2, 6, 4, 7, 5, 8, 6, 9]} 
                  color={item.trend === 'up' ? '#4ade80' : '#f87171'}
                />
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Real-time indicator */}
      <div className="absolute right-4 top-1/2 -translate-y-1/2">
        <div className="flex items-center gap-2 text-xs opacity-80">
          <Activity className="w-3 h-3" />
          <span>Real-time</span>
        </div>
      </div>
    </Card>
  )
}