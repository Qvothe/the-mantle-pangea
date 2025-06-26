"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Calendar,
  Clock,
  Trophy,
  Users,
  Zap,
  Heart,
  Target,
  Star,
  Rocket,
  Sparkles,
  Moon,
  Sun,
  Gift,
  Plus,
  Check,
  BarChart3,
} from "lucide-react"

const awards = [
  {
    id: 1,
    name: "The Culture Catalyst Award",
    icon: <Sparkles className="w-8 h-8" />,
    for: "Boosting Team Culture & Spirit",
    description:
      '✨ Chief Vibe Officer! They bring the "fun" to "functional." Mastermind behind epic celebrations, Friday games, meme drops, and the best inside jokes. If you\'ve ever felt like Pangea is one big family, blame this person.',
    frequency: "Monthly",
    color: "from-purple-500 to-purple-600",
    bgColor: "bg-purple-50",
    sectionBg: "bg-gradient-to-br from-purple-50 to-purple-100",
    darkSectionBg: "bg-gradient-to-br from-purple-900/20 to-purple-800/20",
    iconColor: "bg-purple-500",
    tagline: "✨ Chief Vibe Officer!",
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
    icon: <Rocket className="w-8 h-8" />,
    for: "Quick Impact by a New Joiner",
    description:
      "🚀 Houston, We Have a Star! This goes to the newbie who's joined Pangea and already acts like they own the place (in the best way!). Welcome to the launch pad!",
    frequency: "Quarterly",
    color: "from-blue-500 to-blue-600",
    bgColor: "bg-blue-50",
    sectionBg: "bg-gradient-to-br from-blue-50 to-blue-100",
    darkSectionBg: "bg-gradient-to-br from-blue-900/20 to-blue-800/20",
    iconColor: "bg-blue-500",
    tagline: "🚀 Houston, We Have a Star!",
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
    icon: <Zap className="w-8 h-8" />,
    for: "Consistent Effort & Grit",
    description:
      '🔥 No Chill, All Skill! While the rest of us are searching for "motivation" on Google, this teammate is already three steps ahead—day in, day out, rain or shine. Relentless, unstoppable, and basically powered by coffee and sheer willpower!',
    frequency: "Quarterly",
    color: "from-orange-500 to-orange-600",
    bgColor: "bg-orange-50",
    sectionBg: "bg-gradient-to-br from-orange-50 to-orange-100",
    darkSectionBg: "bg-gradient-to-br from-orange-900/20 to-orange-800/20",
    iconColor: "bg-orange-500",
    tagline: "🔥 No Chill, All Skill!",
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
    icon: <Heart className="w-8 h-8" />,
    for: "Most Loved by Peers (Popular Vote)",
    description:
      "🌟 Office Celebrity Status Unlocked! Won by the one who could run for President—of the break room. Whether it's birthday cakes, morning hellos, or always having your back. The people's champion, hands down!",
    frequency: "Half Yearly (Sept & March)",
    color: "from-pink-500 to-pink-600",
    bgColor: "bg-pink-50",
    sectionBg: "bg-gradient-to-br from-pink-50 to-pink-100",
    darkSectionBg: "bg-gradient-to-br from-pink-900/20 to-pink-800/20",
    iconColor: "bg-pink-500",
    tagline: "🌟 Office Celebrity Status Unlocked!",
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
    icon: <Trophy className="w-8 h-8" />,
    for: "All-Round Excellence",
    description:
      "🏆 Pangea's One-Person Army! The absolute GOAT. If you need something done, this legend's already done it (and probably made a dashboard about it). Always there, always awesome—everyone's secret productivity hack!",
    frequency: "Annually (March)",
    color: "from-green-500 to-green-600",
    bgColor: "bg-green-50",
    sectionBg: "bg-gradient-to-br from-green-50 to-green-100",
    darkSectionBg: "bg-gradient-to-br from-green-900/20 to-green-800/20",
    iconColor: "bg-green-500",
    tagline: "🏆 Pangea's One-Person Army!",
    prize: {
      name: "Prestige Golfshire Weekend",
      description: "Paid weekend getaway at Prestige Golfshire resort",
      value: "Premium Experience",
      icon: "🏌️‍♂️",
    },
  },
]

// Create unique prizes array
const uniquePrizes = [
  {
    id: "amazon-voucher",
    name: "Amazon Voucher",
    description: "₹5,000 Amazon voucher to shop for anything you love",
    value: "₹5,000",
    icon: "🛒",
    eligibleAwards: ["The Culture Catalyst Award"],
    frequency: "Monthly",
    color: "from-purple-500 to-purple-600",
  },
  {
    id: "ai-subscription",
    name: "AI Tool Subscription",
    description: "Quarterly subscription of any AI Tool (1 tier - up to $150 reimbursement)",
    value: "Up to $150",
    icon: "🤖",
    eligibleAwards: ["The Rocket Start Award", "The Hustle Award"],
    frequency: "Quarterly",
    color: "from-blue-500 to-orange-500",
  },
  {
    id: "cash-trophy",
    name: "Cash/Voucher + Trophy",
    description: "₹5,000 cash or voucher of your choice plus a beautiful trophy",
    value: "₹5,000 + Trophy",
    icon: "🏆",
    eligibleAwards: ["The Crowd Favorite Award"],
    frequency: "Half Yearly",
    color: "from-pink-500 to-pink-600",
  },
  {
    id: "golfshire-weekend",
    name: "Prestige Golfshire Weekend",
    description: "Paid weekend getaway at Prestige Golfshire resort",
    value: "Premium Experience",
    icon: "🏌️‍♂️",
    eligibleAwards: ["The MVP – Most Valuable Pangean"],
    frequency: "Annually",
    color: "from-green-500 to-green-600",
  },
]

const upcomingAwards = [
  {
    name: "The Hustle Award",
    date: "2025-06-27T10:00:00",
    displayDate: "Friday, 27th June",
    description: "Get ready to celebrate our grittiest team members!",
  },
  {
    name: "The Culture Catalyst Award",
    date: "2025-06-30T10:00:00",
    displayDate: "Monday, 30th June",
    description: "A special monthly award announcement awaits!",
  },
  {
    name: "The Rocket Start Award",
    date: "2025-07-02T10:00:00",
    displayDate: "Wednesday, 2nd July",
    description: "Our quarterly culture champion will be revealed!",
  },
]

function CountdownTimer({ targetDate, gradient }: { targetDate: string; gradient?: string }) {
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 })

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date().getTime()
      const target = new Date(targetDate).getTime()
      const difference = target - now

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((difference % (1000 * 60)) / 1000),
        })
      }
    }, 1000)

    return () => clearInterval(timer)
  }, [targetDate])

  const boxClass =
    "bg-white/30 backdrop-blur-sm px-2 py-1 rounded shadow-lg border border-white/20 text-gray-800 font-semibold"

  return (
    <div className="flex gap-2 text-sm font-mono">
      <div className={boxClass}>
        <span className="font-bold">{timeLeft.days}</span>
        <div className="text-xs">days</div>
      </div>
      <div className={boxClass}>
        <span className="font-bold">{timeLeft.hours}</span>
        <div className="text-xs">hrs</div>
      </div>
      <div className={boxClass}>
        <span className="font-bold">{timeLeft.minutes}</span>
        <div className="text-xs">min</div>
      </div>
      <div className={boxClass}>
        <span className="font-bold">{timeLeft.seconds}</span>
        <div className="text-xs">sec</div>
      </div>
    </div>
  )
}

export default function PangeaAwardsLanding() {
  const [hoveredCard, setHoveredCard] = useState<number | null>(null)
  const [isDarkTheme, setIsDarkTheme] = useState(false)
  const [featuredAward, setFeaturedAward] = useState(1)
  const [wishlist, setWishlist] = useState<number[]>([])

  const toggleTheme = () => {
    setIsDarkTheme(!isDarkTheme)
  }

  // Load wishlist from localStorage on component mount
  useEffect(() => {
    const savedWishlist = localStorage.getItem("pangea-wishlist")
    if (savedWishlist) {
      setWishlist(JSON.parse(savedWishlist))
    }
  }, [])

  // Save wishlist to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("pangea-wishlist", JSON.stringify(wishlist))
  }, [wishlist])

  const addToWishlist = (awardId: number) => {
    if (!wishlist.includes(awardId)) {
      setWishlist([...wishlist, awardId])
    }
  }

  const removeFromWishlist = (awardId: number) => {
    setWishlist(wishlist.filter((id) => id !== awardId))
  }

  const isInWishlist = (awardId: number) => wishlist.includes(awardId)

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
            <Image src="/pangea-logo.svg" alt="Pangea Tech" width={200} height={60} className="h-12 w-auto" />
            <div className="flex items-center gap-4">
              <Link href="/wishlist">
                <Button
                  variant="outline"
                  size="sm"
                  className={`transition-all duration-300 ${
                    isDarkTheme
                      ? "border-gray-600 text-gray-300 hover:bg-gray-700"
                      : "border-gray-300 text-gray-700 hover:bg-gray-100"
                  }`}
                >
                  <Gift className="w-4 h-4 mr-2" />
                  Wishlist ({wishlist.length})
                </Button>
              </Link>
              <Link href="/admin">
                <Button
                  variant="outline"
                  size="sm"
                  className={`transition-all duration-300 ${
                    isDarkTheme
                      ? "border-gray-600 text-gray-300 hover:bg-gray-700"
                      : "border-gray-300 text-gray-700 hover:bg-gray-100"
                  }`}
                >
                  <BarChart3 className="w-4 h-4 mr-2" />
                  Wishlist Analytics
                </Button>
              </Link>
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
              <Button
                disabled
                className="bg-gray-300 text-gray-500 cursor-not-allowed font-semibold px-6 py-2 rounded-full shadow-lg relative"
              >
                <Trophy className="w-4 h-4 mr-2" />
                Nominate Someone
                <span className="absolute -top-2 -right-2 bg-orange-500 text-white text-xs px-2 py-1 rounded-full">
                  Coming Soon
                </span>
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section
        className={`py-16 px-6 relative transition-all duration-500 ${
          isDarkTheme ? "bg-gradient-to-r from-gray-800 to-gray-700" : "bg-gradient-to-r from-blue-600 to-green-600"
        }`}
      >
        {/* Animated Background Elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {/* Floating Trophies */}
          <div className="absolute top-20 left-10 animate-float-slow">
            <Trophy className="w-8 h-8 text-yellow-300 opacity-60" />
          </div>
          <div className="absolute top-32 right-20 animate-float-medium">
            <Trophy className="w-6 h-6 text-yellow-200 opacity-70" />
          </div>
          <div className="absolute top-48 left-1/4 animate-float-fast">
            <Trophy className="w-10 h-10 text-yellow-300 opacity-50" />
          </div>
          <div className="absolute bottom-32 right-1/3 animate-float-slow">
            <Trophy className="w-7 h-7 text-yellow-200 opacity-65" />
          </div>

          {/* Floating Stars */}
          <div className="absolute top-16 right-10 animate-twinkle">
            <Star className="w-5 h-5 text-white opacity-80" />
          </div>
          <div className="absolute top-40 left-1/3 animate-twinkle-delayed">
            <Star className="w-4 h-4 text-yellow-100 opacity-75" />
          </div>
          <div className="absolute bottom-40 left-16 animate-twinkle">
            <Star className="w-6 h-6 text-white opacity-70" />
          </div>
          <div className="absolute top-24 right-1/4 animate-twinkle-delayed">
            <Star className="w-3 h-3 text-yellow-200 opacity-85" />
          </div>

          {/* Floating Sparkles */}
          <div className="absolute top-28 left-1/2 animate-sparkle">
            <Sparkles className="w-5 h-5 text-yellow-100 opacity-65" />
          </div>
          <div className="absolute bottom-28 right-1/4 animate-sparkle-delayed">
            <Sparkles className="w-4 h-4 text-white opacity-70" />
          </div>
          <div className="absolute top-52 right-12 animate-sparkle">
            <Sparkles className="w-6 h-6 text-yellow-200 opacity-60" />
          </div>

          {/* Floating Hearts */}
          <div className="absolute top-36 left-20 animate-pulse-slow">
            <Heart className="w-4 h-4 text-pink-200 opacity-65" />
          </div>
          <div className="absolute bottom-36 right-16 animate-pulse-slow">
            <Heart className="w-5 h-5 text-red-200 opacity-60" />
          </div>

          {/* Floating Rockets */}
          <div className="absolute top-44 right-1/3 animate-rocket">
            <Rocket className="w-5 h-5 text-orange-200 opacity-70" />
          </div>
          <div className="absolute bottom-44 left-1/3 animate-rocket-delayed">
            <Rocket className="w-4 h-4 text-white opacity-65" />
          </div>

          {/* Confetti Particles */}
          <div className="absolute top-20 left-1/2 w-2 h-2 bg-yellow-200 opacity-80 animate-confetti"></div>
          <div className="absolute top-32 right-1/3 w-1 h-1 bg-white opacity-90 animate-confetti-delayed"></div>
          <div className="absolute top-48 left-1/5 w-2 h-2 bg-yellow-100 opacity-75 animate-confetti"></div>
          <div className="absolute bottom-32 right-1/5 w-1 h-1 bg-white opacity-85 animate-confetti-delayed"></div>
          <div className="absolute top-56 right-1/2 w-2 h-2 bg-yellow-200 opacity-80 animate-confetti"></div>
        </div>
        <div className="container mx-auto text-center">
          <div className="mb-8">
            <h1 className="text-5xl font-bold text-white mb-4">🏆 Pangea Awards 2025</h1>
            <p className="text-xl max-w-3xl mx-auto leading-relaxed text-white/90">
              Celebrating the incredible humans who make Pangea Tech extraordinary! From rocket-fast newcomers to
              culture catalysts, every contribution matters.
            </p>
          </div>

          <div className="flex justify-center gap-4 mb-12">
            <Badge variant="secondary" className="px-4 py-2 text-sm bg-white/20 text-white border-white/30">
              <Users className="w-4 h-4 mr-1" />5 Amazing Awards
            </Badge>
            <Badge variant="secondary" className="px-4 py-2 text-sm bg-white/20 text-white border-white/30">
              <Calendar className="w-4 h-4 mr-1" />
              Year-Round Recognition
            </Badge>
            <Badge variant="secondary" className="px-4 py-2 text-sm bg-white/20 text-white border-white/30">
              <Star className="w-4 h-4 mr-1" />
              Peer-Nominated
            </Badge>
          </div>
        </div>
      </section>

      {/* Upcoming Awards Section */}
      <section
        className={`py-12 px-6 transition-all duration-500 ${
          isDarkTheme
            ? "bg-gradient-to-br from-slate-900 to-gray-900 text-white"
            : "bg-gradient-to-br from-slate-100 to-gray-100 text-gray-900"
        }`}
      >
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2
              className={`text-3xl font-bold mb-4 flex items-center justify-center gap-2 ${isDarkTheme ? "text-white" : "text-gray-800"}`}
            >
              <Clock className="w-8 h-8" />🎉 Coming Up Next!
            </h2>
            <p className={`text-xl ${isDarkTheme ? "text-gray-300" : "text-gray-600"}`}>
              Mark your calendars! These amazing announcements are just around the corner.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {upcomingAwards.map((award, index) => {
              // Find matching award for color coordination
              const matchingAward = awards.find((a) => a.name === award.name)
              const gradient = matchingAward ? matchingAward.color : "from-blue-600 to-green-600"
              const iconBg = matchingAward ? matchingAward.iconColor : "bg-blue-600"
              const icon = matchingAward ? matchingAward.icon : <Star className="w-5 h-5" />

              return (
                <Card
                  key={index}
                  className={`relative backdrop-blur-sm transition-all duration-300 transform hover:scale-105 shadow-lg ${
                    isDarkTheme
                      ? `bg-gradient-to-br ${gradient}/30 border-${gradient.split("-")[1]}-400/30 text-white`
                      : `bg-gradient-to-br ${gradient}/10 border-${gradient.split("-")[1]}-300/50 text-gray-800`
                  }`}
                >
                  <CardHeader className="text-center pt-4">
                    {/* Matching icon */}
                    <div
                      className={`w-10 h-10 mx-auto mb-2 rounded-full flex items-center justify-center text-white ${iconBg}`}
                    >
                      {icon}
                    </div>
                    <CardTitle className={`text-lg font-bold ${isDarkTheme ? "text-white" : "text-gray-800"}`}>
                      {award.name}
                    </CardTitle>
                    <CardDescription className={`font-medium ${isDarkTheme ? "text-white/80" : "text-gray-600"}`}>
                      {award.displayDate}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="text-center">
                    <p className={`text-sm mb-4 ${isDarkTheme ? "text-white/90" : "text-gray-700"}`}>
                      {award.description}
                    </p>
                    <CountdownTimer targetDate={award.date} gradient={gradient} />
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </div>
      </section>

      {/* Awards Showcase - Sectioned Layout */}
      <section className="py-16 px-6">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className={`text-4xl font-bold mb-4 ${isDarkTheme ? "text-gray-100" : "text-gray-800"}`}>
              Meet Our Legendary Awards 🌟
            </h2>
            <p className={`text-xl max-w-2xl mx-auto ${isDarkTheme ? "text-gray-300" : "text-gray-600"}`}>
              Each award celebrates a unique superpower that makes our team unstoppable. Hover to explore each one!
            </p>
          </div>

          {/* Awards Layout - Sectioned with Background Colors */}
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4 mb-12 rounded-3xl overflow-hidden shadow-2xl">
            {awards.map((award, index) => {
              const isFeatured = award.id === featuredAward
              return (
                <div
                  key={award.id}
                  className={`relative cursor-pointer transition-all duration-500 transform hover:scale-105 ${
                    isDarkTheme ? award.darkSectionBg : award.sectionBg
                  } ${isFeatured ? "ring-4 ring-gray-800 ring-inset z-10" : ""} group`}
                  onClick={() => setFeaturedAward(award.id)}
                  onMouseEnter={() => setHoveredCard(award.id)}
                  onMouseLeave={() => setHoveredCard(null)}
                  style={{
                    animationDelay: `${index * 100}ms`,
                    animation: `fadeInUp 0.6s ease-out forwards`,
                  }}
                >
                  {/* Floating background elements */}
                  <div className="absolute inset-0 opacity-10 group-hover:opacity-20 transition-opacity duration-500">
                    <div
                      className={`absolute top-2 right-2 w-12 h-12 rounded-full bg-gradient-to-r ${award.color} animate-pulse`}
                    ></div>
                    <div
                      className={`absolute bottom-2 left-2 w-6 h-6 rounded-full bg-gradient-to-r ${award.color} animate-bounce`}
                      style={{ animationDelay: "1s" }}
                    ></div>
                  </div>

                  <div className="p-3 lg:p-4 text-center relative z-10">
                    {/* Award Icon */}
                    <div
                      className={`w-12 h-12 lg:w-16 lg:h-16 mx-auto mb-2 rounded-full flex items-center justify-center text-white shadow-lg transition-all duration-500 ${
                        award.iconColor
                      } ${
                        isFeatured || hoveredCard === award.id ? "scale-110 shadow-2xl rotate-12" : "hover:scale-105"
                      }`}
                    >
                      {award.icon}
                    </div>

                    {/* Award Content */}
                    <div className="space-y-1 lg:space-y-2">
                      <h3
                        className={`font-bold transition-all duration-300 text-base lg:text-lg ${
                          isFeatured ? "lg:text-xl" : ""
                        } ${isDarkTheme ? "text-gray-100" : "text-gray-800"}`}
                      >
                        {award.name}
                      </h3>

                      <div
                        className={`font-medium transition-all duration-300 text-sm ${
                          isFeatured ? "lg:text-base" : ""
                        } ${isDarkTheme ? "text-gray-300" : "text-gray-600"}`}
                      >
                        {award.tagline}
                      </div>

                      <div
                        className={`font-semibold transition-all duration-300 text-xs ${
                          isFeatured ? "lg:text-sm" : ""
                        } ${isDarkTheme ? "text-gray-200" : "text-gray-700"}`}
                      >
                        {award.for}
                      </div>

                      {/* Description - only show when featured or hovered */}
                      {(isFeatured || hoveredCard === award.id) && (
                        <div className="mt-2 lg:mt-3 animate-fadeIn">
                          <p
                            className={`text-xs lg:text-sm leading-relaxed mb-3 ${isDarkTheme ? "text-gray-300" : "text-gray-600"}`}
                          >
                            {award.description}
                          </p>
                          <Badge
                            className={`bg-gradient-to-r ${award.color} text-white px-2 lg:px-3 py-1 text-xs mb-2`}
                          >
                            ✨ {isFeatured ? "Featured Award!" : "Hover to learn more!"}
                          </Badge>
                        </div>
                      )}

                      {/* Click to learn more button - only show when not expanded */}
                      {!isFeatured && hoveredCard !== award.id && (
                        <button
                          onClick={(e) => {
                            e.stopPropagation()
                            setFeaturedAward(award.id)
                          }}
                          className={`text-xs px-3 py-1 rounded-full transition-all duration-300 hover:scale-105 ${
                            isDarkTheme
                              ? "bg-gray-700 text-gray-300 hover:bg-gray-600"
                              : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                          }`}
                        >
                          Click to learn more →
                        </button>
                      )}

                      {/* Frequency - always visible at bottom */}
                      <div className="mt-3 pt-2 border-t border-gray-200/30">
                        <div className="flex items-center justify-center gap-2 text-xs font-semibold">
                          <Calendar className="w-3 h-3" />
                          <span className={isDarkTheme ? "text-gray-300" : "text-gray-600"}>{award.frequency}</span>
                        </div>
                      </div>
                    </div>

                    {/* Hover overlay effect */}
                    <div
                      className={`absolute inset-0 bg-gradient-to-r ${award.color} opacity-0 group-hover:opacity-5 transition-opacity duration-500 pointer-events-none rounded-lg`}
                    ></div>
                  </div>
                </div>
              )
            })}
          </div>

          {/* Interactive Stats Bar */}
          <div
            className={`rounded-2xl shadow-lg p-6 border-2 transition-all duration-500 ${
              isDarkTheme ? "bg-gray-800 border-gray-700" : "bg-white border-gray-100"
            }`}
          >
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4 text-center">
              <div className="space-y-2">
                <div className="text-2xl font-bold text-blue-600">5</div>
                <div className={`text-sm ${isDarkTheme ? "text-gray-300" : "text-gray-600"}`}>Total Awards</div>
              </div>
              <div className="space-y-2">
                <div className="text-2xl font-bold text-green-600">12</div>
                <div className={`text-sm ${isDarkTheme ? "text-gray-300" : "text-gray-600"}`}>Times per Year</div>
              </div>
              <div className="space-y-2">
                <div className="text-2xl font-bold text-purple-600">100%</div>
                <div className={`text-sm ${isDarkTheme ? "text-gray-300" : "text-gray-600"}`}>Peer Nominated</div>
              </div>
              <div className="space-y-2">
                <div className="text-2xl font-bold text-pink-600">∞</div>
                <div className={`text-sm ${isDarkTheme ? "text-gray-300" : "text-gray-600"}`}>Recognition</div>
              </div>
              <div className="space-y-2">
                <div className="text-2xl font-bold text-orange-600">🎉</div>
                <div className={`text-sm ${isDarkTheme ? "text-gray-300" : "text-gray-600"}`}>Celebration</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Award-Specific Prizes Section */}
      <section className={`py-16 px-6 relative overflow-hidden ${isDarkTheme ? "bg-gray-900/50" : "bg-gray-50"}`}>
        {/* Enhanced Floating Background Elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {/* Floating Gifts */}
          <div className="absolute top-20 left-10 animate-float-slow opacity-20">
            <Gift className="w-12 h-12 text-purple-400" />
          </div>
          <div className="absolute top-32 right-20 animate-float-medium opacity-15">
            <Gift className="w-8 h-8 text-blue-400" />
          </div>
          <div className="absolute bottom-32 left-1/4 animate-float-fast opacity-25">
            <Gift className="w-10 h-10 text-pink-400" />
          </div>
          <div className="absolute bottom-20 right-1/3 animate-sparkle opacity-20">
            <Sparkles className="w-6 h-6 text-yellow-400" />
          </div>

          {/* Floating Prize Icons */}
          <div className="absolute top-1/4 left-1/5 animate-bounce-slow opacity-30">
            <div className="text-2xl">🛒</div>
          </div>
          <div className="absolute top-1/3 right-1/5 animate-bounce-slow opacity-25" style={{ animationDelay: "1s" }}>
            <div className="text-2xl">🤖</div>
          </div>
          <div className="absolute bottom-1/4 left-1/3 animate-bounce-slow opacity-30" style={{ animationDelay: "2s" }}>
            <div className="text-2xl">🏆</div>
          </div>
          <div
            className="absolute bottom-1/3 right-1/4 animate-bounce-slow opacity-25"
            style={{ animationDelay: "3s" }}
          >
            <div className="text-2xl">🏌️‍♂️</div>
          </div>

          {/* Particle Effects */}
          {[...Array(15)].map((_, i) => (
            <div
              key={i}
              className="absolute animate-float-particle opacity-20"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 5}s`,
                animationDuration: `${3 + Math.random() * 4}s`,
              }}
            >
              <div className="w-1 h-1 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full"></div>
            </div>
          ))}
        </div>

        <div className="container mx-auto relative z-10">
          <div className="text-center mb-16">
            <h2
              className={`text-5xl font-bold mb-6 flex items-center justify-center gap-3 ${isDarkTheme ? "text-gray-100" : "text-gray-800"}`}
            >
              <Gift className="w-12 h-12 animate-bounce-slow" />
              What's the Loot? 🎁
            </h2>
            <p
              className={`text-xl max-w-3xl mx-auto leading-relaxed ${isDarkTheme ? "text-gray-300" : "text-gray-600"}`}
            >
              Each award comes with its own amazing prize! Add your favorite awards to your wishlist and let us know
              which ones motivate you most.
            </p>
          </div>

          {/* Enhanced Prize Grid with 4 columns */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12 max-w-7xl mx-auto">
            {uniquePrizes.map((prize, index) => {
              const gradientBgs = [
                "bg-gradient-to-br from-purple-100 via-pink-50 to-purple-100",
                "bg-gradient-to-br from-blue-100 via-cyan-50 to-orange-100",
                "bg-gradient-to-br from-pink-100 via-rose-50 to-pink-100",
                "bg-gradient-to-br from-green-100 via-emerald-50 to-green-100",
              ]

              const darkGradientBgs = [
                "bg-gradient-to-br from-purple-900/30 via-pink-900/20 to-purple-800/30",
                "bg-gradient-to-br from-blue-900/30 via-cyan-900/20 to-orange-800/30",
                "bg-gradient-to-br from-pink-900/30 via-rose-900/20 to-pink-800/30",
                "bg-gradient-to-br from-green-900/30 via-emerald-900/20 to-green-800/30",
              ]

              const cardBg = isDarkTheme ? darkGradientBgs[index] : gradientBgs[index]

              return (
                <Card
                  key={prize.id}
                  className={`relative transition-all duration-500 transform hover:scale-105 shadow-xl hover:shadow-2xl group ${cardBg} border-2 ${isDarkTheme ? "border-gray-600/30" : "border-white/50"} backdrop-blur-sm`}
                  style={{
                    animationDelay: `${index * 150}ms`,
                    animation: `fadeInUp 0.8s ease-out forwards`,
                  }}
                >
                  {/* Floating Prize Icon */}
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 z-10">
                    <div
                      className={`w-12 h-12 rounded-full flex items-center justify-center text-3xl shadow-lg transition-all duration-500 group-hover:scale-110 ${isDarkTheme ? "bg-gray-800/90" : "bg-white/95"} backdrop-blur-sm border-2 border-white/60`}
                    >
                      {prize.icon}
                    </div>
                  </div>

                  {/* Sparkle Effects */}
                  <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                    <Sparkles className="w-4 h-4 text-yellow-400 animate-pulse" />
                  </div>
                  <div className="absolute bottom-2 left-2 opacity-0 group-hover:opacity-100 transition-opacity duration-700">
                    <Sparkles className="w-3 h-3 text-pink-400 animate-pulse" style={{ animationDelay: "0.3s" }} />
                  </div>

                  <CardHeader className="text-center pt-8 pb-3">
                    <CardTitle className={`text-xl font-bold mb-2 ${isDarkTheme ? "text-white" : "text-gray-800"}`}>
                      {prize.name}
                    </CardTitle>
                    <Badge className={`bg-gradient-to-r ${prize.color} text-white text-sm px-3 py-1 shadow-lg`}>
                      {prize.frequency}
                    </Badge>
                  </CardHeader>

                  <CardContent className="text-center px-4 pb-6">
                    <p className={`text-sm mb-4 leading-relaxed ${isDarkTheme ? "text-gray-200" : "text-gray-700"}`}>
                      {prize.description}
                    </p>

                    {/* Prize Value with Enhanced Styling */}
                    <div className={`relative mb-4`}>
                      <div
                        className={`font-bold text-2xl mb-2 ${isDarkTheme ? "text-emerald-400" : "text-emerald-600"}`}
                      >
                        {prize.value}
                      </div>
                      <div className={`w-16 h-1 mx-auto rounded-full bg-gradient-to-r ${prize.color}`}></div>
                    </div>

                    {/* Eligible Awards Section */}
                    <div
                      className={`mb-4 p-3 rounded-lg ${isDarkTheme ? "bg-gray-800/50" : "bg-white/70"} backdrop-blur-sm border border-white/30`}
                    >
                      <h4
                        className={`text-xs font-semibold mb-2 ${isDarkTheme ? "text-gray-300" : "text-gray-600"} flex items-center justify-center gap-1`}
                      >
                        <Trophy className="w-3 h-3" />
                        Eligible for:
                      </h4>
                      <div className="space-y-1">
                        {prize.eligibleAwards.map((awardName, awardIndex) => (
                          <Badge
                            key={awardIndex}
                            className={`bg-gradient-to-r ${prize.color} text-white text-xs px-2 py-1 mx-1 shadow-md block`}
                          >
                            {awardName.replace("The ", "").replace(" Award", "")}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    {/* Enhanced Wishlist Button */}
                    <Button
                      onClick={() => {
                        // Find awards that have this prize and toggle them in wishlist
                        const eligibleAwardIds = awards
                          .filter((award) => prize.eligibleAwards.includes(award.name))
                          .map((award) => award.id)

                        const allInWishlist = eligibleAwardIds.every((id) => isInWishlist(id))

                        if (allInWishlist) {
                          // Remove all eligible awards from wishlist
                          eligibleAwardIds.forEach((id) => removeFromWishlist(id))
                        } else {
                          // Add all eligible awards to wishlist
                          eligibleAwardIds.forEach((id) => addToWishlist(id))
                        }
                      }}
                      className={`w-full transition-all duration-500 font-bold py-3 text-base rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 ${
                        prize.eligibleAwards.some((awardName) => {
                          const award = awards.find((a) => a.name === awardName)
                          return award && isInWishlist(award.id)
                        })
                          ? `bg-gradient-to-r ${prize.color} text-white hover:opacity-90`
                          : isDarkTheme
                            ? "bg-gray-700/50 text-gray-200 hover:bg-gray-600/50 border-2 border-gray-600 hover:border-gray-500"
                            : "bg-white/80 text-gray-700 hover:bg-white border-2 border-gray-200 hover:border-gray-300 backdrop-blur-sm"
                      }`}
                    >
                      {prize.eligibleAwards.some((awardName) => {
                        const award = awards.find((a) => a.name === awardName)
                        return award && isInWishlist(award.id)
                      }) ? (
                        <>
                          <Check className="w-5 h-5 mr-2 animate-bounce" />
                          Added to Wishlist ✨
                        </>
                      ) : (
                        <>
                          <Plus className="w-5 h-5 mr-2 group-hover:rotate-90 transition-transform duration-300" />
                          Add to Wishlist
                        </>
                      )}
                    </Button>
                  </CardContent>
                </Card>
              )
            })}
          </div>

          {/* Enhanced CTA Section */}
          <div className="text-center">
            <div
              className={`inline-block p-8 rounded-2xl ${isDarkTheme ? "bg-gray-800/50" : "bg-white/50"} backdrop-blur-sm border border-white/20 shadow-xl`}
            >
              <div className="mb-4">
                <div className="flex justify-center gap-2 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className="w-6 h-6 text-yellow-400 animate-twinkle"
                      style={{ animationDelay: `${i * 0.2}s` }}
                    />
                  ))}
                </div>
                <h3 className={`text-2xl font-bold mb-2 ${isDarkTheme ? "text-gray-100" : "text-gray-800"}`}>
                  Ready to Build Your Dream Wishlist?
                </h3>
                <p className={`text-lg ${isDarkTheme ? "text-gray-300" : "text-gray-600"}`}>
                  Your wishlist helps us understand what motivates you most!
                </p>
              </div>

              <Link href="/wishlist">
                <Button
                  size="lg"
                  className={`bg-gradient-to-r from-purple-500 via-pink-500 to-purple-600 text-white hover:from-purple-600 hover:via-pink-600 hover:to-purple-700 font-bold px-10 py-4 rounded-full shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300 text-lg`}
                >
                  <Gift className="w-6 h-6 mr-3 animate-bounce" />
                  View My Wishlist ({wishlist.length})
                  <Sparkles className="w-5 h-5 ml-3 animate-pulse" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 px-6 bg-gradient-to-r from-green-600 to-blue-600 text-white">
        <div className="container mx-auto text-center">
          <h2 className="text-4xl font-bold mb-6">Ready to Celebrate Amazing Work? 🎊</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto opacity-90">
            Know someone who deserves recognition? Don't wait – nominate them today and help us celebrate the incredible
            talent at Pangea Tech!
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              disabled
              className="bg-gray-300 text-gray-600 cursor-not-allowed font-bold px-8 py-3 rounded-full shadow-lg relative"
            >
              <Trophy className="w-5 h-5 mr-2" />
              Nominate a Colleague
              <span className="absolute -top-2 -right-2 bg-orange-500 text-white text-xs px-2 py-1 rounded-full">
                Coming Soon
              </span>
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-white text-white hover:bg-white hover:text-blue-600 font-bold px-8 py-3 rounded-full"
            >
              <Target className="w-5 h-5 mr-2" />
              View Past Winners
            </Button>
          </div>
        </div>
      </section>

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
      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        .animate-fadeIn {
          animation: fadeIn 0.3s ease-in-out;
        }

        @keyframes float-slow {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(5deg); }
        }

        @keyframes float-medium {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-15px) rotate(-3deg); }
        }

        @keyframes float-fast {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-25px) rotate(8deg); }
        }

        @keyframes bounce-slow {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }

        @keyframes float-particle {
          0%, 100% { transform: translateY(0px) translateX(0px); opacity: 0.2; }
          50% { transform: translateY(-20px) translateX(10px); opacity: 0.8; }
        }

        @keyframes twinkle {
          0%, 100% { opacity: 0.2; transform: scale(1); }
          50% { opacity: 0.8; transform: scale(1.2); }
        }

        @keyframes twinkle-delayed {
          0%, 100% { opacity: 0.15; transform: scale(1); }
          50% { opacity: 0.7; transform: scale(1.3); }
        }

        @keyframes sparkle {
          0%, 100% { opacity: 0.1; transform: rotate(0deg) scale(1); }
          25% { opacity: 0.4; transform: rotate(90deg) scale(1.1); }
          50% { opacity: 0.6; transform: rotate(180deg) scale(1.2); }
          75% { opacity: 0.3; transform: rotate(270deg) scale(1.1); }
        }

        @keyframes sparkle-delayed {
          0%, 100% { opacity: 0.2; transform: rotate(0deg) scale(1); }
          25% { opacity: 0.5; transform: rotate(-90deg) scale(1.2); }
          50% { opacity: 0.7; transform: rotate(-180deg) scale(1.3); }
          75% { opacity: 0.4; transform: rotate(-270deg) scale(1.1); }
        }

        @keyframes pulse-slow {
          0%, 100% { opacity: 0.8; transform: scale(1); }
          50% { opacity: 1; transform: scale(1.05); }
        }

        @keyframes rocket {
          0%, 100% { transform: translateY(0px) translateX(0px) rotate(45deg); }
          25% { transform: translateY(-10px) translateX(5px) rotate(50deg); }
          50% { transform: translateY(-5px) translateX(10px) rotate(40deg); }
          75% { transform: translateY(-15px) translateX(5px) rotate(55deg); }
        }

        @keyframes rocket-delayed {
          0%, 100% { transform: translateY(0px) translateX(0px) rotate(-45deg); }
          25% { transform: translateY(-8px) translateX(-5px) rotate(-40deg); }
          50% { transform: translateY(-12px) translateX(-8px) rotate(-50deg); }
          75% { transform: translateY(-6px) translateX(-3px) rotate(-35deg); }
        }

        @keyframes confetti {
          0% { transform: translateY(-10px) rotate(0deg); opacity: 1; }
          100% { transform: translateY(100vh) rotate(360deg); opacity: 0; }
        }

        @keyframes confetti-delayed {
          0% { transform: translateY(-10px) rotate(0deg); opacity: 1; }
          100% { transform: translateY(100vh) rotate(-360deg); opacity: 0; }
        }

        .animate-float-slow {
          animation: float-slow 6s ease-in-out infinite;
        }

        .animate-float-medium {
          animation: float-medium 4s ease-in-out infinite;
        }

        .animate-float-fast {
          animation: float-fast 3s ease-in-out infinite;
        }

        .animate-bounce-slow {
          animation: bounce-slow 3s ease-in-out infinite;
        }

        .animate-float-particle {
          animation: float-particle 4s ease-in-out infinite;
        }

        .animate-twinkle {
          animation: twinkle 2s ease-in-out infinite;
        }

        .animate-twinkle-delayed {
          animation: twinkle-delayed 2.5s ease-in-out infinite 0.5s;
        }

        .animate-sparkle {
          animation: sparkle 4s linear infinite;
        }

        .animate-sparkle-delayed {
          animation: sparkle-delayed 3.5s linear infinite 1s;
        }

        .animate-pulse-slow {
          animation: pulse-slow 3s ease-in-out infinite;
        }

        .animate-rocket {
          animation: rocket 5s ease-in-out infinite;
        }

        .animate-rocket-delayed {
          animation: rocket-delayed 4.5s ease-in-out infinite 1.5s;
        }

        .animate-confetti {
          animation: confetti 8s linear infinite;
        }

        .animate-confetti-delayed {
          animation: confetti-delayed 10s linear infinite 2s;
        }

        .line-clamp-3 {
          display: -webkit-box;
          -webkit-line-clamp: 3;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }

        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }

        .line-clamp-1 {
          display: -webkit-box;
          -webkit-line-clamp: 1;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>
    </div>
  )
}
