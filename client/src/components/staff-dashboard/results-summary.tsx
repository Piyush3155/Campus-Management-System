import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { TrendingUp, Users, Award, AlertCircle, PieChart } from "lucide-react"

import { ResultOverview } from "@/app/actions/exams/types"

export function ClassResultsSummary({ results = [] }: { results?: ResultOverview[] }) {
  if (results.length === 0) {
    return (
      <Card className="bg-card/40 backdrop-blur-sm border-dashed border-2 flex flex-col items-center justify-center p-12 text-center text-muted-foreground">
        <PieChart className="h-10 w-10 mb-2 opacity-20" />
        <p>No results overview available yet.</p>
        <p className="text-xs">Individual classroom results will appear here once published.</p>
      </Card>
    )
  }

  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {results.map((res, i) => {
        const passPercentage = res.totalStudents > 0 ? Math.round((res.passed / res.totalStudents) * 100) : 0
        return (
          <Card key={i} className="bg-card/40 backdrop-blur-sm border-none shadow-lg hover:bg-card/60 transition-all cursor-default">
            <CardHeader className="pb-3">
              <div className="flex justify-between items-start">
                <CardTitle className="text-lg font-bold">{res.subject}</CardTitle>
                <Badge className={
                  res.published
                    ? 'bg-green-100 text-green-700 border-none'
                    : 'bg-orange-100 text-orange-700 border-none'
                }>
                  {res.published ? 'Published' : 'Draft'}
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <p className="text-[10px] text-muted-foreground uppercase tracking-wider font-semibold">Average Grade</p>
                  <div className="flex items-center gap-2">
                    <TrendingUp className="h-4 w-4 text-blue-500" />
                    <span className="text-xl font-bold">{res.avgGrade}</span>
                  </div>
                </div>
                <div className="space-y-1">
                  <p className="text-[10px] text-muted-foreground uppercase tracking-wider font-semibold">Total Students</p>
                  <div className="flex items-center gap-2">
                    <Users className="h-4 w-4 text-purple-500" />
                    <span className="text-xl font-bold">{res.totalStudents}</span>
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between items-center text-xs">
                  <span className="text-muted-foreground flex items-center gap-1">
                    <Award className="h-3 w-3" /> Pass Percentage
                  </span>
                  <span className="font-bold">{passPercentage}%</span>
                </div>
                <div className="w-full h-1.5 bg-muted rounded-full overflow-hidden">
                  <div
                    className="h-full bg-blue-600 transition-all duration-500"
                    style={{ width: `${passPercentage}%` }}
                  />
                </div>
              </div>

              <div className="pt-2 border-t flex justify-end">
                <button className="text-[10px] font-bold text-blue-600 hover:underline uppercase tracking-tight">Generate Detailed Report</button>
              </div>
            </CardContent>
          </Card>
        )
      })}
      <Card className="border-dashed border-2 bg-muted/5 flex flex-col items-center justify-center p-6 text-center text-muted-foreground opacity-60">
        <AlertCircle className="h-8 w-8 mb-2" />
        <p className="text-sm font-medium">Add New Class Result</p>
      </Card>
    </div>
  )
}
