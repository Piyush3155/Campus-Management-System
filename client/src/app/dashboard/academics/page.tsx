"use client"

import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Plus, Calendar as CalendarIcon, Clock, Layers, MoreHorizontal, Trash2, Edit } from "lucide-react"
import { Calendar } from "@/components/ui/calendar"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger, SheetDescription } from "@/components/ui/sheet"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { toast } from "sonner"

// --- Mock Data ---
const initialAcademicYears = [
    { id: "1", name: "2024-2025", status: "Active", startDate: "2024-06-01", endDate: "2025-05-31" },
    { id: "2", name: "2023-2024", status: "Past", startDate: "2023-06-01", endDate: "2024-05-31" },
]

const initialEvents = [
    { id: "1", title: "Semester Orientation", date: new Date(2025, 5, 10), type: "Event" },
    { id: "2", title: "Independence Day", date: new Date(2025, 7, 15), type: "Holiday" },
    { id: "3", title: "Mid-Term Exams", date: new Date(2025, 9, 20), type: "Exam" },
]

const timeSlots = ["09:00 AM", "10:00 AM", "11:00 AM", "12:00 PM", "01:00 PM", "02:00 PM", "03:00 PM"]
const weekDays = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"]

// Mock Timetable Data (simplified)
const timetableData: any = {
    "Monday": { "09:00 AM": { subject: "Mathematics", room: "101" }, "11:00 AM": { subject: "Physics", room: "Lab A" } },
    "Tuesday": { "10:00 AM": { subject: "Chemistry", room: "102" }, "02:00 PM": { subject: "English", room: "201" } },
    // ... other days
}

export default function AcademicsPage() {
  const [date, setDate] = useState<Date | undefined>(new Date())
  
  return (
    <div className="flex flex-col gap-6 p-6">
      <div className="flex items-center justify-between">
        <div>
           <h1 className="text-2xl font-bold tracking-tight">Academic Management</h1>
           <p className="text-muted-foreground">Manage years, structures, timetables, and academic calendar.</p>
        </div>
      </div>

      <Tabs defaultValue="structure" className="space-y-4">
        <TabsList>
            <TabsTrigger value="structure" className="gap-2"><Layers className="h-4 w-4" /> Structure</TabsTrigger>
            <TabsTrigger value="timetable" className="gap-2"><Clock className="h-4 w-4" /> Timetable</TabsTrigger>
            <TabsTrigger value="calendar" className="gap-2"><CalendarIcon className="h-4 w-4" /> Calendar</TabsTrigger>
        </TabsList>

        {/* --- Academic Structure Tab --- */}
        <TabsContent value="structure" className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2">
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                        <div className="space-y-1">
                             <CardTitle>Academic Years</CardTitle>
                             <CardDescription>Manage active and past academic sessions.</CardDescription>
                        </div>
                         <Button size="sm"><Plus className="h-4 w-4" /></Button>
                    </CardHeader>
                    <CardContent>
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Year</TableHead>
                                    <TableHead>Status</TableHead>
                                    <TableHead className="text-right">Actions</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {initialAcademicYears.map(year => (
                                    <TableRow key={year.id}>
                                        <TableCell className="font-medium">{year.name}</TableCell>
                                        <TableCell><Badge variant={year.status === "Active" ? "default" : "secondary"}>{year.status}</Badge></TableCell>
                                        <TableCell className="text-right">
                                             <Button variant="ghost" size="icon" className="h-8 w-8"><Edit className="h-4 w-4" /></Button>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </CardContent>
                </Card>

                 <Card>
                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                         <div className="space-y-1">
                             <CardTitle>Semesters & Sections</CardTitle>
                             <CardDescription>Define terms and class divisions.</CardDescription>
                        </div>
                        <Button size="sm" variant="outline"><Plus className="h-4 w-4" /></Button>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="rounded-md border p-4">
                            <h3 className="font-medium mb-2">Active Semesters</h3>
                            <div className="flex flex-wrap gap-2">
                                <Badge variant="outline" className="px-3 py-1">Semester 1</Badge>
                                <Badge variant="outline" className="px-3 py-1">Semester 3</Badge>
                                <Badge variant="outline" className="px-3 py-1">Semester 5</Badge>
                            </div>
                        </div>
                        <div className="rounded-md border p-4">
                            <h3 className="font-medium mb-2">Divisions / Sections</h3>
                            <div className="flex flex-wrap gap-2">
                                <Badge variant="secondary" className="px-3 py-1">Class A</Badge>
                                <Badge variant="secondary" className="px-3 py-1">Class B</Badge>
                                <Badge variant="secondary" className="px-3 py-1">Morning Batch</Badge>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </TabsContent>

        {/* --- Timetable Tab --- */}
        <TabsContent value="timetable" className="space-y-4">
             <div className="flex items-center gap-4 mb-4">
                 <Select defaultValue="class-a">
                     <SelectTrigger className="w-[180px]">
                         <SelectValue placeholder="Select Class" />
                     </SelectTrigger>
                     <SelectContent>
                         <SelectItem value="class-a">BCA - Sem 1 - A</SelectItem>
                         <SelectItem value="class-b">BCA - Sem 1 - B</SelectItem>
                     </SelectContent>
                 </Select>
                 <Button variant="outline">Faculty View</Button>
                 <Button className="ml-auto"><Plus className="mr-2 h-4 w-4" /> Add Slot</Button>
             </div>
             <Card>
                 <CardContent className="p-0 overflow-x-auto">
                     <Table>
                         <TableHeader>
                             <TableRow>
                                 <TableHead className="w-[100px]">Time / Day</TableHead>
                                 {weekDays.map(day => <TableHead key={day} className="text-center">{day}</TableHead>)}
                             </TableRow>
                         </TableHeader>
                         <TableBody>
                             {timeSlots.map(time => (
                                 <TableRow key={time}>
                                     <TableCell className="font-medium text-xs whitespace-nowrap bg-muted/20">{time}</TableCell>
                                     {weekDays.map(day => {
                                         const entry = timetableData[day]?.[time];
                                         return (
                                             <TableCell key={`${day}-${time}`} className="text-center p-2 border-l">
                                                 {entry ? (
                                                     <div className="bg-primary/10 p-2 rounded-md text-sm border border-primary/20">
                                                         <div className="font-bold text-primary">{entry.subject}</div>
                                                         <div className="text-xs text-muted-foreground">Rm: {entry.room}</div>
                                                     </div>
                                                 ) : (
                                                     <div className="h-10"></div>
                                                 )}
                                             </TableCell>
                                         )
                                     })}
                                 </TableRow>
                             ))}
                         </TableBody>
                     </Table>
                 </CardContent>
             </Card>
        </TabsContent>

         {/* --- Calendar Tab --- */}
         <TabsContent value="calendar" className="space-y-4">
            <div className="grid gap-6 md:grid-cols-[1fr_300px]">
                <Card className="p-4">
                    <CardHeader>
                        <CardTitle>Academic Calendar</CardTitle>
                    </CardHeader>
                    <Calendar
                        mode="single"
                        selected={date}
                        onSelect={setDate}
                        className="rounded-md border w-fit"
                    />
                </Card>
                
                <div className="space-y-4">
                    <Card>
                        <CardHeader>
                             <CardTitle className="text-lg">Upcoming Events</CardTitle>
                        </CardHeader>
                        <CardContent className="grid gap-4">
                             {initialEvents.map(event => (
                                 <div key={event.id} className="flex items-start gap-4 p-3 border rounded-lg">
                                     <div className="bg-muted p-2 rounded-md text-center min-w-[3rem]">
                                        <div className="text-xs font-bold uppercase text-muted-foreground">{event.date.toLocaleString('default', { month: 'short' })}</div>
                                        <div className="text-lg font-bold">{event.date.getDate()}</div>
                                     </div>
                                     <div>
                                         <div className="font-medium">{event.title}</div>
                                         <Badge variant="outline" className="mt-1 text-xs">{event.type}</Badge>
                                     </div>
                                 </div>
                             ))}
                             <Button variant="outline" className="w-full">View All Events</Button>
                        </CardContent>
                    </Card>
                     <Button className="w-full"><Plus className="mr-2 h-4 w-4" /> Add Event</Button>
                </div>
            </div>
         </TabsContent>
      </Tabs>
    </div>
  )
}
