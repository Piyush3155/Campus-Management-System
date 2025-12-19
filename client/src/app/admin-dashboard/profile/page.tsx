"use client"

import { useState } from "react"
import { useAuth } from "@/context/AuthContext"
import { updateProfile, updatePassword } from "firebase/auth"
import { auth } from "@/lib/firebase"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { toast } from "sonner"
import { Loader2, User, Key, Shield, LogOut } from "lucide-react"

export default function ProfilePage() {
  const { user, loading } = useAuth()
  const [displayName, setDisplayName] = useState(user?.displayName || "")
  const [photoURL, setPhotoURL] = useState(user?.photoURL || "")
  const [newPassword, setNewPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [isUpdatingProfile, setIsUpdatingProfile] = useState(false)
  const [isUpdatingPassword, setIsUpdatingPassword] = useState(false)

  if (loading) {
    return <div className="flex h-full items-center justify-center"><Loader2 className="h-8 w-8 animate-spin" /></div>
  }

  if (!user) {
    return <div className="flex h-full items-center justify-center">Please log in to view profile.</div>
  }

  const handleUpdateProfile = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsUpdatingProfile(true)
    try {
      if (auth.currentUser) {
          await updateProfile(auth.currentUser, {
              displayName: displayName,
              photoURL: photoURL
          })
          toast.success("Profile updated successfully")
      }
    } catch (error: any) {
      toast.error(error.message || "Failed to update profile")
    } finally {
      setIsUpdatingProfile(false)
    }
  }

  const handleUpdatePassword = async (e: React.FormEvent) => {
    e.preventDefault()
    if (newPassword !== confirmPassword) {
      toast.error("Passwords do not match")
      return
    }
    setIsUpdatingPassword(true)
    try {
        if (auth.currentUser) {
            await updatePassword(auth.currentUser, newPassword)
            toast.success("Password updated successfully")
            setNewPassword("")
            setConfirmPassword("")
        }
    } catch (error: any) {
      toast.error(error.message || "Failed to update password")
    } finally {
      setIsUpdatingPassword(false)
    }
  }

  return (
    <div className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
      <div className="flex items-center justify-between">
          <div className="space-y-1">
            <h2 className="text-2xl font-semibold tracking-tight">Profile & Account</h2>
            <p className="text-sm text-muted-foreground">
              Manage your personal information and security settings.
            </p>
          </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {/* Profile Card */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Profile Information</CardTitle>
            <CardDescription>Update your display name and profile photo.</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleUpdateProfile} className="space-y-6">
              <div className="flex items-center gap-6">
                 <Avatar className="h-24 w-24">
                  <AvatarImage src={photoURL || user.photoURL || ""} />
                  <AvatarFallback>{user.displayName?.charAt(0) || "U"}</AvatarFallback>
                </Avatar>
                <div className="space-y-1">
                   <h3 className="font-medium">{user.email}</h3>
                   <p className="text-xs text-muted-foreground">User ID: {user.uid}</p>
                </div>
              </div>

              <div className="grid gap-2">
                <Label htmlFor="displayName">Display Name</Label>
                <Input 
                  id="displayName" 
                  value={displayName} 
                  onChange={(e) => setDisplayName(e.target.value)} 
                  placeholder="Enter your name" 
                />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="photoURL">Photo URL</Label>
                <Input 
                  id="photoURL" 
                  value={photoURL} 
                  onChange={(e) => setPhotoURL(e.target.value)} 
                  placeholder="https://example.com/avatar.jpg" 
                />
              </div>
              
              <Button type="submit" disabled={isUpdatingProfile}>
                {isUpdatingProfile && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Save Changes
              </Button>
            </form>
          </CardContent>
        </Card>

        <div className="space-y-4">
             {/* Security Card */}
            <Card>
              <CardHeader>
                <CardTitle>Security</CardTitle>
                <CardDescription>Change your password.</CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleUpdatePassword} className="space-y-4">
                  <div className="grid gap-2">
                    <Label htmlFor="newPassword">New Password</Label>
                    <Input 
                      id="newPassword" 
                      type="password"
                      value={newPassword} 
                      onChange={(e) => setNewPassword(e.target.value)} 
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="confirmPassword">Confirm Password</Label>
                    <Input 
                      id="confirmPassword" 
                      type="password"
                      value={confirmPassword} 
                      onChange={(e) => setConfirmPassword(e.target.value)} 
                    />
                  </div>
                  <Button type="submit" disabled={isUpdatingPassword} variant="outline" className="w-full">
                    {isUpdatingPassword && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                    Update Password
                  </Button>
                </form>
              </CardContent>
            </Card>

            {/* Session Info */}
            <Card>
                <CardHeader>
                    <CardTitle className="text-base flex items-center gap-2">
                        <Shield className="h-4 w-4" />
                        Account Status
                    </CardTitle>
                </CardHeader>
                <CardContent className="space-y-2 text-sm">
                    <div className="flex justify-between">
                        <span className="text-muted-foreground">Last Sign In:</span>
                        <span>{user.metadata.lastSignInTime ? new Date(user.metadata.lastSignInTime).toLocaleString() : 'N/A'}</span>
                    </div>
                    <div className="flex justify-between">
                        <span className="text-muted-foreground">Account Created:</span>
                        <span>{user.metadata.creationTime ? new Date(user.metadata.creationTime).toLocaleString() : 'N/A'}</span>
                    </div>
                    <div className="flex justify-between">
                        <span className="text-muted-foreground">Email Verified:</span>
                        <span className={user.emailVerified ? "text-green-600 font-medium" : "text-yellow-600 font-medium"}>
                            {user.emailVerified ? "Verified" : "Unverified"}
                        </span>
                    </div>
                </CardContent>
            </Card>
        </div>
      </div>
    </div>
  )
}
