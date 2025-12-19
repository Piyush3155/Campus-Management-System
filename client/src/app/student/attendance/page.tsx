"use client"

import React from "react"
import { 
  BarChart3, 
  TrendingUp, 
  Calendar, 
  AlertTriangle
} from "lucide-react"

const attendanceData = [
  {
    subject: "Quantum Mechanics",
    percentage: 94,
    present: 34,
    total: 36,
    status: "Excellent",
    color: "bg-emerald-500"
  },
  {
    subject: "Advanced Data Structures",
    percentage: 82,
    present: 28,
    total: 34,
    status: "Good",
    color: "bg-primary"
  },
  {
    subject: "Numerical Analysis",
    percentage: 74,
    present: 26,
    total: 35,
    status: "Warning",
    color: "bg-orange-500"
  },
  {
    subject: "Digital Electronics",
    percentage: 68,
    present: 21,
    total: 31,
    status: "Critical",
    color: "bg-destructive"
  },
  {
    subject: "Eng. Mathematics",
    percentage: 90,
    present: 36,
    total: 40,
    status: "Excellent",
    color: "bg-primary"
  }
]

export default function StudentAttendancePage() {
  const overallAttendance = 82;

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500 pb-20">
      <section>
        <h2 className="text-2xl font-black text-foreground tracking-tight">Attendance</h2>
        <p className="text-muted-foreground text-sm font-medium">Detailed breakdown of your campus presence.</p>
      </section>

      {/* Overall Attendance - Minimal Hero */}
      <section>
        <div className="p-8 rounded-[2.5rem] bg-primary text-primary-foreground relative overflow-hidden shadow-lg">
            <div className="relative z-10 space-y-4">
                <span className="text-[10px] font-bold uppercase tracking-[0.2em] opacity-80">Total Presence</span>
                <div className="flex items-baseline gap-2">
                    <span className="text-6xl font-bold tracking-tighter">{overallAttendance}%</span>
                    <TrendingUp className="h-6 w-6 opacity-80" />
                </div>
                <p className="opacity-90 text-xs font-medium max-w-[200px] leading-relaxed">You've maintained great attendance this semester. Keep going!</p>
            </div>
            <BarChart3 className="absolute -bottom-6 -right-6 h-40 w-40 text-primary-foreground/10 -rotate-12" />
        </div>
      </section>

      {/* Subject-Wise Breakdown */}
      <section className="space-y-4">
        <h3 className="text-lg font-bold text-foreground">Breakdown</h3>
        <div className="grid gap-4">
            {attendanceData.map((item, i) => (
                <div key={i} className="p-5 rounded-3xl bg-card border border-border shadow-sm active:scale-[0.98] transition-all">
                    <div className="flex justify-between items-start mb-4">
                        <div className="space-y-1 flex-1 min-w-0">
                            <h4 className="text-sm font-bold text-foreground truncate">{item.subject}</h4>
                            <p className="text-[10px] text-muted-foreground font-bold uppercase tracking-tight">{item.present} of {item.total} classes</p>
                        </div>
                        <span className={`text-lg font-bold ${
                            item.percentage >= 75 ? 'text-foreground' : 'text-destructive'
                        }`}>{item.percentage}%</span>
                    </div>

                    <div className="space-y-3">
                        <div className="h-1.5 w-full bg-muted rounded-full overflow-hidden">
                            <div 
                                className={`h-full rounded-full transition-all duration-1000 ${
                                    item.percentage >= 75 ? 'bg-primary' : 'bg-destructive'
                                }`} 
                                style={{ width: `${item.percentage}%` }}
                            />
                        </div>
                        {item.percentage < 75 && (
                            <div className="flex items-center gap-1.5 text-[9px] font-bold text-destructive uppercase tracking-wider">
                                <AlertTriangle className="h-3 w-3" /> Below 75% Threshold
                            </div>
                        )}
                    </div>
                </div>
            ))}
        </div>
      </section>

      {/* Quick Insights Footer */}
      <section className="p-6 rounded-[2.5rem] bg-primary/5 border border-primary/20 border-dashed space-y-3">
        <h4 className="text-sm font-bold text-primary flex items-center gap-2">
            <Calendar className="h-4 w-4" /> Attendance Insight
        </h4>
        <p className="text-xs text-muted-foreground font-medium leading-relaxed">
            Based on your current average, you can afford to miss **2 more classes** in Numerical Analysis without falling below the 75% threshold.
        </p>
      </section>
    </div>
  )
}

