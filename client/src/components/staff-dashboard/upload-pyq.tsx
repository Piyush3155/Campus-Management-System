import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { FileUp, BookOpen, Calendar, ShieldCheck } from "lucide-react"

export function UploadPYQ() {
  return (
    <div className="grid gap-6 lg:grid-cols-3">
      <div className="lg:col-span-2 space-y-6">
        <Card className="bg-card/50 backdrop-blur-sm border-none shadow-md">
          <CardHeader>
            <CardTitle>PYQ Details</CardTitle>
            <CardDescription>Enter details about the question paper.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Paper Name / Title</label>
              <Input placeholder="e.g., End Semester - Mathematics 1" className="bg-background/50" />
            </div>
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <label className="text-sm font-medium">Subject</label>
                <Select>
                  <SelectTrigger className="bg-background/50">
                    <SelectValue placeholder="Select Subject" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="math">Mathematics</SelectItem>
                    <SelectItem value="physics">Physics</SelectItem>
                    <SelectItem value="cs">Computer Science</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Exam Year</label>
                <Select>
                  <SelectTrigger className="bg-background/50">
                    <SelectValue placeholder="Select Year" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="2024">2024</SelectItem>
                    <SelectItem value="2023">2023</SelectItem>
                    <SelectItem value="2022">2022</SelectItem>
                    <SelectItem value="2021">2021</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <label className="text-sm font-medium">Semester</label>
                <Select>
                  <SelectTrigger className="bg-background/50">
                    <SelectValue placeholder="Select Semester" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1">Semester 1</SelectItem>
                    <SelectItem value="2">Semester 2</SelectItem>
                    <SelectItem value="3">Semester 3</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Exam Type</label>
                <Select>
                  <SelectTrigger className="bg-background/50">
                    <SelectValue placeholder="Select Type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="main">Main Exam</SelectItem>
                    <SelectItem value="sessional">Sessional</SelectItem>
                    <SelectItem value="backlog">Backlog / Supplementary</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-card/50 backdrop-blur-sm border-none shadow-md">
          <CardHeader>
            <CardTitle>File Upload</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="border-2 border-dashed border-muted rounded-xl p-12 flex flex-col items-center justify-center text-center space-y-4 hover:bg-muted/10 transition-colors cursor-pointer group">
                <div className="h-14 w-14 rounded-full bg-blue-50 dark:bg-blue-900/20 flex items-center justify-center group-hover:scale-110 transition-transform">
                    <FileUp className="h-7 w-7 text-blue-600" />
                </div>
                <div>
                    <p className="font-medium">Upload question paper</p>
                    <p className="text-xs text-muted-foreground mt-1">PDF format highly recommended (Max 15MB)</p>
                </div>
                <Button variant="secondary" size="sm">Select File</Button>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="space-y-6">
        <Card className="bg-slate-900 border-none shadow-xl text-white">
          <CardHeader>
             <CardTitle className="text-sm font-semibold opacity-80 uppercase tracking-wider">Guidelines</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
                <div className="flex gap-2 items-start">
                    <ShieldCheck className="h-4 w-4 text-green-400 mt-1 shrink-0" />
                    <p className="text-xs opacity-70">Ensure all pages are scanned clearly and in order.</p>
                </div>
                <div className="flex gap-2 items-start">
                    <BookOpen className="h-4 w-4 text-blue-400 mt-1 shrink-0" />
                    <p className="text-xs opacity-70">Avoid uploading password-protected PDF files.</p>
                </div>
                <div className="flex gap-2 items-start">
                    <Calendar className="h-4 w-4 text-orange-400 mt-1 shrink-0" />
                    <p className="text-xs opacity-70">Label the paper with correct year and exam type for better indexing.</p>
                </div>
            </div>
            <div className="pt-4 border-t border-white/10">
                <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white">Submit for Review</Button>
                <Button variant="ghost" className="w-full mt-2 text-white/60">Cancel</Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
