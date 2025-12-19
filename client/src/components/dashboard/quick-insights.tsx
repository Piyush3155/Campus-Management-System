"use client"

import {
  Bar,
  BarChart,
  ResponsiveContainer,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"

const studentData = [
  { name: "CS", total: 450 },
  { name: "Eng", total: 300 },
  { name: "Math", total: 200 },
  { name: "Sci", total: 350 },
  { name: "Arts", total: 150 },
]

const staffData = [
  { name: "CS", total: 20 },
  { name: "Eng", total: 15 },
  { name: "Math", total: 10 },
  { name: "Sci", total: 18 },
  { name: "Arts", total: 8 },
]

const upcomingEvents = [
  {
    title: "Mid-Term Exams",
    date: "Dec 24, 2025",
    type: "Exam",
  },
  {
    title: "Staff Meeting",
    date: "Dec 26, 2025",
    type: "Meeting",
  },
  {
    title: "New Year Holiday",
    date: "Jan 01, 2026",
    type: "Holiday",
  },
]

export function QuickInsights() {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
      <Card className="col-span-4">
        <CardHeader>
          <CardTitle>Department Statistics</CardTitle>
          <CardDescription>
            Distribution across departments
          </CardDescription>
        </CardHeader>
        <CardContent className="pl-2">
          <Tabs defaultValue="students" className="space-y-4">
            <TabsList>
              <TabsTrigger value="students">Students</TabsTrigger>
              <TabsTrigger value="staff">Staff</TabsTrigger>
            </TabsList>
            <TabsContent value="students" className="space-y-4">
              <ResponsiveContainer width="100%" height={350}>
                <BarChart data={studentData}>
                  <XAxis
                    dataKey="name"
                    stroke="#888888"
                    fontSize={12}
                    tickLine={false}
                    axisLine={false}
                  />
                  <YAxis
                    stroke="#888888"
                    fontSize={12}
                    tickLine={false}
                    axisLine={false}
                    tickFormatter={(value) => `${value}`}
                  />
                  <Tooltip 
                    cursor={{ fill: 'transparent' }}
                    contentStyle={{ borderRadius: '8px' }}
                  />
                  <Bar
                    dataKey="total"
                    fill="currentColor"
                    radius={[4, 4, 0, 0]}
                    className="fill-primary"
                  />
                </BarChart>
              </ResponsiveContainer>
            </TabsContent>
            <TabsContent value="staff" className="space-y-4">
              <ResponsiveContainer width="100%" height={350}>
                <BarChart data={staffData}>
                  <XAxis
                    dataKey="name"
                    stroke="#888888"
                    fontSize={12}
                    tickLine={false}
                    axisLine={false}
                  />
                  <YAxis
                    stroke="#888888"
                    fontSize={12}
                    tickLine={false}
                    axisLine={false}
                    tickFormatter={(value) => `${value}`}
                  />
                  <Tooltip 
                    cursor={{ fill: 'transparent' }}
                    contentStyle={{ borderRadius: '8px' }}
                  />
                  <Bar
                    dataKey="total"
                    fill="currentColor"
                    radius={[4, 4, 0, 0]}
                    className="fill-primary"
                  />
                </BarChart>
              </ResponsiveContainer>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
      <Card className="col-span-3">
        <CardHeader>
          <CardTitle>Recent Activity</CardTitle>
          <CardDescription>
            Upcoming exams and events
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
              <div className="flex items-center">
                  <div className="ml-4 space-y-1">
                      <p className="text-sm font-medium leading-none">Overall Attendance</p>
                      <p className="text-sm text-muted-foreground">
                          85% average today
                      </p>
                  </div>
                  <div className="ml-auto font-medium text-green-500">Good</div>
              </div>
              <div className="h-[250px] overflow-y-auto pr-2">
                  <div className="space-y-4">
                      {upcomingEvents.map((event, i) => (
                          <div key={i} className="flex items-center border-b pb-4 last:border-0 last:pb-0">
                              <div className="space-y-1">
                                  <p className="text-sm font-medium leading-none">
                                      {event.title}
                                  </p>
                                  <p className="text-sm text-muted-foreground">
                                      {event.date} • {event.type}
                                  </p>
                              </div>
                          </div>
                      ))}
                  </div>
              </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
