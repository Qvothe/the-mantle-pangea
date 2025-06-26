import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import { Header } from '@/components/layout/Header/Header'
import { useAuth } from '@/lib/auth/authProviderWithMock'
import { useTheme } from 'next-themes'

// Mock the dependencies
jest.mock('@/lib/auth/authProviderWithMock')
jest.mock('next-themes')
jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
}))

describe('Header Component', () => {
  const mockUser = {
    name: 'Test User',
    email: 'test@pangeatech.com',
    role: 'employee'
  }

  const mockLogout = jest.fn()
  const mockSetTheme = jest.fn()

  beforeEach(() => {
    (useAuth as jest.Mock).mockReturnValue({
      user: mockUser,
      logout: mockLogout,
    })
    
    (useTheme as jest.Mock).mockReturnValue({
      theme: 'light',
      setTheme: mockSetTheme,
    })
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  it('renders the header with The Mantle branding', () => {
    render(<Header />)
    
    expect(screen.getByText('The Mantle')).toBeInTheDocument()
    expect(screen.getByText('Where Legends Are Made')).toBeInTheDocument()
  })

  it('displays user information in dropdown', () => {
    render(<Header />)
    
    // Click user menu
    const userButton = screen.getByRole('button', { name: /user/i })
    fireEvent.click(userButton)
    
    expect(screen.getByText('Test User')).toBeInTheDocument()
    expect(screen.getByText('test@pangeatech.com')).toBeInTheDocument()
  })

  it('handles theme toggle', () => {
    render(<Header />)
    
    // Find theme toggle button - it should show Sun icon in light mode
    const themeToggle = screen.getByRole('button', { name: /sun/i })
    fireEvent.click(themeToggle)
    
    expect(mockSetTheme).toHaveBeenCalledWith('dark')
  })

  it('calls logout when sign out is clicked', () => {
    render(<Header />)
    
    // Open user menu
    const userButton = screen.getByRole('button', { name: /user/i })
    fireEvent.click(userButton)
    
    // Click sign out
    const signOutButton = screen.getByText('Sign out')
    fireEvent.click(signOutButton)
    
    expect(mockLogout).toHaveBeenCalled()
  })

  it('shows notification badge with count', () => {
    render(<Header />)
    
    const notificationBadge = screen.getByText('3')
    expect(notificationBadge).toBeInTheDocument()
    expect(notificationBadge).toHaveClass('bg-red-500')
  })

  it('renders navigation links on desktop', () => {
    render(<Header />)
    
    // These should be visible on desktop (hidden on mobile)
    const analyticsLink = screen.getByRole('link', { name: /analytics/i })
    const awardsLink = screen.getByRole('link', { name: /awards/i })
    
    expect(analyticsLink).toHaveAttribute('href', '/analytics')
    expect(awardsLink).toHaveAttribute('href', '/awards')
  })

  it('renders search bar on desktop', () => {
    render(<Header />)
    
    const searchInput = screen.getByPlaceholderText('Search The Mantle...')
    expect(searchInput).toBeInTheDocument()
  })
})