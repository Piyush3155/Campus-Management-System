"use client"

import { useState } from "react"
import { useAuth } from "@/context/AuthContext"
import { StaffProfileView } from "@/components/staff-dashboard/profile-view"
import { StaffEditProfile } from "@/components/staff-dashboard/edit-profile"
import { Button } from "@/components/ui/button"
import { Edit2, LayoutDashboard, UserCheck } from "lucide-react"
import Link from "next/link"

export default function StaffProfilePage() {
  const { user } = useAuth()
  const [isEditing, setIsEditing] = useState(false)

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <div>
            <h1 className="text-3xl font-bold tracking-tight text-foreground">Personnel Account</h1>
            <p className="text-muted-foreground">Manage your identity and professional data within the campus system.</p>
        </div>
        <div className="flex gap-2">
            <Link href="/staff/dashboard">
                <Button variant="outline" size="sm" className="gap-2">
                    <LayoutDashboard className="h-4 w-4" /> Dashboard
                </Button>
            </Link>
            <Button 
                onClick={() => setIsEditing(!isEditing)} 
                variant={isEditing ? "outline" : "default"}
                size="sm"
                className={`gap-2 ${!isEditing ? 'bg-blue-600 hover:bg-blue-700' : ''}`}
            >
                {isEditing ? (
                    <> <UserCheck className="h-4 w-4" /> View Profile </>
                ) : (
                    <> <Edit2 className="h-4 w-4" /> Edit Profile </>
                )}
            </Button>
        </div>
      </div>

      <div className="min-h-[600px] transition-all duration-300">
        {isEditing ? (
            <StaffEditProfile user={user} />
        ) : (
            <StaffProfileView user={user} />
        )}
      </div>
    </div>
  )
}
