"use client"

import React, { createContext, useContext, useEffect, useState } from "react"
import { getLocalStorage, setLocalStorage, removeLocalStorage } from "@/lib/local-storage"

// Define your user type more specifically if possible
interface AuthContextType {
  user: any
  loading: boolean
  error: string | null
  signIn: (email: string, password: string) => Promise<any>
  signOut: () => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const storedUser = getLocalStorage("user")
    if (storedUser) {
      setUser(storedUser)
    }
    setLoading(false)
  }, [])

  const signIn = async (email: string, password: string) => {
    try {
      setLoading(true)
      setError(null)

      // Replace with actual auth logic
      const mockUser = { email }
      
      // Simulate delay (optional)
      await new Promise((res) => setTimeout(res, 500))

      setUser(mockUser)
      setLocalStorage("user", mockUser)
      return mockUser
    } catch (err) {
      setError("Invalid credentials")
      throw err
    } finally {
      setLoading(false)
    }
  }

  const signOut = () => {
    setUser(null)
    removeLocalStorage("user")
  }

  return (
    <AuthContext.Provider value={{ user, loading, error, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) throw new Error("useAuth must be used within an AuthProvider")
  return context
}
