import { getCookie, removeCookie, setCookie } from 'typescript-cookie'
import type { StateStorage } from 'zustand/middleware'

const cookiesStorage: StateStorage = {
  getItem: (name: string) => {
    return getCookie(name) ?? null
  },
  setItem: (name: string, value: string) => {
    setCookie(name, value, { expires: 1, path: '/' })
  },
  removeItem: (name: string) => {
    removeCookie(name)
  },
}

export default cookiesStorage
