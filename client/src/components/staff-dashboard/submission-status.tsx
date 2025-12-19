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
import { FileText, Download, CheckCircle, Clock } from "lucide-react"

const submissions = [
  { id: "SUB001", student: "Alice Johnson", rollNo: "2023CS01", date: "2023-11-04 10:30 AM", status: "Graded", grade: "A+" },
  { id: "SUB002", student: "Bob Smith", rollNo: "2023CS02", date: "2023-11-04 02:15 PM", status: "Submitted", grade: "-" },
  { id: "SUB003", student: "David Wilson", rollNo: "2023CS04", date: "2023-11-05 09:00 AM", status: "Submitted", grade: "-" },
  { id: "SUB004", student: "Eve Davis", rollNo: "2023CS05", date: "2023-11-05 11:45 PM", status: "Late Submission", grade: "-" },
]

export function SubmissionStatus() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
            <h2 className="text-xl font-bold">Calculus Problem Set 1 - Submissions</h2>
            <p className="text-sm text-muted-foreground">Class: Mathematics Sec A | Due: Nov 05, 2023</p>
        </div>
        <Button variant="outline" className="flex gap-2">
            <Download className="h-4 w-4" /> Download All (.zip)
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-4">
        {[
            { label: "Total Students", value: "45", icon: FileText, color: "text-blue-500" },
            { label: "Submitted", value: "42", icon: CheckCircle, color: "text-green-500" },
            { label: "Pending", value: "3", icon: Clock, color: "text-orange-500" },
            { label: "Avg. Grade", value: "B+", icon: FileText, color: "text-purple-500" },
        ].map((s, i) => (
            <Card key={i} className="bg-card/30 backdrop-blur-sm border-none shadow-sm">
                <CardContent className="p-4 flex items-center justify-between">
                    <div>
                        <p className="text-[10px] font-medium text-muted-foreground uppercase">{s.label}</p>
                        <p className="text-xl font-bold">{s.value}</p>
                    </div>
                    <s.icon className={`h-8 w-8 ${s.color} opacity-20`} />
                </CardContent>
            </Card>
        ))}
      </div>

      <div className="rounded-md border bg-card/50 overflow-hidden">
        <Table>
          <TableHeader className="bg-muted/30">
            <TableRow>
              <TableHead className="pl-6">Student</TableHead>
              <TableHead>Roll No</TableHead>
              <TableHead>Submission Date</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Grade</TableHead>
              <TableHead className="text-right pr-6">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {submissions.map((sub) => (
              <TableRow key={sub.id} className="hover:bg-muted/10">
                <TableCell className="pl-6 font-medium">{sub.student}</TableCell>
                <TableCell className="font-mono text-xs text-muted-foreground">{sub.rollNo}</TableCell>
                <TableCell className="text-sm">{sub.date}</TableCell>
                <TableCell>
                  <Badge className={
                    sub.status === "Graded" ? "bg-green-100 text-green-700 border-none" :
                    sub.status === "Submitted" ? "bg-blue-100 text-blue-700 border-none" :
                    "bg-orange-100 text-orange-700 border-none"
                  }>
                    {sub.status}
                  </Badge>
                </TableCell>
                <TableCell className="font-bold">{sub.grade}</TableCell>
                <TableCell className="text-right pr-6">
                  <Button variant="ghost" size="sm" className="text-blue-600 hover:text-blue-700">Evaluate</Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}
