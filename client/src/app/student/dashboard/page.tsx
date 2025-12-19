"use client"

import React from "react"
import { 
  CheckCircle2, 
  Clock, 
  BookOpen, 
  Award, 
  FileText, 
  ChevronRight,
} from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

export default function StudentDashboard() {
  const mainActions = [
    { label: "Attendance", icon: CheckCircle2, iconColor: "text-primary", value: "92%" },
    { label: "Assignments", icon: FileText, iconColor: "text-primary", value: "4 Pending" },
    { icon: Award, label: "Exams", iconColor: "text-primary", value: "2 Soon" },
    { icon: BookOpen, label: "Subjects", iconColor: "text-primary", value: "6 Total" },
  ]

  return (
    <div className="space-y-10 animate-in fade-in slide-in-from-bottom-2 duration-500">
      {/* Welcome Header */}
      <section className="flex items-center justify-between">
        <div className="space-y-1">
            <h2 className="text-2xl font-bold text-foreground tracking-tight">Hey, Rahul 👋</h2>
            <p className="text-muted-foreground text-sm font-medium">Monday, 18 December</p>
        </div>
        <Avatar className="h-12 w-12 border border-border shadow-sm">
            <AvatarImage src="https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?q=80&w=1974&auto=format&fit=crop" />
            <AvatarFallback>RB</AvatarFallback>
        </Avatar>
      </section>

      {/* Main Stats Grid */}
      <section className="grid grid-cols-2 gap-4">
        {mainActions.map((action, i) => (
            <div key={i} className="p-5 rounded-3xl bg-card border border-border/50 active:scale-95 transition-all cursor-pointer shadow-sm">
                <div className="flex items-center gap-2 mb-3">
                    <action.icon className={`h-4 w-4 ${action.iconColor} stroke-[2.5]`} />
                    <span className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">{action.label}</span>
                </div>
                <p className="text-lg font-bold text-foreground">{action.value}</p>
            </div>
        ))}
      </section>


      {/* Upcoming Deadlines */}
      <section className="space-y-4">
        <h3 className="text-lg font-bold text-foreground">Deadlines</h3>
        <div className="space-y-3">
            {[
                { title: "Quantum Physics Report", date: "Due in 2 Days", type: "Assignment" },
                { title: "Mid-Term Project", date: "Due in 5 Days", type: "Project" },
            ].map((task, i) => (
                <div key={i} className="flex items-center gap-4 p-4 rounded-3xl bg-card border border-border active:bg-muted/50 transition-colors cursor-pointer shadow-sm">
                    <div className="h-10 w-10 rounded-2xl bg-muted flex items-center justify-center shrink-0">
                        <FileText className="h-5 w-5 text-muted-foreground" />
                    </div>
                    <div className="flex-1 min-w-0">
                        <h4 className="text-sm font-bold text-foreground truncate">{task.title}</h4>
                        <div className="flex items-center gap-2 mt-0.5">
                            <span className="text-[10px] text-muted-foreground font-bold uppercase tracking-tight">{task.date}</span>
                        </div>
                    </div>
                    <ChevronRight className="h-4 w-4 text-muted-foreground/40" />
                </div>
            ))}
        </div>
      </section>

      {/* Campus Event Card */}
      <section className="pb-4 mb-11">
        <div className="relative aspect-[16/9] rounded-[2.5rem] overflow-hidden group shadow-lg">
            <img 
                src="https://images.unsplash.com/photo-1541339907198-e08756ebafe1?q=80&w=2070&auto=format&fit=crop" 
                alt="Campus" 
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
            <div className="absolute bottom-6 left-6 right-6">
                <span className="text-[10px] font-bold text-white/80 uppercase tracking-widest mb-1 block">Student Council</span>
                <h4 className="text-xl font-bold text-white">Annual TechFest 2024</h4>
            </div>
        </div>
      </section>
    </div>
  )
}

