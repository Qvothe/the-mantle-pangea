"use client"

import React, { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Progress } from "@/components/ui/progress"
import { 
  Trophy,
  TrendingUp,
  TrendingDown,
  Users,
  Calendar,
  Clock,
  Laptop,
  Lock,
  Unlock,
  Camera,
  MessageSquare,
  Award,
  Star,
  Heart,
  Zap,
  Target,
  Timer,
  User,
  Crown,
  Medal,
  Sparkles
} from "lucide-react"
import type { CricketStats, LaptopUnlock, HumanOfPangea, DesignationNomination } from "@/lib/types"

// Mock data for cricket stats
const cricketStats: CricketStats[] = [
  {
    playerId: "1",
    playerName: "Raj M.",
    photo: "/team/raj.jpg",
    ducks: 5,
    catches: 2,
    timedOut: 3,
    manOfTheMatch: 1,
    lastPlayed: new Date("2025-01-20")
  },
  {
    playerId: "2",
    playerName: "Sai K.",
    photo: "/team/sai.jpg",
    ducks: 3,
    catches: 8,
    timedOut: 1,
    manOfTheMatch: 3,
    lastPlayed: new Date("2025-01-25")
  },
  {
    playerId: "3",
    playerName: "Ahmad S.",
    photo: "/team/ahmad.jpg",
    ducks: 7,
    catches: 1,
    timedOut: 2,
    manOfTheMatch: 0,
    lastPlayed: new Date("2025-01-22")
  },
  {
    playerId: "4",
    playerName: "Lisa C.",
    photo: "/team/lisa.jpg",
    ducks: 2,
    catches: 5,
    timedOut: 0,
    manOfTheMatch: 2,
    lastPlayed: new Date("2025-01-24")
  }
]

// Mock data for laptop unlocks
const laptopUnlocks: LaptopUnlock[] = [
  {
    id: "1",
    userId: "2",
    userName: "Sai K.",
    photo: "/team/sai.jpg",
    timestamp: new Date("2025-01-26T14:30:00"),
    excuse: "Just went to grab coffee, I swear!",
    punishmentStatus: "pending",
    punishment: "Team dinner on Friday",
    evidenceUrl: "/evidence/sai-laptop.jpg"
  },
  {
    id: "2",
    userId: "1",
    userName: "Raj M.",
    photo: "/team/raj.jpg",
    timestamp: new Date("2025-01-24T16:45:00"),
    excuse: "Emergency bathroom break",
    punishmentStatus: "completed",
    punishment: "Bought donuts for everyone",
    evidenceUrl: "/evidence/raj-laptop.jpg"
  },
  {
    id: "3",
    userId: "5",
    userName: "Priya T.",
    photo: "/team/priya.jpg",
    timestamp: new Date("2025-01-23T11:20:00"),
    excuse: "Meeting ran over, forgot to lock!",
    punishmentStatus: "pending",
    punishment: "Friday drinks on me",
    evidenceUrl: "/evidence/priya-laptop.jpg"
  }
]

// Mock data for Humans of Pangea
const humansOfPangea: HumanOfPangea[] = [
  {
    id: "1",
    employeeId: "4",
    name: "Lisa Chen",
    role: "Senior Designer",
    story: "From architecture to UI/UX design, Lisa brings a unique perspective to every project. Her journey at Pangea started 2 years ago, and she's been revolutionizing our design language ever since.",
    photos: ["/humans/lisa1.jpg", "/humans/lisa2.jpg", "/humans/lisa3.jpg"],
    quote: "Design is not just what it looks like. Design is how it works - and at Pangea, we make it work beautifully.",
    publishedDate: new Date("2025-01-15"),
    nominations: 42
  },
  {
    id: "2",
    employeeId: "3",
    name: "Ahmad Shah",
    role: "Sales Director",
    story: "Ahmad joined us from a Fortune 500 company and transformed our sales approach. His secret? Treating every client like family.",
    photos: ["/humans/ahmad1.jpg", "/humans/ahmad2.jpg", "/humans/ahmad3.jpg"],
    quote: "Success in sales isn't about selling a product, it's about solving problems and building relationships.",
    publishedDate: new Date("2025-01-08"),
    nominations: 38
  }
]

// Mock data for designation nominations
const designationNominations: DesignationNomination[] = [
  {
    id: "1",
    nomineeId: "vivek",
    nomineeName: "Vivek N.",
    designation: "Batman",
    reason: "Always working in the shadows, appears when we need him most, has all the cool gadgets (AI tools)",
    votes: 127,
    nominatedBy: "Team",
    status: "active"
  },
  {
    id: "2",
    nomineeId: "sai",
    nomineeName: "Sai K.",
    designation: "Ethan Hunt",
    reason: "Takes on impossible missions, always accepts the challenge, master of disguise (can debug anything)",
    votes: 98,
    nominatedBy: "Engineering",
    status: "active"
  },
  {
    id: "3",
    nomineeId: "likith",
    nomineeName: "Likith",
    designation: "Superman",
    reason: "Super speed coding, flies through tasks, saves the day during production issues",
    votes: 89,
    nominatedBy: "Product Team",
    status: "active"
  },
  {
    id: "4",
    nomineeId: "sarah",
    nomineeName: "Sarah K.",
    designation: "Wonder Woman",
    reason: "Amazonian strength in problem-solving, lasso of truth in code reviews",
    votes: 76,
    nominatedBy: "QA Team",
    status: "pending"
  }
]

// Days Since Vivek counter
const DaysSinceVivek = () => {
  const lastSeen = new Date("2025-01-15") // Mock date
  const now = new Date()
  const daysSince = Math.floor((now.getTime() - lastSeen.getTime()) / (1000 * 60 * 60 * 24))
  const record = 23 // Mock record
  
  return (
    <Card className="bg-gradient-to-br from-[#0A1628] to-[#1E3A5F] text-white">
      <CardHeader>
        <CardTitle className="text-2xl flex items-center gap-2">
          <Clock className="h-6 w-6" />
          Days Since Vivek in Office
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="text-center">
          <div className="text-7xl font-bold mb-4">{daysSince}</div>
          <div className="text-xl mb-4">DAYS</div>
          <div className="flex items-center justify-center gap-4 text-sm">
            <div>
              <span className="text-muted">Record:</span>
              <span className="font-bold ml-2">{record} days</span>
            </div>
            <div>
              <span className="text-muted">Last Seen:</span>
              <span className="font-bold ml-2">{lastSeen.toLocaleDateString()}</span>
            </div>
          </div>
          {daysSince > record && (
            <Badge className="mt-4 bg-yellow-500 text-black">
              🎉 NEW RECORD!
            </Badge>
          )}
        </div>
      </CardContent>
    </Card>
  )
}

export const LegendaryLeaderboards = () => {
  const [selectedTab, setSelectedTab] = useState("cricket")

  return (
    <div className="space-y-6">
      {/* Section Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold bg-gradient-to-r from-[#F4A261] to-[#FED9A6] bg-clip-text text-transparent">
            Legendary Leaderboards
          </h2>
          <p className="text-muted-foreground mt-1">
            Where legends are made and laptop crimes are exposed
          </p>
        </div>
      </div>

      {/* Main Leaderboard Tabs */}
      <Tabs value={selectedTab} onValueChange={setSelectedTab} className="space-y-4">
        <TabsList className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 w-full">
          <TabsTrigger value="cricket" className="text-xs md:text-sm">🏏 Cricket</TabsTrigger>
          <TabsTrigger value="laptop" className="text-xs md:text-sm">💻 Laptop</TabsTrigger>
          <TabsTrigger value="vivek" className="text-xs md:text-sm">📅 Vivek</TabsTrigger>
          <TabsTrigger value="humans" className="text-xs md:text-sm">👥 Humans</TabsTrigger>
          <TabsTrigger value="designations" className="text-xs md:text-sm">🦸 Heroes</TabsTrigger>
        </TabsList>

        {/* Cricket Heroes Tab */}
        <TabsContent value="cricket" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Golden Duck Award */}
            <Card className="bg-gradient-to-br from-yellow-50 to-yellow-100 dark:from-yellow-900/20 dark:to-yellow-800/20">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg">
                  <span className="text-2xl">🦆</span>
                  Golden Duck Champion
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {cricketStats
                    .sort((a, b) => b.ducks - a.ducks)
                    .slice(0, 3)
                    .map((player, index) => (
                      <div key={player.playerId} className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <span className="text-lg font-bold text-muted-foreground">
                            {index + 1}.
                          </span>
                          <Avatar className="h-8 w-8">
                            <AvatarFallback>{player.playerName[0]}</AvatarFallback>
                          </Avatar>
                          <span className="font-medium">{player.playerName}</span>
                        </div>
                        <Badge variant="secondary">{player.ducks} 🦆</Badge>
                      </div>
                    ))}
                </div>
              </CardContent>
            </Card>

            {/* Best Fielder (Ironic) */}
            <Card className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg">
                  <span className="text-2xl">🧤</span>
                  Butterfingers Trophy
                </CardTitle>
                <CardDescription>Most dropped catches</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {cricketStats
                    .sort((a, b) => a.catches - b.catches)
                    .slice(0, 3)
                    .map((player, index) => (
                      <div key={player.playerId} className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <span className="text-lg font-bold text-muted-foreground">
                            {index + 1}.
                          </span>
                          <Avatar className="h-8 w-8">
                            <AvatarFallback>{player.playerName[0]}</AvatarFallback>
                          </Avatar>
                          <span className="font-medium">{player.playerName}</span>
                        </div>
                        <Badge variant="secondary">{player.catches} drops</Badge>
                      </div>
                    ))}
                </div>
              </CardContent>
            </Card>

            {/* Timed Out */}
            <Card className="bg-gradient-to-br from-orange-50 to-orange-100 dark:from-orange-900/20 dark:to-orange-800/20">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg">
                  <Timer className="h-5 w-5" />
                  Timed Out Champion
                </CardTitle>
                <CardDescription>Late to the crease</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {cricketStats
                    .sort((a, b) => b.timedOut - a.timedOut)
                    .slice(0, 3)
                    .map((player, index) => (
                      <div key={player.playerId} className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <span className="text-lg font-bold text-muted-foreground">
                            {index + 1}.
                          </span>
                          <Avatar className="h-8 w-8">
                            <AvatarFallback>{player.playerName[0]}</AvatarFallback>
                          </Avatar>
                          <span className="font-medium">{player.playerName}</span>
                        </div>
                        <Badge variant="secondary">{player.timedOut}x ⏱️</Badge>
                      </div>
                    ))}
                </div>
              </CardContent>
            </Card>

            {/* Man of the Match */}
            <Card className="bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg">
                  <Trophy className="h-5 w-5" />
                  Actual Champions
                </CardTitle>
                <CardDescription>Man of the Match wins</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {cricketStats
                    .sort((a, b) => b.manOfTheMatch - a.manOfTheMatch)
                    .slice(0, 3)
                    .map((player, index) => (
                      <div key={player.playerId} className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <span className="text-lg font-bold text-muted-foreground">
                            {index + 1}.
                          </span>
                          <Avatar className="h-8 w-8">
                            <AvatarFallback>{player.playerName[0]}</AvatarFallback>
                          </Avatar>
                          <span className="font-medium">{player.playerName}</span>
                        </div>
                        <Badge className="bg-green-500">{player.manOfTheMatch} 🏆</Badge>
                      </div>
                    ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Laptop Unlocks Tab */}
        <TabsContent value="laptop" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Lock className="h-5 w-5" />
                Wall of Shame - Laptop Security Violations
              </CardTitle>
              <CardDescription>
                Remember: An unlocked laptop = Team dinner on you!
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {laptopUnlocks.map((unlock) => (
                  <Card key={unlock.id} className="p-4 bg-muted/50">
                    <div className="flex items-start gap-4">
                      <Avatar className="h-12 w-12">
                        <AvatarFallback>{unlock.userName[0]}</AvatarFallback>
                      </Avatar>
                      <div className="flex-1 space-y-2">
                        <div className="flex items-start justify-between">
                          <div>
                            <h4 className="font-semibold">{unlock.userName}</h4>
                            <p className="text-sm text-muted-foreground">
                              {new Date(unlock.timestamp).toLocaleString()}
                            </p>
                          </div>
                          <Badge 
                            variant={unlock.punishmentStatus === 'completed' ? 'default' : 'secondary'}
                          >
                            {unlock.punishmentStatus === 'completed' ? 'Paid' : 'Pending'}
                          </Badge>
                        </div>
                        <div className="space-y-1">
                          <p className="text-sm">
                            <span className="font-medium">Excuse:</span> "{unlock.excuse}"
                          </p>
                          <p className="text-sm">
                            <span className="font-medium">Punishment:</span> {unlock.punishment}
                          </p>
                        </div>
                        <div className="flex items-center gap-2 text-xs text-muted-foreground">
                          <Camera className="h-3 w-3" />
                          Evidence captured
                        </div>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
              <div className="mt-4 p-4 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg">
                <p className="text-sm font-medium flex items-center gap-2">
                  <Unlock className="h-4 w-4" />
                  Total violations this month: {laptopUnlocks.length}
                </p>
                <p className="text-xs text-muted-foreground mt-1">
                  Remember to lock your laptop with Win+L or Cmd+Ctrl+Q!
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Days Since Vivek Tab */}
        <TabsContent value="vivek" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <DaysSinceVivek />
            
            <Card>
              <CardHeader>
                <CardTitle>Vivek Sightings Log</CardTitle>
                <CardDescription>Recent confirmed appearances</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                    <div>
                      <p className="font-medium">All Hands Meeting</p>
                      <p className="text-sm text-muted-foreground">Virtual appearance</p>
                    </div>
                    <span className="text-sm">Jan 15, 2025</span>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                    <div>
                      <p className="font-medium">Coffee Machine</p>
                      <p className="text-sm text-muted-foreground">Brief sighting at 7:23 AM</p>
                    </div>
                    <span className="text-sm">Jan 8, 2025</span>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                    <div>
                      <p className="font-medium">Client Demo</p>
                      <p className="text-sm text-muted-foreground">Full day presence</p>
                    </div>
                    <span className="text-sm">Dec 20, 2024</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Humans of Pangea Tab */}
        <TabsContent value="humans" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {humansOfPangea.map((human) => (
              <Card key={human.id} className="overflow-hidden">
                <div className="aspect-video bg-muted relative">
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <div className="absolute bottom-4 left-4 right-4 text-white">
                    <h3 className="text-2xl font-bold">{human.name}</h3>
                    <p className="text-sm opacity-90">{human.role}</p>
                  </div>
                </div>
                <CardContent className="pt-6">
                  <p className="text-sm mb-4">{human.story}</p>
                  <blockquote className="border-l-4 border-primary pl-4 italic mb-4">
                    "{human.quote}"
                  </blockquote>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">
                      Published {new Date(human.publishedDate).toLocaleDateString()}
                    </span>
                    <Button variant="outline" size="sm" className="gap-2">
                      <Heart className="h-4 w-4" />
                      {human.nominations} nominations
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
          <div className="text-center">
            <Button variant="outline" className="gap-2">
              <MessageSquare className="h-4 w-4" />
              Nominate a Colleague
            </Button>
          </div>
        </TabsContent>

        {/* Designation Nominations Tab */}
        <TabsContent value="designations" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Crown className="h-5 w-5" />
                Superhero Designations
              </CardTitle>
              <CardDescription>
                Vote for your favorite workplace superheroes
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {designationNominations
                  .sort((a, b) => b.votes - a.votes)
                  .map((nomination, index) => (
                    <Card key={nomination.id} className="p-4">
                      <div className="flex items-start gap-4">
                        <div className="text-3xl">
                          {index === 0 ? "🥇" : index === 1 ? "🥈" : index === 2 ? "🥉" : "🏅"}
                        </div>
                        <div className="flex-1 space-y-2">
                          <div className="flex items-start justify-between">
                            <div>
                              <h4 className="text-lg font-bold">
                                {nomination.nomineeName} as "{nomination.designation}"
                              </h4>
                              <p className="text-sm text-muted-foreground">
                                Nominated by {nomination.nominatedBy}
                              </p>
                            </div>
                            <Badge 
                              variant={nomination.status === 'active' ? 'default' : 'secondary'}
                            >
                              {nomination.status}
                            </Badge>
                          </div>
                          <p className="text-sm">{nomination.reason}</p>
                          <div className="flex items-center gap-4">
                            <div className="flex items-center gap-2">
                              <Progress value={(nomination.votes / 150) * 100} className="w-32" />
                              <span className="text-sm font-medium">{nomination.votes} votes</span>
                            </div>
                            <Button size="sm" variant="outline" className="gap-2">
                              <Star className="h-4 w-4" />
                              Vote
                            </Button>
                          </div>
                        </div>
                      </div>
                    </Card>
                  ))}
              </div>
              <div className="mt-6 text-center">
                <Button className="gap-2">
                  <Sparkles className="h-4 w-4" />
                  Nominate a New Superhero
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}