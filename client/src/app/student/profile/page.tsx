"use client"

import React from "react"
import { 
  User, 
  Lock, 
  LogOut, 
  ChevronRight, 
  Camera, 
  CreditCard,
  Bell,
  HelpCircle,
  FileText
} from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

export default function StudentProfilePage() {
  const menuGroups = [
    {
      label: "Account Settings",
      items: [
        { icon: User, label: "Edit Profile" },
        { icon: Lock, label: "Change Password" },
        { icon: Bell, label: "Notifications" },
      ]
    },
    {
      label: "Academic & Records",
      items: [
        { icon: FileText, label: "Digital ID Card" },
        { icon: CreditCard, label: "Fee Statements" },
      ]
    },
    {
      label: "Support",
      items: [
        { icon: HelpCircle, label: "Get Help" },
      ]
    }
  ]

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500 pb-20 mt-4">
      {/* Profile Header Card */}
      <section className="flex flex-col items-center">
        <div className="relative">
            <Avatar className="h-28 w-28 border-4 border-card shadow-sm ring-1 ring-border">
                <AvatarImage src="https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?q=80&w=1974&auto=format&fit=crop" />
                <AvatarFallback>RB</AvatarFallback>
            </Avatar>
            <button className="absolute bottom-0 right-0 p-2 bg-primary text-primary-foreground rounded-full border-2 border-card shadow-md active:scale-90 transition-transform">
                <Camera className="h-3.5 w-3.5" />
            </button>
        </div>
        
        <div className="text-center mt-6 space-y-1">
            <h2 className="text-xl font-bold text-foreground">Rahul Bhardwaj</h2>
            <p className="text-muted-foreground font-medium text-xs">Computer Science • Semester 5</p>
            <div className="flex justify-center gap-2 pt-3">
                <div className="px-3 py-1 rounded-full bg-muted text-muted-foreground text-[10px] font-bold uppercase tracking-wider border border-border">
                    ID: 2024-042
                </div>
            </div>
        </div>
      </section>

      {/* Menu Options */}
      <div className="space-y-8">
        {menuGroups.map((group, i) => (
            <div key={i} className="space-y-3">
                <h3 className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground px-1">{group.label}</h3>
                <div className="bg-card rounded-3xl border border-border shadow-sm overflow-hidden">
                    {group.items.map((item, index) => (
                        <button 
                            key={index}
                            className="w-full flex items-center justify-between p-4 active:bg-muted transition-all border-b border-border/50 last:border-none group"
                        >
                            <div className="flex items-center gap-3">
                                <div className="h-9 w-9 rounded-xl bg-muted flex items-center justify-center text-muted-foreground group-active:text-primary transition-colors">
                                    <item.icon className="h-4.5 w-4.5" />
                                </div>
                                <span className="text-sm font-medium text-foreground/80">{item.label}</span>
                            </div>
                            <ChevronRight className="h-4 w-4 text-muted-foreground/30" />
                        </button>
                    ))}
                </div>
            </div>
        ))}

        <div className="pt-2">
             <button className="w-full h-14 rounded-2xl bg-card border border-destructive/20 flex items-center justify-center gap-2 group active:bg-destructive/10 transition-all shadow-sm">
                <LogOut className="h-4 w-4 text-destructive" />
                <span className="text-sm font-bold text-destructive">Log Out</span>
            </button>
            <p className="text-center text-[9px] text-muted-foreground font-medium mt-6 uppercase tracking-[0.2em] opacity-60">v2.4.0 • Built with Love</p>
        </div>
      </div>
    </div>
  )
}

