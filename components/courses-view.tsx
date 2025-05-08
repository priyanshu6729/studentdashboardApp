"use client"

import { useState } from "react"
import { Book, Search, Plus } from "lucide-react"
import { useAuth } from "@/contexts/auth-context"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { useToast } from "@/components/ui/use-toast"

interface Course {
  id: string
  name: string
  description: string
  students: number
  level: "Beginner" | "Intermediate" | "Advanced"
}

interface CoursesViewProps {
  isLoggedIn?: boolean
}

export function CoursesView({ isLoggedIn: propIsLoggedIn }: CoursesViewProps) {
  const { user } = useAuth()
  const { toast } = useToast()
  // Use provided prop value or fallback to authentication state
  const isLoggedIn = propIsLoggedIn !== undefined ? propIsLoggedIn : !!user

  const [courses, setCourses] = useState<Course[]>([
    {
      id: "cs101",
      name: "Computer Science",
      description: "Introduction to computer science principles and programming",
      students: 42,
      level: "Beginner",
    },
    {
      id: "math201",
      name: "Mathematics",
      description: "Advanced calculus and linear algebra",
      students: 28,
      level: "Intermediate",
    },
    {
      id: "phys301",
      name: "Physics",
      description: "Quantum mechanics and theoretical physics",
      students: 15,
      level: "Advanced",
    },
    {
      id: "chem101",
      name: "Chemistry",
      description: "Introduction to chemical principles and lab techniques",
      students: 32,
      level: "Beginner",
    },
    {
      id: "bio201",
      name: "Biology",
      description: "Cell biology and genetics",
      students: 24,
      level: "Intermediate",
    },
  ])

  const [searchTerm, setSearchTerm] = useState("")
  const [newCourse, setNewCourse] = useState({
    name: "",
    description: "",
    level: "Beginner" as const,
  })
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  const filteredCourses = courses.filter(
    (course) =>
      course.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      course.description.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const handleAddCourse = () => {
    const course = {
      ...newCourse,
      id: Math.random().toString(36).substring(2, 9),
      students: 0,
    }

    setCourses([...courses, course])
    setNewCourse({
      name: "",
      description: "",
      level: "Beginner",
    })

    setIsDialogOpen(false)

    toast({
      title: "Course Added",
      description: `${course.name} has been added to the curriculum.`,
    })
  }

  const getLevelColor = (level: Course["level"]) => {
    switch (level) {
      case "Beginner":
        return "bg-green-100 text-green-800 hover:bg-green-100"
      case "Intermediate":
        return "bg-blue-100 text-blue-800 hover:bg-blue-100"
      case "Advanced":
        return "bg-purple-100 text-purple-800 hover:bg-purple-100"
    }
  }

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Courses</h1>

        <div className="flex gap-2">
          <div className="relative flex-1 md:w-64">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search courses..."
              className="pl-8"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          {isLoggedIn && (
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
              <DialogTrigger asChild>
                <Button>
                  <Plus className="mr-2 h-4 w-4" />
                  Add Course
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Add New Course</DialogTitle>
                  <DialogDescription>Create a new course for the curriculum.</DialogDescription>
                </DialogHeader>
                <div className="space-y-4 py-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Course Name</Label>
                    <Input
                      id="name"
                      value={newCourse.name}
                      onChange={(e) => setNewCourse({ ...newCourse, name: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="description">Description</Label>
                    <Input
                      id="description"
                      value={newCourse.description}
                      onChange={(e) => setNewCourse({ ...newCourse, description: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="level">Level</Label>
                    <select
                      id="level"
                      value={newCourse.level}
                      onChange={(e) => setNewCourse({ ...newCourse, level: e.target.value as any })}
                      className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                    >
                      <option value="Beginner">Beginner</option>
                      <option value="Intermediate">Intermediate</option>
                      <option value="Advanced">Advanced</option>
                    </select>
                  </div>
                </div>
                <DialogFooter>
                  <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
                    Cancel
                  </Button>
                  <Button onClick={handleAddCourse}>Add Course</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          )}
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {filteredCourses.length === 0 ? (
          <div className="md:col-span-2 lg:col-span-3 text-center py-12">
            <Book className="mx-auto h-12 w-12 text-muted-foreground" />
            <h2 className="mt-4 text-lg font-semibold">No courses found</h2>
            <p className="text-muted-foreground">Try adjusting your search terms</p>
          </div>
        ) : (
          filteredCourses.map((course) => (
            <Card key={course.id} className="overflow-hidden transition-all hover:shadow-md">
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center justify-between">
                  {course.name}
                  <Badge className={`${getLevelColor(course.level)}`}>{course.level}</Badge>
                </CardTitle>
                <CardDescription>{course.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-sm text-muted-foreground">
                  <span className="font-medium">{course.students}</span> students enrolled
                </div>
              </CardContent>
              <CardFooter className="bg-muted/50 pt-2">
                <Button variant="ghost" size="sm" className="ml-auto">
                  {isLoggedIn ? "View Details" : "Login to View"}
                </Button>
              </CardFooter>
            </Card>
          ))
        )}
      </div>
    </div>
  )
}
