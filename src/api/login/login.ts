import type { TAuthSchema } from '@/lib/validations/auth.schema'
// import type { TLoginResponse } from './type'
import { Api } from '@/lib/axios/axios'

export const login = async (payload: TAuthSchema) => {
  const res = await Api.post('/sign_in', payload)
  return res.data
}
