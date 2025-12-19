"use client"

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ExamSchedule } from "@/components/staff-dashboard/exam-schedule"
import { EnterMarks } from "@/components/staff-dashboard/enter-marks"
import { ClassResultsSummary } from "@/components/staff-dashboard/results-summary"
import { ClipboardList, Calendar, PieChart, PenTool } from "lucide-react"

export default function ExamsPage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tight text-foreground">Exams & Grading</h1>
        <p className="text-muted-foreground">Manage examination schedules and evaluate student performance.</p>
      </div>

      <Tabs defaultValue="schedule" className="space-y-4">
        <TabsList className="bg-muted/50 p-1">
          <TabsTrigger value="schedule" className="flex items-center gap-2">
            <Calendar className="h-4 w-4" /> Exam Schedule
          </TabsTrigger>
          <TabsTrigger value="entry" className="flex items-center gap-2">
            <PenTool className="h-4 w-4" /> Enter Marks
          </TabsTrigger>
          <TabsTrigger value="summary" className="flex items-center gap-2">
            <PieChart className="h-4 w-4" /> Class-wise Results
          </TabsTrigger>
        </TabsList>

        <TabsContent value="schedule" className="space-y-4">
          <ExamSchedule />
        </TabsContent>

        <TabsContent value="entry" className="space-y-4">
          <EnterMarks />
        </TabsContent>

        <TabsContent value="summary" className="space-y-4">
          <div className="flex flex-col gap-6">
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-xl font-bold italic">Academic performance overview</h2>
                    <p className="text-sm text-muted-foreground">Summary of results for the current semester exams.</p>
                </div>
            </div>
            <ClassResultsSummary />
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
