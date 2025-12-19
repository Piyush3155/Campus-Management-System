import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Calendar, Clock, MapPin, BookOpen } from "lucide-react"

const schedules = [
  { id: 1, subject: "Mathematics (MT101)", date: "2023-12-15", time: "10:00 AM - 01:00 PM", room: "Hall A", type: "Semester End" },
  { id: 2, subject: "Physics (PH202)", date: "2023-12-18", time: "02:00 PM - 05:00 PM", room: "Hall B", type: "Semester End" },
  { id: 3, subject: "Computer Science (CS303)", date: "2023-12-20", time: "10:00 AM - 01:00 PM", room: "Lab 1", type: "Practical" },
]

export function ExamSchedule() {
  return (
    <div className="rounded-xl border bg-card/50 backdrop-blur-sm overflow-hidden">
      <Table>
        <TableHeader className="bg-muted/30">
          <TableRow>
            <TableHead className="pl-6">Subject</TableHead>
            <TableHead>Date</TableHead>
            <TableHead>Time</TableHead>
            <TableHead>Location</TableHead>
            <TableHead>Exam Type</TableHead>
            <TableHead className="text-right pr-6">Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {schedules.map((schedule) => (
            <TableRow key={schedule.id} className="hover:bg-muted/10 transition-colors">
              <TableCell className="pl-6 font-semibold">{schedule.subject}</TableCell>
              <TableCell>
                <div className="flex items-center gap-2 text-sm">
                    <Calendar className="h-4 w-4 text-blue-500" />
                    {schedule.date}
                </div>
              </TableCell>
              <TableCell>
                <div className="flex items-center gap-2 text-sm">
                    <Clock className="h-4 w-4 text-orange-500" />
                    {schedule.time}
                </div>
              </TableCell>
              <TableCell>
                <div className="flex items-center gap-2 text-sm">
                    <MapPin className="h-4 w-4 text-red-500" />
                    {schedule.room}
                </div>
              </TableCell>
              <TableCell>
                <Badge variant="outline" className="font-normal capitalize">{schedule.type}</Badge>
              </TableCell>
              <TableCell className="text-right pr-6">
                <Badge className="bg-blue-100 text-blue-700 border-none">Upcoming</Badge>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}
