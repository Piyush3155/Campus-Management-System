import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { FileUp, Calendar as CalendarIcon, Info } from "lucide-react"

export function CreateAssignment() {
  return (
    <div className="grid gap-6 lg:grid-cols-3">
      <div className="lg:col-span-2 space-y-6">
        <Card className="bg-card/50 backdrop-blur-sm border-none shadow-md">
          <CardHeader>
            <CardTitle>Assignment Details</CardTitle>
            <CardDescription>Enter the title and instructions for the students.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Assignment Title</label>
              <Input placeholder="e.g. Introduction to Thermal Physics" className="bg-background/50" />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Instructions (Markdown supported)</label>
              <Textarea 
                placeholder="Detail what students need to do..." 
                className="min-h-[200px] bg-background/50 resize-none" 
              />
            </div>
            <div className="p-4 rounded-lg bg-blue-50/50 border border-blue-100 dark:bg-blue-900/10 dark:border-blue-800 flex gap-3">
                <Info className="h-5 w-5 text-blue-600 mt-0.5" />
                <div className="text-xs text-blue-700 dark:text-blue-400 space-y-1">
                    <p className="font-semibold">Teacher Tip:</p>
                    <p>Be specific about formatting requirements and deadline expectations to reduce student queries.</p>
                </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-card/50 backdrop-blur-sm border-none shadow-md">
          <CardHeader>
            <CardTitle>Attachments</CardTitle>
            <CardDescription>Upload reference materials or question papers.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="border-2 border-dashed border-muted rounded-xl p-10 flex flex-col items-center justify-center text-center space-y-3 hover:bg-muted/10 transition-colors cursor-pointer group">
                <div className="h-12 w-12 rounded-full bg-blue-50 dark:bg-blue-900/20 flex items-center justify-center group-hover:scale-110 transition-transform">
                    <FileUp className="h-6 w-6 text-blue-600" />
                </div>
                <div>
                    <p className="font-medium">Click to upload or drag and drop</p>
                    <p className="text-xs text-muted-foreground mt-1">PDF, DOCX, ZIP or Images (Max 10MB)</p>
                </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="space-y-6">
        <Card className="bg-card/50 backdrop-blur-sm border-none shadow-md">
          <CardHeader>
            <CardTitle>Configuration</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Select Class</label>
              <Select>
                <SelectTrigger className="bg-background/50">
                  <SelectValue placeholder="Select Class" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="CS101">Mathematics (Sec A)</SelectItem>
                  <SelectItem value="CS202">Physics (Sec B)</SelectItem>
                  <SelectItem value="CS303">CS (Sec C)</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Points / Weightage</label>
              <Input type="number" placeholder="100" className="bg-background/50" />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Due Date</label>
              <div className="relative">
                <Input type="date" className="bg-background/50 pl-10" />
                <CalendarIcon className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
              </div>
            </div>

            <div className="pt-4 space-y-2">
                <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white">Publish Assignment</Button>
                <Button variant="outline" className="w-full">Save as Draft</Button>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-slate-900 border-none shadow-xl text-white">
            <CardHeader>
                <CardTitle className="text-sm font-semibold opacity-80 uppercase tracking-wider">Quick Preview</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
                <div className="p-3 bg-white/5 rounded-lg border border-white/10">
                    <p className="text-[10px] opacity-40 uppercase">Visibility</p>
                    <p className="text-sm font-medium">All students in selected class</p>
                </div>
                <div className="p-3 bg-white/5 rounded-lg border border-white/10">
                    <p className="text-[10px] opacity-40 uppercase">Late Submission</p>
                    <p className="text-sm font-medium">Allowed (with penalty)</p>
                </div>
            </CardContent>
        </Card>
      </div>
    </div>
  )
}
