import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { User, Lock, Mail, Phone, Camera, Save, ShieldAlert } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

export function StaffEditProfile({ user }: { user: any }) {
  const [activeTab, setActiveTab] = useState("general")

  return (
    <Card className="bg-card/40 backdrop-blur-sm border-none shadow-xl">
      <CardHeader>
        <CardTitle>Profile Settings</CardTitle>
        <CardDescription>Update your personal information and account security.</CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="bg-muted/50 p-1">
            <TabsTrigger value="general" className="gap-2">
              <User className="h-4 w-4" /> Professional info
            </TabsTrigger>
            <TabsTrigger value="security" className="gap-2">
              <Lock className="h-4 w-4" /> Security
            </TabsTrigger>
          </TabsList>

          <TabsContent value="general" className="space-y-6">
            <div className="flex flex-col md:flex-row gap-8 items-start">
                <div className="flex flex-col items-center gap-4">
                    <div className="relative group">
                        <Avatar className="h-32 w-32 ring-4 ring-muted group-hover:ring-blue-400 transition-all cursor-pointer">
                            <AvatarImage src={user?.photoURL} />
                            <AvatarFallback className="text-3xl font-bold bg-muted text-muted-foreground uppercase">{user?.displayName?.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <div className="absolute inset-0 flex items-center justify-center bg-black/40 rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
                            <Camera className="h-8 w-8 text-white" />
                        </div>
                    </div>
                    <Button variant="outline" size="sm" className="w-full">Change Photo</Button>
                </div>

                <div className="flex-1 grid gap-4 w-full">
                    <div className="grid gap-4 md:grid-cols-2">
                        <div className="space-y-2">
                            <Label htmlFor="fullname">Full Name</Label>
                            <Input id="fullname" defaultValue={user?.displayName} className="bg-background/50" />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="email">Email Address</Label>
                            <Input id="email" defaultValue={user?.email} readOnly className="bg-muted/30 cursor-not-allowed opacity-70" />
                            <p className="text-[10px] text-muted-foreground italic flex items-center gap-1">
                                <ShieldAlert className="h-3 w-3" /> Contact IT to change your official email.
                            </p>
                        </div>
                    </div>
                    <div className="grid gap-4 md:grid-cols-2">
                        <div className="space-y-2">
                            <Label htmlFor="phone">Phone Number</Label>
                            <Input id="phone" defaultValue="+91 98765-43210" className="bg-background/50" />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="office">Office Location</Label>
                            <Input id="office" defaultValue="Block B, Room 402" className="bg-background/50" />
                        </div>
                    </div>
                    <div className="flex justify-end pt-4">
                        <Button className="bg-blue-600 hover:bg-blue-700 gap-2">
                            <Save className="h-4 w-4" /> Save Professional Details
                        </Button>
                    </div>
                </div>
            </div>
          </TabsContent>

          <TabsContent value="security" className="max-w-md mx-auto space-y-6 py-4">
            <div className="space-y-4">
                <div className="space-y-2">
                    <Label htmlFor="current-pass">Current Password</Label>
                    <Input id="current-pass" type="password" placeholder="••••••••" className="bg-background/50" />
                </div>
                <div className="space-y-2">
                    <Label htmlFor="new-pass">New Password</Label>
                    <Input id="new-pass" type="password" placeholder="••••••••" className="bg-background/50" />
                </div>
                <div className="space-y-2">
                    <Label htmlFor="confirm-pass">Confirm New Password</Label>
                    <Input id="confirm-pass" type="password" placeholder="••••••••" className="bg-background/50" />
                </div>
            </div>
            <div className="p-4 rounded-lg bg-orange-50/50 border border-orange-100 dark:bg-orange-950/10 dark:border-orange-900">
                <p className="text-xs text-orange-700 dark:text-orange-400 font-medium">
                    Strong passwords use at least 8 characters, with a mix of letters, numbers, and symbols.
                </p>
            </div>
            <Button className="w-full bg-slate-900 dark:bg-slate-700 hover:bg-black gap-2">
                <Lock className="h-4 w-4" /> Update Access Credentials
            </Button>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}
