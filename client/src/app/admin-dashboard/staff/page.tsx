"use client"

import {
  MoreHorizontal,
  Plus,
  Search,
  Filter,
  Briefcase,
  Users,
  GraduationCap
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
import Link from "next/link"

const staffData = [
  {
    id: "STF001",
    name: "Dr. Sarah Wilson",
    role: "Professor",
    department: "Computer Science",
    email: "sarah.w@university.edu",
    status: "Active",
    workload: "18 hrs/week",
    image: "/avatars/01.png"
  },
  {
    id: "STF002",
    name: "Prof. James Carter",
    role: "HOD",
    department: "Mathematics",
    email: "james.c@university.edu",
    status: "Active",
    workload: "12 hrs/week",
    image: "/avatars/02.png"
  },
  {
    id: "STF003",
    name: "Emily Chen",
    role: "Lecturer",
    department: "Physics",
    email: "emily.c@university.edu",
    status: "Leave",
    workload: "20 hrs/week",
    image: "/avatars/03.png"
  },
  {
    id: "STF004",
    name: "Michael Brown",
    role: "Lab Assistant",
    department: "Chemistry",
    email: "michael.b@university.edu",
    status: "Active",
    workload: "25 hrs/week",
    image: "/avatars/04.png"
  }
]

export default function StaffPage() {
  return (
    <div className="flex flex-col gap-6 p-6">
      <div className="flex items-center justify-between">
        <div>
           <h1 className="text-2xl font-bold tracking-tight">Staff Management</h1>
           <p className="text-muted-foreground">Manage faculty, assignments, and workload.</p>
        </div>
        <div className="flex items-center gap-2">
            <Button variant="outline">
                <Filter className="mr-2 h-4 w-4" /> Filter
            </Button>
            <Button>
                <Plus className="mr-2 h-4 w-4" /> Add Staff
            </Button>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Total Staff
            </CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">142</div>
            <p className="text-xs text-muted-foreground">
              +4 from last month
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Departments
            </CardTitle>
            <Briefcase className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12</div>
            <p className="text-xs text-muted-foreground">
              Active departments
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Faculty on Leave
            </CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">3</div>
            <p className="text-xs text-muted-foreground">
              Currently away
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Avg Workload
            </CardTitle>
            <GraduationCap className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">18h</div>
            <p className="text-xs text-muted-foreground">
              Per week average
            </p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="all" className="space-y-4">
        <TabsList>
            <TabsTrigger value="all">All Staff</TabsTrigger>
            <TabsTrigger value="departments">Departments</TabsTrigger>
            <TabsTrigger value="workload">Workload Overview</TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="space-y-4">
             <div className="flex items-center gap-4">
                <div className="relative flex-1">
                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                        type="search"
                        placeholder="Search staff..."
                        className="pl-8 sm:w-[300px] md:w-[200px] lg:w-[300px]"
                    />
                </div>
            </div>
            <Card>
                <CardContent className="p-0">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead className="w-[80px]">Image</TableHead>
                                <TableHead>Name</TableHead>
                                <TableHead>Role</TableHead>
                                <TableHead>Department</TableHead>
                                <TableHead>Status</TableHead>
                                <TableHead className="text-right">Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {staffData.map((staff) => (
                                <TableRow key={staff.id}>
                                    <TableCell>
                                        <Avatar className="h-9 w-9">
                                            <AvatarImage src={staff.image} alt={staff.name} />
                                            <AvatarFallback>{staff.name.split(' ').map(n=>n[0]).join('')}</AvatarFallback>
                                        </Avatar>
                                    </TableCell>
                                    <TableCell className="font-medium">
                                        <div className="flex flex-col">
                                            <span>{staff.name}</span>
                                            <span className="text-xs text-muted-foreground">{staff.email}</span>
                                        </div>
                                    </TableCell>
                                    <TableCell>{staff.role}</TableCell>
                                    <TableCell>{staff.department}</TableCell>
                                    <TableCell>
                                        <Badge variant={staff.status === "Active" ? "default" : "secondary"}>
                                            {staff.status}
                                        </Badge>
                                    </TableCell>
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
                                                    <Link href={`/admin-dashboard/staff/${staff.id}`}>View Profile</Link>
                                                </DropdownMenuItem>
                                                <DropdownMenuItem>Edit Details</DropdownMenuItem>
                                                <DropdownMenuSeparator />
                                                <DropdownMenuItem>Assign Subject</DropdownMenuItem>
                                                <DropdownMenuItem>Assign Class</DropdownMenuItem>
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

        <TabsContent value="departments" className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                 {/* Mock Department Cards */}
                 {["Computer Science", "Mathematics", "Physics", "Chemistry", "English", "Biology"].map(dept => (
                     <Card key={dept}>
                         <CardHeader className="flex flex-row items-center justify-between pb-2">
                             <CardTitle className="text-lg">{dept}</CardTitle>
                             <Briefcase className="h-4 w-4 text-muted-foreground" />
                         </CardHeader>
                         <CardContent>
                             <div className="text-2xl font-bold">12 Staff</div>
                             <div className="mt-2 space-y-1">
                                <div className="flex justify-between text-sm">
                                    <span className="text-muted-foreground">HOD:</span>
                                    <span className="font-medium">Dr. Smith</span>
                                </div>
                                <div className="flex justify-between text-sm">
                                    <span className="text-muted-foreground">Subjects:</span>
                                    <span className="font-medium">24</span>
                                </div>
                             </div>
                             <Button variant="outline" className="w-full mt-4">View Department</Button>
                         </CardContent>
                     </Card>
                 ))}
            </div>
        </TabsContent>
        
        <TabsContent value="workload" className="space-y-4">
             <Card>
                <CardHeader>
                    <CardTitle>Workload Distribution</CardTitle>
                    <CardDescription>Overview of weekly hours assigned to faculty.</CardDescription>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Staff Name</TableHead>
                                <TableHead>Department</TableHead>
                                <TableHead>Assigned Subjects</TableHead>
                                <TableHead>Weekly Hours</TableHead>
                                <TableHead>Status</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                             {staffData.map(staff => (
                                 <TableRow key={staff.id}>
                                     <TableCell className="font-medium">{staff.name}</TableCell>
                                     <TableCell>{staff.department}</TableCell>
                                     <TableCell>3</TableCell>
                                     <TableCell>{staff.workload}</TableCell>
                                     <TableCell><Badge variant="outline">Optimal</Badge></TableCell>
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
