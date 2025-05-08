"use client"

import { useState } from "react"
import { Search } from "lucide-react"
import { useAuth } from "@/contexts/auth-context"
import { AddStudentForm } from "@/components/add-student-form"
import { StudentList } from "@/components/student-list"
import { StudentDetails } from "@/components/student-details"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useLocalStorage } from "@/hooks/use-local-storage"

export type Student = {
  id: string
  name: string
  email: string
  grade: string
  course: string
}

interface StudentDashboardProps {
  isLoggedIn?: boolean
}

export function StudentDashboard({ isLoggedIn: propIsLoggedIn }: StudentDashboardProps) {
  const { user } = useAuth()
  const [students, setStudents] = useLocalStorage<Student[]>("students", [
    {
      id: "1",
      name: "John Doe",
      email: "john.doe@example.com",
      grade: "A",
      course: "Computer Science",
    },
    {
      id: "2",
      name: "Jane Smith",
      email: "jane.smith@example.com",
      grade: "B+",
      course: "Mathematics",
    },
    {
      id: "3",
      name: "Alex Johnson",
      email: "alex.johnson@example.com",
      grade: "A-",
      course: "Physics",
    },
  ])

  const [searchTerm, setSearchTerm] = useState("")
  const [courseFilter, setCourseFilter] = useState("all")
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null)

  // Use provided prop value or fallback to authentication state
  const isLoggedIn = propIsLoggedIn !== undefined ? propIsLoggedIn : !!user

  const addStudent = (student: Omit<Student, "id">) => {
    const newStudent = {
      ...student,
      id: Math.random().toString(36).substring(2, 9),
    }
    setStudents([...students, newStudent])
  }

  const filteredStudents = students.filter((student) => {
    const matchesSearch =
      student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.email.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCourse = courseFilter === "all" || student.course === courseFilter

    return matchesSearch && matchesCourse
  })

  const courses = [...new Set(students.map((student) => student.course))]

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Dashboard Overview</h1>
        <div className="px-4 py-2 bg-muted rounded-md text-sm">
          {isLoggedIn ? (
            <span className="text-green-600 font-medium">Authenticated</span>
          ) : (
            <span className="text-amber-600 font-medium">Not Authenticated</span>
          )}
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle>Total Students</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{students.length}</div>
            <p className="text-xs text-muted-foreground">+2 from last week</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle>Average Grade</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">B+</div>
            <p className="text-xs text-muted-foreground">Improved from B</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle>Course Distribution</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{courses.length}</div>
            <p className="text-xs text-muted-foreground">Across all departments</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <div className="md:col-span-2 lg:col-span-3 space-y-4">
          <div className="flex flex-col gap-4 md:flex-row">
            <div className="relative flex-1">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search students..."
                className="pl-8"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <Select value={courseFilter} onValueChange={setCourseFilter}>
              <SelectTrigger className="w-full md:w-[180px]">
                <SelectValue placeholder="Filter by course" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Courses</SelectItem>
                {courses.map((course) => (
                  <SelectItem key={course} value={course}>
                    {course}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            <div className="space-y-4">
              <h2 className="text-2xl font-bold">Students</h2>
              <StudentList students={filteredStudents} onSelectStudent={setSelectedStudent} selectedStudentId={null} />
            </div>

            <div className="space-y-4">
              {selectedStudent && (
                <>
                  <h2 className="text-2xl font-bold">Student Details</h2>
                  <StudentDetails student={selectedStudent} isLoggedIn={isLoggedIn} />
                </>
              )}

              <h2 className="text-2xl font-bold">Add New Student</h2>
              <AddStudentForm onAddStudent={addStudent} />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
