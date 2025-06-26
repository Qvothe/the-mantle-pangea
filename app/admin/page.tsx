"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, BarChart3, TrendingUp, Download, RefreshCw, Moon, Sun } from "lucide-react"

const awards = [
  {
    id: 1,
    name: "The Culture Catalyst Award",
    frequency: "Monthly",
    color: "from-purple-500 to-purple-600",
    prize: {
      name: "Amazon Voucher",
      description: "₹5,000 Amazon voucher to shop for anything you love",
      value: "₹5,000",
      icon: "🛒",
    },
  },
  {
    id: 2,
    name: "The Rocket Start Award",
    frequency: "Quarterly",
    color: "from-blue-500 to-blue-600",
    prize: {
      name: "AI Tool Subscription",
      description: "Quarterly subscription of any Tier 1 AI Tool (up to $150 reimbursement)",
      value: "Up to $150",
      icon: "🤖",
    },
  },
  {
    id: 3,
    name: "The Hustle Award",
    frequency: "Quarterly",
    color: "from-orange-500 to-orange-600",
    prize: {
      name: "AI Tool Subscription",
      description: "Quarterly subscription of any Tier 1 AI Tool (up to $150 reimbursement)",
      value: "Up to $150",
      icon: "🤖",
    },
  },
  {
    id: 4,
    name: "The Crowd Favorite Award",
    frequency: "Half Yearly (Sept & March)",
    color: "from-pink-500 to-pink-600",
    prize: {
      name: "Cash/Voucher + Trophy",
      description: "₹5,000 cash or voucher of your choice plus a beautiful trophy",
      value: "₹5,000 + Trophy",
      icon: "🏆",
    },
  },
  {
    id: 5,
    name: "The MVP – Most Valuable Pangean",
    frequency: "Annually (March)",
    color: "from-green-500 to-green-600",
    prize: {
      name: "Prestige Golfshire Weekend",
      description: "Paid weekend getaway at Prestige Golfshire resort",
      value: "Premium Experience",
      icon: "🏌️‍♂️",
    },
  },
]

export default function WishlistAnalyticsPage() {
  const [isDarkTheme, setIsDarkTheme] = useState(false)
  const [wishlistData, setWishlistData] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [lastUpdated, setLastUpdated] = useState<Date>(new Date())

  const toggleTheme = () => {
    setIsDarkTheme(!isDarkTheme)
  }

  const loadWishlistData = () => {
    setLoading(true)
    // Simulate API call delay
    setTimeout(() => {
      // In a real application, this would fetch data from your database
      // For now, we'll simulate multiple users by checking if there are any wishlists in localStorage
      const userData = []

      // Get current user's wishlist if it exists
      const currentUserWishlist = localStorage.getItem("pangea-wishlist")
      if (currentUserWishlist) {
        const wishlist = JSON.parse(currentUserWishlist)
        if (wishlist.length > 0) {
          userData.push({
            id: 1,
            timestamp: new Date().toISOString(),
            wishlist: wishlist,
          })
        }
      }

      // In a real application, you would fetch all users' wishlist data from your database
      // For demonstration purposes, we're only showing the current user's data
      // When deployed, this would connect to your backend to get all employee wishlist data

      setWishlistData(userData)
      setLastUpdated(new Date())
      setLoading(false)
    }, 1000)
  }

  useEffect(() => {
    loadWishlistData()
  }, [])

  // Calculate statistics
  const totalUsers = wishlistData.length
  const awardCounts = awards.reduce(
    (acc, award) => {
      acc[award.id] = wishlistData.filter((user) => user.wishlist.includes(award.id)).length
      return acc
    },
    {} as { [key: number]: number },
  )

  const sortedAwards = awards.sort((a, b) => (awardCounts[b.id] || 0) - (awardCounts[a.id] || 0))
  const averageWishlistSize =
    totalUsers > 0 ? wishlistData.reduce((sum, user) => sum + user.wishlist.length, 0) / totalUsers : 0

  const exportData = () => {
    const exportData = {
      timestamp: new Date().toISOString(),
      totalUsers,
      averageWishlistSize: Math.round(averageWishlistSize * 100) / 100,
      awardStatistics: awards.map((award) => ({
        awardName: award.name,
        count: awardCounts[award.id] || 0,
        percentage: totalUsers > 0 ? Math.round(((awardCounts[award.id] || 0) / totalUsers) * 100) : 0,
      })),
      rawData: wishlistData.map((user) => ({
        userId: `User_${user.id}`,
        timestamp: user.timestamp,
        wishlistCount: user.wishlist.length,
        selectedAwards: user.wishlist.map(
          (awardId: number) => awards.find((a) => a.id === awardId)?.name || `Award_${awardId}`,
        ),
      })),
    }

    const blob = new Blob([JSON.stringify(exportData, null, 2)], { type: "application/json" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = `pangea-wishlist-analytics-${new Date().toISOString().split("T")[0]}.json`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  return (
    <div
      className={`min-h-screen transition-all duration-500 ${
        isDarkTheme
          ? "bg-gradient-to-br from-gray-900 to-gray-800 text-white"
          : "bg-gradient-to-br from-slate-50 to-blue-50 text-gray-900"
      }`}
    >
      {/* Header */}
      <header
        className={`shadow-sm border-b-4 border-gradient-to-r from-blue-600 to-green-600 transition-all duration-500 ${
          isDarkTheme ? "bg-gray-800" : "bg-white"
        }`}
      >
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link href="/">
                <Button
                  variant="outline"
                  size="sm"
                  className={`transition-all duration-300 ${
                    isDarkTheme
                      ? "border-gray-600 text-gray-300 hover:bg-gray-700"
                      : "border-gray-300 text-gray-700 hover:bg-gray-100"
                  }`}
                >
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back to Awards
                </Button>
              </Link>
              <Image src="/pangea-logo.svg" alt="Pangea Tech" width={200} height={60} className="h-12 w-auto" />
            </div>
            <div className="flex items-center gap-4">
              <Button
                onClick={loadWishlistData}
                variant="outline"
                size="sm"
                disabled={loading}
                className={`transition-all duration-300 ${
                  isDarkTheme
                    ? "border-gray-600 text-gray-300 hover:bg-gray-700"
                    : "border-gray-300 text-gray-700 hover:bg-gray-100"
                }`}
              >
                <RefreshCw className={`w-4 h-4 mr-2 ${loading ? "animate-spin" : ""}`} />
                Refresh
              </Button>
              <Button
                onClick={exportData}
                variant="outline"
                size="sm"
                className={`transition-all duration-300 ${
                  isDarkTheme
                    ? "border-gray-600 text-gray-300 hover:bg-gray-700"
                    : "border-gray-300 text-gray-700 hover:bg-gray-100"
                }`}
              >
                <Download className="w-4 h-4 mr-2" />
                Export Data
              </Button>
              <Button
                onClick={toggleTheme}
                variant="outline"
                size="sm"
                className={`transition-all duration-300 ${
                  isDarkTheme
                    ? "border-gray-600 text-gray-300 hover:bg-gray-700"
                    : "border-gray-300 text-gray-700 hover:bg-gray-100"
                }`}
              >
                {isDarkTheme ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-6 py-12">
        {/* Wishlist Analytics Dashboard Header */}
        <div className="text-center mb-12">
          <h1
            className={`text-4xl font-bold mb-4 flex items-center justify-center gap-2 ${isDarkTheme ? "text-gray-100" : "text-gray-800"}`}
          >
            <BarChart3 className="w-10 h-10" />
            Wishlist Analytics Dashboard 📊
          </h1>
          <p className={`text-xl max-w-2xl mx-auto ${isDarkTheme ? "text-gray-300" : "text-gray-600"}`}>
            Real-time wishlist analytics from all Pangea employees who have created wishlists
          </p>
          <p className={`text-sm mt-2 ${isDarkTheme ? "text-gray-400" : "text-gray-500"}`}>
            Last updated: {lastUpdated.toLocaleString()}
          </p>
        </div>

        {/* Key Statistics */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
          <Card className={`${isDarkTheme ? "bg-gray-800 border-gray-700" : "bg-white border-gray-200"}`}>
            <CardHeader className="pb-2">
              <CardTitle className={`text-sm font-medium ${isDarkTheme ? "text-gray-300" : "text-gray-600"}`}>
                Total Participants
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-blue-600">{totalUsers}</div>
              <p className={`text-xs ${isDarkTheme ? "text-gray-400" : "text-gray-500"}`}>
                Users who created wishlists
              </p>
            </CardContent>
          </Card>

          <Card className={`${isDarkTheme ? "bg-gray-800 border-gray-700" : "bg-white border-gray-200"}`}>
            <CardHeader className="pb-2">
              <CardTitle className={`text-sm font-medium ${isDarkTheme ? "text-gray-300" : "text-gray-600"}`}>
                Average Wishlist Size
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">{Math.round(averageWishlistSize * 10) / 10}</div>
              <p className={`text-xs ${isDarkTheme ? "text-gray-400" : "text-gray-500"}`}>Awards per user</p>
            </CardContent>
          </Card>

          <Card className={`${isDarkTheme ? "bg-gray-800 border-gray-700" : "bg-white border-gray-200"}`}>
            <CardHeader className="pb-2">
              <CardTitle className={`text-sm font-medium ${isDarkTheme ? "text-gray-300" : "text-gray-600"}`}>
                Most Popular Award
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-purple-600">{sortedAwards[0]?.name.split(" ")[1] || "N/A"}</div>
              <p className={`text-xs ${isDarkTheme ? "text-gray-400" : "text-gray-500"}`}>
                {awardCounts[sortedAwards[0]?.id] || 0} selections
              </p>
            </CardContent>
          </Card>

          <Card className={`${isDarkTheme ? "bg-gray-800 border-gray-700" : "bg-white border-gray-200"}`}>
            <CardHeader className="pb-2">
              <CardTitle className={`text-sm font-medium ${isDarkTheme ? "text-gray-300" : "text-gray-600"}`}>
                Engagement Rate
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-orange-600">
                {totalUsers > 0 ? Math.round((averageWishlistSize / 5) * 100) : 0}%
              </div>
              <p className={`text-xs ${isDarkTheme ? "text-gray-400" : "text-gray-500"}`}>Of all awards selected</p>
            </CardContent>
          </Card>
        </div>

        {/* Award Popularity Ranking */}
        <div className="mb-12">
          <div className="text-center mb-8">
            <h2
              className={`text-3xl font-bold mb-4 flex items-center justify-center gap-2 ${isDarkTheme ? "text-gray-100" : "text-gray-800"}`}
            >
              <TrendingUp className="w-8 h-8" />
              Award Popularity Ranking 🏆
            </h2>
            <p className={`text-lg max-w-2xl mx-auto ${isDarkTheme ? "text-gray-300" : "text-gray-600"}`}>
              Real-time insights into which awards are most desired by the team
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {sortedAwards.map((award, index) => {
              const count = awardCounts[award.id] || 0
              const percentage = totalUsers > 0 ? Math.round((count / totalUsers) * 100) : 0
              const isTopChoice = index < 3

              return (
                <Card
                  key={award.id}
                  className={`relative transition-all duration-300 shadow-lg ${
                    isDarkTheme
                      ? "bg-gray-800/30 border-gray-600/30 text-white"
                      : "bg-white/80 border-gray-100 text-gray-800"
                  } ${isTopChoice ? "ring-2 ring-yellow-400" : ""}`}
                >
                  {isTopChoice && (
                    <div className="absolute -top-2 -right-2 bg-yellow-400 text-yellow-900 text-xs font-bold px-2 py-1 rounded-full">
                      #{index + 1}
                    </div>
                  )}
                  <CardHeader className="text-center pb-2">
                    <div className="text-4xl mb-3">{award.prize.icon}</div>
                    <CardTitle className={`text-lg font-bold mb-2 ${isDarkTheme ? "text-white" : "text-gray-800"}`}>
                      {award.prize.name}
                    </CardTitle>
                    <Badge className={`bg-gradient-to-r ${award.color} text-white text-xs`}>{award.frequency}</Badge>
                  </CardHeader>
                  <CardContent className="text-center">
                    <div className="flex items-center justify-center gap-2 mb-3">
                      <BarChart3 className="w-5 h-5" />
                      <span className={`font-bold text-xl ${isDarkTheme ? "text-blue-400" : "text-blue-600"}`}>
                        {count} users
                      </span>
                    </div>
                    <div
                      className={`text-base font-semibold mb-3 ${isDarkTheme ? "text-emerald-400" : "text-emerald-600"}`}
                    >
                      {percentage}% selection rate
                    </div>
                    <div className={`w-full bg-gray-200 rounded-full h-3 ${isDarkTheme ? "bg-gray-700" : ""}`}>
                      <div
                        className={`bg-gradient-to-r ${award.color} h-3 rounded-full transition-all duration-500`}
                        style={{ width: `${percentage}%` }}
                      ></div>
                    </div>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </div>

        {/* Detailed Analytics */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* User Engagement Timeline */}
          <Card className={`${isDarkTheme ? "bg-gray-800 border-gray-700" : "bg-white border-gray-200"}`}>
            <CardHeader>
              <CardTitle className={`${isDarkTheme ? "text-white" : "text-gray-800"}`}>Recent User Activity</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3 max-h-64 overflow-y-auto">
                {wishlistData
                  .slice(-10)
                  .reverse()
                  .map((user, index) => (
                    <div
                      key={user.id}
                      className={`flex justify-between items-center p-3 rounded-lg ${
                        isDarkTheme ? "bg-gray-700/50" : "bg-gray-50"
                      }`}
                    >
                      <div>
                        <div className={`font-medium ${isDarkTheme ? "text-white" : "text-gray-800"}`}>
                          User #{user.id}
                        </div>
                        <div className={`text-sm ${isDarkTheme ? "text-gray-400" : "text-gray-500"}`}>
                          {new Date(user.timestamp).toLocaleDateString()} at{" "}
                          {new Date(user.timestamp).toLocaleTimeString()}
                        </div>
                      </div>
                      <div className="text-right">
                        <div className={`font-bold ${isDarkTheme ? "text-blue-400" : "text-blue-600"}`}>
                          {user.wishlist.length} awards
                        </div>
                        <div className={`text-xs ${isDarkTheme ? "text-gray-400" : "text-gray-500"}`}>selected</div>
                      </div>
                    </div>
                  ))}
              </div>
            </CardContent>
          </Card>

          {/* Award Combinations */}
          <Card className={`${isDarkTheme ? "bg-gray-800 border-gray-700" : "bg-white border-gray-200"}`}>
            <CardHeader>
              <CardTitle className={`${isDarkTheme ? "text-white" : "text-gray-800"}`}>
                Wishlist Size Distribution
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[1, 2, 3, 4, 5].map((size) => {
                  const count = wishlistData.filter((user) => user.wishlist.length === size).length
                  const percentage = totalUsers > 0 ? Math.round((count / totalUsers) * 100) : 0

                  return (
                    <div key={size} className="flex items-center justify-between">
                      <div className={`${isDarkTheme ? "text-gray-300" : "text-gray-700"}`}>
                        {size} award{size > 1 ? "s" : ""}
                      </div>
                      <div className="flex items-center gap-3 flex-1 ml-4">
                        <div className={`w-full bg-gray-200 rounded-full h-2 ${isDarkTheme ? "bg-gray-700" : ""}`}>
                          <div
                            className="bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full transition-all duration-500"
                            style={{ width: `${percentage}%` }}
                          ></div>
                        </div>
                        <div
                          className={`text-sm font-medium min-w-[60px] text-right ${isDarkTheme ? "text-gray-300" : "text-gray-700"}`}
                        >
                          {count} ({percentage}%)
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Privacy Notice */}
        <div className={`mt-12 p-6 rounded-lg ${isDarkTheme ? "bg-gray-800/50" : "bg-blue-50"}`}>
          <div className="text-center">
            <h3 className={`text-lg font-semibold mb-2 ${isDarkTheme ? "text-gray-100" : "text-gray-800"}`}>
              🔒 Privacy & Data Protection
            </h3>
            <p className={`text-sm ${isDarkTheme ? "text-gray-300" : "text-gray-600"} mb-3`}>
              All data shown is completely anonymous. No personal information, names, or identifying details are stored
              or displayed. This dashboard only shows aggregated wishlist preferences to help improve our awards
              program.
            </p>
            <p className={`text-xs ${isDarkTheme ? "text-gray-400" : "text-gray-500"} italic`}>
              Note: Currently showing data from users who have accessed this application. In production, this will
              display real-time data from all employee wishlists across the organization.
            </p>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer
        className={`py-8 px-6 transition-all duration-500 ${
          isDarkTheme ? "bg-gray-900 text-gray-300" : "bg-gray-800 text-white"
        }`}
      >
        <div className="container mx-auto text-center">
          <Image
            src="/pangea-logo.svg"
            alt="Pangea Tech"
            width={150}
            height={45}
            className="h-8 w-auto mx-auto mb-4 opacity-80"
          />
          <p className={isDarkTheme ? "text-gray-400" : "text-gray-400"}>
            © 2025 Pangea Tech. Celebrating excellence, one award at a time. 🌟
          </p>
        </div>
      </footer>
    </div>
  )
}
