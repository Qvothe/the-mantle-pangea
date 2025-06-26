'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/lib/auth/authProviderWithMock'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Loader2, LogIn, Shield, Users, Zap } from 'lucide-react'
import Image from 'next/image'

export default function LoginPage() {
  const { isAuthenticated, isLoading, login, error, isMockMode } = useAuth()
  const router = useRouter()
  const [selectedUser, setSelectedUser] = useState('demo@pangeatech.com')

  useEffect(() => {
    if (isAuthenticated) {
      router.push('/')
    }
  }, [isAuthenticated, router])

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0A1628] to-[#1E3A5F] flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <Card className="backdrop-blur-sm bg-white/95 dark:bg-gray-900/95">
          <CardHeader className="text-center pb-8">
            <div className="mx-auto mb-4 w-20 h-20 bg-gradient-to-br from-[#0A1628] to-[#1E3A5F] rounded-2xl flex items-center justify-center">
              <span className="text-white font-bold text-3xl">M</span>
            </div>
            <CardTitle className="text-3xl font-bold bg-gradient-to-r from-[#0A1628] to-[#1E3A5F] bg-clip-text text-transparent">
              The Mantle
            </CardTitle>
            <CardDescription className="text-lg mt-2">
              Where Legends Are Made
            </CardDescription>
          </CardHeader>
          
          <CardContent className="space-y-6">
            {/* Features */}
            <div className="space-y-3">
              <div className="flex items-center gap-3 text-sm">
                <Shield className="h-5 w-5 text-[#0A1628]" />
                <span>Secure Azure AD Authentication</span>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <Users className="h-5 w-5 text-[#2D6A4F]" />
                <span>Access Pangea's Internal Culture Hub</span>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <Zap className="h-5 w-5 text-[#F4A261]" />
                <span>Real-time Updates & Analytics</span>
              </div>
            </div>

            {error && (
              <div className="p-3 bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 rounded-lg text-sm">
                {error.message}
              </div>
            )}

            {isMockMode ? (
              <>
                <div className="space-y-3">
                  <div className="p-3 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg">
                    <p className="text-sm font-medium text-yellow-800 dark:text-yellow-200">
                      Demo Mode Active
                    </p>
                    <p className="text-xs text-yellow-700 dark:text-yellow-300 mt-1">
                      Azure AD is not configured. Using mock authentication.
                    </p>
                  </div>
                  
                  <select
                    value={selectedUser}
                    onChange={(e) => setSelectedUser(e.target.value)}
                    className="w-full p-3 border rounded-lg bg-background"
                  >
                    <option value="demo@pangeatech.com">Demo User - Employee</option>
                    <option value="vivek.n@pangeatech.com">Vivek N - CEO</option>
                    <option value="admin@pangeatech.com">Admin User - IT Admin</option>
                  </select>
                </div>

                <Button
                  onClick={() => login(selectedUser)}
                  disabled={isLoading}
                  className="w-full h-12 text-lg bg-gradient-to-r from-[#0A1628] to-[#1E3A5F] hover:opacity-90 transition-opacity"
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                      Signing in...
                    </>
                  ) : (
                    <>
                      <LogIn className="mr-2 h-5 w-5" />
                      Sign in as {selectedUser.split('@')[0]}
                    </>
                  )}
                </Button>
              </>
            ) : (
              <Button
                onClick={() => login()}
                disabled={isLoading}
                className="w-full h-12 text-lg bg-gradient-to-r from-[#0A1628] to-[#1E3A5F] hover:opacity-90 transition-opacity"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                    Connecting...
                  </>
                ) : (
                  <>
                    <LogIn className="mr-2 h-5 w-5" />
                    Sign in with Azure AD
                  </>
                )}
              </Button>
            )}

            <div className="text-center text-sm text-muted-foreground">
              <p>Use your Pangea corporate account to sign in</p>
            </div>
          </CardContent>

          <div className="p-6 border-t bg-muted/30">
            <div className="flex items-center justify-center gap-2 text-xs text-muted-foreground">
              <Badge variant="secondary" className="gap-1">
                <span className="h-2 w-2 bg-green-500 rounded-full animate-pulse" />
                Secure
              </Badge>
              <span>•</span>
              <span>Internal Use Only</span>
              <span>•</span>
              <span>Pangea Tech {new Date().getFullYear()}</span>
            </div>
          </div>
        </Card>

        {/* Product themes decoration */}
        <div className="mt-8 flex justify-center gap-2">
          <div className="w-2 h-2 rounded-full bg-[#0A1628]" />
          <div className="w-2 h-2 rounded-full bg-[#2D6A4F]" />
          <div className="w-2 h-2 rounded-full bg-[#F4A261]" />
          <div className="w-2 h-2 rounded-full bg-[#7209B7]" />
        </div>
      </div>
    </div>
  )
}