import { useState } from "react"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Check, X, UserCheck, AlertCircle } from "lucide-react"

const studentsData = [
  { id: "STU001", name: "Alice Johnson", rollNo: "2023CS01", status: "Present" },
  { id: "STU002", name: "Bob Smith", rollNo: "2023CS02", status: "Present" },
  { id: "STU003", name: "Charlie Brown", rollNo: "2023CS03", status: "Absent" },
  { id: "STU004", name: "David Wilson", rollNo: "2023CS04", status: "Present" },
  { id: "STU005", name: "Eve Davis", rollNo: "2023CS05", status: "Present" },
]

export function MarkAttendance() {
  const [students, setStudents] = useState(studentsData)
  const [selectedClass, setSelectedClass] = useState("")

  const toggleStatus = (id: string) => {
    setStudents(prev =>
      prev.map(s =>
        s.id === id
          ? { ...s, status: s.status === "Present" ? "Absent" : "Present" }
          : s
      )
    )
  }

  const handleSave = () => {
    // Logic to save attendance
    alert("Attendance saved successfully!")
  }

  return (
    <div className="space-y-6">
      <Card className="bg-card/50 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="text-xl">Select Class & Section</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-4 items-end">
            <div className="space-y-2">
              <label className="text-sm font-medium">Class</label>
              <Select onValueChange={setSelectedClass}>
                <SelectTrigger className="w-[200px]">
                  <SelectValue placeholder="Select Class" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="CS101">Mathematics (Sec A)</SelectItem>
                  <SelectItem value="CS202">Physics (Sec B)</SelectItem>
                  <SelectItem value="CS303">CS (Sec C)</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
               <label className="text-sm font-medium">Date</label>
               <div className="p-2 border rounded-md bg-background text-sm w-[200px]">
                  {new Date().toLocaleDateString()} (Today)
               </div>
            </div>
            <Button disabled={!selectedClass} className="bg-blue-600 hover:bg-blue-700">
               Confirm Selection
            </Button>
          </div>
        </CardContent>
      </Card>

      {selectedClass && (
        <Card className="overflow-hidden border-none shadow-lg">
          <CardHeader className="bg-muted/30 border-b flex flex-row items-center justify-between">
            <div>
                <CardTitle>Student List - {selectedClass}</CardTitle>
                <p className="text-xs text-muted-foreground mt-1">Mark present/absent for each student</p>
            </div>
            <div className="flex gap-4 text-sm font-medium">
                <span className="flex items-center gap-1 text-green-600">
                    <UserCheck className="h-4 w-4" /> Present: {students.filter(s => s.status === "Present").length}
                </span>
                <span className="flex items-center gap-1 text-red-600">
                    <AlertCircle className="h-4 w-4" /> Absent: {students.filter(s => s.status === "Absent").length}
                </span>
            </div>
          </CardHeader>
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="pl-6">Roll No</TableHead>
                  <TableHead>Student Name</TableHead>
                  <TableHead>Current Status</TableHead>
                  <TableHead className="text-right pr-6">Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {students.map((student) => (
                  <TableRow key={student.id}>
                    <TableCell className="pl-6 font-mono text-xs">{student.rollNo}</TableCell>
                    <TableCell className="font-medium">{student.name}</TableCell>
                    <TableCell>
                      <Badge className={
                        student.status === "Present" 
                          ? "bg-green-100 text-green-700 border-green-200" 
                          : "bg-red-100 text-red-700 border-red-200"
                      }>
                        {student.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right pr-6">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => toggleStatus(student.id)}
                        className={student.status === "Present" ? "hover:bg-red-50 hover:text-red-600" : "hover:bg-green-50 hover:text-green-600"}
                      >
                        {student.status === "Present" ? <X className="h-4 w-4 mr-1" /> : <Check className="h-4 w-4 mr-1" />}
                        Mark as {student.status === "Present" ? "Absent" : "Present"}
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            <div className="p-4 bg-muted/10 border-t flex justify-end">
                <Button onClick={handleSave} className="bg-blue-600 hover:bg-blue-700">
                    Save Attendance Records
                </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
