import {
  Users,
  Briefcase,
  Building2,
  BookOpen,
  Activity,
  UserPlus,
} from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

const stats = [
  {
    title: "Total Students",
    value: "2,543",
    icon: Users,
    description: "+180 from last month",
  },
  {
    title: "Total Staff",
    value: "125",
    icon: Briefcase,
    description: "+4 new hires",
  },
  {
    title: "Total Departments",
    value: "12",
    icon: Building2,
    description: "Across 3 faculties",
  },
  {
    title: "Courses / Programs",
    value: "48",
    icon: BookOpen,
    description: "Active curriculum",
  },
  {
    title: "Active Users",
    value: "1,200",
    icon: Activity,
    description: "Currently online",
  },
  {
    title: "New Registrations",
    value: "24",
    icon: UserPlus,
    description: "Today",
  },
]

export function StatsCards() {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {stats.map((stat) => (
        <Card key={stat.title}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              {stat.title}
            </CardTitle>
            <stat.icon className="h-4 w-4 text-muted-foreground" />
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
