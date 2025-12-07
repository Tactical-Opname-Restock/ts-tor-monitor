import cookiesStorage from './cookie-storage'

export const isLoggedIn = async (): Promise<boolean> => {
  try {
    const cookie = await cookiesStorage.getItem('auth')

    if (!cookie) return false

    const parsedCookie = JSON.parse(cookie)
    const token = parsedCookie?.state?.token

    return !!token
  } catch (error) {
    console.error('Error checking auth status:', error)
    return false
  }
}
export const dateFormat = (date: string): string =>
  new Date(date).toLocaleDateString('id', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })

export const formatToMySQLDatetime = (date: Date): string => {
  return date.toISOString().slice(0, 19).replace('T', ' ')
}
export const formatRupiah = (
  value: number | string,
  withPrefix = true,
): string => {
  const number = typeof value === 'string' ? parseFloat(value) : value

  if (isNaN(number)) return withPrefix ? 'Rp 0' : '0'

  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
  }).format(number)
}

export function formatDateShort(input: string | Date): string {
  const date = typeof input === 'string' ? new Date(input) : input

  const day = date.getDate().toString().padStart(2, '0')

  const monthShort = date.toLocaleString('en-US', { month: 'short' })

  return `${day} ${monthShort}`
}
