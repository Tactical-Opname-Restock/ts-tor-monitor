import { useEffect } from 'react'
import {
  Navigate,
  Outlet,
  createFileRoute,
  redirect,
  useNavigate,
} from '@tanstack/react-router'
import cookiesStorage from 'utils/cookie-storage'
import { SidebarProvider } from '@/components/ui/sidebar'
import { AppSidebar } from '@/components/ui/app-sidebar'
import { useAuth } from '@/context/use-auth'

export const Route = createFileRoute('/dashboard')({
  // beforeLoad: async ({ location }) => {
  //   const cookie = await cookiesStorage.getItem('auth')
  //   if (!cookie) {
  //     throw redirect({
  //       to: '/login',
  //       search: location.href,
  //     })
  //   }
  // },

  component: DashboardLayout,
})

function DashboardLayout() {
  const navigate = useNavigate()
  const { access_token } = useAuth()
  useEffect(() => {
    if (!access_token) {
      navigate({ to: '/login' })
    }
  }, [access_token])
  return (
    <div className="dashboard w-screen h-screen flex overflow-hidden">
      <SidebarProvider>
        <AppSidebar />
        <main className="dashboard-main flex-1 h-full overflow-auto">
          <Outlet />
        </main>
      </SidebarProvider>
    </div>
  )
}
