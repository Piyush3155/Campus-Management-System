"use client"

import * as React from "react"
import {
  Search,
  Filter,
  Users,
  GraduationCap,
  ArrowRight,
  MoreHorizontal,
  Plus
} from "lucide-react"
import Link from "next/link"

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
} from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Checkbox } from "@/components/ui/checkbox"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"

const studentsData = [
  {
    id: "STD24001",
    name: "Alex Johnson",
    course: "BCA",
    semester: "Sem 1",
    section: "A",
    status: "Active",
    cgpa: "3.8",
    image: "/avatars/s1.png"
  },
  {
    id: "STD24002",
    name: "Maria Garcia",
    course: "BCA",
    semester: "Sem 1",
    section: "A",
    status: "Active",
    cgpa: "3.9",
    image: "/avatars/s2.png"
  },
  {
    id: "STD24003",
    name: "Liam Smith",
    course: "BCA",
    semester: "Sem 1",
    section: "B",
    status: "Probation",
    cgpa: "2.4",
    image: "/avatars/s3.png"
  },
   {
    id: "STD23055",
    name: "Emma Wilson",
    course: "BCA",
    semester: "Sem 3",
    section: "A",
    status: "Active",
    cgpa: "3.5",
    image: "/avatars/s4.png"
  },
]

export default function StudentsPage() {
  const [selectedStudents, setSelectedStudents] = React.useState<string[]>([])

  const toggleStudent = (id: string) => {
    setSelectedStudents(prev => 
        prev.includes(id) ? prev.filter(s => s !== id) : [...prev, id]
    )
  }

  const toggleAll = () => {
      if (selectedStudents.length === studentsData.length) {
          setSelectedStudents([])
      } else {
          setSelectedStudents(studentsData.map(s => s.id))
      }
  }

  // Filter for promotion (mock)
  const promotionCandidates = studentsData.filter(s => s.semester === "Sem 1")

  return (
    <div className="flex flex-col gap-6 p-6">
      <div className="flex items-center justify-between">
        <div>
           <h1 className="text-2xl font-bold tracking-tight">Student Management</h1>
           <p className="text-muted-foreground">Directory, admissions, and academic records.</p>
        </div>
        <div className="flex items-center gap-2">
            <Button variant="outline">
                <Filter className="mr-2 h-4 w-4" /> Filter
            </Button>
            <Button>
                <Plus className="mr-2 h-4 w-4" /> Add Student
            </Button>
        </div>
      </div>

       <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Total Students
            </CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1,240</div>
            <p className="text-xs text-muted-foreground">
              +5% from last year
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Active Batches
            </CardTitle>
            <GraduationCap className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">18</div>
            <p className="text-xs text-muted-foreground">
              Across 5 courses
            </p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="list" className="space-y-4">
        <TabsList>
            <TabsTrigger value="list">Student Directory</TabsTrigger>
            <TabsTrigger value="promotion">Promotion & Batching</TabsTrigger>
        </TabsList>

        <TabsContent value="list" className="space-y-4">
            <div className="flex items-center gap-4">
                <div className="relative flex-1">
                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                        type="search"
                        placeholder="Search by name or ID..."
                        className="pl-8 sm:w-[300px] md:w-[200px] lg:w-[300px]"
                    />
                </div>
                <Select defaultValue="all">
                    <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="All Courses" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="all">All Courses</SelectItem>
                        <SelectItem value="bca">BCA</SelectItem>
                        <SelectItem value="bba">BBA</SelectItem>
                    </SelectContent>
                </Select>
            </div>
            <Card>
                <CardContent className="p-0">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead className="w-[80px]">Image</TableHead>
                                <TableHead>Name & ID</TableHead>
                                <TableHead>Course</TableHead>
                                <TableHead>Semester</TableHead>
                                <TableHead>Section</TableHead>
                                <TableHead>Status</TableHead>
                                <TableHead>CGPA</TableHead>
                                <TableHead className="text-right">Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {studentsData.map((student) => (
                                <TableRow key={student.id}>
                                    <TableCell>
                                        <Avatar className="h-9 w-9">
                                            <AvatarImage src={student.image} alt={student.name} />
                                            <AvatarFallback>{student.name.split(' ').map(n=>n[0]).join('')}</AvatarFallback>
                                        </Avatar>
                                    </TableCell>
                                    <TableCell className="font-medium">
                                        <div className="flex flex-col">
                                            <span>{student.name}</span>
                                            <span className="text-xs text-muted-foreground">{student.id}</span>
                                        </div>
                                    </TableCell>
                                    <TableCell>{student.course}</TableCell>
                                    <TableCell>{student.semester}</TableCell>
                                    <TableCell>{student.section}</TableCell>
                                    <TableCell>
                                        <Badge variant={student.status === "Active" ? "default" : "destructive"}>
                                            {student.status}
                                        </Badge>
                                    </TableCell>
                                    <TableCell>{student.cgpa}</TableCell>
                                    <TableCell className="text-right">
                                        <DropdownMenu>
                                            <DropdownMenuTrigger asChild>
                                                <Button variant="ghost" className="h-8 w-8 p-0">
                                                    <span className="sr-only">Open menu</span>
                                                    <MoreHorizontal className="h-4 w-4" />
                                                </Button>
                                            </DropdownMenuTrigger>
                                            <DropdownMenuContent align="end">
                                                <DropdownMenuLabel>Actions</DropdownMenuLabel>
                                                <DropdownMenuItem asChild>
                                                    <Link href={`/admin-dashboard/students/${student.id}`}>View Profile</Link>
                                                </DropdownMenuItem>
                                                <DropdownMenuItem>Edit Details</DropdownMenuItem>
                                                <DropdownMenuSeparator />
                                                <DropdownMenuItem>Academic Record</DropdownMenuItem>
                                            </DropdownMenuContent>
                                        </DropdownMenu>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
        </TabsContent>

        <TabsContent value="promotion" className="space-y-4">
             <Card>
                 <CardHeader>
                     <CardTitle>Batch Promotion</CardTitle>
                     <CardDescription>Promote students to the next semester in bulk.</CardDescription>
                 </CardHeader>
                 <CardContent className="space-y-6">
                     <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-end">
                         <div className="grid gap-4 border p-4 rounded-md">
                             <h3 className="font-semibold text-sm text-muted-foreground mb-2">Promote From</h3>
                             <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                     <Label>Course</Label>
                                     <Select defaultValue="bca">
                                         <SelectTrigger><SelectValue /></SelectTrigger>
                                         <SelectContent>
                                             <SelectItem value="bca">BCA</SelectItem>
                                         </SelectContent>
                                     </Select>
                                </div>
                                <div className="space-y-2">
                                     <Label>Current Semester</Label>
                                      <Select defaultValue="sem1">
                                         <SelectTrigger><SelectValue /></SelectTrigger>
                                         <SelectContent>
                                             <SelectItem value="sem1">Semester 1</SelectItem>
                                         </SelectContent>
                                     </Select>
                                </div>
                             </div>
                         </div>
                         
                         <div className="flex items-center justify-center p-2">
                             <ArrowRight className="h-6 w-6 text-muted-foreground" />
                         </div>

                         <div className="grid gap-4 border p-4 rounded-md">
                             <h3 className="font-semibold text-sm text-muted-foreground mb-2">Promote To</h3>
                             <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                     <Label>Target Semester</Label>
                                      <Select defaultValue="sem2">
                                         <SelectTrigger><SelectValue /></SelectTrigger>
                                         <SelectContent>
                                             <SelectItem value="sem2">Semester 2</SelectItem>
                                         </SelectContent>
                                     </Select>
                                </div>
                                <div className="space-y-2">
                                     <Label>New Section (Optional)</Label>
                                      <Select>
                                         <SelectTrigger><SelectValue placeholder="Keep Same" /></SelectTrigger>
                                         <SelectContent>
                                             <SelectItem value="a">Section A</SelectItem>
                                             <SelectItem value="b">Section B</SelectItem>
                                         </SelectContent>
                                     </Select>
                                </div>
                             </div>
                         </div>
                     </div>

                     <Separator />

                     <div>
                        <h3 className="text-lg font-medium mb-4">Eligible Candidates ({promotionCandidates.length})</h3>
                        <div className="border rounded-md">
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead className="w-[50px]">
                                            <Checkbox 
                                                checked={selectedStudents.length === promotionCandidates.length && promotionCandidates.length > 0}
                                                onCheckedChange={toggleAll}
                                            />
                                        </TableHead>
                                        <TableHead>Student</TableHead>
                                        <TableHead>Current Performance (CGPA)</TableHead>
                                        <TableHead>Status</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {promotionCandidates.map(student => (
                                        <TableRow key={student.id}>
                                            <TableCell>
                                                <Checkbox 
                                                    checked={selectedStudents.includes(student.id)}
                                                    onCheckedChange={() => toggleStudent(student.id)}
                                                />
                                            </TableCell>
                                            <TableCell className="font-medium">
                                                <div className="flex items-center gap-2">
                                                    <Avatar className="h-6 w-6">
                                                        <AvatarImage src={student.image} />
                                                        <AvatarFallback>S</AvatarFallback>
                                                    </Avatar>
                                                    {student.name}
                                                    <span className="text-muted-foreground text-xs">({student.id})</span>
                                                </div>
                                            </TableCell>
                                            <TableCell>{student.cgpa}</TableCell>
                                            <TableCell>
                                                <Badge variant={Number(student.cgpa) > 3.0 ? "outline" : "destructive"} className="text-xs">
                                                    {Number(student.cgpa) > 3.0 ? "Eligible" : "Review Req."}
                                                </Badge>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </div>
                     </div>
                     
                     <div className="flex justify-end gap-2">
                         <Button variant="outline">Cancel</Button>
                         <Button disabled={selectedStudents.length === 0}>
                             Promote {selectedStudents.length} Students
                         </Button>
                     </div>
                 </CardContent>
             </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
