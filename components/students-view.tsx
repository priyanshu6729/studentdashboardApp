"use client"

import { useState, useEffect } from "react"
import { StudentList } from "@/components/student-list"
import { StudentDetails } from "@/components/student-details"
import { AddStudentForm } from "@/components/add-student-form"
import { useLocalStorage } from "@/hooks/use-local-storage"
import { useToast } from "@/components/ui/use-toast"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Search, UserPlus, Filter, LogIn, LogOut } from "lucide-react"
import { AuthModal } from "@/components/auth/auth-modal"
import { useAuth } from "../contexts/auth-context"

interface Student {
  id: string
  name: string
  email: string
  course: string
  grade: string
}

export function StudentsView() {
  const { toast } = useToast()
  const { user, signOut } = useAuth()

  const [students, setStudents] = useLocalStorage<Student[]>("students", [])
  const [selectedStudentId, setSelectedStudentId] = useLocalStorage<string | null>("selectedStudentId", null)
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null)

  const [searchTerm, setSearchTerm] = useState("")
  const [courseFilter, setCourseFilter] = useState("all")
  const [tab, setTab] = useState("list")
  const [authModalOpen, setAuthModalOpen] = useState(false)

  useEffect(() => {
    const found = students.find((s) => s.id === selectedStudentId)
    setSelectedStudent(found || null)
  }, [students, selectedStudentId])

  const handleAddStudent = (newData: Omit<Student, "id">) => {
    const newStudent: Student = {
      ...newData,
      id: Math.random().toString(36).substring(2, 9),
    }

    setStudents((prev) => [...prev, newStudent])
    toast({
      title: "Student Added",
      description: `${newStudent.name} was successfully added.`,
    })

    setTab("list")
  }

  const handleSelectStudent = (student: Student) => {
    setSelectedStudentId(student.id)
    setSelectedStudent(student)
  }

  const filteredStudents = students.filter((student) => {
    const matchesSearch =
      student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.email.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCourse = courseFilter === "all" || student.course === courseFilter
    return matchesSearch && matchesCourse
  })

  const uniqueCourses = Array.from(new Set(students.map((s) => s.course)))

  if (!user) {
    return (
      <>
        <div className="flex flex-col items-center justify-center min-h-screen space-y-4">
          <h2 className="text-xl font-semibold">Please login to view student data</h2>
          <Button onClick={() => setAuthModalOpen(true)}>
            <LogIn className="mr-2 h-4 w-4" /> Login
          </Button>
        </div>
        <AuthModal isOpen={authModalOpen} onClose={() => setAuthModalOpen(false)} />
      </>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Student Management</h1>
        <Button variant="outline" onClick={signOut}>
          <LogOut className="mr-2 h-4 w-4" /> Logout
        </Button>
      </div>

      <Tabs value={tab} onValueChange={setTab}>
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="list">
            <Search className="mr-2 h-4 w-4" />
            Student List
          </TabsTrigger>
          <TabsTrigger value="add">
            <UserPlus className="mr-2 h-4 w-4" />
            Add Student
          </TabsTrigger>
        </TabsList>

        <TabsContent value="list" className="space-y-4">
          <div className="flex items-center gap-4">
            <Input
              type="search"
              placeholder="Search by name or email..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <Select value={courseFilter} onValueChange={setCourseFilter}>
              <SelectTrigger className="w-[180px]">
                <Filter className="mr-2 h-4 w-4" />
                <SelectValue placeholder="Filter by course" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Courses</SelectItem>
                {uniqueCourses.map((course) => (
                  <SelectItem key={course} value={course}>
                    {course}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <StudentList
            students={filteredStudents}
            onSelectStudent={handleSelectStudent}
            selectedStudentId={selectedStudentId}
          />

          {selectedStudent && (
            <StudentDetails student={selectedStudent} isLoggedIn={true} />
          )}
        </TabsContent>

        <TabsContent value="add">
          <AddStudentForm onAddStudent={handleAddStudent} />
        </TabsContent>
      </Tabs>
    </div>
  )
}
