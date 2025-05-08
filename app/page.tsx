import { DashboardLayout } from "@/components/dashboard-layout"
import { StudentDashboard } from "@/components/student-dashboard"
import { Toaster } from "@/components/ui/toaster"

export default function Home() {
  return (
    <>
      <DashboardLayout>
        <StudentDashboard />
      </DashboardLayout>
      <Toaster />
    </>
  )
}
