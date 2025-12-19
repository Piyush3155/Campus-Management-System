"use client"

import React from "react"
import { 
  Calendar, 
  CheckCircle2, 
  Clock, 
  ChevronRight,
  AlertCircle
} from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

const assignments = [
  {
    id: 1,
    title: "Quantum Wave Function Analysis",
    subject: "Quantum Mechanics",
    dueDate: "Dec 22, 2024",
    status: "Pending",
    urgency: "High",
    icon: Clock,
  },
  {
    id: 2,
    title: "B-Tree Implementation in C++",
    subject: "Advanced Data Structures",
    dueDate: "Dec 25, 2024",
    status: "Pending",
    urgency: "Medium",
    icon: Clock,
  },
  {
    id: 3,
    title: "Maxwell's Equations Report",
    subject: "Electromagnetics",
    dueDate: "Dec 15, 2024",
    status: "Submitted",
    urgency: "None",
    icon: CheckCircle2,
  },
  {
    id: 4,
    title: "Numerical Integration Lab",
    subject: "Numerical Analysis",
    dueDate: "Dec 10, 2024",
    status: "Submitted",
    urgency: "None",
    icon: CheckCircle2,
  },
  {
      id: 5,
      title: "Late Submission: Digital Logic",
      subject: "Digital Electronics",
      dueDate: "Dec 05, 2024",
      status: "Submitted",
      urgency: "Late",
      icon: AlertCircle,
  }
]

export default function StudentAssignmentsPage() {
  const pending = assignments.filter(a => a.status === "Pending")
  const submitted = assignments.filter(a => a.status === "Submitted")

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500 pb-20">
      <section>
        <h2 className="text-2xl font-black text-foreground tracking-tight">Assignments</h2>
        <p className="text-muted-foreground text-sm font-medium">Keep track of your submissions and deadlines.</p>
      </section>

      <Tabs defaultValue="pending" className="space-y-8">
        <TabsList className="bg-muted p-1 rounded-2xl border border-border/50 w-full flex">
            <TabsTrigger value="pending" className="flex-1 rounded-xl font-bold py-3 data-[state=active]:bg-card data-[state=active]:text-primary data-[state=active]:shadow-sm transition-all text-muted-foreground">
                Pending ({pending.length})
            </TabsTrigger>
            <TabsTrigger value="submitted" className="flex-1 rounded-xl font-bold py-3 data-[state=active]:bg-card data-[state=active]:text-primary data-[state=active]:shadow-sm transition-all text-muted-foreground">
                Submitted ({submitted.length})
            </TabsTrigger>
        </TabsList>

        <TabsContent value="pending" className="space-y-4 outline-none">
            {pending.map((item) => (
                <div 
                    key={item.id} 
                    className="p-5 rounded-3xl bg-card border border-border shadow-sm active:scale-[0.98] transition-all cursor-pointer"
                >
                    <div className="flex items-start justify-between gap-4 mb-4">
                        <div className="space-y-1.5 flex-1 min-w-0">
                            <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">{item.subject}</span>
                            <h3 className="text-base font-bold text-foreground leading-tight">{item.title}</h3>
                        </div>
                        <div className="h-10 w-10 rounded-2xl bg-muted flex items-center justify-center shrink-0">
                            <Clock className="h-5 w-5 text-primary" />
                        </div>
                    </div>

                    <div className="pt-4 border-t border-border/50 flex items-center justify-between">
                        <div className="flex items-center gap-2 text-muted-foreground text-[11px] font-bold">
                            <Calendar className="h-4 w-4" />
                            <span>{item.dueDate}</span>
                        </div>
                        <button className="text-primary text-[11px] font-bold flex items-center gap-1">
                            Submit Now <ChevronRight className="h-3 w-3" />
                        </button>
                    </div>
                </div>
            ))}
        </TabsContent>

        <TabsContent value="submitted" className="space-y-4 outline-none">
            {submitted.map((item) => (
                <div 
                    key={item.id} 
                    className="p-5 rounded-3xl bg-muted/30 border border-border active:scale-[0.98] transition-all cursor-pointer"
                >
                    <div className="flex items-start justify-between gap-4">
                        <div className="space-y-1.5 flex-1 min-w-0">
                            <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">{item.subject}</span>
                            <h3 className="text-sm font-bold text-foreground/80 leading-tight">{item.title}</h3>
                        </div>
                        <CheckCircle2 className="h-5 w-5 text-emerald-500 shrink-0" />
                    </div>

                    <div className="mt-4 flex items-center gap-2">
                         <span className="bg-emerald-500/10 text-emerald-500 px-3 py-1 rounded-full text-[9px] font-bold uppercase tracking-wider">
                            Submitted
                        </span>
                        {item.urgency === 'Late' && (
                            <span className="bg-destructive/10 text-destructive px-3 py-1 rounded-full text-[9px] font-bold uppercase tracking-wider">Late</span>
                        )}
                    </div>
                </div>
            ))}
        </TabsContent>
      </Tabs>
    </div>
  )
}

