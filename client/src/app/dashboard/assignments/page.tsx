"use client"

import * as React from "react"
import {
  FileText,
  CheckCircle2,
  Clock,
  AlertCircle,
  BarChart3,
  Search,
  Filter,
  MoreVertical,
  Plus,
  Users
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
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

// Mock Data
const assignmentStats = {
    total: 124,
    active: 12,
    pendingReview: 45,
    completionRate: 88
}

const assignments = [
    {
        id: "ASG-001",
        title: "Data Structures Project",
        subject: "CS102",
        faculty: "Dr. Sarah Wilson",
        dueDate: "2024-12-25",
        totalStudents: 60,
        submitted: 45,
        status: "Active",
        type: "Project"
    },
    {
        id: "ASG-002",
        title: "Calculus I - Midterm Assignment",
        subject: "MAT101",
        faculty: "Prof. James Carter",
        dueDate: "2024-12-20",
        totalStudents: 55,
        submitted: 50,
        status: "Grading",
        type: "Assignment"
    },
    {
        id: "ASG-003",
        title: "Physics Lab Report - Optics",
        subject: "PHY101",
        faculty: "Emily Chen",
        dueDate: "2024-12-18",
        totalStudents: 40,
        submitted: 38,
        status: "Completed",
        type: "Lab Report"
    }
]

const recentSubmissions = [
    { id: 1, student: "Alice Smith", subject: "CS102", assignment: "Data Structures Project", date: "2 hrs ago", status: "Submitted" },
    { id: 2, student: "Bob Jones", subject: "MAT101", assignment: "Calculus I", date: "5 hrs ago", status: "Late" },
    { id: 3, student: "Charlie Brown", subject: "PHY101", assignment: "Optics Lab", date: "1 day ago", status: "Submitted" },
]

export default function AssignmentsPage() {
  return (
    <div className="flex flex-col gap-6 p-6">
      <div className="flex items-center justify-between">
        <div>
           <h1 className="text-2xl font-bold tracking-tight">Assignments & Monitoring</h1>
           <p className="text-muted-foreground">Track assignment submissions, grading status, and faculty workloads.</p>
        </div>
        <div className="flex items-center gap-2">
            <Button>
                <Plus className="mr-2 h-4 w-4" /> Create Assignment
            </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending Submissions</CardTitle>
            <Clock className="h-4 w-4 text-orange-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{assignmentStats.pendingReview}</div>
            <p className="text-xs text-muted-foreground">Waiting for review</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Assignments</CardTitle>
            <FileText className="h-4 w-4 text-blue-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{assignmentStats.active}</div>
            <p className="text-xs text-muted-foreground">Currently open for students</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Completion Rate</CardTitle>
            <BarChart3 className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{assignmentStats.completionRate}%</div>
            <p className="text-xs text-muted-foreground">Average across all subjects</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Created</CardTitle>
            <CheckCircle2 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{assignmentStats.total}</div>
            <p className="text-xs text-muted-foreground">This semester</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="faculty">Faculty Workload</TabsTrigger>
            <TabsTrigger value="submissions">Submissions</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
             <div className="flex items-center gap-4 mb-4">
                <div className="relative flex-1">
                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                        type="search"
                        placeholder="Search assignments..."
                        className="pl-8 sm:w-[300px] md:w-[200px] lg:w-[300px]"
                    />
                </div>
                <Select defaultValue="active">
                    <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Filter by Status" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="all">All</SelectItem>
                        <SelectItem value="active">Active</SelectItem>
                        <SelectItem value="grading">Grading</SelectItem>
                        <SelectItem value="completed">Completed</SelectItem>
                    </SelectContent>
                </Select>
            </div>

            <Card>
                <CardContent className="p-0">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Assignment Name</TableHead>
                                <TableHead>Faculty</TableHead>
                                <TableHead>Due Date</TableHead>
                                <TableHead>Submission Status</TableHead>
                                <TableHead>Status</TableHead>
                                <TableHead className="text-right">Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {assignments.map(assign => (
                                <TableRow key={assign.id}>
                                    <TableCell className="font-medium">
                                        <div>{assign.title}</div>
                                        <div className="text-xs text-muted-foreground">{assign.subject} • {assign.type}</div>
                                    </TableCell>
                                    <TableCell>{assign.faculty}</TableCell>
                                    <TableCell>{assign.dueDate}</TableCell>
                                    <TableCell className="w-[200px]">
                                        <div className="flex items-center justify-between text-xs mb-1">
                                            <span>{assign.submitted}/{assign.totalStudents}</span>
                                            <span className="text-muted-foreground">{Math.round((assign.submitted/assign.totalStudents)*100)}%</span>
                                        </div>
                                        <Progress value={(assign.submitted/assign.totalStudents)*100} className="h-2" />
                                    </TableCell>
                                    <TableCell>
                                        <Badge variant={assign.status === "Active" ? "default" : (assign.status === "Grading" ? "secondary" : "outline")}>
                                            {assign.status}
                                        </Badge>
                                    </TableCell>
                                    <TableCell className="text-right">
                                        <Button variant="ghost" size="icon">
                                            <MoreVertical className="h-4 w-4" />
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
        </TabsContent>

        <TabsContent value="faculty" className="space-y-4">
             <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                 {[
                     { name: "Dr. Sarah Wilson", dept: "Computer Science", active: 3, graded: 15 },
                     { name: "Prof. James Carter", dept: "Mathematics", active: 2, graded: 10 },
                     { name: "Emily Chen", dept: "Physics", active: 1, graded: 8 },
                 ].map((fac, i) => (
                    <Card key={i}>
                        <CardHeader className="flex flex-row items-center gap-4 pb-2">
                            <Avatar>
                                <AvatarFallback>{fac.name.split(' ').map(n=>n[0]).join('')}</AvatarFallback>
                            </Avatar>
                            <div>
                                <CardTitle className="text-base">{fac.name}</CardTitle>
                                <CardDescription>{fac.dept}</CardDescription>
                            </div>
                        </CardHeader>
                        <CardContent>
                            <div className="grid grid-cols-2 gap-4 text-center mt-2">
                                <div className="space-y-1">
                                    <p className="text-2xl font-bold">{fac.active}</p>
                                    <p className="text-xs text-muted-foreground">Active</p>
                                </div>
                                <div className="space-y-1">
                                    <p className="text-2xl font-bold">{fac.graded}</p>
                                    <p className="text-xs text-muted-foreground">Graded</p>
                                </div>
                            </div>
                            <Button variant="outline" className="w-full mt-4">View All Assignments</Button>
                        </CardContent>
                    </Card>
                 ))}
             </div>
        </TabsContent>

        <TabsContent value="submissions" className="space-y-4">
            <Card>
                <CardHeader>
                    <CardTitle>Recent Submissions</CardTitle>
                    <CardDescription>Real-time feed of student submissions.</CardDescription>
                </CardHeader>
                <CardContent className="p-0">
                     <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Student</TableHead>
                                <TableHead>Assignment</TableHead>
                                <TableHead>Submitted</TableHead>
                                <TableHead>Status</TableHead>
                                <TableHead className="text-right">Action</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {recentSubmissions.map(sub => (
                                <TableRow key={sub.id}>
                                    <TableCell className="font-medium">{sub.student}</TableCell>
                                    <TableCell>
                                        <div>{sub.assignment}</div>
                                        <div className="text-xs text-muted-foreground">{sub.subject}</div>
                                    </TableCell>
                                    <TableCell>{sub.date}</TableCell>
                                    <TableCell>
                                         <Badge variant={sub.status === "Late" ? "destructive" : "secondary"}>
                                            {sub.status}
                                        </Badge>
                                    </TableCell>
                                    <TableCell className="text-right">
                                        <Button size="sm" variant="outline">Grade</Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                     </Table>
                </CardContent>
            </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
