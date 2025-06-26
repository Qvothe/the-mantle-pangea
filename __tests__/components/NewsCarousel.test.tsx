import React from 'react'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { NewsCarousel } from '@/components/sections/NewsCarousel/NewsCarousel'

describe('NewsCarousel Component', () => {
  beforeEach(() => {
    jest.useFakeTimers()
  })

  afterEach(() => {
    jest.runOnlyPendingTimers()
    jest.useRealTimers()
  })

  it('renders all news categories', () => {
    render(<NewsCarousel />)
    
    expect(screen.getByText('Company')).toBeInTheDocument()
    expect(screen.getByText('Product')).toBeInTheDocument()
    expect(screen.getByText('Recognition')).toBeInTheDocument()
    expect(screen.getByText('Events')).toBeInTheDocument()
    expect(screen.getByText('Fun')).toBeInTheDocument()
  })

  it('displays news items for selected category', () => {
    render(<NewsCarousel />)
    
    // Default should be Company news
    expect(screen.getByText(/Q4 Results Exceed Expectations/)).toBeInTheDocument()
  })

  it('switches categories when tab is clicked', () => {
    render(<NewsCarousel />)
    
    // Click on Product tab
    fireEvent.click(screen.getByText('Product'))
    
    // Should show Product news
    expect(screen.getByText(/TuringXai 3.0 Beta Launch/)).toBeInTheDocument()
  })

  it('auto-rotates through categories', () => {
    render(<NewsCarousel />)
    
    // Initially on Company
    expect(screen.getByText(/Q4 Results Exceed Expectations/)).toBeInTheDocument()
    
    // Fast-forward 5 seconds
    jest.advanceTimersByTime(5000)
    
    // Should rotate to next category (Product)
    waitFor(() => {
      expect(screen.getByText(/TuringXai 3.0 Beta Launch/)).toBeInTheDocument()
    })
  })

  it('handles breaking news alerts', () => {
    render(<NewsCarousel />)
    
    // Breaking news should have special styling
    const breakingNews = screen.getByText(/Q4 Results Exceed Expectations/)
    const newsCard = breakingNews.closest('.group')
    
    expect(newsCard).toHaveClass('hover:scale-105')
  })

  it('displays timestamps for news items', () => {
    render(<NewsCarousel />)
    
    expect(screen.getByText('Just now')).toBeInTheDocument()
    expect(screen.getByText('2 hours ago')).toBeInTheDocument()
  })

  it('shows read counts for news items', () => {
    render(<NewsCarousel />)
    
    expect(screen.getByText('1.2k reads')).toBeInTheDocument()
    expect(screen.getByText('890 reads')).toBeInTheDocument()
  })

  it('handles category click interactions', () => {
    render(<NewsCarousel />)
    
    const funTab = screen.getByText('Fun')
    fireEvent.click(funTab)
    
    // Should show Fun category news
    expect(screen.getByText(/Halloween Costume Contest Winners/)).toBeInTheDocument()
  })
})