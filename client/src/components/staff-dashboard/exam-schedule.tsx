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

import { Exam } from "@/app/actions/exams/types"

export function ExamSchedule({ exams = [] }: { exams?: Exam[] }) {
  if (exams.length === 0) {
    return (
      <div className="p-8 rounded-xl border-2 border-dashed flex flex-col items-center justify-center text-center text-muted-foreground">
        <Calendar className="h-10 w-10 mb-2 opacity-20" />
        <p>No exams scheduled yet.</p>
      </div>
    )
  }

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
          {exams.map((schedule) => (
            <TableRow key={schedule.id} className="hover:bg-muted/10 transition-colors">
              <TableCell className="pl-6 font-semibold">{schedule.name} ({schedule.code})</TableCell>
              <TableCell>
                <div className="flex items-center gap-2 text-sm">
                  <Calendar className="h-4 w-4 text-blue-500" />
                  {new Date(schedule.date).toLocaleDateString()}
                </div>
              </TableCell>
              <TableCell>
                <div className="flex items-center gap-2 text-sm">
                  <Clock className="h-4 w-4 text-orange-500" />
                  {new Date(schedule.startTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} -
                  {new Date(schedule.endTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </div>
              </TableCell>
              <TableCell>
                <div className="flex items-center gap-2 text-sm">
                  <MapPin className="h-4 w-4 text-red-500" />
                  {schedule.room}
                </div>
              </TableCell>
              <TableCell>
                <Badge variant="outline" className="font-normal capitalize">{schedule.type.toLowerCase()}</Badge>
              </TableCell>
              <TableCell className="text-right pr-6">
                <Badge className={
                  schedule.status === 'SCHEDULED' ? 'bg-blue-100 text-blue-700' :
                    schedule.status === 'COMPLETED' ? 'bg-green-100 text-green-700' :
                      'bg-red-100 text-red-700'
                }>
                  {schedule.status}
                </Badge>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}
