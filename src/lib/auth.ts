import { redirect } from '@tanstack/react-router'

export function requireAuth(options?: { redirectTo?: string }) {
  let token: string | null = null

  if (typeof window !== 'undefined') {
    // hanya jalan di browser
    token = localStorage.getItem('access_token')
  }

  if (!token) {
    throw redirect({
      to: '/login',
      search: options?.redirectTo
        ? { redirect: options.redirectTo }
        : undefined,
    })
  }

  return token
}
