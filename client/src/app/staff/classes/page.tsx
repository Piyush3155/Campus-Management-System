"use client"

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ClassList } from "@/components/staff-dashboard/class-list"
import { ClassTimetable } from "@/components/staff-dashboard/class-timetable"
import { SubjectMapping } from "@/components/staff-dashboard/subject-mapping"
import { LayoutGrid, List, Calendar, Loader2, Video } from "lucide-react"
import { useAuth } from "@/context/AuthContext"
import { useEffect, useState } from "react"
import { getTimetable, getStaffSubjects } from "@/app/actions/acdemics/main"
import { TimetableEntry } from "@/types/academic"
import { GoogleMeetDialog } from "@/components/googlemeet/page"
import { ClassMeetingInfo } from "@/types/googlemeet"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { format } from "date-fns"

export default function StaffClassesPage() {
  const { user } = useAuth()
  const [timetable, setTimetable] = useState<TimetableEntry[]>([])
  const [subjects, setSubjects] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedClassId, setSelectedClassId] = useState<string>("")

  useEffect(() => {
    async function loadData() {
      if (user?.id) {
        setLoading(true)
        try {
          const [timetableData, subjectsData] = await Promise.all([
            getTimetable({ staffId: user.id }),
            getStaffSubjects(user.id)
          ])
          setTimetable(timetableData)
          setSubjects(subjectsData)
        } catch (error) {
          console.error("Failed to load staff classes data:", error)
        } finally {
          setLoading(false)
        }
      }
    }
    loadData()
  }, [user?.id])

  // Get unique classes for the dropdown
  const uniqueClasses = Array.from(new Set(timetable.map(t => `${t.subjectId}-${t.section}-${t.semester}`)))
    .map(key => timetable.find(t => `${t.subjectId}-${t.section}-${t.semester}` === key))
    .filter(Boolean) as TimetableEntry[]

  // Get selected class meeting info
  const getSelectedClassMeetingInfo = (): ClassMeetingInfo | null => {
    if (!selectedClassId) return null
    const cls = timetable.find(t => t.id === selectedClassId)
    if (!cls) return null

    return {
      timetableId: cls.id,
      subjectId: cls.subjectId || "",
      subjectName: cls.subject?.name || "",
      subjectCode: cls.subject?.code || "",
      staffId: cls.staffId || "",
      staffName: cls.staff?.name || user?.name || "",
      semester: cls.semester || 1,
      section: cls.section || "",
      departmentId: cls.departmentId || cls.department?.id || "",
      dayOfWeek: cls.dayOfWeek,
      startTime: format(new Date(cls.startTime), "HH:mm"),
      endTime: format(new Date(cls.endTime), "HH:mm"),
      room: cls.room,
    }
  }

  const selectedMeetingInfo = getSelectedClassMeetingInfo()

  if (loading) {
    return (
      <div className="flex h-[400px] w-full items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tight text-foreground">My Classes</h1>
        <p className="text-muted-foreground">Manage your assigned classes, subjects, and schedule.</p>
      </div>

      {/* Google Meet Quick Action Card */}
      <Card className="border-primary/20 bg-gradient-to-r from-primary/5 to-primary/10">
        <CardHeader className="pb-3">
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-lg bg-primary/10">
              <Video className="h-5 w-5 text-primary" />
            </div>
            <div>
              <CardTitle className="text-lg">Start Online Class</CardTitle>
              <CardDescription>Create a Google Meet session and notify students via email</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col sm:flex-row gap-3">
            <Select value={selectedClassId} onValueChange={setSelectedClassId}>
              <SelectTrigger className="flex-1">
                <SelectValue placeholder="Select a class to start meeting" />
              </SelectTrigger>
              <SelectContent>
                {uniqueClasses.map((cls) => (
                  <SelectItem key={cls.id} value={cls.id}>
                    {cls.subject?.name} - Sem {cls.semester}, Sec {cls.section}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {selectedMeetingInfo ? (
              <GoogleMeetDialog
                classInfo={selectedMeetingInfo}
                trigger={
                  <Button className="gap-2">
                    <Video className="h-4 w-4" />
                    Start Online Class
                  </Button>
                }
              />
            ) : (
              <Button disabled className="gap-2">
                <Video className="h-4 w-4" />
                Start Online Class
              </Button>
            )}
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="list" className="space-y-4">
        <TabsList className="bg-muted/50 p-1">
          <TabsTrigger value="list" className="flex items-center gap-2">
            <List className="h-4 w-4" /> Class List
          </TabsTrigger>
          <TabsTrigger value="mapping" className="flex items-center gap-2">
            <LayoutGrid className="h-4 w-4" /> Subject Mapping
          </TabsTrigger>
          <TabsTrigger value="timetable" className="flex items-center gap-2">
            <Calendar className="h-4 w-4" /> Class Timetable
          </TabsTrigger>
        </TabsList>

        <TabsContent value="list" className="space-y-4">
          <ClassList timetable={timetable} />
        </TabsContent>

        <TabsContent value="mapping" className="space-y-4">
          <SubjectMapping subjects={subjects} />
        </TabsContent>

        <TabsContent value="timetable" className="space-y-4">
          <div className="rounded-xl border bg-card/50 backdrop-blur-sm shadow-sm overflow-hidden">
            <div className="p-4 bg-muted/20 border-b flex items-center justify-between">
                <div>
                    <h2 className="text-lg font-semibold">Weekly Schedule</h2>
                    <p className="text-xs text-muted-foreground">Your academic timetable for the current semester</p>
                </div>
                <div className="flex gap-2">
                   {/* Add print or export buttons here if needed */}
                </div>
            </div>
            <div className="p-0">
                <ClassTimetable timetable={timetable} />
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
