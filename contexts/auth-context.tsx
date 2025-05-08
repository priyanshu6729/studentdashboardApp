"use client"

import React, { createContext, useContext, useEffect, useState } from "react"
import type { User } from "firebase/auth"
import { 
  onAuthStateChanged, 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword, 
  signOut as firebaseSignOut 
} from "firebase/auth"
import { auth } from "@/lib/firebase"


import { getLocalStorage, setLocalStorage, removeLocalStorage } from "@/lib/local-storage"

// Define your user type more specifically if possible
interface AuthContextType {
  user: User | null
  loading: boolean
  error: string | null
  signUp: (email: string, password: string) => Promise<void>
  signIn: (email: string, password: string) => Promise<void>
  signOut: () => Promise<void>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(
      auth,
      (user) => {
        setUser(user)
        setLoading(false)
      },
      (error) => {
        console.error("Auth state error:", error)
        setError(error.message)
      }
    )

    const storedUser = getLocalStorage("user")
    if (storedUser) {
      setUser(storedUser)
    }
    setLoading(false)

    return () => {
      unsubscribe()
    }
  }, [])


  const signUp = async (email: string, password: string): Promise<void> => {
    setError(null)
    try {
      await createUserWithEmailAndPassword(auth, email, password)
    } catch (error) {
      const message = error instanceof Error ? error.message : "Sign up error"
      setError(message)
      throw error
    }
  }


  const signIn = async (email: string, password: string): Promise<void> => {
    setError(null)
    try {
      await signInWithEmailAndPassword(auth, email, password)
    } catch (error) {
      const message = error instanceof Error ? error.message : "Sign in error"
      setError(message)
      throw error
    }
  }

  const signOut = async () => {
    setError(null)
    try {
      await firebaseSignOut(auth)
    } catch (error) {
      const message = error instanceof Error ? error.message : "Sign out error"
      setError(message)
      throw error
    }
  }

  return (
    <AuthContext.Provider value={{ user, loading, signUp, signIn, signOut, error }}>
      {children}
    </AuthContext.Provider>
  )
}
// Custom hook to use the AuthContext

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) throw new Error("useAuth must be used within an AuthProvider")
  return context
}
function setError(arg0: string | null) {
  console.error("Error:", arg0);
}

