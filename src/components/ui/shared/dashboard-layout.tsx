import type { ReactNode } from 'react'
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb'
import { SidebarInset, SidebarTrigger } from '@/components/ui/sidebar'

interface DashboardLayoutProps {
  children: ReactNode
  title: string
  backTo?: string
  description?: string
}

export function DashboardLayout({
  children,
  title,
  description,
  backTo = '/dashboard',
}: DashboardLayoutProps) {
  return (
    <SidebarInset className="w-full h-screen flex flex-col bg-background p-4">
      {/* HEADER */}
      <header className="h-12 bg-background flex items-center px-4 shrink-0">
        <SidebarTrigger />

        <Breadcrumb className="ml-3">
          <BreadcrumbList>
            <BreadcrumbItem className="hidden md:block">
              <BreadcrumbLink href={backTo}>Dashboard</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator className="hidden md:block" />
            <BreadcrumbItem>
              <BreadcrumbPage>{title}</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </header>

      {/* CONTENT */}
      <main className="flex-1 flex flex-col w-full overflow-hidden px-6 py-2">
        <div className="mb-4 flex flex-col gap-2">
          <h1 className="text-3xl font-semibold">{title}</h1>
          {description && (
            <p className="text-muted-foreground">{description}</p>
          )}
        </div>

        {children}
      </main>
    </SidebarInset>
  )
}
