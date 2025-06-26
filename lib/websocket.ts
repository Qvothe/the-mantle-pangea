// Mock WebSocket implementation for real-time features
// In production, this would connect to your actual WebSocket server

type WebSocketMessage = {
  type: 'metrics' | 'award_update' | 'news' | 'notification'
  data: any
}

type WebSocketCallback = (message: WebSocketMessage) => void

class MockWebSocket {
  private callbacks: WebSocketCallback[] = []
  private intervalId: NodeJS.Timeout | null = null
  
  connect() {
    console.log('Mock WebSocket connected')
    
    // Simulate real-time updates every 5 seconds
    this.intervalId = setInterval(() => {
      this.simulateUpdate()
    }, 5000)
  }
  
  disconnect() {
    if (this.intervalId) {
      clearInterval(this.intervalId)
      this.intervalId = null
    }
    console.log('Mock WebSocket disconnected')
  }
  
  subscribe(callback: WebSocketCallback) {
    this.callbacks.push(callback)
    
    // Return unsubscribe function
    return () => {
      this.callbacks = this.callbacks.filter(cb => cb !== callback)
    }
  }
  
  private simulateUpdate() {
    const updateTypes = ['metrics', 'award_update', 'news', 'notification'] as const
    const type = updateTypes[Math.floor(Math.random() * updateTypes.length)]
    
    let message: WebSocketMessage
    
    switch (type) {
      case 'metrics':
        message = {
          type: 'metrics',
          data: {
            linesOfCode: Math.floor(1000 + Math.random() * 500),
            agentHours: Math.floor(50 + Math.random() * 20),
            sonOrcaQueries: Math.floor(100 + Math.random() * 50),
            timestamp: new Date()
          }
        }
        break
        
      case 'award_update':
        message = {
          type: 'award_update',
          data: {
            awardId: Math.floor(1 + Math.random() * 5),
            newPrediction: {
              userId: `user_${Math.floor(Math.random() * 100)}`,
              nomineeId: Math.floor(1 + Math.random() * 4)
            }
          }
        }
        break
        
      case 'news':
        message = {
          type: 'news',
          data: {
            breaking: Math.random() > 0.8,
            title: 'New Update from The Mantle',
            category: ['announcements', 'awards', 'new_clients', 'new_employees', 'ai_news'][Math.floor(Math.random() * 5)]
          }
        }
        break
        
      case 'notification':
        message = {
          type: 'notification',
          data: {
            title: 'The Mantle Update',
            message: 'Check out the latest updates!',
            priority: Math.random() > 0.5 ? 'high' : 'normal'
          }
        }
        break
    }
    
    // Notify all subscribers
    this.callbacks.forEach(callback => callback(message))
  }
}

// Export singleton instance
export const websocket = new MockWebSocket()

// React hook for using WebSocket
import { useEffect, useState } from 'react'

export function useWebSocket<T = any>(
  messageType?: WebSocketMessage['type']
): T | null {
  const [lastMessage, setLastMessage] = useState<T | null>(null)
  
  useEffect(() => {
    const unsubscribe = websocket.subscribe((message) => {
      if (!messageType || message.type === messageType) {
        setLastMessage(message.data)
      }
    })
    
    return unsubscribe
  }, [messageType])
  
  return lastMessage
}

// Initialize WebSocket connection
if (typeof window !== 'undefined') {
  websocket.connect()
}