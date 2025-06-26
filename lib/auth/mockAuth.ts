// Mock authentication for development/demo purposes
// This allows the app to run without Azure AD configuration

export interface MockUser {
  id: string
  email: string
  name: string
  department: string
  role: string
}

export const mockUsers: MockUser[] = [
  {
    id: '1',
    email: 'vivek.n@pangeatech.com',
    name: 'Vivek N',
    department: 'Leadership',
    role: 'CEO'
  },
  {
    id: '2',
    email: 'demo@pangeatech.com',
    name: 'Demo User',
    department: 'Engineering',
    role: 'Employee'
  },
  {
    id: '3',
    email: 'admin@pangeatech.com',
    name: 'Admin User',
    department: 'IT',
    role: 'Admin'
  }
]

export const mockLogin = async (email: string): Promise<MockUser | null> => {
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 1000))
  
  // Find user by email
  const user = mockUsers.find(u => u.email === email)
  if (user) {
    // Store in session
    if (typeof window !== 'undefined') {
      sessionStorage.setItem('mockUser', JSON.stringify(user))
    }
    return user
  }
  
  return null
}

export const mockLogout = async (): Promise<void> => {
  if (typeof window !== 'undefined') {
    sessionStorage.removeItem('mockUser')
  }
}

export const getMockUser = (): MockUser | null => {
  if (typeof window !== 'undefined') {
    const userStr = sessionStorage.getItem('mockUser')
    if (userStr) {
      return JSON.parse(userStr)
    }
  }
  return null
}