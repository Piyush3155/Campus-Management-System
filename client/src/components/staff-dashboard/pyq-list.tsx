import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { FileText, Download, Eye, Search, Filter, Calendar } from "lucide-react"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

const pyqData = [
  { id: 1, title: "End Semester Examination", subject: "Mathematics", year: "2023", semester: "Sem 1", type: "Main Exam" },
  { id: 2, title: "Mid-Term Assessment", subject: "Physics", year: "2023", semester: "Sem 3", type: "Sessional" },
  { id: 3, title: "End Semester Examination", subject: "Comp. Science", year: "2022", semester: "Sem 1", type: "Main Exam" },
  { id: 4, title: "Supplementary Exam", subject: "Mathematics", year: "2022", semester: "Sem 2", type: "Backlog" },
  { id: 5, title: "End Semester Examination", subject: "Physics", year: "2021", semester: "Sem 3", type: "Main Exam" },
]

export function PYQList() {
  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-4 items-center justify-between">
        <div className="flex gap-2 items-center w-full md:w-auto">
            <div className="relative w-full md:w-[300px]">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input placeholder="Search question papers..." className="pl-9 bg-background/50" />
            </div>
            <Select defaultValue="all">
                <SelectTrigger className="w-[130px] bg-background/50">
                    <SelectValue placeholder="Year" />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="all">All Years</SelectItem>
                    <SelectItem value="2023">2023</SelectItem>
                    <SelectItem value="2022">2022</SelectItem>
                    <SelectItem value="2021">2021</SelectItem>
                </SelectContent>
            </Select>
            <Button variant="outline" size="icon">
                <Filter className="h-4 w-4" />
            </Button>
        </div>
        <div className="flex gap-2">
            <Badge variant="secondary" className="bg-blue-50 text-blue-700 dark:bg-blue-900/20">University Papers</Badge>
            <Badge variant="outline">Official</Badge>
        </div>
      </div>

      <div className="rounded-xl border bg-card/50 backdrop-blur-sm shadow-sm overflow-hidden">
        <Table>
          <TableHeader className="bg-muted/30">
            <TableRow>
              <TableHead className="pl-6">Paper Title</TableHead>
              <TableHead>Subject</TableHead>
              <TableHead>Semester</TableHead>
              <TableHead>Year</TableHead>
              <TableHead>Exam Type</TableHead>
              <TableHead className="text-right pr-6">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {pyqData.map((paper) => (
              <TableRow key={paper.id} className="hover:bg-muted/10 transition-colors">
                <TableCell className="pl-6 font-medium">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-blue-50 text-blue-600 dark:bg-white/5">
                        <FileText className="h-4 w-4" />
                    </div>
                    <span>{paper.title}</span>
                  </div>
                </TableCell>
                <TableCell>
                  <Badge variant="outline" className="font-normal">{paper.subject}</Badge>
                </TableCell>
                <TableCell className="text-sm">{paper.semester}</TableCell>
                <TableCell>
                    <div className="flex items-center gap-1.5 text-sm font-semibold">
                        <Calendar className="h-3.5 w-3.5 text-muted-foreground" />
                        {paper.year}
                    </div>
                </TableCell>
                <TableCell>
                    <Badge className={
                        paper.type === 'Main Exam' ? 'bg-green-100 text-green-700 border-none' :
                        paper.type === 'Sessional' ? 'bg-blue-100 text-blue-700 border-none' :
                        'bg-orange-100 text-orange-700 border-none'
                    }>
                        {paper.type}
                    </Badge>
                </TableCell>
                <TableCell className="text-right pr-6">
                  <div className="flex justify-end gap-1">
                    <Button variant="ghost" size="icon" className="h-8 w-8 text-blue-600">
                      <Eye className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon" className="h-8 w-8 text-slate-600">
                      <Download className="h-4 w-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}
