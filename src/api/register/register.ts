import type { TAuthSchema } from '@/lib/validations/auth.schema'
import { Api } from '@/lib/axios/axios'

export const register = async (payload: TAuthSchema) => {
  const res = await Api.post('/sign_up', payload)
  return res.data
}
