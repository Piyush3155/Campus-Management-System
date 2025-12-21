"use client"

import { useState, useEffect } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Plus, Calendar as CalendarIcon, Clock, Layers, Edit, BookOpen, GraduationCap, Users } from "lucide-react"
import { IconUsers } from "@tabler/icons-react"
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
import { StaffAssignment } from "@/components/academic/staff-assignment"
import { HodAssignment } from "@/components/academic/hod-assignment"
import { TimetableManager } from "@/components/academic/timetable-manager"
import { AcademicDirectory } from "@/components/academic/academic-directory"
import { AcademicYear, AcademicEvent, Department } from "@/types/academic"
import { getAcademicYears, getEvents, getDepartments } from "@/app/actions/acdemics/main"
import { toast } from "sonner"
import { CreateAcademicYearDialog } from "@/components/academic/create-year-dialog"
import { CreateEventDialog } from "@/components/academic/create-event-dialog"
import { CreateSubjectDialog } from "@/components/academic/create-subject-dialog"

export default function AcademicsPage() {
    const [date, setDate] = useState<Date | undefined>(new Date())

    // Data State
    const [academicYears, setAcademicYears] = useState<AcademicYear[]>([])
    const [events, setEvents] = useState<AcademicEvent[]>([])
    const [departments, setDepartments] = useState<Department[]>([])
    const [loading, setLoading] = useState<boolean>(true)

    // Fetch Data
    useEffect(() => {
        async function loadData() {
            try {
                const [yearsData, eventsData, deptsData] = await Promise.all([
                    getAcademicYears(),
                    getEvents(),
                    getDepartments()
                ])
                setAcademicYears(yearsData || [])
                setEvents(eventsData || [])
                setDepartments(deptsData || [])
            } catch (error) {
                toast.error("Failed to load academic data")
            } finally {
                setLoading(false)
            }
        }
        loadData()
    }, [])

    return (
        <div className="flex flex-col gap-6 p-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold tracking-tight">Academic Operations</h1>
                    <p className="text-muted-foreground">Manage institutional structure, scheduling, and faculty assignments.</p>
                </div>
                <div className="flex items-center gap-2">
                    <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-slate-100 text-slate-600 text-[10px] font-black uppercase tracking-widest border border-slate-200">
                        <Users className="h-3 w-3" /> {departments.length} Departments
                    </div>
                </div>
            </div>

            <Tabs defaultValue="structure" className="space-y-4">
                <TabsList>
                    <TabsTrigger value="structure">Structure</TabsTrigger>
                    <TabsTrigger value="timetable">Timetable</TabsTrigger>
                    <TabsTrigger value="faculty">Assignments</TabsTrigger>
                    <TabsTrigger value="directory">Directory</TabsTrigger>
                    <TabsTrigger value="calendar">Calendar</TabsTrigger>
                </TabsList>

                <TabsContent value="structure" className="space-y-4">
                    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                        <Card>
                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                <CardTitle className="text-sm font-medium">Departments</CardTitle>
                                <Users className="h-4 w-4 text-muted-foreground" />
                            </CardHeader>
                            <CardContent>
                                <div className="text-2xl font-bold">{departments.length}</div>
                                <p className="text-xs text-muted-foreground">Active academic units</p>
                            </CardContent>
                        </Card>
                        <Card>
                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                <CardTitle className="text-sm font-medium">Academic Years</CardTitle>
                                <CalendarIcon className="h-4 w-4 text-muted-foreground" />
                            </CardHeader>
                            <CardContent>
                                <div className="text-2xl font-bold">{academicYears.length}</div>
                                <p className="text-xs text-muted-foreground">Terms configured</p>
                            </CardContent>
                        </Card>
                    </div>

                    <div className="grid gap-4 md:grid-cols-12 items-start">
                        {/* Years Section */}
                        <Card className="md:col-span-12 lg:col-span-7">
                            <CardHeader>
                                <div className="flex items-center justify-between">
                                    <div>
                                        <CardTitle>Academic Sessions</CardTitle>
                                        <CardDescription>Track active and upcoming academic periods</CardDescription>
                                    </div>
                                    <CreateAcademicYearDialog />
                                </div>
                            </CardHeader>
                            <CardContent className="p-0">
                                <Table>
                                    <TableHeader className="bg-slate-50/30">
                                        <TableRow className="hover:bg-transparent border-slate-100">
                                            <TableHead className="pl-8 font-black text-[11px] uppercase tracking-widest text-slate-400">Term Label</TableHead>
                                            <TableHead className="font-black text-[11px] uppercase tracking-widest text-slate-400">Duration</TableHead>
                                            <TableHead className="font-black text-[11px] uppercase tracking-widest text-slate-400">System Status</TableHead>
                                            <TableHead className="text-right pr-8 font-black text-[11px] uppercase tracking-widest text-slate-400">Action</TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {academicYears.length === 0 ? (
                                            <TableRow>
                                                <TableCell colSpan={4} className="text-center py-10 text-muted-foreground">No academic years configured.</TableCell>
                                            </TableRow>
                                        ) : (
                                            academicYears.map(year => (
                                                <TableRow key={year.id}>
                                                    <TableCell className="font-medium">{year.name}</TableCell>
                                                    <TableCell className="text-xs text-muted-foreground">
                                                        {new Date(year.startDate).toLocaleDateString()} - {new Date(year.endDate).toLocaleDateString()}
                                                    </TableCell>
                                                    <TableCell>
                                                        <Badge variant={year.status === "ACTIVE" ? "default" : "secondary"}>
                                                            {year.status}
                                                        </Badge>
                                                    </TableCell>
                                                    <TableCell className="text-right">
                                                        <Button variant="ghost" size="sm">Edit</Button>
                                                    </TableCell>
                                                </TableRow>
                                            ))
                                        )}
                                    </TableBody>
                                </Table>
                            </CardContent>
                        </Card>

                        {/* Dept/HOD Section */}
                        <div className="md:col-span-12 lg:col-span-5 space-y-4">
                            <Card>
                                <CardHeader>
                                    <CardTitle>Departmental Heads</CardTitle>
                                    <CardDescription>Academic leadership across units</CardDescription>
                                </CardHeader>
                                <CardContent className="p-0">
                                    <div className="divide-y">
                                        {departments.length === 0 ? (
                                            <div className="p-6 text-center text-muted-foreground italic">No departments found.</div>
                                        ) : (
                                            departments.map(dept => (
                                                <div key={dept.id} className="flex items-center justify-between p-4">
                                                    <div>
                                                        <div className="font-medium">{dept.name}</div>
                                                        <div className="text-[10px] text-muted-foreground uppercase tracking-wider">HOD</div>
                                                    </div>
                                                    <div className="text-right">
                                                        {dept.hod?.staff?.name ? (
                                                            <div className="text-sm font-semibold text-primary">{dept.hod.staff.name}</div>
                                                        ) : (
                                                            <Badge variant="outline" className="text-[9px] font-bold">VACANT</Badge>
                                                        )}
                                                    </div>
                                                </div>
                                            ))
                                        )}
                                    </div>
                                </CardContent>
                            </Card>

                            <Card className="bg-primary/5 border-primary/10">
                                <CardContent className="p-6 flex flex-col gap-4">
                                    <div className="space-y-1">
                                        <h3 className="text-lg font-bold flex items-center gap-2">
                                            Subject Library
                                        </h3>
                                        <p className="text-sm text-muted-foreground">Manage institutional course modules.</p>
                                    </div>
                                    <CreateSubjectDialog />
                                </CardContent>
                            </Card>
                        </div>
                    </div>
                </TabsContent>

                {/* --- Timetable Tab --- */}
                <TabsContent value="timetable" className="m-0 border-none outline-none">
                    <TimetableManager />
                </TabsContent>

                {/* --- Faculty & Subjects Tab --- */}
                <TabsContent value="faculty" className="space-y-4">
                    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 items-start">
                        <div className="lg:col-span-2">
                            <StaffAssignment />
                        </div>
                        <div className="lg:col-span-1">
                            <HodAssignment />
                        </div>
                    </div>
                </TabsContent>

                {/* --- Directory Tab --- */}
                <TabsContent value="directory" className="m-0 border-none outline-none">
                    <AcademicDirectory />
                </TabsContent>

                {/* --- Calendar Tab --- */}
                <TabsContent value="calendar" className="space-y-4">
                    <div className="grid gap-4 md:grid-cols-12 items-start">
                        <Card className="md:col-span-12 lg:col-span-8">
                            <CardHeader>
                                <div className="flex items-center gap-2">
                                    <CalendarIcon className="h-5 w-5 text-muted-foreground" />
                                    <CardTitle>Academic Timeline</CardTitle>
                                </div>
                            </CardHeader>
                            <CardContent className="p-6">
                                <Calendar
                                    mode="single"
                                    selected={date}
                                    onSelect={setDate}
                                    className="rounded-md border shadow w-full flex justify-center p-4"
                                />
                            </CardContent>
                        </Card>

                        <div className="md:col-span-12 lg:col-span-4 space-y-4">
                            <Card>
                                <CardHeader>
                                    <CardTitle className="text-lg">Upcoming Events</CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    {events.length === 0 ? (
                                        <p className="text-center py-6 text-muted-foreground">No events found.</p>
                                    ) : (
                                        events.slice(0, 5).map(event => (
                                            <div key={event.id} className="flex items-center gap-4">
                                                <div className="bg-slate-100 p-2 rounded text-center min-w-[3rem]">
                                                    <div className="text-[10px] font-bold text-muted-foreground uppercase">
                                                        {new Date(event.date).toLocaleString('default', { month: 'short' })}
                                                    </div>
                                                    <div className="text-lg font-bold">
                                                        {new Date(event.date).getDate()}
                                                    </div>
                                                </div>
                                                <div>
                                                    <div className="font-medium text-sm">{event.title}</div>
                                                    <Badge variant="outline" className="text-[9px] uppercase tracking-wider">
                                                        {event.type}
                                                    </Badge>
                                                </div>
                                            </div>
                                        ))
                                    )}
                                    <Button variant="outline" className="w-full">View All</Button>
                                </CardContent>
                            </Card>
                            <CreateEventDialog />
                        </div>
                    </div>
                </TabsContent>
            </Tabs>
        </div>
    )
}
