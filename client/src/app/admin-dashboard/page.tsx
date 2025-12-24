import { StatsCards } from "@/components/dashboard/stats-cards"
import { QuickInsights } from "@/components/dashboard/quick-insights"
import { QuickActions } from "@/components/dashboard/quick-actions"
import { getAdminDashboardData } from "@/lib/dashboard-api"

export const dynamic = 'force-dynamic'

export default async function Page() {
  const data = await getAdminDashboardData();

  return (
    <>
      <div className="flex items-center">
        <h1 className="text-lg font-semibold md:text-2xl">Overview</h1>
      </div>
      <StatsCards stats={data.stats} />
      <QuickInsights 
        studentData={data.studentData} 
        staffData={data.staffData} 
        upcomingEvents={data.upcomingEvents} 
      />
      <QuickActions />
    </>
  )
}
