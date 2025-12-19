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
import { FileText, Download, Edit, Trash2, FileType, Filter, Search } from "lucide-react"
import { Input } from "@/components/ui/input"

const notesData = [
  { id: 1, title: "Quantum Physics Introduction", subject: "Physics", semester: "Sem 3", format: "PDF", size: "2.4 MB", date: "2023-11-01" },
  { id: 2, title: "Data Structures - Trees & Graphs", subject: "Comp. Science", semester: "Sem 1", format: "PPT", size: "5.1 MB", date: "2023-10-28" },
  { id: 3, title: "Integral Calculus Formulas", subject: "Mathematics", semester: "Sem 1", format: "DOCX", size: "1.2 MB", date: "2023-10-25" },
  { id: 4, title: "Thermodynamics Laws", subject: "Physics", semester: "Sem 3", format: "PDF", size: "3.2 MB", date: "2023-10-20" },
]

export function NotesList() {
  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-4 items-center justify-between">
        <div className="flex gap-2 items-center w-full md:w-auto">
            <div className="relative w-full md:w-[300px]">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input placeholder="Search notes..." className="pl-9 bg-background/50" />
            </div>
            <Button variant="outline" size="icon">
                <Filter className="h-4 w-4" />
            </Button>
        </div>
        <div className="flex gap-2">
            <Badge variant="secondary" className="bg-blue-50 text-blue-700 dark:bg-blue-900/20">All Subjects</Badge>
            <Badge variant="outline">PDF Only</Badge>
        </div>
      </div>

      <div className="rounded-xl border bg-card/50 backdrop-blur-sm shadow-sm overflow-hidden">
        <Table>
          <TableHeader className="bg-muted/30">
            <TableRow>
              <TableHead className="pl-6">File Name</TableHead>
              <TableHead>Subject</TableHead>
              <TableHead>Semester</TableHead>
              <TableHead>Format</TableHead>
              <TableHead>Uploaded</TableHead>
              <TableHead className="text-right pr-6">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {notesData.map((note) => (
              <TableRow key={note.id} className="hover:bg-muted/10 transition-colors">
                <TableCell className="pl-6">
                  <div className="flex items-center gap-3">
                    <div className={`p-2 rounded-lg ${
                        note.format === 'PDF' ? 'bg-red-50 text-red-600' :
                        note.format === 'PPT' ? 'bg-orange-50 text-orange-600' :
                        'bg-blue-50 text-blue-600'
                    } dark:bg-white/5`}>
                        <FileType className="h-4 w-4" />
                    </div>
                    <div>
                        <p className="font-semibold text-sm">{note.title}</p>
                        <p className="text-[10px] text-muted-foreground">{note.size}</p>
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <Badge variant="outline" className="font-normal">{note.subject}</Badge>
                </TableCell>
                <TableCell className="text-sm font-medium">{note.semester}</TableCell>
                <TableCell>
                    <span className="text-xs font-mono px-1.5 py-0.5 rounded bg-muted/30">{note.format}</span>
                </TableCell>
                <TableCell className="text-sm text-muted-foreground">{note.date}</TableCell>
                <TableCell className="text-right pr-6">
                  <div className="flex justify-end gap-1">
                    <Button variant="ghost" size="icon" className="h-8 w-8 text-blue-600">
                      <Download className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon" className="h-8 w-8 text-slate-600">
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon" className="h-8 w-8 text-red-600">
                      <Trash2 className="h-4 w-4" />
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
