import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ClassList } from "@/components/staff-dashboard/class-list"
import { ClassTimetable } from "@/components/staff-dashboard/class-timetable"
import { SubjectMapping } from "@/components/staff-dashboard/subject-mapping"
import { LayoutGrid, List, Calendar } from "lucide-react"

export default function StaffClassesPage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tight text-foreground">My Classes</h1>
        <p className="text-muted-foreground">Manage your assigned classes, subjects, and schedule.</p>
      </div>

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
          <ClassList />
        </TabsContent>

        <TabsContent value="mapping" className="space-y-4">
          <SubjectMapping />
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
                <ClassTimetable />
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
