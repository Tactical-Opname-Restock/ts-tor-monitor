import { createFileRoute } from '@tanstack/react-router'
import { motion } from 'framer-motion'
import { formatRupiah } from 'utils/helper'
import { CircleDollarSign } from 'lucide-react'
import { SlideUpVariant } from 'utils/animate'
import { useDashboardQuery } from '@/hooks/query/use-dashboard-query'
import { DashboardChart } from '@/components/ui/chart-custom'
import { DashboardSkeleton } from '@/components/ui/dashboard-skeleton'
import { DashboardLayout } from '@/components/ui/shared/dashboard-layout'
import { ProductCard } from '@/components/ui/shared/goods-product'
import { StatCard } from '@/components/ui/shared/stats-cards'

export const Route = createFileRoute('/dashboard/')({
  component: DashboardHome,
})

function DashboardHome() {
  const { data } = useDashboardQuery()
  const config = {
    total_sales: { label: 'Total Sales', color: 'var(--chart-1)' },
  }
  return (
    <DashboardLayout
      title="Overview"
      description="Ini List Produk Kamu Yang Paling Sedikit"
    >
      {!data ? (
        <DashboardSkeleton />
      ) : (
        <div className="flex-1 flex gap-4 h-full ">
          {/* LEFT SIDE - Product Cards */}
          <div className="w-1/2 flex flex-col justify-between h-full overflow-hidden">
            <div className="grid grid-cols-2 gap-3 h-full justify-between p-1">
              {data.data.top_low_stock.length ? (
                <>
                  {data.data.top_low_stock.map(
                    (product: any, index: number) => (
                      <motion.div
                        key={product.id}
                        variants={SlideUpVariant}
                        initial="initial"
                        animate="animate"
                        transition={{
                          ...SlideUpVariant.transition,
                          delay: index * 0.05,
                        }}
                      >
                        <ProductCard
                          id={product.id}
                          name={product.name}
                          category={product.category}
                          price={product.price}
                          stock_quantity={product.stock_quantity}
                        />
                      </motion.div>
                    ),
                  )}

                  {Array.from({
                    length: Math.max(0, 8 - data.data.top_low_stock.length),
                  }).map((_, i) => (
                    <div
                      key={`placeholder-${i}`}
                      className="col-span-2 bg-white-primary border-2 border-black rounded-lg shadow-[4px_4px_0_0_#000] p-4 h-[18vh] "
                    ></div>
                  ))}
                </>
              ) : (
                <div className="col-span-full text-center text-muted-foreground py-6">
                  Belum ada produk
                </div>
              )}
            </div>
          </div>
          <div className="w-1/2 flex flex-col gap-6 h-full  ">
            <div className="grid grid-cols-2 gap-4 shrink-0 h-fit">
              <StatCard
                value={formatRupiah(data.data.monthly_revenue)}
                label="Pendapatan Bulan Ini"
                icon={<CircleDollarSign size={48} className="text-chart-1" />}
                colorClass="text-chart-1"
              />

              <StatCard
                value={data.data.top_selling_item.name}
                label="Produk Paling Laris"
                subtitle={`Terjual ${data.data.top_selling_item.total_quantity_sold} Item`}
                icon={<CircleDollarSign size={48} className="text-chart-2" />}
                colorClass="text-chart-2"
              />
            </div>

            <DashboardChart
              data={data.data.sales_chart}
              config={config}
              xDataKey="date"
              description="skibidi description"
            />
          </div>
        </div>
      )}
    </DashboardLayout>
  )
}
