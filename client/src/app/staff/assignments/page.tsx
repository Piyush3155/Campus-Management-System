"use client"

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { AssignmentList } from "@/components/staff-dashboard/assignment-list"
import { CreateAssignment } from "@/components/staff-dashboard/create-assignment"
import { SubmissionStatus } from "@/components/staff-dashboard/submission-status"
import { FilePlus, LayoutGrid, CheckCircle2, AlertCircle } from "lucide-react"

export default function AssignmentsPage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tight text-foreground">Assignments Management</h1>
        <p className="text-muted-foreground">Distribute learning materials, set deadlines, and track student submissions.</p>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        {[
            { label: "Active Assignments", value: "12", icon: LayoutGrid, color: "text-blue-600", bg: "bg-blue-50" },
            { label: "Pending Reviews", value: "24", icon: AlertCircle, color: "text-orange-600", bg: "bg-orange-50" },
            { label: "Completed Evaluations", value: "158", icon: CheckCircle2, color: "text-green-600", bg: "bg-green-50" },
        ].map((stat, i) => (
            <div key={i} className="p-4 rounded-xl border bg-card/40 backdrop-blur-sm flex items-center gap-4">
                <div className={`p-3 rounded-lg ${stat.bg} ${stat.color} dark:bg-white/5`}>
                    <stat.icon className="h-5 w-5" />
                </div>
                <div>
                    <p className="text-xs font-medium text-muted-foreground">{stat.label}</p>
                    <p className="text-2xl font-bold">{stat.value}</p>
                </div>
            </div>
        ))}
      </div>

      <Tabs defaultValue="list" className="space-y-4">
        <TabsList className="bg-muted/50 p-1">
          <TabsTrigger value="list" className="flex items-center gap-2">
            <LayoutGrid className="h-4 w-4" /> Assignment List
          </TabsTrigger>
          <TabsTrigger value="create" className="flex items-center gap-2">
            <FilePlus className="h-4 w-4" /> Create New Assignment
          </TabsTrigger>
          <TabsTrigger value="reviews" className="flex items-center gap-2">
            <AlertCircle className="h-4 w-4" /> Review Submissions
          </TabsTrigger>
        </TabsList>

        <TabsContent value="list" className="space-y-4">
          <AssignmentList />
        </TabsContent>

        <TabsContent value="create" className="space-y-4">
          <CreateAssignment />
        </TabsContent>

        <TabsContent value="reviews" className="space-y-4">
            <SubmissionStatus />
        </TabsContent>
      </Tabs>
    </div>
  )
}
