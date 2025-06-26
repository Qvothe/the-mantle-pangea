"use client"

import React, { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { 
  Trophy, 
  TrendingUp, 
  Users, 
  Calendar,
  Sparkles,
  Rocket,
  Zap,
  Heart,
  Star,
  Gift,
  ChevronRight,
  Info,
  Clock
} from "lucide-react"
import type { Award, AwardPrediction } from "@/lib/types"

// Enhanced award data with current odds
const awards: Award[] = [
  {
    id: 1,
    name: "The Culture Catalyst Award",
    icon: <Sparkles className="w-6 h-6" />,
    for: "Boosting Team Culture & Spirit",
    description: '✨ Chief Vibe Officer! They bring the "fun" to "functional."',
    frequency: "Monthly",
    color: "from-purple-500 to-purple-600",
    bgColor: "bg-purple-50",
    sectionBg: "bg-gradient-to-br from-purple-50 to-purple-100",
    darkSectionBg: "bg-gradient-to-br from-purple-900/20 to-purple-800/20",
    iconColor: "bg-purple-500",
    tagline: "✨ Chief Vibe Officer!",
    prize: {
      name: "Amazon Voucher",
      description: "₹5,000 Amazon voucher",
      value: "₹5,000",
      icon: "🛒",
    },
    currentOdds: 0
  },
  {
    id: 2,
    name: "The Rocket Start Award",
    icon: <Rocket className="w-6 h-6" />,
    for: "Quick Impact by a New Joiner",
    description: "🚀 Houston, We Have a Star!",
    frequency: "Quarterly",
    color: "from-blue-500 to-blue-600",
    bgColor: "bg-blue-50",
    sectionBg: "bg-gradient-to-br from-blue-50 to-blue-100",
    darkSectionBg: "bg-gradient-to-br from-blue-900/20 to-blue-800/20",
    iconColor: "bg-blue-500",
    tagline: "🚀 Houston, We Have a Star!",
    prize: {
      name: "AI Tool Subscription",
      description: "Quarterly subscription (up to $150)",
      value: "Up to $150",
      icon: "🤖",
    },
    currentOdds: 0
  },
  {
    id: 3,
    name: "The Hustle Award",
    icon: <Zap className="w-6 h-6" />,
    for: "Consistent Effort & Grit",
    description: "🔥 No Chill, All Skill!",
    frequency: "Quarterly",
    color: "from-orange-500 to-orange-600",
    bgColor: "bg-orange-50",
    sectionBg: "bg-gradient-to-br from-orange-50 to-orange-100",
    darkSectionBg: "bg-gradient-to-br from-orange-900/20 to-orange-800/20",
    iconColor: "bg-orange-500",
    tagline: "🔥 No Chill, All Skill!",
    prize: {
      name: "AI Tool Subscription",
      description: "Quarterly subscription (up to $150)",
      value: "Up to $150",
      icon: "🤖",
    },
    currentOdds: 0
  }
]

// Sample nominees for predictions
const nominees = [
  { id: "1", name: "Sarah K.", department: "Engineering", photo: "/team/sarah.jpg" },
  { id: "2", name: "Raj M.", department: "Product", photo: "/team/raj.jpg" },
  { id: "3", name: "Lisa C.", department: "Design", photo: "/team/lisa.jpg" },
  { id: "4", name: "Ahmad S.", department: "Sales", photo: "/team/ahmad.jpg" },
  { id: "5", name: "Priya T.", department: "AI Research", photo: "/team/priya.jpg" },
]

// Calculate odds based on predictions
const calculateOdds = (predictions: AwardPrediction[], nomineeId: string): number => {
  const totalPredictions = predictions.length
  if (totalPredictions === 0) return 0
  
  const nomineePredictions = predictions.filter(p => p.nomineeId === nomineeId).length
  return Math.round((nomineePredictions / totalPredictions) * 100)
}

export const AwardsSection = () => {
  const [selectedAward, setSelectedAward] = useState<Award>(awards[0])
  const [predictions, setPredictions] = useState<AwardPrediction[]>([])
  const [userPrediction, setUserPrediction] = useState<string | null>(null)
  const [showPredictionSuccess, setShowPredictionSuccess] = useState(false)

  // Simulate some existing predictions
  useEffect(() => {
    const mockPredictions: AwardPrediction[] = [
      { userId: "u1", awardId: 1, nomineeId: "1", confidence: 85, timestamp: new Date() },
      { userId: "u2", awardId: 1, nomineeId: "2", confidence: 90, timestamp: new Date() },
      { userId: "u3", awardId: 1, nomineeId: "1", confidence: 75, timestamp: new Date() },
      { userId: "u4", awardId: 1, nomineeId: "3", confidence: 80, timestamp: new Date() },
      { userId: "u5", awardId: 1, nomineeId: "1", confidence: 95, timestamp: new Date() },
    ]
    setPredictions(mockPredictions)
  }, [])

  const makePrediction = (nomineeId: string) => {
    setUserPrediction(nomineeId)
    setShowPredictionSuccess(true)
    
    // Add user's prediction
    const newPrediction: AwardPrediction = {
      userId: "current-user",
      awardId: selectedAward.id,
      nomineeId: nomineeId,
      confidence: 85,
      timestamp: new Date()
    }
    setPredictions([...predictions, newPrediction])

    setTimeout(() => setShowPredictionSuccess(false), 3000)
  }

  const getTimeUntilAward = (frequency: string) => {
    switch (frequency) {
      case "Monthly":
        return "5 days"
      case "Quarterly":
        return "3 weeks"
      case "Annually":
        return "2 months"
      default:
        return "Soon"
    }
  }

  return (
    <div className="space-y-6">
      {/* Section Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold bg-gradient-to-r from-[#7209B7] to-[#B5179E] bg-clip-text text-transparent">
            Awards & Predictions
          </h2>
          <p className="text-muted-foreground mt-1">
            Predict who'll win and see live odds change
          </p>
        </div>
        <Button variant="outline" className="gap-2">
          View All Awards
          <ChevronRight className="w-4 h-4" />
        </Button>
      </div>

      {/* Award Selector */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {awards.map((award) => (
          <Card
            key={award.id}
            className={`cursor-pointer transition-all hover:scale-105 ${
              selectedAward.id === award.id 
                ? 'ring-2 ring-primary shadow-lg' 
                : 'hover:shadow-md'
            }`}
            onClick={() => setSelectedAward(award)}
          >
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                <div className={`w-12 h-12 rounded-lg ${award.iconColor} flex items-center justify-center text-white`}>
                  {award.icon}
                </div>
                <Badge variant="secondary" className="text-xs">
                  {award.frequency}
                </Badge>
              </div>
              <CardTitle className="text-lg mt-3">{award.name}</CardTitle>
              <CardDescription className="text-xs">{award.for}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Prize:</span>
                <span className="font-medium">{award.prize.value}</span>
              </div>
              <div className="flex items-center justify-between text-sm mt-2">
                <span className="text-muted-foreground">Next:</span>
                <span className="font-medium flex items-center gap-1">
                  <Clock className="w-3 h-3" />
                  {getTimeUntilAward(award.frequency)}
                </span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Selected Award Details & Predictions */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Award Info */}
        <Card className="lg:col-span-1">
          <CardHeader>
            <div className={`w-16 h-16 rounded-xl ${selectedAward.iconColor} flex items-center justify-center text-white mb-4`}>
              {selectedAward.icon}
            </div>
            <CardTitle>{selectedAward.name}</CardTitle>
            <CardDescription>{selectedAward.tagline}</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-sm">{selectedAward.description}</p>
            
            <div className="space-y-3">
              <div className="flex items-center gap-3 p-3 bg-muted/50 rounded-lg">
                <span className="text-2xl">{selectedAward.prize.icon}</span>
                <div>
                  <p className="font-medium">{selectedAward.prize.name}</p>
                  <p className="text-xs text-muted-foreground">{selectedAward.prize.description}</p>
                </div>
              </div>
              
              <div className="flex items-center gap-2 text-sm">
                <Calendar className="w-4 h-4 text-muted-foreground" />
                <span>Announced in {getTimeUntilAward(selectedAward.frequency)}</span>
              </div>
            </div>

            {showPredictionSuccess && (
              <div className="p-3 bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-400 rounded-lg text-sm">
                ✅ Your prediction has been recorded!
              </div>
            )}
          </CardContent>
        </Card>

        {/* Prediction Market */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Live Prediction Market</CardTitle>
                <CardDescription>Who do you think will win?</CardDescription>
              </div>
              <Badge className="gap-1">
                <Users className="w-3 h-3" />
                {predictions.length} predictions
              </Badge>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {nominees.map((nominee) => {
                const odds = calculateOdds(
                  predictions.filter(p => p.awardId === selectedAward.id),
                  nominee.id
                )
                const isPredicted = userPrediction === nominee.id

                return (
                  <div key={nominee.id} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#0A1628] to-[#1E3A5F] flex items-center justify-center text-white font-bold">
                          {nominee.name.charAt(0)}
                        </div>
                        <div>
                          <p className="font-medium">{nominee.name}</p>
                          <p className="text-xs text-muted-foreground">{nominee.department}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="text-right">
                          <p className="text-2xl font-bold">{odds}%</p>
                          <p className="text-xs text-muted-foreground">Current Odds</p>
                        </div>
                        <Button
                          size="sm"
                          variant={isPredicted ? "default" : "outline"}
                          onClick={() => makePrediction(nominee.id)}
                          disabled={userPrediction !== null}
                        >
                          {isPredicted ? (
                            <>
                              <Star className="w-4 h-4 mr-1" />
                              Your Pick
                            </>
                          ) : (
                            "Predict"
                          )}
                        </Button>
                      </div>
                    </div>
                    <Progress value={odds} className="h-2" />
                  </div>
                )
              })}
            </div>

            <div className="mt-6 p-4 bg-muted/50 rounded-lg">
              <div className="flex items-start gap-2">
                <Info className="w-4 h-4 text-muted-foreground mt-0.5" />
                <div className="text-sm text-muted-foreground">
                  <p className="font-medium mb-1">How it works:</p>
                  <ul className="space-y-1 text-xs">
                    <li>• Make your prediction for each award</li>
                    <li>• Watch odds change as more people predict</li>
                    <li>• Earn points for correct predictions</li>
                    <li>• Top predictors get featured on the leaderboard</li>
                  </ul>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}