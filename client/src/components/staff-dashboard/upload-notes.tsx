import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { FileUp, BookOpen, Layers, Info } from "lucide-react"

export function UploadNotes() {
  return (
    <div className="grid gap-6 lg:grid-cols-3">
      <div className="lg:col-span-2 space-y-6">
        <Card className="bg-card/50 backdrop-blur-sm border-none shadow-md">
          <CardHeader>
            <CardTitle>Note Details</CardTitle>
            <CardDescription>Provide details about the study material you are uploading.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Title of Notes</label>
              <Input placeholder="e.g., Quantum Mechanics Lecture 1" className="bg-background/50" />
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
            </div>
             <div className="p-4 rounded-lg bg-blue-50/50 border border-blue-100 dark:bg-blue-900/10 dark:border-blue-800 flex gap-3 mt-4">
                <Info className="h-5 w-5 text-blue-600 mt-0.5" />
                <div className="text-xs text-blue-700 dark:text-blue-400 space-y-1">
                    <p className="font-semibold">Format Note:</p>
                    <p>Supported formats: PDF, PPT, DOCX. Max size 20MB per file.</p>
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
                    <p className="font-medium">Upload study materials</p>
                    <p className="text-xs text-muted-foreground mt-1">Drag and drop your PDF, PPT or DOC sets here</p>
                </div>
                <Button variant="secondary" size="sm">Select Files</Button>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="space-y-6">
        <Card className="bg-card/50 backdrop-blur-sm border-none shadow-md">
          <CardHeader>
             <CardTitle>Visibility</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
                <label className="text-sm font-medium">Accessible to:</label>
                <div className="space-y-2">
                    <div className="flex items-center gap-2 p-3 rounded-lg bg-muted/20 border border-transparent hover:border-muted cursor-pointer transition-all">
                        <BookOpen className="h-4 w-4 text-blue-500" />
                        <span className="text-sm font-medium">Current Class Students</span>
                    </div>
                    <div className="flex items-center gap-2 p-3 rounded-lg bg-muted/20 border border-transparent hover:border-muted cursor-pointer transition-all">
                        <Layers className="h-4 w-4 text-purple-500" />
                        <span className="text-sm font-medium">All Semester Students</span>
                    </div>
                </div>
            </div>
            <div className="pt-4 border-t">
                <Button className="w-full bg-blue-600 hover:bg-blue-700">Publish Notes</Button>
                <Button variant="ghost" className="w-full mt-2">Cancel</Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
