import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Building2, Layers, AlertCircle, ArrowRight } from "lucide-react"

const deptNotices = [
  {
    id: 1,
    dept: "Computer Science",
    title: "New Lab Equipment Arrival",
    date: "2023-11-21",
    priority: "Standard",
    message: "New high-performance computing clusters have arrived. Please attend the orientation session on Friday."
  },
  {
    id: 2,
    dept: "Physics Department",
    title: "Syllabus Review Meeting",
    date: "2023-11-20",
    priority: "Crucial",
    message: "All faculty members are required to attend the syllabus review meeting for the upcoming semester in Conference Room B."
  },
  {
    id: 3,
    dept: "Applied Sciences",
    title: "Workshop on Nanotech",
    date: "2023-11-19",
    priority: "Optional",
    message: "A guest lecture followed by a hands-on workshop on nanotechnology applications is scheduled for next Tuesday."
  }
]

export function DepartmentNotices() {
  return (
    <div className="grid gap-4">
      {deptNotices.map((notice) => (
        <Card key={notice.id} className="group relative overflow-hidden bg-card/40 backdrop-blur-sm border-none shadow-sm hover:translate-x-1 transition-all border-l-4 border-l-blue-500">
          <CardContent className="p-5 flex flex-col md:flex-row gap-4 items-start">
            <div className="p-3 rounded-xl bg-blue-50 dark:bg-white/5 text-blue-600">
               <Building2 className="h-6 w-6" />
            </div>
            <div className="flex-1 space-y-1">
              <div className="flex items-center justify-between">
                <span className="text-[10px] uppercase font-bold tracking-widest text-muted-foreground">{notice.dept}</span>
                <Badge variant="outline" className={`text-[10px] ${
                  notice.priority === 'Crucial' ? 'border-red-500 text-red-500' : 
                  notice.priority === 'Standard' ? 'border-blue-500 text-blue-500' :
                  'border-green-500 text-green-500'
                }`}>
                  {notice.priority}
                </Badge>
              </div>
              <h3 className="font-bold text-lg">{notice.title}</h3>
              <p className="text-sm text-foreground/70">{notice.message}</p>
              <div className="flex items-center justify-between pt-2">
                <span className="text-xs text-muted-foreground italic">Posted: {notice.date}</span>
                <button className="flex items-center gap-1 text-xs font-bold text-blue-600 opacity-0 group-hover:opacity-100 transition-opacity">
                   Read Full Notice <ArrowRight className="h-3 w-3" />
                </button>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
