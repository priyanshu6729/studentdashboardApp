"use client";

import type { Student } from "@/components/student-dashboard";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

interface StudentListProps {
  students: Student[];
  onSelectStudent: (student: Student) => void;
  selectedStudentId: string | null;
}

export function StudentList({ students, onSelectStudent, selectedStudentId }: StudentListProps) {
  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Course</TableHead>
            <TableHead>Grade</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {students.length === 0 ? (
            <TableRow>
              <TableCell colSpan={3} className="text-center">
                No students found
              </TableCell>
            </TableRow>
          ) : (
            students.map((student) => (
              <TableRow
                key={student.id}
                className={`cursor-pointer hover:bg-muted ${selectedStudentId === student.id ? 'bg-muted' : ''}`}
                onClick={() => onSelectStudent(student)}
              >
                <TableCell className="font-medium">{student.name}</TableCell>
                <TableCell>{student.course}</TableCell>
                <TableCell>{student.grade}</TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
}
