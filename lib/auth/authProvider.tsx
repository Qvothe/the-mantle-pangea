'use client'

import React, { createContext, useContext, useEffect, useState } from 'react'
import { PublicClientApplication, InteractionStatus, AccountInfo } from '@azure/msal-browser'
import { MsalProvider, useIsAuthenticated, useMsal, useMsalAuthentication } from '@azure/msal-react'
import { msalConfig, loginRequest } from './msalConfig'
import { InteractionType } from '@azure/msal-browser'

// Initialize MSAL instance
const msalInstance = new PublicClientApplication(msalConfig)

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
  login: () => Promise<void>
  logout: () => Promise<void>
  error: Error | null
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

// Inner component that uses MSAL hooks
function AuthProviderInner({ children }: { children: React.ReactNode }) {
  const { instance, accounts, inProgress } = useMsal()
  const isAuthenticated = useIsAuthenticated()
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)

  // Auto-login with redirect
  useMsalAuthentication(InteractionType.Redirect, loginRequest)

  useEffect(() => {
    const initializeAuth = async () => {
      try {
        if (isAuthenticated && accounts.length > 0) {
          const account = accounts[0]
          
          // Get access token
          const response = await instance.acquireTokenSilent({
            ...loginRequest,
            account: account,
          })
          
          // Create user object from account info
          const user: User = {
            id: account.localAccountId,
            email: account.username,
            name: account.name || account.username,
            department: 'Engineering', // This would come from Graph API
            role: 'Employee', // This would come from app roles
          }
          
          // Optional: Fetch additional user info from Graph API
          // const graphResponse = await fetch(graphConfig.graphMeEndpoint, {
          //   headers: {
          //     Authorization: `Bearer ${response.accessToken}`,
          //   },
          // })
          // const graphData = await graphResponse.json()
          
          setUser(user)
        } else if (inProgress === InteractionStatus.None) {
          setUser(null)
        }
      } catch (error) {
        console.error('Auth initialization error:', error)
        setError(error as Error)
      } finally {
        if (inProgress === InteractionStatus.None) {
          setIsLoading(false)
        }
      }
    }

    initializeAuth()
  }, [isAuthenticated, accounts, instance, inProgress])

  const login = async () => {
    try {
      await instance.loginRedirect(loginRequest)
    } catch (error) {
      console.error('Login error:', error)
      setError(error as Error)
    }
  }

  const logout = async () => {
    try {
      await instance.logoutRedirect({
        postLogoutRedirectUri: '/',
      })
    } catch (error) {
      console.error('Logout error:', error)
      setError(error as Error)
    }
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated,
        isLoading,
        login,
        logout,
        error,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

// Main provider component
export function AuthProvider({ children }: { children: React.ReactNode }) {
  return (
    <MsalProvider instance={msalInstance}>
      <AuthProviderInner>{children}</AuthProviderInner>
    </MsalProvider>
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