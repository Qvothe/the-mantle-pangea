"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, Gift, Trash2, Moon, Sun, TrendingUp, BarChart3 } from "lucide-react"

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
      description: "Quarterly subscription of any AI Tool (1 tier - up to $150 reimbursement)",
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
      description: "Quarterly subscription of any AI Tool (1 tier - up to $150 reimbursement)",
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

export default function WishlistPage() {
  const [isDarkTheme, setIsDarkTheme] = useState(false)
  const [wishlist, setWishlist] = useState<number[]>([])
  const [allWishlists, setAllWishlists] = useState<{ [key: number]: number }>({})

  const toggleTheme = () => {
    setIsDarkTheme(!isDarkTheme)
  }

  // Load wishlist from localStorage on component mount
  useEffect(() => {
    const savedWishlist = localStorage.getItem("pangea-wishlist")
    if (savedWishlist) {
      setWishlist(JSON.parse(savedWishlist))
    }

    // Load aggregated wishlist data (simulated - in real app this would come from a backend)
    const savedAllWishlists = localStorage.getItem("pangea-all-wishlists")
    if (savedAllWishlists) {
      setAllWishlists(JSON.parse(savedAllWishlists))
    } else {
      // Initialize with some sample data for demonstration
      const sampleData = {
        1: 15, // Culture Catalyst - 15 people
        2: 12, // Rocket Start - 12 people
        3: 8, // Hustle - 8 people
        4: 10, // Crowd Favorite - 10 people
        5: 22, // MVP - 22 people
      }
      setAllWishlists(sampleData)
      localStorage.setItem("pangea-all-wishlists", JSON.stringify(sampleData))
    }
  }, [])

  // Update aggregated data when user's wishlist changes
  useEffect(() => {
    if (wishlist.length > 0) {
      const updatedAllWishlists = { ...allWishlists }

      // Add current user's wishlist to aggregated data (simulated)
      wishlist.forEach((awardId) => {
        updatedAllWishlists[awardId] = (updatedAllWishlists[awardId] || 0) + 1
      })

      setAllWishlists(updatedAllWishlists)
      localStorage.setItem("pangea-all-wishlists", JSON.stringify(updatedAllWishlists))
    }
  }, [wishlist])

  const removeFromWishlist = (awardId: number) => {
    const updatedWishlist = wishlist.filter((id) => id !== awardId)
    setWishlist(updatedWishlist)
    localStorage.setItem("pangea-wishlist", JSON.stringify(updatedWishlist))
  }

  const clearWishlist = () => {
    setWishlist([])
    localStorage.setItem("pangea-wishlist", JSON.stringify([]))
  }

  const wishlistAwards = awards.filter((award) => wishlist.includes(award.id))
  const sortedAwards = awards.sort((a, b) => (allWishlists[b.id] || 0) - (allWishlists[a.id] || 0))

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
        {/* My Wishlist Section */}
        <div className="mb-16">
          <div className="text-center mb-8">
            <h1
              className={`text-4xl font-bold mb-4 flex items-center justify-center gap-2 ${isDarkTheme ? "text-gray-100" : "text-gray-800"}`}
            >
              <Gift className="w-10 h-10" />
              My Wishlist 🎁
            </h1>
            <p className={`text-xl max-w-2xl mx-auto ${isDarkTheme ? "text-gray-300" : "text-gray-600"}`}>
              Your selected awards that you'd love to win! Let us know what motivates you most.
            </p>
          </div>

          {wishlistAwards.length === 0 ? (
            <Card
              className={`text-center p-12 ${isDarkTheme ? "bg-gray-800 border-gray-700" : "bg-white border-gray-200"}`}
            >
              <div className="text-6xl mb-4">🎁</div>
              <h3 className={`text-2xl font-bold mb-4 ${isDarkTheme ? "text-gray-100" : "text-gray-800"}`}>
                Your wishlist is empty
              </h3>
              <p className={`text-lg mb-6 ${isDarkTheme ? "text-gray-300" : "text-gray-600"}`}>
                Go back to the awards page and add some awards you'd love to win!
              </p>
              <Link href="/">
                <Button className="bg-gradient-to-r from-purple-500 to-pink-500 text-white hover:from-purple-600 hover:to-pink-600">
                  <Gift className="w-4 h-4 mr-2" />
                  Browse Awards
                </Button>
              </Link>
            </Card>
          ) : (
            <>
              <div className="flex justify-between items-center mb-6">
                <h2 className={`text-2xl font-bold ${isDarkTheme ? "text-gray-100" : "text-gray-800"}`}>
                  Your Selected Awards ({wishlistAwards.length})
                </h2>
                <Button
                  onClick={clearWishlist}
                  variant="outline"
                  className={`${isDarkTheme ? "border-red-600 text-red-400 hover:bg-red-900/20" : "border-red-500 text-red-600 hover:bg-red-50"}`}
                >
                  <Trash2 className="w-4 h-4 mr-2" />
                  Clear All
                </Button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {wishlistAwards.map((award) => (
                  <Card
                    key={award.id}
                    className={`relative transition-all duration-300 transform hover:scale-105 shadow-lg ${
                      isDarkTheme
                        ? "bg-gray-800/30 border-gray-600/30 text-white"
                        : "bg-white/80 border-gray-100 text-gray-800"
                    }`}
                  >
                    <CardHeader className="text-center pb-2">
                      <div className="text-5xl mb-3">{award.prize.icon}</div>
                      <CardTitle className={`text-xl font-bold mb-2 ${isDarkTheme ? "text-white" : "text-gray-800"}`}>
                        {award.prize.name}
                      </CardTitle>
                      <Badge className={`bg-gradient-to-r ${award.color} text-white text-sm px-3 py-1`}>
                        {award.frequency}
                      </Badge>
                    </CardHeader>
                    <CardContent className="text-center">
                      <p
                        className={`text-base mb-4 leading-relaxed ${isDarkTheme ? "text-gray-200" : "text-gray-700"}`}
                      >
                        {award.prize.description}
                      </p>
                      <div
                        className={`font-bold text-2xl mb-6 ${isDarkTheme ? "text-emerald-400" : "text-emerald-600"}`}
                      >
                        {award.prize.value}
                      </div>
                      <Button
                        onClick={() => removeFromWishlist(award.id)}
                        variant="outline"
                        className={`w-full font-semibold py-3 ${isDarkTheme ? "border-red-500 text-red-400 hover:bg-red-900/20" : "border-red-500 text-red-600 hover:bg-red-50"}`}
                      >
                        <Trash2 className="w-5 h-5 mr-2" />
                        Remove from Wishlist
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </>
          )}
        </div>

        {/* Popular Awards Section */}
        <div>
          <div className="text-center mb-8">
            <h2
              className={`text-3xl font-bold mb-4 flex items-center justify-center gap-2 ${isDarkTheme ? "text-gray-100" : "text-gray-800"}`}
            >
              <TrendingUp className="w-8 h-8" />
              Most Wanted Awards 📊
            </h2>
            <p className={`text-lg max-w-2xl mx-auto ${isDarkTheme ? "text-gray-300" : "text-gray-600"}`}>
              See which awards are most popular among all Pangea team members (anonymous data)
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {sortedAwards.map((award, index) => {
              const wishlistCount = allWishlists[award.id] || 0
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
                    <div className="flex items-center justify-center gap-2 mb-2">
                      <BarChart3 className="w-4 h-4" />
                      <span className={`font-bold text-lg ${isDarkTheme ? "text-blue-400" : "text-blue-600"}`}>
                        {wishlistCount} people
                      </span>
                    </div>
                    <p className={`text-sm mb-2 ${isDarkTheme ? "text-gray-400" : "text-gray-500"}`}>want this prize</p>
                    <div className={`font-semibold text-base ${isDarkTheme ? "text-emerald-400" : "text-emerald-600"}`}>
                      {award.prize.value}
                    </div>
                  </CardContent>
                </Card>
              )
            })}
          </div>

          <div className={`mt-8 p-6 rounded-lg ${isDarkTheme ? "bg-gray-800/50" : "bg-blue-50"}`}>
            <div className="text-center">
              <h3 className={`text-lg font-semibold mb-2 ${isDarkTheme ? "text-gray-100" : "text-gray-800"}`}>
                📈 Wishlist Analytics
              </h3>
              <p className={`text-sm ${isDarkTheme ? "text-gray-300" : "text-gray-600"}`}>
                This data helps us understand what motivates our team most. All data is anonymous and used only for
                improving our rewards program.
              </p>
            </div>
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
