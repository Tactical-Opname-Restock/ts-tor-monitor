import { createFileRoute } from '@tanstack/react-router'
import { motion } from 'framer-motion'
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb'
import { SidebarInset, SidebarTrigger } from '@/components/ui/sidebar'
import { useDashboardQuery } from '@/hooks/query/use-dashboard-query'
import { Card } from '@/components/ui/card'
// import ChartAreaStacked from '@/components/ui/chart-custom'

export const Route = createFileRoute('/dashboard/')({
  component: DashboardHome,
})

function DashboardHome() {
  const { data } = useDashboardQuery()
  console.log(data)

  return (
    <SidebarInset className="w-full h-screen flex flex-col bg-background">
      {/* HEADER */}
      <header className="h-14 border-b bg-background flex items-center px-4 flex-shrink-0">
        <SidebarTrigger />
        <Breadcrumb className="ml-3">
          <BreadcrumbList>
            <BreadcrumbItem className="hidden md:block">
              <BreadcrumbLink href="/dashboard">Dashboard</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator className="hidden md:block" />
            <BreadcrumbItem>
              <BreadcrumbPage>Overview</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </header>

      {/* MAIN */}
      <main className="flex-1 w-full overflow-hidden p-6">
        <div className="flex w-full h-full gap-6">
          {/* LEFT SIDE */}
          <div className="w-1/2 flex flex-col gap-4 h-full">
            {/* GREETING */}
            <div>
              <h1 className="text-3xl font-semibold">Pagi Jokowi</h1>
              <p className="text-muted-foreground">
                Ini List Produk Kamu Yang Paling Sedikit
              </p>
            </div>

            {/* LIST / EMPTY DIV */}
            <div className="flex-1 bg-[#FFFAF0] border-4 border-black shadow-[6px_6px_0_0_#000] overflow-auto" />
          </div>

          {/* RIGHT SIDE */}
          <div className="w-1/2 flex flex-col gap-4 h-full">
            {/* CHART */}
            {/* <div className="flex-1 bg-background rounded-lg overflow-hidden"> */}
            <div className="flex-1 bg-[#FFFAF0] border-4 border-black shadow-[6px_6px_0_0_#000] overflow-auto" />
            {/* <ChartAreaStacked /> */}
            {/* </div> */}

            {/* STATS WIDGET */}
            <div className="grid grid-cols-2 gap-6">
              <Widget title="Users" value={data?.stats?.users} />
              <Widget title="Posts" value={data?.stats?.posts} />
            </div>
          </div>
        </div>
      </main>
    </SidebarInset>
  )
}

function Widget({ title, value }: { title: string; value?: string | number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <Card className="bg-[#FFFAF0] border-4 border-black shadow-[6px_6px_0_0_#000] p-6 transition-all hover:translate-y-[-4px] hover:shadow-[10px_10px_0_0_#000] duration-200 cursor-pointer">
        <div className="text-sm font-bold text-muted-foreground mb-2">
          {title}
        </div>
        <div className="text-4xl font-black">{value ?? '--'}</div>
      </Card>
    </motion.div>
  )
}
