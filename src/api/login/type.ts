import type { TResponse } from '@/common'

export type TLoginResponse = TResponse<{
  message: string
  data: {
    access_token: string
    type_token: string
  }
}>
