import { useMutation } from '@tanstack/react-query'
import type { TMutationGoods } from '@/api/goods/type'
import { createGoods } from '@/api/goods/goods'

export const useGoodMutation = () => {
  return useMutation({
    mutationKey: ['good_mutation'],
    mutationFn: async (payload: TMutationGoods) => await createGoods(payload),
  })
}
