"use client"

import { MainLayout } from "@/components/layout"
import { AwardsSection } from "@/components/sections/Awards/AwardsSection"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Trophy, Star, Calendar, Users } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function AwardsPage() {
  return (
    <MainLayout>
      <div className="space-y-6 max-w-full">
        {/* Page Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <Trophy className="h-8 w-8 text-[#7209B7]" />
                <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold bg-gradient-to-r from-[#7209B7] to-[#B5179E] bg-clip-text text-transparent">
                  Pangea Awards Center
                </h1>
              </div>
              <p className="text-base md:text-lg text-muted-foreground">
                Celebrate excellence, predict winners, and earn bragging rights
              </p>
            </div>
            <div className="hidden md:flex gap-2">
              <Link href="/wishlist">
                <Button variant="outline" className="gap-2">
                  <Star className="h-4 w-4" />
                  My Wishlist
                </Button>
              </Link>
              <Link href="/admin">
                <Button variant="outline" className="gap-2">
                  <Users className="h-4 w-4" />
                  Admin View
                </Button>
              </Link>
            </div>
          </div>
        </div>

        {/* Awards History */}
        <section>
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="h-5 w-5" />
                Recent Winners
              </CardTitle>
              <CardDescription>
                Celebrating our latest champions
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-gradient-to-r from-purple-50 to-purple-100 dark:from-purple-900/20 dark:to-purple-800/20 rounded-lg">
                  <div>
                    <h4 className="font-semibold">The Culture Catalyst Award</h4>
                    <p className="text-sm text-muted-foreground">December 2024</p>
                  </div>
                  <div className="text-right">
                    <p className="font-bold">Sarah Chen</p>
                    <Badge variant="secondary">Engineering</Badge>
                  </div>
                </div>
                <div className="flex items-center justify-between p-4 bg-gradient-to-r from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20 rounded-lg">
                  <div>
                    <h4 className="font-semibold">The Rocket Start Award</h4>
                    <p className="text-sm text-muted-foreground">November 2024</p>
                  </div>
                  <div className="text-right">
                    <p className="font-bold">Raj Kumar</p>
                    <Badge variant="secondary">Product</Badge>
                  </div>
                </div>
                <div className="flex items-center justify-between p-4 bg-gradient-to-r from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20 rounded-lg">
                  <div>
                    <h4 className="font-semibold">The Hustle Award</h4>
                    <p className="text-sm text-muted-foreground">October 2024</p>
                  </div>
                  <div className="text-right">
                    <p className="font-bold">Ahmad Shah</p>
                    <Badge variant="secondary">Sales</Badge>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Main Awards Section */}
        <section>
          <AwardsSection />
        </section>

        {/* Awards Stats */}
        <section>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Card className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Total Awards</p>
                  <p className="text-2xl font-bold">5</p>
                </div>
                <Trophy className="h-8 w-8 text-muted-foreground opacity-50" />
              </div>
            </Card>
            <Card className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Active Predictions</p>
                  <p className="text-2xl font-bold">127</p>
                </div>
                <Star className="h-8 w-8 text-muted-foreground opacity-50" />
              </div>
            </Card>
            <Card className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Unique Winners</p>
                  <p className="text-2xl font-bold">18</p>
                </div>
                <Users className="h-8 w-8 text-muted-foreground opacity-50" />
              </div>
            </Card>
            <Card className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Next Award In</p>
                  <p className="text-2xl font-bold">3d</p>
                </div>
                <Calendar className="h-8 w-8 text-muted-foreground opacity-50" />
              </div>
            </Card>
          </div>
        </section>
      </div>
    </MainLayout>
  )
}