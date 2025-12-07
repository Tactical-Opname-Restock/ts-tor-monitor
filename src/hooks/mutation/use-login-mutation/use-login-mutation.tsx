import { useMutation } from '@tanstack/react-query'
import type { TAuthSchema } from '@/lib/validations/auth.schema'
import { login } from '@/api/login/login'
import { useAuth } from '@/context/use-auth'

export const useLoginMutation = () => {
  const { signIn } = useAuth()
  return useMutation({
    mutationKey: ['login'],
    mutationFn: async (payload: TAuthSchema) => await login(payload),
    onSuccess: (data) => {
      const isToken = data.data.access_token

      signIn(isToken)
    },
  })
}
