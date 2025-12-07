'use client'
import { useState } from 'react'
import { createFileRoute } from '@tanstack/react-router'
import type { ProductDetailItem } from '@/api/goods/type'
import { DashboardLayout } from '@/components/ui/shared/dashboard-layout'
import { useGoodsForecastQuery } from '@/hooks/query/use-goods-query-by-id'
import { ProductCard } from '@/components/ui/shared/goods-product'
import { ForecastCard } from '@/components/ui/shared/forecast-card'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { DashboardChart } from '@/components/ui/chart-custom'

export const Route = createFileRoute('/dashboard/goods/$id')({
  component: GoodsDetailPage,
})

function GoodsDetailPage() {
  const { id } = Route.useParams()

  const { data, isLoading } = useGoodsForecastQuery(id, 7)
  const product = data?.[0]

  return (
    <DashboardLayout title="Goods Details" description="Manage product list">
      {/* Select day forecast */}

      {/* Grid */}
      {product && (
        <div className="flex flex-col gap-5 h-screen overflow-auto p-4">
          <div className="grid grid-cols-2 gap-4">
            <ProductCard
              id={product.id}
              name={product.name}
              showDetails={false}
              category={product.category}
              price={product.price}
              stock_quantity={product.stock_quantity}
            />
            <ForecastCard forecast={product.forecast} />
          </div>

          {/* Chart */}
          <div className=" max-h-[400px] grid grid-cols-2 w-full gap-3">
            {' '}
            {/* batasi tinggi */}
            <DashboardChart
              data={product.sales}
              xDataKey="date"
              config={{
                total_quantity: { color: '#4ade80' },
              }}
              title="Forecast Sales"
              description={`Total forecast sales: ${product.forecast.total_sales}`}
              height={400} // samakan dengan max-h
            />
            <DashboardChart
              data={product.forecast.predictions}
              xDataKey="date"
              config={{
                total_sales: { color: '#4ade80' },
                max_sales: { color: '#22d3ee' },
                min_sales: { color: '#f87171' },
              }}
              title="Forecast Sales"
              description={`Total forecast sales: ${product.forecast.total_sales}`}
              height={400} // samakan dengan max-h
            />
          </div>
        </div>
      )}
    </DashboardLayout>
  )
}
