"use client"

import React from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ThumbsUp, Flame, Brain, Play, Plus } from "lucide-react"
import type { MustWatchContent } from "@/lib/types"

const sampleContent: MustWatchContent[] = [
  {
    id: "1",
    title: "SonOrca Platform Deep Dive",
    url: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    uploadedBy: {
      id: "1",
      name: "Vivek N.",
      photo: "/team/vivek.jpg"
    },
    category: "learning",
    reactions: {
      likes: 42,
      fire: 15,
      mindblown: 28
    },
    uploadDate: new Date("2025-01-25"),
    views: 234
  },
  {
    id: "2",
    title: "Office Cricket Finals Highlights",
    url: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    uploadedBy: {
      id: "2",
      name: "Sai K.",
      photo: "/team/sai.jpg"
    },
    category: "fun",
    reactions: {
      likes: 89,
      fire: 45,
      mindblown: 12
    },
    uploadDate: new Date("2025-01-24"),
    views: 456
  }
]

const getCategoryColor = (category: MustWatchContent['category']) => {
  switch (category) {
    case 'learning':
      return 'bg-[#F4A261]' // TuringXai gold
    case 'fun':
      return 'bg-[#7209B7]' // PitchPerfect purple
    case 'inspiration':
      return 'bg-[#2D6A4F]' // TurtleMoves green
  }
}

const getCategoryIcon = (category: MustWatchContent['category']) => {
  switch (category) {
    case 'learning':
      return '🎓'
    case 'fun':
      return '🎉'
    case 'inspiration':
      return '💡'
  }
}

export const MustWatch = () => {
  return (
    <div className="space-y-3">
      {/* Upload Button */}
      <Button 
        variant="outline" 
        className="w-full justify-start gap-2"
        size="sm"
      >
        <Plus className="h-4 w-4" />
        Upload Content
      </Button>

      {/* Content List */}
      {sampleContent.map((content) => (
        <Card key={content.id} className="p-3 hover:shadow-md transition-shadow cursor-pointer group">
          <div className="space-y-2">
            {/* Header */}
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <span className={`text-xs px-2 py-0.5 rounded-full text-white ${getCategoryColor(content.category)}`}>
                    {getCategoryIcon(content.category)} {content.category}
                  </span>
                  <span className="text-xs text-muted-foreground">{content.views} views</span>
                </div>
                <h4 className="font-semibold text-sm line-clamp-1 group-hover:text-primary transition-colors">
                  {content.title}
                </h4>
              </div>
              <div className="opacity-0 group-hover:opacity-100 transition-opacity">
                <Play className="h-8 w-8 text-primary" />
              </div>
            </div>

            {/* Uploader */}
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded-full bg-gradient-to-br from-[#0A1628] to-[#1E3A5F] flex items-center justify-center text-white text-xs font-bold">
                {content.uploadedBy.name.charAt(0)}
              </div>
              <span className="text-xs text-muted-foreground">
                {content.uploadedBy.name} • {new Date(content.uploadDate).toLocaleDateString()}
              </span>
            </div>

            {/* Reactions */}
            <div className="flex items-center gap-3">
              <button className="flex items-center gap-1 text-xs hover:text-primary transition-colors">
                <ThumbsUp className="h-3 w-3" />
                {content.reactions.likes}
              </button>
              <button className="flex items-center gap-1 text-xs hover:text-orange-500 transition-colors">
                <Flame className="h-3 w-3" />
                {content.reactions.fire}
              </button>
              <button className="flex items-center gap-1 text-xs hover:text-purple-500 transition-colors">
                <Brain className="h-3 w-3" />
                {content.reactions.mindblown}
              </button>
            </div>
          </div>
        </Card>
      ))}

      {/* View All Link */}
      <Button variant="link" className="w-full text-xs" size="sm">
        View All Content →
      </Button>
    </div>
  )
}