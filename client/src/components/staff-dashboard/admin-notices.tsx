import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Megaphone, Calendar, User, Eye, Download, Info } from "lucide-react"
import { Button } from "@/components/ui/button"

const notices = [
  {
    id: 1,
    title: "Annual Sports Meet 2024",
    category: "General",
    author: "Admin Office",
    date: "2023-11-20",
    content: "We are pleased to announce the upcoming Annual Sports Meet schedule. All staff members are requested to coordinate with their respective department heads.",
    urgency: "Normal",
    attachment: true
  },
  {
    id: 2,
    title: "Quarterly Research Grant Deadline",
    category: "Academic",
    author: "Dean of Research",
    date: "2023-11-18",
    content: "The deadline for the submission of research proposals for the second quarter has been extended. Please ensure all documents are submitted by the end of this month.",
    urgency: "High",
    attachment: false
  },
  {
    id: 3,
    title: "Library Maintenance Notice",
    category: "Infrastructure",
    author: "Librarian",
    date: "2023-11-15",
    content: "The central library will be closed this weekend for system upgrades and shelf maintenance. Online resources will remain accessible.",
    urgency: "Normal",
    attachment: false
  }
]

export function AdminNotices() {
  return (
    <div className="space-y-4">
      {notices.map((notice) => (
        <Card key={notice.id} className="bg-card/40 backdrop-blur-sm border-none shadow-sm hover:shadow-md transition-all">
          <CardHeader className="pb-2">
            <div className="flex justify-between items-start">
              <div className="flex gap-2">
                <Badge variant="secondary" className="bg-slate-100 text-slate-700 dark:bg-white/5">{notice.category}</Badge>
                {notice.urgency === 'High' && (
                  <Badge className="bg-red-100 text-red-700 border-none animate-pulse">Urgent</Badge>
                )}
              </div>
              <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                <Calendar className="h-3 w-3" />
                {notice.date}
              </div>
            </div>
            <CardTitle className="text-xl font-bold mt-2">{notice.title}</CardTitle>
            <CardDescription className="flex items-center gap-1 text-xs">
              <User className="h-3 w-3" /> Posted by: {notice.author}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-sm text-foreground/80 leading-relaxed">
              {notice.content}
            </p>
            <div className="flex justify-between items-center pt-2 border-t">
              <div className="flex gap-2">
                {notice.attachment && (
                  <Button variant="ghost" size="sm" className="h-8 gap-2 text-blue-600 hover:text-blue-700">
                    <Download className="h-3.5 w-3.5" /> 
                    <span className="text-xs">Schedule.pdf</span>
                  </Button>
                )}
              </div>
              <Button variant="outline" size="sm" className="h-8 text-xs gap-2">
                <Eye className="h-3.5 w-3.5" /> View Full Details
              </Button>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
