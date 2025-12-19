"use client"

import * as React from "react"
import {
  Calendar as CalendarIcon,
  Mail,
  Phone,
  MapPin,
  BookOpen,
  Users,
  Clock,
  Plus,
  MoreHorizontal,
  GraduationCap,
  FileText
} from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"

export default function StudentProfilePage() {
    // Mock student data
    const student = {
        id: "STD24001",
        name: "Alex Johnson",
        course: "Bachelor of Computer Applications (BCA)",
        semester: "Semester 1",
        section: "A",
        email: "alex.j@student.university.edu",
        phone: "+1 (555) 987-6543",
        dob: "2003-05-15",
        address: "123 Campus Dorms, University Park",
        joinDate: "August 2024",
        status: "Active",
        cgpa: "3.80"
    }

    const academicRecords = [
        { subject: "Introduction to CS", grade: "A", attendance: "95%" },
        { subject: "Mathematics I", grade: "B+", attendance: "88%" },
        { subject: "Digital Electronics", grade: "A-", attendance: "92%" },
        { subject: "Communication Skills", grade: "A", attendance: "98%" },
    ]

  return (
    <div className="flex flex-col gap-6 p-6">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row gap-6 items-start">
        <Avatar className="h-24 w-24 border-4 border-background shadow-sm">
            <AvatarImage src="/avatars/s1.png" alt={student.name} />
            <AvatarFallback className="text-2xl">{student.name.split(' ').map(n=>n[0]).join('')}</AvatarFallback>
        </Avatar>
        <div className="flex-1 space-y-1">
            <div className="flex items-center gap-2">
                <h1 className="text-3xl font-bold tracking-tight">{student.name}</h1>
                <Badge variant={student.status === "Active" ? "default" : "secondary"}>{student.status}</Badge>
            </div>
            <div className="flex items-center gap-2 text-muted-foreground">
                <span className="font-medium text-foreground">{student.id}</span>
                <span>•</span>
                <span>{student.course}</span>
            </div>
            <div className="flex flex-wrap gap-4 mt-4 text-sm text-muted-foreground">
                <div className="flex items-center gap-1">
                    <Mail className="h-4 w-4" /> {student.email}
                </div>
                <div className="flex items-center gap-1">
                    <Phone className="h-4 w-4" /> {student.phone}
                </div>
                <div className="flex items-center gap-1">
                    <MapPin className="h-4 w-4" /> {student.address}
                </div>
            </div>
        </div>
        <div className="flex gap-2">
             <Dialog>
                <DialogTrigger asChild>
                    <Button variant="outline">Update Section</Button>
                </DialogTrigger>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Update Class & Section</DialogTitle>
                        <DialogDescription>Move this student to a different class section.</DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                         <div className="space-y-2">
                             <Label>Current Assignment</Label>
                             <div className="p-3 bg-muted rounded-md text-sm">
                                 {student.course} - {student.semester} - Section {student.section}
                             </div>
                         </div>
                         <div className="space-y-2">
                             <Label>New Section</Label>
                             <Select>
                                 <SelectTrigger>
                                     <SelectValue placeholder="Select section" />
                                 </SelectTrigger>
                                 <SelectContent>
                                     <SelectItem value="A">Section A</SelectItem>
                                     <SelectItem value="B">Section B</SelectItem>
                                     <SelectItem value="C">Section C</SelectItem>
                                 </SelectContent>
                             </Select>
                         </div>
                    </div>
                    <DialogFooter>
                        <Button type="submit">Save Changes</Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
            <Button>Edit Profile</Button>
        </div>
      </div>

      <Separator />

      <div className="grid gap-6 md:grid-cols-[1fr_350px]">
          <div className="space-y-6">
            <Tabs defaultValue="academic" className="w-full">
                <TabsList>
                    <TabsTrigger value="academic">Academic Details</TabsTrigger>
                    <TabsTrigger value="attendance">Attendance</TabsTrigger>
                    <TabsTrigger value="documents">Documents</TabsTrigger>
                </TabsList>
                
                <TabsContent value="academic" className="space-y-4 mt-4">
                    <div className="grid gap-4 md:grid-cols-2">
                        <Card>
                             <CardHeader className="pb-2">
                                 <CardTitle className="text-sm font-medium">Cumulative GPA</CardTitle>
                             </CardHeader>
                             <CardContent>
                                 <div className="text-2xl font-bold">{student.cgpa}</div>
                                 <p className="text-xs text-muted-foreground">Top 5% of class</p>
                             </CardContent>
                        </Card>
                         <Card>
                             <CardHeader className="pb-2">
                                 <CardTitle className="text-sm font-medium">Credits Earned</CardTitle>
                             </CardHeader>
                             <CardContent>
                                 <div className="text-2xl font-bold">18 / 24</div>
                                 <p className="text-xs text-muted-foreground">Current Semester</p>
                             </CardContent>
                        </Card>
                    </div>

                    <Card>
                        <CardHeader>
                            <CardTitle>Current Semester Grades</CardTitle>
                            <CardDescription>Academic performance for {student.semester}</CardDescription>
                        </CardHeader>
                        <CardContent className="p-0">
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>Subject</TableHead>
                                        <TableHead>Grade</TableHead>
                                        <TableHead>Attendance</TableHead>
                                        <TableHead>Status</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {academicRecords.map((record, i) => (
                                        <TableRow key={i}>
                                            <TableCell className="font-medium">{record.subject}</TableCell>
                                            <TableCell>
                                                <Badge variant="outline">{record.grade}</Badge>
                                            </TableCell>
                                            <TableCell>{record.attendance}</TableCell>
                                            <TableCell className="text-green-600 font-medium text-xs">PASSED</TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </CardContent>
                    </Card>
                </TabsContent>

                <TabsContent value="attendance" className="mt-4">
                     <Card>
                         <CardHeader>
                             <CardTitle>Attendance Record</CardTitle>
                         </CardHeader>
                         <CardContent className="h-[200px] flex items-center justify-center border-dashed border rounded-md m-4 bg-muted/20">
                             <p className="text-muted-foreground">Attendance Chart Placeholder</p>
                         </CardContent>
                     </Card>
                </TabsContent>
            </Tabs>
          </div>

          <div className="space-y-6">
              <Card>
                  <CardHeader>
                      <CardTitle>Enrollment Info</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4 text-sm">
                      <div className="grid grid-cols-2 gap-1">
                          <span className="text-muted-foreground">Student ID:</span>
                          <span className="font-medium text-right">{student.id}</span>
                      </div>
                      <Separator />
                       <div className="grid grid-cols-2 gap-1">
                          <span className="text-muted-foreground">Date Joined:</span>
                          <span className="font-medium text-right">{student.joinDate}</span>
                      </div>
                       <Separator />
                       <div className="grid grid-cols-2 gap-1">
                          <span className="text-muted-foreground">Course:</span>
                          <span className="font-medium text-right">BCA</span>
                      </div>
                       <Separator />
                       <div className="grid grid-cols-2 gap-1">
                          <span className="text-muted-foreground">Current Sem:</span>
                          <span className="font-medium text-right">{student.semester}</span>
                      </div>
                       <Separator />
                       <div className="grid grid-cols-2 gap-1">
                          <span className="text-muted-foreground">Section:</span>
                          <span className="font-medium text-right">{student.section}</span>
                      </div>
                       <Separator />
                       <div className="mt-4">
                           <Label className="text-xs text-muted-foreground uppercase mb-2 block">Assigned Mentor</Label>
                           <div className="flex items-center gap-3 p-2 bg-muted/50 rounded-md">
                                <Avatar className="h-8 w-8">
                                    <AvatarFallback>JD</AvatarFallback>
                                </Avatar>
                                <div>
                                    <div className="font-medium">Dr. John Doe</div>
                                    <div className="text-xs text-muted-foreground">Senior Professor</div>
                                </div>
                           </div>
                       </div>
                  </CardContent>
              </Card>

              <Card>
                  <CardHeader>
                      <CardTitle>Recent Activity</CardTitle>
                  </CardHeader>
                   <CardContent className="space-y-4">
                       <div className="flex items-start gap-3 text-sm">
                           <div className="mt-1 h-2 w-2 rounded-full bg-blue-500" />
                           <div>
                               <p className="font-medium">Library Book Returned</p>
                               <p className="text-xs text-muted-foreground">2 hours ago</p>
                           </div>
                       </div>
                       <div className="flex items-start gap-3 text-sm">
                           <div className="mt-1 h-2 w-2 rounded-full bg-green-500" />
                           <div>
                               <p className="font-medium">Fees Paid - Semester 2</p>
                               <p className="text-xs text-muted-foreground">Yesterday</p>
                           </div>
                       </div>
                   </CardContent>
              </Card>
          </div>
      </div>
    </div>
  )
}
