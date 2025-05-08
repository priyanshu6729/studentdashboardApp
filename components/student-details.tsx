import type { Student } from "@/components/student-dashboard"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Lock } from "lucide-react"

interface StudentDetailsProps {
  student: Student
  isLoggedIn: boolean
}

export function StudentDetails({ student, isLoggedIn }: StudentDetailsProps) {
  if (!isLoggedIn) {
    return (
      <Card>
        <CardHeader className="pb-3">
          <CardTitle>Protected Information</CardTitle>
        </CardHeader>
        <CardContent className="text-center py-6">
          <Lock className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
          <p className="text-muted-foreground">Please log in to view student details</p>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle>{student.name}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid gap-2">
          <div className="grid grid-cols-3 items-center gap-4">
            <span className="font-medium">Email:</span>
            <span className="col-span-2">{student.email}</span>
          </div>
          <div className="grid grid-cols-3 items-center gap-4">
            <span className="font-medium">Course:</span>
            <span className="col-span-2">{student.course}</span>
          </div>
          <div className="grid grid-cols-3 items-center gap-4">
            <span className="font-medium">Grade:</span>
            <span className="col-span-2">{student.grade}</span>
          </div>
          <div className="grid grid-cols-3 items-center gap-4">
            <span className="font-medium">Student ID:</span>
            <span className="col-span-2">{student.id}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
