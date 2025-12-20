"use client"

import * as React from "react"
import {
  TrendingUp,
  Users,
  GraduationCap,
  CalendarDays,
  Download} from "lucide-react"

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
    ResponsiveContainer,
    LineChart,
    Line,
    PieChart,
    Pie,
    Cell
} from 'recharts';

// --- Mock Data ---

const studentAttendanceData = [
    { month: 'Jan', present: 85, absent: 15 },
    { month: 'Feb', present: 88, absent: 12 },
    { month: 'Mar', present: 92, absent: 8 },
    { month: 'Apr', present: 80, absent: 20 },
    { month: 'May', present: 85, absent: 15 },
    { month: 'Jun', present: 90, absent: 10 },
];

const departmentPerformanceData = [
    { name: 'CS', score: 85 },
    { name: 'Math', score: 78 },
    { name: 'Physics', score: 82 },
    { name: 'Bio', score: 75 },
    { name: 'Eng', score: 88 },
];

const passRateData = [
    { name: 'Passed', value: 850 },
    { name: 'Failed', value: 150 },
];

const COLORS = ['#22c55e', '#ef4444'];

const staffActivityData = [
    { day: 'Mon', active: 45 },
    { day: 'Tue', active: 48 },
    { day: 'Wed', active: 50 },
    { day: 'Thu', active: 47 },
    { day: 'Fri', active: 42 },
];


export default function ReportsPage() {
    const [year, setYear] = React.useState("2024");

  return (
    <div className="flex flex-col gap-6 p-6">
      <div className="flex items-center justify-between">
        <div>
           <h1 className="text-2xl font-bold tracking-tight">Reports & Analytics</h1>
           <p className="text-muted-foreground">Comprehensive insights into campus performance and metrics.</p>
        </div>
        <div className="flex items-center gap-2">
             <Select value={year} onValueChange={setYear}>
                <SelectTrigger className="w-[120px]">
                    <SelectValue placeholder="Year" />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="2024">2024</SelectItem>
                    <SelectItem value="2023">2023</SelectItem>
                </SelectContent>
            </Select>
            <Button variant="outline">
                <Download className="mr-2 h-4 w-4" /> Export All
            </Button>
        </div>
      </div>

       <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Students</CardTitle>
            <Users className="h-4 w-4 text-blue-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1,240</div>
            <p className="text-xs text-muted-foreground">+5% vs last year</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg Attendance</CardTitle>
            <CalendarDays className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">87%</div>
            <p className="text-xs text-muted-foreground">Across all depts</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pass Rate</CardTitle>
            <GraduationCap className="h-4 w-4 text-violet-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">92%</div>
            <p className="text-xs text-muted-foreground">+2% improvement</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Department Perf.</CardTitle>
            <TrendingUp className="h-4 w-4 text-orange-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">CS Top</div>
            <p className="text-xs text-muted-foreground">Highest avg GPA</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="students">Students</TabsTrigger>
            <TabsTrigger value="staff">Staff</TabsTrigger>
            <TabsTrigger value="academic">Academic</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
                <Card className="col-span-4">
                    <CardHeader>
                        <CardTitle>Result Analysis (Pass vs Fail)</CardTitle>
                    </CardHeader>
                    <CardContent className="pl-2">
                        <div className="h-[300px]">
                            <ResponsiveContainer width="100%" height="100%">
                                <PieChart>
                                    <Pie
                                        data={passRateData}
                                        cx="50%"
                                        cy="50%"
                                        innerRadius={60}
                                        outerRadius={80}
                                        fill="#8884d8"
                                        paddingAngle={5}
                                        dataKey="value"
                                    >
                                        {passRateData.map((entry, index) => (
                                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                        ))}
                                    </Pie>
                                    <Tooltip />
                                    <Legend />
                                </PieChart>
                            </ResponsiveContainer>
                        </div>
                    </CardContent>
                </Card>
                <Card className="col-span-3">
                    <CardHeader>
                        <CardTitle>Department Performance</CardTitle>
                        <CardDescription>Average score per department</CardDescription>
                    </CardHeader>
                    <CardContent>
                         <div className="h-[300px]">
                            <ResponsiveContainer width="100%" height="100%">
                                <BarChart layout="vertical" data={departmentPerformanceData}>
                                    <CartesianGrid strokeDasharray="3 3" />
                                    <XAxis type="number" />
                                    <YAxis dataKey="name" type="category" width={50} />
                                    <Tooltip />
                                    <Bar dataKey="score" fill="#3b82f6" radius={[0, 4, 4, 0]} />
                                </BarChart>
                            </ResponsiveContainer>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </TabsContent>

        <TabsContent value="students" className="space-y-4">
            <Card>
                <CardHeader>
                    <CardTitle>Student Attendance Trends</CardTitle>
                    <CardDescription>Monthly average attendance percentage.</CardDescription>
                </CardHeader>
                <CardContent>
                     <div className="h-[350px]">
                        <ResponsiveContainer width="100%" height="100%">
                            <LineChart data={studentAttendanceData}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="month" />
                                <YAxis />
                                <Tooltip />
                                <Legend />
                                <Line type="monotone" dataKey="present" stroke="#22c55e" strokeWidth={2} name="Present %" />
                                <Line type="monotone" dataKey="absent" stroke="#ef4444" strokeWidth={2} name="Absent %" />
                            </LineChart>
                        </ResponsiveContainer>
                    </div>
                </CardContent>
            </Card>
        </TabsContent>
        
        <TabsContent value="staff" className="space-y-4">
            <Card>
                <CardHeader>
                     <CardTitle>Daily Staff Activity</CardTitle>
                     <CardDescription>Active staff members on campus over the week.</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="h-[350px]">
                        <ResponsiveContainer width="100%" height="100%">
                             <BarChart data={staffActivityData}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="day" />
                                <YAxis />
                                <Tooltip />
                                <Bar dataKey="active" fill="#8884d8" radius={[4, 4, 0, 0]} name="Active Staff" />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </CardContent>
            </Card>
        </TabsContent>

        <TabsContent value="academic" className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2">
                 <Card>
                    <CardHeader>
                        <CardTitle>Top Performing Classes</CardTitle>
                    </CardHeader>
                    <CardContent>
                         <div className="space-y-4">
                            {['BCA Sem 5', 'B.Tech CS Sem 3', 'BBA Sem 1'].map((cls, i) => (
                                <div key={i} className="flex items-center justify-between">
                                    <div className="flex items-center gap-2">
                                        <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center font-bold text-primary">
                                            {i + 1}
                                        </div>
                                        <span className="font-medium">{cls}</span>
                                    </div>
                                    <div className="font-bold text-muted-foreground">
                                        {95 - (i * 3)}% Avg
                                    </div>
                                </div>
                            ))}
                         </div>
                    </CardContent>
                 </Card>
                 <Card>
                    <CardHeader>
                        <CardTitle>Recent Assessments</CardTitle>
                    </CardHeader>
                    <CardContent>
                         <div className="space-y-4">
                             {['Math Midterm', 'Physics Lab', 'Java Quiz'].map((exam, i) => (
                                 <div key={i} className="flex items-center justify-between border-b last:border-0 pb-2 last:pb-0">
                                     <div>
                                         <p className="font-medium">{exam}</p>
                                         <p className="text-xs text-muted-foreground">Completed 2 days ago</p>
                                     </div>
                                     <Button variant="ghost" size="sm">View Report</Button>
                                 </div>
                             ))}
                         </div>
                    </CardContent>
                 </Card>
            </div>
        </TabsContent>
        
      </Tabs>
    </div>
  )
}
