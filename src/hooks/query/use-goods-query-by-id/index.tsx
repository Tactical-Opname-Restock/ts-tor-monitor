import { keepPreviousData, useQuery } from '@tanstack/react-query'
import type { ProductDetailItem } from '@/api/goods/type'
import { getGoodsForecast } from '@/api/goods/goods'

export const useGoodsForecastQuery = (
  goods_id: string,
  day_forecast: number,
) => {
  return useQuery<Array<ProductDetailItem>>({
    queryKey: ['goodsForecast', goods_id, day_forecast],
    queryFn: () => getGoodsForecast(day_forecast, goods_id),
    enabled: !!goods_id,
    // placeholderData: keepPreviousData,
  })
}
