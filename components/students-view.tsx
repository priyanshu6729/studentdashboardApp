"use client"

import { useState } from "react"
import { Search, UserPlus, Filter } from "lucide-react"
import { useAuth } from "@/contexts/auth-context"
import { StudentList } from "@/components/student-list"
import { StudentDetails } from "@/components/student-details"
import { AddStudentForm } from "@/components/add-student-form"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useToast } from "@/components/ui/use-toast"
import { Skeleton } from "@/components/ui/skeleton"
import type { Student } from "@/components/student-dashboard"

interface StudentsViewProps {
  isLoggedIn?: boolean
}

export function StudentsView({ isLoggedIn: propIsLoggedIn }: StudentsViewProps) {
  const { user } = useAuth()
  const { toast } = useToast()
  // Use provided prop value or fallback to authentication state
  const isLoggedIn = propIsLoggedIn !== undefined ? propIsLoggedIn : !!user

  const [students, setStudents] = useState<Student[]>([
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
    {
      id: "4",
      name: "Emily Davis",
      email: "emily.davis@example.com",
      grade: "B",
      course: "Chemistry",
    },
    {
      id: "5",
      name: "Michael Brown",
      email: "michael.brown@example.com",
      grade: "C+",
      course: "Biology",
    },
  ])

  const [searchTerm, setSearchTerm] = useState("")
  const [courseFilter, setCourseFilter] = useState("all")
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [activeTab, setActiveTab] = useState("list")

  const addStudent = (student: Omit<Student, "id">) => {
    setIsLoading(true)

    // Simulate API call
    setTimeout(() => {
      const newStudent = {
        ...student,
        id: Math.random().toString(36).substring(2, 9),
      }
      setStudents([...students, newStudent])
      setIsLoading(false)

      toast({
        title: "Student Added",
        description: `${student.name} has been added successfully.`,
      })

      setActiveTab("list")
    }, 1000)
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
        <h1 className="text-3xl font-bold tracking-tight">Students</h1>
        <div className="flex gap-2">
          <Button variant={activeTab === "list" ? "default" : "outline"} onClick={() => setActiveTab("list")}>
            View Students
          </Button>
          <Button variant={activeTab === "add" ? "default" : "outline"} onClick={() => setActiveTab("add")}>
            <UserPlus className="mr-2 h-4 w-4" />
            Add Student
          </Button>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="list">Student List</TabsTrigger>
          <TabsTrigger value="add">Add Student</TabsTrigger>
        </TabsList>

        <TabsContent value="list" className="space-y-4 animate-in slide-in-from-left duration-300">
          <Card>
            <CardContent className="p-4 space-y-4">
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
                    <Filter className="mr-2 h-4 w-4" />
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
                  <StudentList students={filteredStudents} onSelectStudent={setSelectedStudent} />
                </div>

                <div className="space-y-4">
                  {selectedStudent ? (
                    <StudentDetails student={selectedStudent} isLoggedIn={isLoggedIn} />
                  ) : (
                    <Card>
                      <CardContent className="p-6 text-center text-muted-foreground">
                        <p>Select a student to view details</p>
                      </CardContent>
                    </Card>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="add" className="animate-in slide-in-from-right duration-300">
          <Card>
            <CardContent className="p-6">
              <h2 className="text-2xl font-bold mb-4">Add New Student</h2>
              {isLoading ? (
                <div className="space-y-4">
                  <Skeleton className="h-10 w-full" />
                  <Skeleton className="h-10 w-full" />
                  <div className="grid grid-cols-2 gap-4">
                    <Skeleton className="h-10 w-full" />
                    <Skeleton className="h-10 w-full" />
                  </div>
                  <Skeleton className="h-10 w-full" />
                </div>
              ) : (
                <AddStudentForm onAddStudent={addStudent} />
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
