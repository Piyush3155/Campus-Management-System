"use client"

import {
  Mail,
  Phone,
  MapPin,
  BookOpen,
  Users,
  Clock,
  Plus,
  MoreHorizontal
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

export default function StaffProfilePage() {
    // Mock user data - in a real app, fetch based on 'id' param
    const staff = {
        name: "Dr. Sarah Wilson",
        role: "Professor",
        department: "Computer Science",
        email: "sarah.w@university.edu",
        phone: "+1 (555) 123-4567",
        location: "Block B, Room 304",
        joinDate: "August 2020",
        bio: "Experienced Professor with a demonstrated history of working in the higher education industry. Skilled in Machine Learning, Algorithms, and Educational Technology.",
        specialization: "Artificial Intelligence, Data Structures"
    }

    const assignments = [
        { id: 1, subject: "Advanced Algorithms", code: "CS401", class: "BCA - Sem 5", hours: 4 },
        { id: 2, subject: "Data Structures", code: "CS302", class: "BCA - Sem 3", hours: 5 },
        { id: 3, subject: "Python Programming", code: "CS101", class: "BCA - Sem 1", hours: 6 },
    ]

  return (
    <div className="flex flex-col gap-6 p-6">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row gap-6 items-start">
        <Avatar className="h-24 w-24 border-4 border-background shadow-sm">
            <AvatarImage src="/avatars/01.png" alt={staff.name} />
            <AvatarFallback className="text-2xl">{staff.name.split(' ').map(n=>n[0]).join('')}</AvatarFallback>
        </Avatar>
        <div className="flex-1 space-y-1">
            <h1 className="text-3xl font-bold tracking-tight">{staff.name}</h1>
            <div className="flex items-center gap-2 text-muted-foreground">
                <span className="font-medium text-foreground">{staff.role}</span>
                <span>•</span>
                <span>{staff.department}</span>
            </div>
            <div className="flex flex-wrap gap-4 mt-4 text-sm text-muted-foreground">
                <div className="flex items-center gap-1">
                    <Mail className="h-4 w-4" /> {staff.email}
                </div>
                <div className="flex items-center gap-1">
                    <Phone className="h-4 w-4" /> {staff.phone}
                </div>
                <div className="flex items-center gap-1">
                    <MapPin className="h-4 w-4" /> {staff.location}
                </div>
            </div>
        </div>
        <div className="flex gap-2">
            <Button variant="outline">Edit Profile</Button>
            <Button variant="secondary">Contact</Button>
        </div>
      </div>

      <Separator />

      <div className="grid gap-6 md:grid-cols-[1fr_300px]">
          <div className="space-y-6">
            <Tabs defaultValue="classes" className="w-full">
                <TabsList>
                    <TabsTrigger value="classes">Classes & Subjects</TabsTrigger>
                    <TabsTrigger value="schedule">Schedule</TabsTrigger>
                    <TabsTrigger value="activity">Recent Activity</TabsTrigger>
                </TabsList>
                
                <TabsContent value="classes" className="space-y-4 mt-4">
                    <div className="flex items-center justify-between">
                         <h3 className="text-lg font-medium">Assigned Subjects</h3>
                         <div className="flex gap-2">
                             <Button size="sm" variant="outline"><Plus className="h-4 w-4 mr-2" /> Assign Class</Button>
                             <Dialog>
                                <DialogTrigger asChild>
                                    <Button size="sm"><Plus className="h-4 w-4 mr-2" /> Assign Subject</Button>
                                </DialogTrigger>
                                <DialogContent>
                                    <DialogHeader>
                                        <DialogTitle>Assign Subject</DialogTitle>
                                        <DialogDescription>
                                            Assign a new subject to this faculty member.
                                        </DialogDescription>
                                    </DialogHeader>
                                    <div className="grid gap-4 py-4">
                                        <div className="grid grid-cols-4 items-center gap-4">
                                            <Label htmlFor="subject" className="text-right">Subject</Label>
                                            <Select>
                                                <SelectTrigger className="col-span-3">
                                                    <SelectValue placeholder="Select subject" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    <SelectItem value="cs101">CS101 - Intead to CS</SelectItem>
                                                    <SelectItem value="cs102">CS102 - Data Structures</SelectItem>
                                                </SelectContent>
                                            </Select>
                                        </div>
                                        <div className="grid grid-cols-4 items-center gap-4">
                                            <Label htmlFor="class" className="text-right">Class</Label>
                                            <Select>
                                                <SelectTrigger className="col-span-3">
                                                    <SelectValue placeholder="Select class" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    <SelectItem value="bca1">BCA Sem 1</SelectItem>
                                                    <SelectItem value="bca3">BCA Sem 3</SelectItem>
                                                </SelectContent>
                                            </Select>
                                        </div>
                                    </div>
                                    <DialogFooter>
                                        <Button type="submit">Assign</Button>
                                    </DialogFooter>
                                </DialogContent>
                             </Dialog>
                         </div>
                    </div>
                    <Card>
                        <CardContent className="p-0">
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>Subject Name</TableHead>
                                        <TableHead>Class/Section</TableHead>
                                        <TableHead>Type</TableHead>
                                        <TableHead>Hours/Week</TableHead>
                                        <TableHead className="text-right">Actions</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {assignments.map(assign => (
                                        <TableRow key={assign.id}>
                                            <TableCell className="font-medium">
                                                <div>{assign.subject}</div>
                                                <div className="text-xs text-muted-foreground">{assign.code}</div>
                                            </TableCell>
                                            <TableCell>
                                                <Badge variant="secondary">{assign.class}</Badge>
                                            </TableCell>
                                            <TableCell>Core</TableCell>
                                            <TableCell>{assign.hours}h</TableCell>
                                            <TableCell className="text-right">
                                                 <Button variant="ghost" size="icon" className="h-8 w-8"><MoreHorizontal className="h-4 w-4" /></Button>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </CardContent>
                    </Card>
                </TabsContent>

                <TabsContent value="schedule" className="mt-4">
                     <Card>
                         <CardHeader>
                             <CardTitle>Weekly Schedule</CardTitle>
                             <CardDescription>Timetable view for current semester.</CardDescription>
                         </CardHeader>
                         <CardContent className="h-[300px] flex items-center justify-center border-dashed border rounded-md m-4 bg-muted/20">
                             <p className="text-muted-foreground">Timetable Visualization Placeholder</p>
                         </CardContent>
                     </Card>
                </TabsContent>
            </Tabs>
          </div>

          <div className="space-y-6">
              <Card>
                  <CardHeader>
                      <CardTitle>Workload Stats</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                      <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                              <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
                                  <Clock className="h-4 w-4 text-primary" />
                              </div>
                              <span className="text-sm font-medium">Total Hours</span>
                          </div>
                          <span className="font-bold">15h/week</span>
                      </div>
                      <div className="flex items-center justify-between">
                           <div className="flex items-center gap-2">
                              <div className="h-8 w-8 rounded-full bg-orange-500/10 flex items-center justify-center">
                                  <BookOpen className="h-4 w-4 text-orange-500" />
                              </div>
                              <span className="text-sm font-medium">Subjects</span>
                          </div>
                          <span className="font-bold">3</span>
                      </div>
                      <div className="flex items-center justify-between">
                           <div className="flex items-center gap-2">
                              <div className="h-8 w-8 rounded-full bg-blue-500/10 flex items-center justify-center">
                                  <Users className="h-4 w-4 text-blue-500" />
                              </div>
                              <span className="text-sm font-medium">Classes</span>
                          </div>
                          <span className="font-bold">3</span>
                      </div>
                  </CardContent>
              </Card>

              <Card>
                  <CardHeader>
                      <CardTitle>About</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4 text-sm">
                      <div>
                          <p className="text-muted-foreground mb-1">Bio</p>
                          <p>{staff.bio}</p>
                      </div>
                      <div>
                          <p className="text-muted-foreground mb-1">Specialization</p>
                          <p>{staff.specialization}</p>
                      </div>
                       <div>
                          <p className="text-muted-foreground mb-1">Joined</p>
                          <p>{staff.joinDate}</p>
                      </div>
                  </CardContent>
              </Card>
          </div>
      </div>
    </div>
  )
}
