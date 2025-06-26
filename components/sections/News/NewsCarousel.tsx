"use client"

import React, { useState, useEffect } from "react"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { 
  ChevronLeft, 
  ChevronRight, 
  Megaphone, 
  Trophy, 
  Building2, 
  UserPlus, 
  Cpu,
  Flame,
  Clock,
  Eye
} from "lucide-react"
import type { NewsItem } from "@/lib/types"

// Sample news data
const newsItems: NewsItem[] = [
  {
    id: "1",
    category: "announcement",
    title: "SonOrca 2.0 Launch - Revolutionary Context Intelligence",
    summary: "Our flagship platform gets smarter with advanced ML capabilities",
    content: "We're thrilled to announce SonOrca 2.0, featuring real-time context analysis, improved decision-making algorithms, and seamless integration with all 14 AI agents.",
    imageUrl: "/news/sonorca-launch.jpg",
    author: { name: "Vivek N.", photo: "/team/vivek.jpg" },
    publishedAt: new Date("2025-01-26T10:00:00"),
    featured: true,
    breaking: true
  },
  {
    id: "2",
    category: "new_client",
    title: "Fortune 500 Financial Giant Joins Pangea Family",
    summary: "Expanding our US market presence with a major enterprise client",
    content: "Another Fortune 500 company has chosen SonOrca for their enterprise AI needs, marking our 8th major client this quarter.",
    imageUrl: "/news/new-client.jpg",
    author: { name: "Sales Team", photo: "/team/sales.jpg" },
    publishedAt: new Date("2025-01-25T14:00:00"),
    featured: true,
    breaking: false
  },
  {
    id: "3",
    category: "award",
    title: "The Hustle Award Winner - Raj M.",
    summary: "Celebrating relentless dedication and outstanding performance",
    content: "Raj exemplified 'No Chill, All Skill' by shipping 15 features while mentoring 3 juniors and maintaining 100% code review SLA.",
    imageUrl: "/news/award-hustle.jpg",
    author: { name: "HR Team", photo: "/team/hr.jpg" },
    publishedAt: new Date("2025-01-24T16:00:00"),
    featured: false,
    breaking: false
  },
  {
    id: "4",
    category: "new_employee",
    title: "Welcome Priya S. - Senior AI Engineer",
    summary: "Stanford PhD joins our AI research team",
    content: "Priya brings expertise in large language models and has published 12 papers on context-aware AI systems.",
    imageUrl: "/team/priya-new.jpg",
    author: { name: "HR Team", photo: "/team/hr.jpg" },
    publishedAt: new Date("2025-01-23T09:00:00"),
    featured: false,
    breaking: false
  },
  {
    id: "5",
    category: "ai_news",
    title: "TuringXai Achieves 99.2% Accuracy Milestone",
    summary: "Our problem-solving AI sets new industry benchmark",
    content: "TuringXai has achieved a remarkable 99.2% accuracy in complex problem-solving scenarios, outperforming major competitors.",
    imageUrl: "/news/turingxai.jpg",
    author: { name: "AI Team", photo: "/team/ai.jpg" },
    publishedAt: new Date("2025-01-22T11:00:00"),
    featured: false,
    breaking: false
  },
  {
    id: "6",
    category: "ai_news",
    title: "TurtleMoves Optimization Saves 500+ Hours Monthly",
    summary: "Steady progress tracking revolutionizes project management",
    content: "Our TurtleMoves AI has helped teams save over 500 hours per month through intelligent task optimization and progress prediction.",
    imageUrl: "/news/turtlemoves.jpg",
    author: { name: "Product Team", photo: "/team/product.jpg" },
    publishedAt: new Date("2025-01-21T15:00:00"),
    featured: false,
    breaking: false
  }
]

const getCategoryIcon = (category: NewsItem['category']) => {
  switch (category) {
    case 'announcement':
      return <Megaphone className="w-4 h-4" />
    case 'award':
      return <Trophy className="w-4 h-4" />
    case 'new_client':
      return <Building2 className="w-4 h-4" />
    case 'new_employee':
      return <UserPlus className="w-4 h-4" />
    case 'ai_news':
      return <Cpu className="w-4 h-4" />
  }
}

const getCategoryColor = (category: NewsItem['category']) => {
  switch (category) {
    case 'announcement':
      return 'bg-[#0A1628] text-white' // SonOrca blue
    case 'award':
      return 'bg-[#7209B7] text-white' // PitchPerfect purple
    case 'new_client':
      return 'bg-[#2D6A4F] text-white' // TurtleMoves green
    case 'new_employee':
      return 'bg-[#F4A261] text-white' // TuringXai gold
    case 'ai_news':
      return 'bg-gradient-to-r from-[#0A1628] to-[#1E3A5F] text-white'
  }
}

const formatCategory = (category: NewsItem['category']) => {
  switch (category) {
    case 'announcement':
      return 'Announcement'
    case 'award':
      return 'Award'
    case 'new_client':
      return 'New Client'
    case 'new_employee':
      return 'New Employee'
    case 'ai_news':
      return 'AI News'
  }
}

export const NewsCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)
  
  // Get featured items for main display
  const featuredItems = newsItems.filter(item => item.featured)
  const currentFeatured = featuredItems[currentIndex % featuredItems.length]
  
  // Get latest 2 AI news for sidebar
  const aiNews = newsItems
    .filter(item => item.category === 'ai_news')
    .slice(0, 2)

  useEffect(() => {
    if (!isAutoPlaying) return

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % featuredItems.length)
    }, 8000) // Change every 8 seconds

    return () => clearInterval(interval)
  }, [isAutoPlaying, featuredItems.length])

  const goToPrevious = () => {
    setIsAutoPlaying(false)
    setCurrentIndex((prev) => (prev - 1 + featuredItems.length) % featuredItems.length)
  }

  const goToNext = () => {
    setIsAutoPlaying(false)
    setCurrentIndex((prev) => (prev + 1) % featuredItems.length)
  }

  const getTimeAgo = (date: Date) => {
    const now = new Date()
    const diff = now.getTime() - date.getTime()
    const hours = Math.floor(diff / (1000 * 60 * 60))
    const days = Math.floor(hours / 24)
    
    if (days > 0) return `${days}d ago`
    if (hours > 0) return `${hours}h ago`
    return 'Just now'
  }

  return (
    <Card className="p-0 overflow-hidden bg-gradient-to-br from-background to-muted/20">
      <div className="flex h-[400px]">
        {/* Main Featured Story - 60% */}
        <div className="w-3/5 relative group">
          {/* Background Image Placeholder */}
          <div className="absolute inset-0 bg-gradient-to-br from-[#0A1628] to-[#1E3A5F] opacity-90" />
          
          {/* Content Overlay */}
          <div className="relative h-full p-8 flex flex-col justify-between text-white">
            {/* Top Section */}
            <div>
              <div className="flex items-center gap-3 mb-4">
                <Badge className={`${getCategoryColor(currentFeatured.category)} px-3 py-1`}>
                  {getCategoryIcon(currentFeatured.category)}
                  <span className="ml-1">{formatCategory(currentFeatured.category)}</span>
                </Badge>
                {currentFeatured.breaking && (
                  <Badge variant="destructive" className="animate-pulse">
                    <Flame className="w-3 h-3 mr-1" />
                    BREAKING
                  </Badge>
                )}
                <span className="text-sm opacity-80 flex items-center gap-1">
                  <Clock className="w-3 h-3" />
                  {getTimeAgo(currentFeatured.publishedAt)}
                </span>
              </div>
              
              <h2 className="text-3xl font-bold mb-3 leading-tight">
                {currentFeatured.title}
              </h2>
              
              <p className="text-lg opacity-90 line-clamp-3">
                {currentFeatured.content}
              </p>
            </div>

            {/* Bottom Section */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
                  {currentFeatured.author.name.charAt(0)}
                </div>
                <div>
                  <p className="font-medium">{currentFeatured.author.name}</p>
                  <p className="text-sm opacity-80">
                    {currentFeatured.publishedAt.toLocaleDateString()}
                  </p>
                </div>
              </div>
              
              <Button variant="secondary" size="sm" className="group">
                Read More
                <Eye className="w-4 h-4 ml-2 group-hover:scale-110 transition-transform" />
              </Button>
            </div>

            {/* Navigation Arrows */}
            <div className="absolute top-1/2 -translate-y-1/2 left-4 right-4 flex justify-between pointer-events-none">
              <Button
                variant="ghost"
                size="icon"
                onClick={goToPrevious}
                className="pointer-events-auto bg-black/20 hover:bg-black/40 text-white border-white/20"
              >
                <ChevronLeft className="h-6 w-6" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                onClick={goToNext}
                className="pointer-events-auto bg-black/20 hover:bg-black/40 text-white border-white/20"
              >
                <ChevronRight className="h-6 w-6" />
              </Button>
            </div>
          </div>
        </div>

        {/* Side Stories - 40% */}
        <div className="w-2/5 flex flex-col">
          {/* Recent Stories */}
          <div className="flex-1 p-4 space-y-3 overflow-y-auto">
            <h3 className="font-semibold text-sm text-muted-foreground mb-2">LATEST UPDATES</h3>
            {newsItems.slice(0, 3).map((item) => (
              <Card 
                key={item.id} 
                className="p-3 hover:shadow-md transition-all cursor-pointer group"
              >
                <div className="flex items-start gap-2 mb-2">
                  <Badge className={`${getCategoryColor(item.category)} text-xs`}>
                    {getCategoryIcon(item.category)}
                  </Badge>
                  <span className="text-xs text-muted-foreground">
                    {getTimeAgo(item.publishedAt)}
                  </span>
                </div>
                <h4 className="font-semibold text-sm line-clamp-2 group-hover:text-primary transition-colors">
                  {item.title}
                </h4>
                <p className="text-xs text-muted-foreground line-clamp-2 mt-1">
                  {item.summary}
                </p>
              </Card>
            ))}
          </div>

          {/* AI News Section */}
          <div className="border-t p-4 bg-gradient-to-br from-[#F4A261]/10 to-[#FED9A6]/10">
            <h3 className="font-semibold text-sm mb-3 flex items-center gap-2">
              <Cpu className="w-4 h-4 text-[#F4A261]" />
              AI UPDATES
            </h3>
            <div className="space-y-2">
              {aiNews.map((item) => (
                <div key={item.id} className="group cursor-pointer">
                  <h4 className="font-medium text-sm line-clamp-1 group-hover:text-[#F4A261] transition-colors">
                    {item.title}
                  </h4>
                  <p className="text-xs text-muted-foreground line-clamp-1">
                    {item.summary}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Progress Indicators */}
      <div className="px-8 py-3 border-t bg-muted/30">
        <div className="flex items-center justify-center gap-2">
          {featuredItems.map((_, index) => (
            <button
              key={index}
              onClick={() => {
                setCurrentIndex(index)
                setIsAutoPlaying(false)
              }}
              className={`h-2 transition-all rounded-full ${
                index === currentIndex % featuredItems.length
                  ? "w-8 bg-primary"
                  : "w-2 bg-muted-foreground/30 hover:bg-muted-foreground/50"
              }`}
            />
          ))}
        </div>
      </div>
    </Card>
  )
}