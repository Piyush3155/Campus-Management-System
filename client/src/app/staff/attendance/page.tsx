"use client"

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { MarkAttendance } from "@/components/staff-dashboard/mark-attendance"
import { AttendanceHistory } from "@/components/staff-dashboard/attendance-history"
import { UserCheck, History, BarChart3, CalendarDays } from "lucide-react"

export default function AttendancePage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tight text-foreground">Attendance Management</h1>
        <p className="text-muted-foreground">Mark daily attendance and monitor student participation.</p>
      </div>

      <Tabs defaultValue="mark" className="space-y-4">
        <TabsList className="bg-muted/50 p-1">
          <TabsTrigger value="mark" className="flex items-center gap-2">
            <UserCheck className="h-4 w-4" /> Mark Attendance
          </TabsTrigger>
          <TabsTrigger value="history" className="flex items-center gap-2">
            <History className="h-4 w-4" /> Attendance History
          </TabsTrigger>
          <TabsTrigger value="analytics" className="flex items-center gap-2">
            <BarChart3 className="h-4 w-4" /> Class-wise Reports
          </TabsTrigger>
          <TabsTrigger value="calendar" className="flex items-center gap-2">
            <CalendarDays className="h-4 w-4" /> Date-wise View
          </TabsTrigger>
        </TabsList>

        <TabsContent value="mark" className="space-y-4">
          <MarkAttendance />
        </TabsContent>

        <TabsContent value="history" className="space-y-4">
          <AttendanceHistory />
        </TabsContent>

        <TabsContent value="analytics" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            {/* Placeholder for analytics cards */}
            {[
              { class: "Mathematics Sec A", avg: "94%", trend: "+2% from last week" },
              { class: "Physics Sec B", avg: "88%", trend: "-1% from last week" },
              { class: "Computer Science Sec C", avg: "96%", trend: "Stable" },
              { class: "Mathematics Sec D", avg: "91%", trend: "+4% from last week" },
            ].map((stat, i) => (
              <div key={i} className="p-6 rounded-xl border bg-card/50 backdrop-blur-sm shadow-sm flex items-center justify-between">
                <div>
                    <h3 className="font-semibold text-lg">{stat.class}</h3>
                    <p className="text-sm text-muted-foreground">Average Attendance</p>
                </div>
                <div className="text-right">
                    <div className="text-2xl font-bold text-blue-600">{stat.avg}</div>
                    <p className={`text-[10px] ${stat.trend.includes('+') ? 'text-green-600' : stat.trend.includes('-') ? 'text-red-600' : 'text-blue-600'}`}>
                        {stat.trend}
                    </p>
                </div>
              </div>
            ))}
          </div>
          <div className="h-[300px] flex items-center justify-center text-muted-foreground border-2 border-dashed rounded-xl bg-muted/5">
                Detailed Class Performance Charts (Coming Soon)
          </div>
        </TabsContent>

        <TabsContent value="calendar" className="space-y-4">
            <div className="p-8 rounded-xl border bg-card/50 backdrop-blur-sm shadow-sm flex flex-col items-center justify-center text-center">
                <CalendarDays className="h-12 w-12 text-muted-foreground/30 mb-4" />
                <h2 className="text-xl font-semibold">Calendar Attendance View</h2>
                <p className="text-muted-foreground max-w-md mx-auto mt-2">
                    A visual calendar representation of your attendance sessions. This view will help you identify patterns and gaps in daily records.
                </p>
                <div className="mt-6 p-4 border rounded-lg bg-muted/20 w-full max-w-lg">
                    <p className="text-sm font-mono text-muted-foreground">Feature in development...</p>
                </div>
            </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
