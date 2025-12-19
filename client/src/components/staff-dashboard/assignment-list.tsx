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
import { Edit, Eye, MoreHorizontal, Users, Calendar } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

const assignments = [
  {
    id: "ASN001",
    title: "Calculus Problem Set 1",
    class: "Mathematics Sec A",
    dueDate: "2023-11-05",
    submissions: "42/45",
    status: "Published",
  },
  {
    id: "ASN002",
    title: "Newtonian Mechanics Lab",
    class: "Physics Sec B",
    dueDate: "2023-11-10",
    submissions: "15/38",
    status: "Published",
  },
  {
    id: "ASN003",
    title: "React Hooks Research",
    class: "Computer Science Sec C",
    dueDate: "2023-11-15",
    submissions: "0/52",
    status: "Draft",
  },
]

export function AssignmentList() {
  return (
    <div className="rounded-md border bg-card/50 backdrop-blur-sm shadow-sm overflow-hidden">
      <Table>
        <TableHeader className="bg-muted/30">
          <TableRow>
            <TableHead className="pl-6">Title</TableHead>
            <TableHead>Class / Section</TableHead>
            <TableHead>Due Date</TableHead>
            <TableHead>Submissions</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="text-right pr-6">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {assignments.map((asn) => (
            <TableRow key={asn.id} className="hover:bg-muted/10 transition-colors">
              <TableCell className="pl-6">
                <div className="font-semibold">{asn.title}</div>
                <div className="text-[10px] text-muted-foreground font-mono">{asn.id}</div>
              </TableCell>
              <TableCell>
                <Badge variant="outline" className="font-normal">{asn.class}</Badge>
              </TableCell>
              <TableCell>
                <div className="flex items-center gap-1.5 text-sm">
                    <Calendar className="h-3.5 w-3.5 text-muted-foreground" />
                    {asn.dueDate}
                </div>
              </TableCell>
              <TableCell>
                <div className="flex items-center gap-1.5">
                    <Users className="h-3.5 w-3.5 text-muted-foreground" />
                    <span className="text-sm font-medium">{asn.submissions}</span>
                    <span className="text-[10px] text-muted-foreground">({Math.round(parseInt(asn.submissions.split('/')[0])/parseInt(asn.submissions.split('/')[1])*100) || 0}%)</span>
                </div>
              </TableCell>
              <TableCell>
                <Badge className={
                    asn.status === "Published" 
                    ? "bg-green-100 text-green-700 border-none" 
                    : "bg-slate-100 text-slate-700 border-none"
                }>
                    {asn.status}
                </Badge>
              </TableCell>
              <TableCell className="text-right pr-6">
                <div className="flex justify-end gap-2">
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                        <Eye className="h-4 w-4 text-blue-600" />
                    </Button>
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                        <Edit className="h-4 w-4 text-slate-600" />
                    </Button>
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon" className="h-8 w-8">
                                <MoreHorizontal className="h-4 w-4" />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                            <DropdownMenuLabel>Options</DropdownMenuLabel>
                            <DropdownMenuItem>View Submission Details</DropdownMenuItem>
                            <DropdownMenuItem>Export as CSV</DropdownMenuItem>
                            <DropdownMenuItem className="text-red-600">Delete Assignment</DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}
