import { Monitor, Users, Zap } from 'lucide-react'
import type { TFeature, TWorkStep } from './type'

export const FEATURE: Array<TFeature> = [
  {
    icon: <Monitor />,
    title: 'Stock Monitoring',
    desc: 'Pantau ketersediaan stok secara real-time untuk mencegah kekurangan barang di gudang.',
  },
  {
    icon: <Users />,
    title: 'Team Coordination',
    desc: 'Koordinasi tim lapangan dan gudang agar proses opname dan restock berjalan lancar.',
  },
  {
    icon: <Zap />,
    title: 'Instant Alerts',
    desc: 'Dapatkan notifikasi cepat saat stok menipis atau terjadi selisih opname.',
  },
]

export const STEPS: Array<TWorkStep> = [
  {
    id: 1,
    title: 'Prepare Stock Data',
    description:
      'Siapkan data stok terkini dari semua gudang dan titik penjualan sebelum opname dimulai.',
  },
  {
    id: 2,
    title: 'Conduct Opname',
    description:
      'Tim melakukan pengecekan fisik terhadap stok untuk memastikan kesesuaian dengan data sistem.',
  },
  {
    id: 3,
    title: 'Restock & Update',
    description:
      'Lakukan restock barang yang menipis dan update sistem agar stok tercatat akurat.',
  },
]
