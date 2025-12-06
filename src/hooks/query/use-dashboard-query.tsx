import { useQuery } from '@tanstack/react-query'
import { getDataDashboard } from '@/api/dashboard/dashboard'

export const useDashboardQuery = () =>
  useQuery({
    queryKey: ['dashboard'],
    queryFn: async () => await getDataDashboard(),
    staleTime: 5000,
    refetchOnWindowFocus: false,
  })
