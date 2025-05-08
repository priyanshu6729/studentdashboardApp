"use client"

import { useState } from "react"
import { Dialog, DialogContent } from "@/components/ui/dialog"
import { LoginForm } from "@/components/auth/login-form"
import { SignupForm } from "@/components/auth/signup-form"

interface AuthModalProps {
  isOpen: boolean
  onClose: () => void
}

type AuthView = "login" | "signup"

export function AuthModal({ isOpen, onClose }: AuthModalProps) {
  const [view, setView] = useState<AuthView>("login")

  const handleSuccess = () => {
    onClose()
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md p-0">
        {view === "login" ? (
          <LoginForm onSuccess={handleSuccess} onSignUpClick={() => setView("signup")} />
        ) : (
          <SignupForm onSuccess={handleSuccess} onLoginClick={() => setView("login")} />
        )}
      </DialogContent>
    </Dialog>
  )
}
