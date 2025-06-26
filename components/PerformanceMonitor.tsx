'use client'

import { useEffect } from 'react'

export function PerformanceMonitor() {
  useEffect(() => {
    // Only run in production
    if (process.env.NODE_ENV !== 'production') return

    // Web Vitals monitoring
    const reportWebVitals = (metric: any) => {
      // You can send these metrics to your analytics service
      console.log({
        name: metric.name,
        value: metric.value,
        rating: metric.rating,
      })
      
      // Example: Send to analytics
      // analytics.track('Web Vitals', {
      //   metric: metric.name,
      //   value: metric.value,
      //   rating: metric.rating,
      // })
    }

    // Performance Observer for monitoring
    if ('PerformanceObserver' in window) {
      try {
        // Observe paint timing
        const paintObserver = new PerformanceObserver((list) => {
          for (const entry of list.getEntries()) {
            reportWebVitals({
              name: entry.name,
              value: entry.startTime,
              rating: 'good',
            })
          }
        })
        paintObserver.observe({ entryTypes: ['paint'] })

        // Observe layout shifts
        const layoutShiftObserver = new PerformanceObserver((list) => {
          let cls = 0
          for (const entry of list.getEntries()) {
            if (!(entry as any).hadRecentInput) {
              cls += (entry as any).value
            }
          }
          reportWebVitals({
            name: 'CLS',
            value: cls,
            rating: cls < 0.1 ? 'good' : cls < 0.25 ? 'needs-improvement' : 'poor',
          })
        })
        layoutShiftObserver.observe({ entryTypes: ['layout-shift'] })

        // Cleanup
        return () => {
          paintObserver.disconnect()
          layoutShiftObserver.disconnect()
        }
      } catch (error) {
        console.error('Performance monitoring error:', error)
      }
    }
  }, [])

  return null
}