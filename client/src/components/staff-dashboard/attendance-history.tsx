import { useState } from "react"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Search, Calendar as CalendarIcon, Filter } from "lucide-react"

const historyData = [
  { id: 1, date: "2023-10-20", class: "Mathematics (Sec A)", present: 42, absent: 3, total: 45, status: "Completed" },
  { id: 2, date: "2023-10-19", class: "Physics (Sec B)", present: 35, absent: 3, total: 38, status: "Completed" },
  { id: 3, date: "2023-10-18", class: "CS (Sec C)", present: 50, absent: 2, total: 52, status: "Completed" },
  { id: 4, date: "2023-10-17", class: "Mathematics (Sec A)", present: 40, absent: 5, total: 45, status: "Completed" },
  { id: 5, date: "2023-10-16", class: "Physics (Sec B)", present: 38, absent: 0, total: 38, status: "Completed" },
]

export function AttendanceHistory() {
  const [filterClass, setFilterClass] = useState("all")

  const filteredData = filterClass === "all" 
    ? historyData 
    : historyData.filter(h => h.class.includes(filterClass))

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap gap-4 items-center justify-between">
        <div className="flex gap-4 items-center">
            <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <input 
                    type="text" 
                    placeholder="Search records..." 
                    className="pl-9 pr-4 py-2 text-sm border rounded-md bg-background focus:outline-none focus:ring-2 focus:ring-blue-500 w-[250px]"
                />
            </div>
            <Select defaultValue="all" onValueChange={setFilterClass}>
                <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Filter by Class" />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="all">All Classes</SelectItem>
                    <SelectItem value="Mathematics">Mathematics</SelectItem>
                    <SelectItem value="Physics">Physics</SelectItem>
                    <SelectItem value="CS">Computer Science</SelectItem>
                </SelectContent>
            </Select>
        </div>
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Filter className="h-4 w-4" />
            <span>Showing {filteredData.length} records</span>
        </div>
      </div>

      <Card className="bg-card/50 backdrop-blur-sm border-none shadow-md overflow-hidden">
        <CardContent className="p-0">
          <Table>
            <TableHeader className="bg-muted/30">
              <TableRow>
                <TableHead className="pl-6">Date</TableHead>
                <TableHead>Class / Section</TableHead>
                <TableHead>Attendance (P/T)</TableHead>
                <TableHead>Percentage</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right pr-6">Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredData.map((record) => {
                const percentage = Math.round((record.present / record.total) * 100)
                return (
                  <TableRow key={record.id} className="hover:bg-muted/20">
                    <TableCell className="pl-6 font-medium">
                        <div className="flex items-center gap-2">
                            <CalendarIcon className="h-4 w-4 text-blue-500" />
                            {record.date}
                        </div>
                    </TableCell>
                    <TableCell>{record.class}</TableCell>
                    <TableCell>
                        <span className="font-semibold text-green-600">{record.present}</span>
                        <span className="text-muted-foreground mx-1">/</span>
                        <span className="text-muted-foreground">{record.total}</span>
                    </TableCell>
                    <TableCell>
                        <div className="flex items-center gap-2">
                            <div className="w-24 h-2 bg-muted rounded-full overflow-hidden">
                                <div 
                                    className={`h-full ${percentage > 90 ? 'bg-green-500' : percentage > 75 ? 'bg-blue-500' : 'bg-orange-500'}`} 
                                    style={{ width: `${percentage}%` }}
                                />
                            </div>
                            <span className="text-xs font-medium">{percentage}%</span>
                        </div>
                    </TableCell>
                    <TableCell>
                        <Badge variant="secondary" className="bg-blue-50 text-blue-700 border-none font-normal italic">
                            {record.status}
                        </Badge>
                    </TableCell>
                    <TableCell className="text-right pr-6">
                        <button className="text-sm font-medium text-blue-600 hover:underline">View Details</button>
                    </TableCell>
                  </TableRow>
                )
              })}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}
