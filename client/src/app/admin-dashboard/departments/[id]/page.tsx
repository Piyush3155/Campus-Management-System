"use client"

import { useParams, useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowLeft, Users, GraduationCap, Building2 } from "lucide-react"
import { initialDepartments, Department } from "../page" // Import data from parent page (for mock mostly)
import { useState, useEffect } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function DepartmentDetailsPage() {
  const params = useParams()
  const router = useRouter()
  const [dept, setDept] = useState<Department | null>(null)

  useEffect(() => {
    // Mock fetching data
    const found = initialDepartments.find(d => d.id === params.id)
    if (found) setDept(found)
  }, [params.id])

  if (!dept) {
     return <div className="p-8">Loading or Not Found...</div>
  }

  return (
    <div className="flex flex-col gap-6 p-6">
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" onClick={() => router.back()}>
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <div>
           <h1 className="text-2xl font-bold tracking-tight">{dept.name}</h1>
           <p className="text-muted-foreground">{dept.code} • Head: {dept.hod}</p>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Total Students
              </CardTitle>
              <GraduationCap className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{dept.studentCount}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Total Staff
              </CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{dept.staffCount}</div>
            </CardContent>
          </Card>
           <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Courses
              </CardTitle>
              <Building2 className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">8</div>
              <p className="text-xs text-muted-foreground">Active courses</p>
            </CardContent>
          </Card>
      </div>

      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="staff">Staff Members</TabsTrigger>
            <TabsTrigger value="courses">Courses</TabsTrigger>
        </TabsList>
        <TabsContent value="overview" className="space-y-4">
             <Card>
                <CardHeader>
                    <CardTitle>About Department</CardTitle>
                    <CardDescription>General information and detailed description</CardDescription>
                </CardHeader>
                <CardContent className="space-y-2">
                    <p className="text-sm text-muted-foreground">
                        The Department of {dept.name} is dedicated to excellence in education and research. 
                        Under the leadership of {dept.hod}, we aim to provide top-tier learning experiences.
                    </p>
                     <div className="grid grid-cols-2 gap-4 pt-4">
                        <div>
                            <span className="font-semibold">Department Code:</span> {dept.code}
                        </div>
                        <div>
                            <span className="font-semibold">Established:</span> 2010
                        </div>
                         <div>
                            <span className="font-semibold">Contact Email:</span> {dept.code.toLowerCase()}@campus.edu
                        </div>
                         <div>
                            <span className="font-semibold">Location:</span> Building B, Floor 3
                        </div>
                    </div>
                </CardContent>
             </Card>
        </TabsContent>
         <TabsContent value="staff">
             <Card>
                <CardHeader>
                    <CardTitle>Staff Directory</CardTitle>
                </CardHeader>
                <CardContent>
                    <p className="text-sm text-muted-foreground">List of staff members would go here (Table).</p>
                </CardContent>
             </Card>
         </TabsContent>
         <TabsContent value="courses">
             <Card>
                <CardHeader>
                    <CardTitle>Courses Offered</CardTitle>
                </CardHeader>
                <CardContent>
                    <p className="text-sm text-muted-foreground">List of courses would go here (Table).</p>
                </CardContent>
             </Card>
         </TabsContent>
      </Tabs>

    </div>
  )
}
