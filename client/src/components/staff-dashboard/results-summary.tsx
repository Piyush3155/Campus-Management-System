import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { TrendingUp, Users, Award, AlertCircle } from "lucide-react"

const results = [
  { class: "Mathematics Sec A", avg: 78, highest: 98, passPercentage: 94, status: "Published" },
  { class: "Physics Sec B", avg: 65, highest: 92, passPercentage: 88, status: "Under Review" },
  { class: "CS Sec C", avg: 85, highest: 100, passPercentage: 96, status: "Published" },
]

export function ClassResultsSummary() {
  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {results.map((res, i) => (
        <Card key={i} className="bg-card/40 backdrop-blur-sm border-none shadow-lg hover:bg-card/60 transition-all cursor-default">
          <CardHeader className="pb-3">
            <div className="flex justify-between items-start">
                <CardTitle className="text-lg font-bold">{res.class}</CardTitle>
                <Badge className={
                    res.status === 'Published' 
                    ? 'bg-green-100 text-green-700 border-none' 
                    : 'bg-orange-100 text-orange-700 border-none'
                }>
                    {res.status}
                </Badge>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                    <p className="text-[10px] text-muted-foreground uppercase tracking-wider font-semibold">Average Score</p>
                    <div className="flex items-center gap-2">
                        <TrendingUp className="h-4 w-4 text-blue-500" />
                        <span className="text-xl font-bold">{res.avg}%</span>
                    </div>
                </div>
                <div className="space-y-1">
                    <p className="text-[10px] text-muted-foreground uppercase tracking-wider font-semibold">Highest Score</p>
                    <div className="flex items-center gap-2">
                        <Award className="h-4 w-4 text-purple-500" />
                        <span className="text-xl font-bold">{res.highest}</span>
                    </div>
                </div>
            </div>
            
            <div className="space-y-2">
                <div className="flex justify-between items-center text-xs">
                    <span className="text-muted-foreground flex items-center gap-1">
                        <Users className="h-3 w-3" /> Pass Percentage
                    </span>
                    <span className="font-bold">{res.passPercentage}%</span>
                </div>
                <div className="w-full h-1.5 bg-muted rounded-full overflow-hidden">
                    <div 
                        className="h-full bg-blue-600 transition-all duration-500" 
                        style={{ width: `${res.passPercentage}%` }}
                    />
                </div>
            </div>
            
            <div className="pt-2 border-t flex justify-end">
                <button className="text-[10px] font-bold text-blue-600 hover:underline uppercase tracking-tight">Generate Detailed Report</button>
            </div>
          </CardContent>
        </Card>
      ))}
      <Card className="border-dashed border-2 bg-muted/5 flex flex-col items-center justify-center p-6 text-center text-muted-foreground opacity-60">
        <AlertCircle className="h-8 w-8 mb-2" />
        <p className="text-sm font-medium">Add New Class Result</p>
      </Card>
    </div>
  )
}
