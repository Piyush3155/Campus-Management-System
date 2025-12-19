import {
  Users,
  BookOpen,
  ClipboardList,
  CalendarCheck,
} from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

const stats = [
  {
    title: "Total Classes Assigned",
    value: "8",
    icon: Users,
    description: "4 sections, 2 years",
    color: "text-blue-600",
  },
  {
    title: "Subjects Handled",
    value: "3",
    icon: BookOpen,
    description: "CS101, CS202, CS303",
    color: "text-green-600",
  },
  {
    title: "Assignments Pending Review",
    value: "24",
    icon: ClipboardList,
    description: "12 from CS101, 12 from CS202",
    color: "text-orange-600",
  },
  {
    title: "Today's Attendance Count",
    value: "142/150",
    icon: CalendarCheck,
    description: "Across all classes today",
    color: "text-purple-600",
  },
]

export function StaffStatsCards() {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {stats.map((stat) => (
        <Card key={stat.title} className="hover:shadow-md transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              {stat.title}
            </CardTitle>
            <stat.icon className={`h-4 w-4 ${stat.color}`} />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stat.value}</div>
            <p className="text-xs text-muted-foreground">
              {stat.description}
            </p>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
