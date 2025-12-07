import { Outlet, createFileRoute, redirect } from '@tanstack/react-router'
import cookiesStorage from 'utils/cookie-storage'
import { SidebarProvider } from '@/components/ui/sidebar'
import { AppSidebar } from '@/components/ui/app-sidebar'

export const Route = createFileRoute('/dashboard')({
  beforeLoad: async ({ location }) => {
    // Kalau bukan browser, skip auth checking dulu
    if (typeof window === 'undefined') return

    const cookie = await cookiesStorage.getItem('auth')
    if (!cookie) {
      throw redirect({
        to: '/login',
        search: {
          redirect: location.href,
        },
      })
    }
  },
  component: DashboardLayout,
})

function DashboardLayout() {
  return (
    <div className="dashboard w-screen max-h-screen flex overflow-hidden">
      <SidebarProvider>
        <AppSidebar />
        <main className="dashboard-main flex-1 h-screen overflow-auto">
          <Outlet />
        </main>
      </SidebarProvider>
    </div>
  )
}
