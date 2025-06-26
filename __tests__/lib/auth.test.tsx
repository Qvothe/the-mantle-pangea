import React from 'react'
import { render, screen, waitFor, fireEvent } from '@testing-library/react'
import { AuthProviderWithMock, useAuth } from '@/lib/auth/authProviderWithMock'

// Mock MSAL
jest.mock('@azure/msal-browser', () => ({
  PublicClientApplication: jest.fn().mockImplementation(() => ({
    loginPopup: jest.fn(),
    logout: jest.fn(),
    getActiveAccount: jest.fn(),
  })),
  InteractionRequiredAuthError: jest.fn(),
}))

jest.mock('@azure/msal-react', () => ({
  MsalProvider: ({ children }: { children: React.ReactNode }) => <>{children}</>,
}))

// Test component to access auth context
const TestComponent = () => {
  const { user, isAuthenticated, login, logout } = useAuth()
  
  return (
    <div>
      <div>Authenticated: {isAuthenticated ? 'Yes' : 'No'}</div>
      <div>User: {user?.name || 'None'}</div>
      <button onClick={() => login()}>Login</button>
      <button onClick={() => logout()}>Logout</button>
    </div>
  )
}

describe('AuthProviderWithMock', () => {
  beforeEach(() => {
    // Clear environment variables
    delete process.env.NEXT_PUBLIC_AZURE_AD_CLIENT_ID
    delete process.env.NEXT_PUBLIC_AZURE_AD_AUTHORITY
    
    // Clear localStorage
    localStorage.clear()
  })

  describe('Mock Authentication Mode', () => {
    it('starts in unauthenticated state', () => {
      render(
        <AuthProviderWithMock>
          <TestComponent />
        </AuthProviderWithMock>
      )
      
      expect(screen.getByText('Authenticated: No')).toBeInTheDocument()
      expect(screen.getByText('User: None')).toBeInTheDocument()
    })

    it('authenticates with mock user', async () => {
      render(
        <AuthProviderWithMock>
          <TestComponent />
        </AuthProviderWithMock>
      )
      
      // Simulate mock login
      localStorage.setItem('mockUser', JSON.stringify({
        id: '1',
        name: 'Demo User',
        email: 'demo@pangeatech.com',
        role: 'employee'
      }))
      
      // Trigger storage event
      window.dispatchEvent(new Event('storage'))
      
      await waitFor(() => {
        expect(screen.getByText('Authenticated: Yes')).toBeInTheDocument()
        expect(screen.getByText('User: Demo User')).toBeInTheDocument()
      })
    })

    it('logs out successfully', async () => {
      // Start authenticated
      localStorage.setItem('mockUser', JSON.stringify({
        id: '1',
        name: 'Demo User',
        email: 'demo@pangeatech.com',
        role: 'employee'
      }))
      
      render(
        <AuthProviderWithMock>
          <TestComponent />
        </AuthProviderWithMock>
      )
      
      await waitFor(() => {
        expect(screen.getByText('Authenticated: Yes')).toBeInTheDocument()
      })
      
      // Click logout
      fireEvent.click(screen.getByText('Logout'))
      
      await waitFor(() => {
        expect(screen.getByText('Authenticated: No')).toBeInTheDocument()
        expect(localStorage.getItem('mockUser')).toBeNull()
      })
    })
  })

  describe('Azure AD Mode', () => {
    beforeEach(() => {
      // Set Azure AD environment variables
      process.env.NEXT_PUBLIC_AZURE_AD_CLIENT_ID = 'test-client-id'
      process.env.NEXT_PUBLIC_AZURE_AD_AUTHORITY = 'https://login.microsoftonline.com/test-tenant-id'
    })

    it('detects Azure AD configuration', () => {
      render(
        <AuthProviderWithMock>
          <TestComponent />
        </AuthProviderWithMock>
      )
      
      // Should still start unauthenticated
      expect(screen.getByText('Authenticated: No')).toBeInTheDocument()
    })
  })

  describe('Protected Route Behavior', () => {
    it('maintains authentication state across components', async () => {
      // Set initial auth state
      localStorage.setItem('mockUser', JSON.stringify({
        id: '1',
        name: 'Demo User',
        email: 'demo@pangeatech.com',
        role: 'employee'
      }))
      
      const SecondTestComponent = () => {
        const { user } = useAuth()
        return <div>Second Component User: {user?.name || 'None'}</div>
      }
      
      render(
        <AuthProviderWithMock>
          <TestComponent />
          <SecondTestComponent />
        </AuthProviderWithMock>
      )
      
      await waitFor(() => {
        expect(screen.getByText('User: Demo User')).toBeInTheDocument()
        expect(screen.getByText('Second Component User: Demo User')).toBeInTheDocument()
      })
    })
  })
})