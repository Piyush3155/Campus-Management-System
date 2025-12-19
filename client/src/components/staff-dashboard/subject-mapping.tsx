import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { BookOpen, GraduationCap, School } from "lucide-react"

const subjectMappings = [
  {
    subject: "Mathematics (MT101)",
    department: "Applied Sciences",
    classes: ["Sec A - Year 1", "Sec D - Year 1"],
    credits: 4,
    type: "Theory",
  },
  {
    subject: "Physics (PH202)",
    department: "Physics Department",
    classes: ["Sec B - Year 2"],
    credits: 3,
    type: "Theory + Practical",
  },
  {
    subject: "Computer Science (CS303)",
    department: "Computer Engineering",
    classes: ["Sec C - Year 1"],
    credits: 4,
    type: "Theory",
  },
]

export function SubjectMapping() {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {subjectMappings.map((mapping, idx) => (
        <Card key={idx} className="bg-card hover:bg-muted/5 transition-colors">
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <BookOpen className="h-4 w-4 text-blue-500" />
              <Badge variant="secondary" className="text-[10px]">{mapping.type}</Badge>
            </div>
            <CardTitle className="text-lg font-bold mt-2">{mapping.subject}</CardTitle>
            <p className="text-sm text-muted-foreground flex items-center gap-1">
              <School className="h-3 w-3" /> {mapping.department}
            </p>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <GraduationCap className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm font-medium">Assigned Classes:</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {mapping.classes.map((cls, i) => (
                  <Badge key={i} variant="outline" className="bg-blue-50/50 dark:bg-blue-900/10">
                    {cls}
                  </Badge>
                ))}
              </div>
              <div className="pt-2 border-t flex justify-between items-center text-xs text-muted-foreground">
                <span>Credit Hours: {mapping.credits}</span>
                <span className="text-green-600 font-medium italic">Mapping Active</span>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
