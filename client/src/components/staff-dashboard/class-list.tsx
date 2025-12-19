import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"

const classes = [
  {
    id: "CLS001",
    name: "Mathematics",
    section: "A",
    semester: "Semester 1",
    year: "1st Year",
    students: 45,
    room: "Room 101",
    schedule: "Mon, Wed, Fri",
  },
  {
    id: "CLS002",
    name: "Physics",
    section: "B",
    semester: "Semester 3",
    year: "2nd Year",
    students: 38,
    room: "Lab 204",
    schedule: "Tue, Thu",
  },
  {
    id: "CLS003",
    name: "Computer Science",
    section: "C",
    semester: "Semester 1",
    year: "1st Year",
    students: 52,
    room: "Server Lab",
    schedule: "Mon, Thu",
  },
]

export function ClassList() {
  return (
    <div className="rounded-md border bg-card">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Class Name</TableHead>
            <TableHead>Section</TableHead>
            <TableHead>Semester / Year</TableHead>
            <TableHead>Students</TableHead>
            <TableHead>Room</TableHead>
            <TableHead>Schedule</TableHead>
            <TableHead>Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {classes.map((cls) => (
            <TableRow key={cls.id} className="hover:bg-muted/50 transition-colors">
              <TableCell className="font-medium">{cls.name}</TableCell>
              <TableCell>
                <Badge variant="outline">{cls.section}</Badge>
              </TableCell>
              <TableCell>
                <div className="flex flex-col">
                  <span className="text-sm font-medium">{cls.semester}</span>
                  <span className="text-xs text-muted-foreground">{cls.year}</span>
                </div>
              </TableCell>
              <TableCell>{cls.students}</TableCell>
              <TableCell>{cls.room}</TableCell>
              <TableCell>{cls.schedule}</TableCell>
              <TableCell>
                <Badge className="bg-green-100 text-green-700 hover:bg-green-200 border-none">Active</Badge>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}
