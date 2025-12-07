import { keepPreviousData, useQuery } from '@tanstack/react-query'
import type { GetGoodsParams } from '@/api/goods/type'
import { getDataGoods } from '@/api/goods/goods'

export const useGoodsQuery = ({
  page_index = 1,
  limit = 10,
  q = '',
}: GetGoodsParams) =>
  useQuery({
    queryKey: ['getGoods', page_index, limit, q],
    queryFn: () => getDataGoods({ page_index, limit, q }),
    staleTime: 5_000,
    refetchOnWindowFocus: false,
    placeholderData: keepPreviousData,
  })
