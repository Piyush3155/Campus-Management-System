"use client"

import * as React from "react"
import {
  CalendarDays,
  FileBadge,
  CheckCircle,
  Clock,
  BarChart3,
  Search,
  Plus,
  MoreVertical,
  Download,
  Upload
} from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ResponsiveContainer
} from 'recharts';

const examSchedule = [
    { id: 1, name: "Data Structures Final", code: "CS102", type: "Final", date: "2024-12-25", time: "10:00 AM - 01:00 PM", room: "Hall A", status: "Scheduled" },
    { id: 2, name: "Calculus I Midterm", code: "MAT101", type: "Internal", date: "2024-12-20", time: "02:00 PM - 03:30 PM", room: "Room 101", status: "Completed" },
    { id: 3, name: "Physics Lab Exam", code: "PHY101", type: "Practical", date: "2024-12-18", time: "09:00 AM - 12:00 PM", room: "Lab 3", status: "Completed" },
]

const resultData = [
    { id: 1, subject: "Mathematics I", code: "MAT101", totalStudents: 60, passed: 55, failed: 5, avgGrade: "B+", published: true },
    { id: 2, subject: "Physics", code: "PHY101", totalStudents: 58, passed: 50, failed: 8, avgGrade: "B", published: false },
    { id: 3, subject: "Computer Science", code: "CS101", totalStudents: 60, passed: 58, failed: 2, avgGrade: "A-", published: true },
]

const gradeDistribution = [
    { grade: 'A+', count: 12 },
    { grade: 'A', count: 18 },
    { grade: 'B+', count: 25 },
    { grade: 'B', count: 20 },
    { grade: 'C+', count: 15 },
    { grade: 'C', count: 8 },
    { grade: 'F', count: 5 },
];

export default function ExamsPage() {
  return (
    <div className="flex flex-col gap-6 p-6">
      <div className="flex items-center justify-between">
        <div>
           <h1 className="text-2xl font-bold tracking-tight">Exams & Results</h1>
           <p className="text-muted-foreground">Manage examination schedules, grades, and result publication.</p>
        </div>
        <div className="flex items-center gap-2">
            <Button variant="outline">
                <Download className="mr-2 h-4 w-4" /> Export Report
            </Button>
            <Button>
                <Plus className="mr-2 h-4 w-4" /> Schedule Exam
            </Button>
        </div>
      </div>

       <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Upcoming Exams</CardTitle>
            <CalendarDays className="h-4 w-4 text-blue-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">8</div>
            <p className="text-xs text-muted-foreground">Next 7 days</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Results Pending</CardTitle>
            <Clock className="h-4 w-4 text-orange-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">3</div>
            <p className="text-xs text-muted-foreground">Batches awaiting grades</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Published Results</CardTitle>
            <CheckCircle className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12</div>
            <p className="text-xs text-muted-foreground">This semester</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg Performance</CardTitle>
            <BarChart3 className="h-4 w-4 text-violet-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">3.2 GPA</div>
            <p className="text-xs text-muted-foreground">+0.2 from last term</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="schedule" className="space-y-4">
        <TabsList>
            <TabsTrigger value="schedule">Exam Schedule</TabsTrigger>
            <TabsTrigger value="results">Result Overview</TabsTrigger>
            <TabsTrigger value="analysis">Grade Analysis</TabsTrigger>
        </TabsList>

        <TabsContent value="schedule" className="space-y-4">
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                    <Select defaultValue="all">
                         <SelectTrigger className="w-[150px]">
                            <SelectValue placeholder="Exam Type" />
                         </SelectTrigger>
                         <SelectContent>
                             <SelectItem value="all">All Types</SelectItem>
                             <SelectItem value="final">Final</SelectItem>
                             <SelectItem value="internal">Internal</SelectItem>
                         </SelectContent>
                    </Select>
                </div>
            </div>
            <Card>
                <CardContent className="p-0">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Exam Name</TableHead>
                                <TableHead>Code</TableHead>
                                <TableHead>Type</TableHead>
                                <TableHead>Date & Time</TableHead>
                                <TableHead>Room</TableHead>
                                <TableHead>Status</TableHead>
                                <TableHead className="text-right">Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {examSchedule.map(exam => (
                                <TableRow key={exam.id}>
                                    <TableCell className="font-medium">{exam.name}</TableCell>
                                    <TableCell>{exam.code}</TableCell>
                                    <TableCell>
                                        <Badge variant="outline">{exam.type}</Badge>
                                    </TableCell>
                                    <TableCell>
                                        <div>{exam.date}</div>
                                        <div className="text-xs text-muted-foreground">{exam.time}</div>
                                    </TableCell>
                                    <TableCell>{exam.room}</TableCell>
                                    <TableCell>
                                         <Badge variant={exam.status === "Scheduled" ? "default" : "secondary"}>{exam.status}</Badge>
                                    </TableCell>
                                    <TableCell className="text-right">
                                         <Button variant="ghost" size="icon"><MoreVertical className="h-4 w-4" /></Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
        </TabsContent>

        <TabsContent value="results" className="space-y-4">
            <Card>
                <CardHeader>
                    <CardTitle>Result Publication</CardTitle>
                    <CardDescription>Manage visibility of exam results for students.</CardDescription>
                </CardHeader>
                <CardContent className="p-0">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Subject</TableHead>
                                <TableHead>Code</TableHead>
                                <TableHead>Performance (Pass/Fail)</TableHead>
                                <TableHead>Avg Grade</TableHead>
                                <TableHead>Publish Status</TableHead>
                                <TableHead className="text-right">Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {resultData.map(result => (
                                <TableRow key={result.id}>
                                    <TableCell className="font-medium">{result.subject}</TableCell>
                                    <TableCell>{result.code}</TableCell>
                                    <TableCell>
                                        <div className="flex items-center gap-2">
                                            <span className="text-green-600 font-bold">{result.passed}</span>
                                            <span>/</span>
                                            <span className="text-red-600 font-bold">{result.failed}</span>
                                        </div>
                                    </TableCell>
                                    <TableCell>{result.avgGrade}</TableCell>
                                    <TableCell>
                                        <div className="flex items-center space-x-2">
                                            <Switch id={`publish-${result.id}`} checked={result.published} />
                                            <Label htmlFor={`publish-${result.id}`}>{result.published ? "Published" : "Draft"}</Label>
                                        </div>
                                    </TableCell>
                                    <TableCell className="text-right">
                                        <Button variant="outline" size="sm">View Details</Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
        </TabsContent>

        <TabsContent value="analysis" className="space-y-4">
             <Card>
                 <CardHeader>
                     <CardTitle>Grade Distribution</CardTitle>
                     <CardDescription>Overall student performance across all subjects.</CardDescription>
                 </CardHeader>
                 <CardContent>
                     <div className="h-[400px] w-full">
                         <ResponsiveContainer width="100%" height="100%">
                             <BarChart data={gradeDistribution}>
                                 <CartesianGrid strokeDasharray="3 3" />
                                 <XAxis dataKey="grade" />
                                 <YAxis />
                                 <Tooltip />
                                 <Legend />
                                 <Bar dataKey="count" fill="#3b82f6" name="Student Count" radius={[4, 4, 0, 0]} />
                             </BarChart>
                         </ResponsiveContainer>
                     </div>
                 </CardContent>
             </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
