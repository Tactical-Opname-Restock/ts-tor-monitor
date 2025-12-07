'use client'

import { Area, AreaChart, CartesianGrid, XAxis } from 'recharts'
import { formatDateShort, formatRupiah } from 'utils/helper'
import type { ChartConfig } from '@/components/ui/chart'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart'

export interface ChartAreaStackedProps<T extends Record<string, any>> {
  data: Array<T>
  config: ChartConfig
  title?: string
  description?: string
  height?: string | number
  stackId?: string
  xDataKey?: keyof T
}

export function DashboardChart<T extends Record<string, any>>({
  data,
  config,
  title = 'Grafik Penjualan',
  description = '',
  stackId = 'a',
  xDataKey,
}: ChartAreaStackedProps<T>) {
  return (
    <Card className="bg-white-primary text-foreground  flex flex-col justify-center">
      <CardHeader>
        <CardTitle className="text-2xl">{title}</CardTitle>
        {description && <CardDescription>{description}</CardDescription>}
      </CardHeader>
      <CardContent>
        <ChartContainer config={config} className="h-full">
          <AreaChart
            data={data}
            margin={{ left: 1, right: 1 }}
            // style={{ height }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey={xDataKey as string}
              tickLine={false}
              axisLine={false}
              tickMargin={1}
              interval={4}
              tickFormatter={(value) => formatDateShort(value)}
            />
            <ChartTooltip
              cursor={false}
              content={
                <ChartTooltipContent
                  indicator="dot"
                  formatter={(value: number) => formatRupiah(value)}
                />
              }
            />
            {Object.keys(config).map((key) => (
              <Area
                key={key}
                dataKey={key}
                // fillOpacity={0.35}
                type="basisOpen"
                fill={config[key].color}
                stroke={config[key].color}
                activeDot={{ fill: 'var(--chart-active-dot)' }}
                stackId={stackId}
              />
            ))}
          </AreaChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
