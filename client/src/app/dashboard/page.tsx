import { StatsCards } from "@/components/dashboard/stats-cards"
import { QuickInsights } from "@/components/dashboard/quick-insights"
import { QuickActions } from "@/components/dashboard/quick-actions"

export default function Page() {
  return (
    <>
      <div className="flex items-center">
        <h1 className="text-lg font-semibold md:text-2xl">Overview</h1>
      </div>
      <StatsCards />
      <QuickInsights />
      <QuickActions />
    </>
  )
}
