"use client"

import React, { useState } from "react"
import Link from "next/link"
import { Book, GraduationCap, LayoutDashboard, LogIn, Menu, Users } from "lucide-react"
import { useAuth } from "@/contexts/auth-context"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { StudentsView } from "@/components/students-view"
import { CoursesView } from "@/components/courses-view"
import { UserDropdown } from "@/components/user-dropdown"
import { AuthModal } from "@/components/auth/auth-modal"

export function DashboardLayout({ children }: { children: React.ReactNode }) {
  const { user, loading } = useAuth()
  const [activeView, setActiveView] = useState("dashboard")
  const [authModalOpen, setAuthModalOpen] = useState(false)

  const isLoggedIn = !!user

  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-10 border-b bg-background">
        <div className="flex h-16 items-center px-4 md:px-6">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon" className="md:hidden">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle navigation menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-64">
              <nav className="grid gap-2 text-lg font-medium">
                <Link href="#" className="flex items-center gap-2 text-lg font-semibold">
                  <GraduationCap className="h-6 w-6" />
                  <span>Student Portal</span>
                </Link>
                <Link
                  href="#"
                  className="flex items-center gap-2 rounded-lg px-3 py-2 hover:bg-accent"
                  onClick={() => setActiveView("dashboard")}
                >
                  <LayoutDashboard className="h-5 w-5" />
                  Dashboard
                </Link>
                <Link
                  href="#"
                  className="flex items-center gap-2 rounded-lg px-3 py-2 hover:bg-accent"
                  onClick={() => setActiveView("students")}
                >
                  <Users className="h-5 w-5" />
                  Students
                </Link>
                <Link
                  href="#"
                  className="flex items-center gap-2 rounded-lg px-3 py-2 hover:bg-accent"
                  onClick={() => setActiveView("courses")}
                >
                  <Book className="h-5 w-5" />
                  Courses
                </Link>
              </nav>
            </SheetContent>
          </Sheet>
          <Link href="#" className="flex items-center gap-2 md:ml-0 ml-4">
            <GraduationCap className="h-6 w-6" />
            <span className="text-lg font-semibold">Student Portal</span>
          </Link>
          <div className="ml-auto flex items-center gap-2">
            {loading ? (
              <div className="h-9 w-24 animate-pulse rounded-md bg-muted"></div>
            ) : isLoggedIn ? (
              <UserDropdown />
            ) : (
              <Button
                variant="outline"
                size="sm"
                className="flex items-center gap-1"
                onClick={() => setAuthModalOpen(true)}
              >
                <LogIn className="h-4 w-4" />
                <span>Login</span>
              </Button>
            )}
          </div>
        </div>
      </header>
      <div className="flex flex-1">
        <aside className="hidden w-64 border-r bg-muted/40 md:block">
          <nav className="grid gap-2 p-4 text-sm">
            <Link
              href="#"
              className={`flex items-center gap-2 rounded-lg px-3 py-2 ${
                activeView === "dashboard" ? "bg-accent text-accent-foreground" : "hover:bg-accent"
              }`}
              onClick={() => setActiveView("dashboard")}
            >
              <LayoutDashboard className="h-5 w-5" />
              Dashboard
            </Link>
            <Link
              href="#"
              className={`flex items-center gap-2 rounded-lg px-3 py-2 ${
                activeView === "students" ? "bg-accent text-accent-foreground" : "hover:bg-accent"
              }`}
              onClick={() => setActiveView("students")}
            >
              <Users className="h-5 w-5" />
              Students
            </Link>
            <Link
              href="#"
              className={`flex items-center gap-2 rounded-lg px-3 py-2 ${
                activeView === "courses" ? "bg-accent text-accent-foreground" : "hover:bg-accent"
              }`}
              onClick={() => setActiveView("courses")}
            >
              <Book className="h-5 w-5" />
              Courses
            </Link>
          </nav>
        </aside>
        <main className="flex-1 p-4 md:p-6">
          {activeView === "dashboard" && React.cloneElement(children as React.ReactElement, { isLoggedIn })}
          {activeView === "students" && <StudentsView isLoggedIn={isLoggedIn} />}
          {activeView === "courses" && <CoursesView isLoggedIn={isLoggedIn} />}
        </main>
      </div>

      <AuthModal isOpen={authModalOpen} onClose={() => setAuthModalOpen(false)} />
    </div>
  )
}
