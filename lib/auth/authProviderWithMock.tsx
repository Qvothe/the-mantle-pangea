'use client'

import React, { createContext, useContext, useEffect, useState } from 'react'
import { mockLogin, mockLogout, getMockUser, MockUser } from './mockAuth'

// User context type
interface User {
  id: string
  email: string
  name: string
  department?: string
  role?: string
  photo?: string
}

interface AuthContextType {
  user: User | null
  isAuthenticated: boolean
  isLoading: boolean
  login: (email?: string) => Promise<void>
  logout: () => Promise<void>
  error: Error | null
  isMockMode: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

// Check if Azure AD is properly configured
const isAzureADConfigured = () => {
  const clientId = process.env.NEXT_PUBLIC_AZURE_AD_CLIENT_ID
  const authority = process.env.NEXT_PUBLIC_AZURE_AD_AUTHORITY
  
  return (
    clientId && 
    clientId !== 'your-client-id' && 
    clientId !== 'your-client-id-here' &&
    authority && 
    !authority.includes('your-tenant-id')
  )
}

// Main provider component
export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)
  const isMockMode = !isAzureADConfigured()

  useEffect(() => {
    // Initialize auth
    const initAuth = async () => {
      try {
        if (isMockMode) {
          // Check for existing mock session
          const mockUser = getMockUser()
          if (mockUser) {
            setUser(mockUser)
          }
        }
      } catch (err) {
        console.error('Auth initialization error:', err)
        setError(err as Error)
      } finally {
        setIsLoading(false)
      }
    }

    initAuth()
  }, [isMockMode])

  const login = async (email?: string) => {
    try {
      setIsLoading(true)
      setError(null)

      if (isMockMode) {
        // Mock login
        const mockEmail = email || 'demo@pangeatech.com'
        const mockUser = await mockLogin(mockEmail)
        if (mockUser) {
          setUser(mockUser)
        } else {
          throw new Error('Invalid credentials')
        }
      } else {
        // Real Azure AD login would go here
        throw new Error('Azure AD not configured. Please set up your environment variables.')
      }
    } catch (err) {
      console.error('Login error:', err)
      setError(err as Error)
      throw err
    } finally {
      setIsLoading(false)
    }
  }

  const logout = async () => {
    try {
      setIsLoading(true)
      if (isMockMode) {
        await mockLogout()
      }
      setUser(null)
      // Redirect to login
      if (typeof window !== 'undefined') {
        window.location.href = '/login'
      }
    } catch (err) {
      console.error('Logout error:', err)
      setError(err as Error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isLoading,
        login,
        logout,
        error,
        isMockMode,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

// Hook to use auth context
export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}