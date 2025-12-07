import type {
  GetGoodsParams,
  PaginatedResponse,
  ProductDetailItem,
  ProductForecastResponse,
  ProductItem,
  TMutationGoods,
} from './type'
import { Api } from '@/lib/axios/axios'

export const getDataGoods = async ({
  page_index = 1,
  limit = 10,
  q = '',
}: GetGoodsParams): Promise<PaginatedResponse<ProductItem>> => {
  const res = await Api.get<PaginatedResponse<ProductItem>>('api/goods', {
    params: {
      page_index,
      limit,
      q,
    },
  })

  return res.data
}
export const getGoodsForecast = async (
  day_forecast: number,
  id: string,
): Promise<Array<ProductDetailItem>> => {
  const res = await Api.get<ProductForecastResponse>('/api/forecast/', {
    params: { goods_id: id, day_forecast },
  })

  // Jika data undefined, kembalikan array kosong
  return res.data.data
}

export const createGoods = async (payload: TMutationGoods) => {
  const res = await Api.post('/api/goods', payload)
  return res.data
}
