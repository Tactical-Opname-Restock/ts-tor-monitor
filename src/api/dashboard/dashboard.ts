import type { DashboardResponse } from './type'
import { Api } from '@/lib/axios/axios'

export const getDataDashboard = async (): Promise<DashboardResponse> => {
  const res = await Api.get<DashboardResponse>('api/dashboard/')
  return res.data
}
