import { Api } from '@/lib/axios/axios'

export const getDataDashboard = async () => {
  const res = await Api.get('api/dashboard')
  return res.data
}
