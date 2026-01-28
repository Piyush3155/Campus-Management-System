"use client"

import React, { useState, useEffect } from "react"
import { 
  Book, 
  FileText, 
  Download, 
  Search,
  Filter,
  Archive,
  GraduationCap
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { getNotes, getPYQs, type NoteItem, type PYQItem } from "@/lib/storage"

const semesters = ["1", "2", "3", "4", "5", "6", "7", "8"]

export default function StudentAcademicsPage() {
  const [activeTab, setActiveTab] = useState("notes")
  const [subjectFilter, setSubjectFilter] = useState("all")
  const [semFilter, setSemFilter] = useState("all")
  const [searchQuery, setSearchQuery] = useState("")
  
  const [notesData, setNotesData] = useState<NoteItem[]>([])
  const [pyqData, setPyqData] = useState<PYQItem[]>([])

  useEffect(() => {
    setNotesData(getNotes())
    setPyqData(getPYQs())
  }, [])

  // Get unique subjects from both notes and pyqs
  const subjects = Array.from(new Set([
    ...notesData.map(n => n.subject),
    ...pyqData.map(p => p.subject)
  ])).filter(Boolean).sort()

  const filterNotes = (data: NoteItem[]) => {
    return data.filter(item => {
      const matchesSubject = subjectFilter === "all" || item.subject === subjectFilter;
      const matchesSem = semFilter === "all" || item.semester === semFilter;
      const matchesSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesSubject && matchesSem && matchesSearch;
    });
  }

  const filterPYQs = (data: PYQItem[]) => {
    return data.filter(item => {
      const matchesSubject = subjectFilter === "all" || item.subject === subjectFilter;
      const matchesSem = semFilter === "all" || item.semester === semFilter;
      const matchesSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesSubject && matchesSem && matchesSearch;
    });
  }

  const handleDownload = (fileUrl: string, fileName: string) => {
    if (fileUrl) {
      const link = document.createElement("a")
      link.href = fileUrl
      link.download = fileName || "download"
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
    }
  }

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500 pb-20">
      <section>
        <h2 className="text-2xl font-black text-foreground">Knowledge Vault</h2>
        <p className="text-muted-foreground text-sm font-medium">Access study notes and past examination papers.</p>
      </section>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-8">
        <TabsList className="bg-muted p-1 rounded-2xl border border-border/50 w-full flex">
            <TabsTrigger value="notes" className="flex-1 rounded-xl font-bold py-3 data-[state=active]:bg-card data-[state=active]:text-primary data-[state=active]:shadow-sm transition-all flex gap-2 items-center justify-center text-muted-foreground">
                <Book className="h-4 w-4" /> Notes
            </TabsTrigger>
            <TabsTrigger value="pyqs" className="flex-1 rounded-xl font-bold py-3 data-[state=active]:bg-card data-[state=active]:text-primary data-[state=active]:shadow-sm transition-all flex gap-2 items-center justify-center text-muted-foreground">
                <Archive className="h-4 w-4" /> Papers
            </TabsTrigger>
        </TabsList>

        {/* Filters */}
        <div className="space-y-4">
            <div className="relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input 
                    placeholder="Search titles..." 
                    className="pl-11 h-12 rounded-2xl bg-card border border-border shadow-sm focus-visible:ring-primary"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                />
            </div>
            <div className="flex gap-2 overflow-x-auto no-scrollbar">
                <Select value={subjectFilter} onValueChange={setSubjectFilter}>
                    <SelectTrigger className="w-fit min-w-[120px] h-9 rounded-full border border-border bg-card shadow-sm font-bold text-[11px] ring-0 focus:ring-1 focus:ring-primary gap-2">
                        <Filter className="h-3 w-3 text-muted-foreground" /><SelectValue placeholder="Subject" />
                    </SelectTrigger>
                    <SelectContent className="rounded-2xl border border-border shadow-xl">
                        <SelectItem value="all">All Subjects</SelectItem>
                        {subjects.map(s => <SelectItem key={s} value={s}>{s}</SelectItem>)}
                    </SelectContent>
                </Select>

                <Select value={semFilter} onValueChange={setSemFilter}>
                    <SelectTrigger className="w-fit min-w-[100px] h-9 rounded-full border border-border bg-card shadow-sm font-bold text-[11px] ring-0 focus:ring-1 focus:ring-primary gap-2">
                        <GraduationCap className="h-3 w-3 text-muted-foreground" /><SelectValue placeholder="Sem" />
                    </SelectTrigger>
                    <SelectContent className="rounded-2xl border border-border shadow-xl">
                        <SelectItem value="all">All Sems</SelectItem>
                        {semesters.map(s => <SelectItem key={s} value={s}>Sem {s}</SelectItem>)}
                    </SelectContent>
                </Select>
            </div>
        </div>

        <TabsContent value="notes" className="space-y-4 outline-none">
            <div className="grid gap-3">
                {filterNotes(notesData).length === 0 ? (
                  <div className="p-8 text-center text-muted-foreground bg-card border border-dashed rounded-3xl">
                    No notes found matching your filters.
                  </div>
                ) : (
                  filterNotes(notesData).map((item) => (
                    <div key={item.id} className="p-4 rounded-3xl bg-card border border-border shadow-sm flex items-center gap-4 active:scale-[0.98] transition-all">
                        <div className="h-12 w-12 rounded-2xl bg-muted flex items-center justify-center text-muted-foreground shrink-0">
                            <FileText className="h-6 w-6" />
                        </div>
                        <div className="flex-1 min-w-0">
                            <h3 className="text-sm font-bold text-foreground truncate">{item.title}</h3>
                            <p className="text-[10px] text-muted-foreground font-bold uppercase mt-0.5">{item.subject} • {item.size}</p>
                        </div>
                        <Button 
                          size="icon" 
                          variant="ghost" 
                          className="rounded-full h-10 w-10 text-primary bg-primary/10 hover:bg-primary/20 transition-colors"
                          onClick={() => handleDownload(item.fileUrl, item.fileName)}
                          disabled={!item.fileUrl}
                        >
                            <Download className="h-4 w-4" />
                        </Button>
                    </div>
                  ))
                )}
            </div>
        </TabsContent>

        <TabsContent value="pyqs" className="space-y-4 outline-none">
            <div className="grid gap-3">
                {filterPYQs(pyqData).length === 0 ? (
                  <div className="p-8 text-center text-muted-foreground bg-card border border-dashed rounded-3xl">
                    No question papers found matching your filters.
                  </div>
                ) : (
                  filterPYQs(pyqData).map((item) => (
                    <div key={item.id} className="p-4 rounded-3xl bg-card border border-border shadow-sm flex items-center gap-4 active:scale-[0.98] transition-all">
                        <div className="h-12 w-12 rounded-2xl bg-primary/10 flex items-center justify-center text-primary shrink-0">
                            <Archive className="h-6 w-6" />
                        </div>
                        <div className="flex-1 min-w-0">
                            <h3 className="text-sm font-bold text-foreground truncate">{item.title}</h3>
                            <div className="flex items-center gap-2 mt-0.5">
                                <p className="text-[10px] text-muted-foreground font-bold uppercase">{item.subject} • {item.size}</p>
                                <span className="text-[10px] text-primary font-black px-1.5 py-0.5 bg-primary/10 rounded-md tracking-tighter">{item.year}</span>
                            </div>
                        </div>
                        <Button 
                          size="icon" 
                          variant="ghost" 
                          className="rounded-full h-10 w-10 text-primary bg-primary/10 hover:bg-primary/20 transition-all"
                          onClick={() => handleDownload(item.fileUrl, item.fileName)}
                          disabled={!item.fileUrl}
                        >
                            <Download className="h-4 w-4" />
                        </Button>
                    </div>
                  ))
                )}
            </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}


