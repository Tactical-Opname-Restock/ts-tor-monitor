import cookiesStorage from 'utils/cookie-storage'
import { create } from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware'

interface IAuthStore {
  access_token: string | null
  signIn: (access: string) => void
  signOut: () => void
}

export const useAuth = create(
  persist<IAuthStore>(
    (set) => ({
      access_token: null,
      signIn: (access) => set({ access_token: access }),
      signOut: () => {
        set({ access_token: null })
        cookiesStorage.removeItem('auth')
      },
    }),
    {
      name: 'auth',
      storage: createJSONStorage(() => cookiesStorage),
    },
  ),
)
