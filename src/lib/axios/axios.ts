import axios from 'axios'
import { ApiUrl } from '@/constant'
import { useAuth } from '@/context/use-auth'

export const Api = axios.create({
  baseURL: ApiUrl,
  headers: {
    'Content-Type': 'application/json',
  },
})

Api.interceptors.request.use((config) => {
  const token = useAuth.getState().access_token

  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }

  return config
})

Api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const { signOut } = useAuth.getState()

    if (error.response?.status === 401) {
      signOut()
    }

    return Promise.reject(error)
  },
)
