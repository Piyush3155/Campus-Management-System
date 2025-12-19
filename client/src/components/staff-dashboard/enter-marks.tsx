import { useState } from "react"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Save, AlertTriangle, CheckCircle2 } from "lucide-react"

const studentsData = [
  { id: "STU001", name: "Alice Johnson", rollNo: "2023CS01", marks: "" },
  { id: "STU002", name: "Bob Smith", rollNo: "2023CS02", marks: "" },
  { id: "STU003", name: "Charlie Brown", rollNo: "2023CS03", marks: "" },
  { id: "STU004", name: "David Wilson", rollNo: "2023CS04", marks: "" },
]

export function EnterMarks() {
  const [selectedExam, setSelectedExam] = useState("")
  const [marks, setMarks] = useState(studentsData)

  const handleMarkChange = (id: string, value: string) => {
    setMarks(prev => prev.map(s => s.id === id ? { ...s, marks: value } : s))
  }

  return (
    <div className="space-y-6">
      <Card className="bg-card/50 backdrop-blur-sm shadow-md">
        <CardHeader>
          <CardTitle className="text-xl">Entry Configuration</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-wrap gap-4 items-end">
          <div className="space-y-2">
            <label className="text-sm font-medium text-muted-foreground">Select Exam</label>
            <Select onValueChange={setSelectedExam}>
              <SelectTrigger className="w-[250px]">
                <SelectValue placeholder="Chose examination..." />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="mid1">Mid-Term Assessment 1</SelectItem>
                <SelectItem value="mid2">Mid-Term Assessment 2</SelectItem>
                <SelectItem value="end">Final Semester Exam</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium text-muted-foreground">Max Marks</label>
            <Input type="number" value="100" readOnly className="w-[100px] bg-muted/50" />
          </div>
          <Button disabled={!selectedExam} className="bg-blue-600 hover:bg-blue-700">Fetch Student List</Button>
        </CardContent>
      </Card>

      {selectedExam && (
        <Card className="border-none shadow-xl overflow-hidden">
          <CardHeader className="bg-muted/30 border-b flex flex-row items-center justify-between">
            <div>
                <CardTitle>Direct Mark Entry</CardTitle>
                <p className="text-xs text-muted-foreground mt-1">Entering marks for {selectedExam === 'mid1' ? 'Mid-Term 1' : 'Final Semester'}</p>
            </div>
            <div className="flex gap-2">
                <Button variant="outline" size="sm" className="gap-2">
                    <AlertTriangle className="h-4 w-4 text-orange-500" />
                    Reset
                </Button>
                <Button size="sm" className="bg-green-600 hover:bg-green-700 gap-2">
                    <Save className="h-4 w-4" />
                    Save Draft
                </Button>
            </div>
          </CardHeader>
          <CardContent className="p-0">
            <Table>
              <TableHeader className="bg-muted/10">
                <TableRow>
                  <TableHead className="pl-6 w-[150px]">Roll No</TableHead>
                  <TableHead>Student Name</TableHead>
                  <TableHead className="w-[200px]">Marks Obtained</TableHead>
                  <TableHead className="text-right pr-6">Validation</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {marks.map((student) => (
                  <TableRow key={student.id}>
                    <TableCell className="pl-6 font-mono text-xs">{student.rollNo}</TableCell>
                    <TableCell className="font-medium">{student.name}</TableCell>
                    <TableCell>
                      <Input 
                        type="number" 
                        placeholder="0-100" 
                        value={student.marks}
                        onChange={(e) => handleMarkChange(student.id, e.target.value)}
                        className="h-8 focus-visible:ring-blue-500"
                      />
                    </TableCell>
                    <TableCell className="text-right pr-6">
                        {student.marks ? (
                             <span className="flex items-center justify-end gap-1 text-[10px] text-green-600">
                                <CheckCircle2 className="h-3 w-3" /> Valid
                             </span>
                        ) : (
                            <span className="text-[10px] text-muted-foreground italic lowercase">Pending entry</span>
                        )}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            <div className="p-4 bg-muted/5 border-t flex justify-end gap-3">
                <span className="text-sm text-muted-foreground py-2 italic font-serif">Note: Marks once submitted to registrar cannot be changed here.</span>
                <Button className="bg-blue-600 hover:bg-blue-700">Submit to Registrar</Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
