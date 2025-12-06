import { useMutation } from '@tanstack/react-query'
import type { TAuthSchema } from '@/lib/validations/auth.schema'
import { register } from '@/api/register/register'

export const useRegisterMutation = () => {
  return useMutation({
    mutationKey: ['login'],
    mutationFn: async (payload: TAuthSchema) => await register(payload),
  })
}
