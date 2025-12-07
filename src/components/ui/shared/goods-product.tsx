import { motion } from 'framer-motion'
import { Package, Trash2 } from 'lucide-react'
import { Link } from '@tanstack/react-router'
import { Button } from '@/components/ui/button'

export interface ProductCardProps {
  id: string
  name: string
  category: string
  price: number
  stock_quantity: number
  onDelete?: (id: string) => void
  showDetails?: boolean
}

export function ProductCard({
  id,
  name,
  category,
  price,
  stock_quantity,
  onDelete,
  showDetails = true,
}: ProductCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="relative"
    >
      <div className="bg-white-primary border-2 border-black rounded-lg shadow-[4px_4px_0_0_#000] p-4 flex flex-col gap-3 hover:translate-y-0.5 hover:shadow-[6px_6px_0_0_#000] transition-all">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex flex-col min-w-0">
            <h2 className="font-bold text-lg truncate" title={name}>
              {name}
            </h2>
            <p className="text-sm text-muted-foreground truncate">{category}</p>
          </div>
          <Package size={32} className="text-chart-1 shrink-0 ml-2" />
        </div>

        {/* Body */}
        <div className="flex flex-col gap-1">
          <p className="text-sm text-stone-700">
            Price:{' '}
            <span className="font-semibold">
              {price === 0 ? 'Gratis' : `Rp ${price.toLocaleString()}`}
            </span>
          </p>
          <p className="text-sm text-stone-700">
            Stock: <span className="font-semibold">{stock_quantity}</span>
          </p>
        </div>

        {/* Footer Buttons */}
        <div className="flex justify-end gap-2 mt-2">
          {showDetails && (
            <Link to="/dashboard/goods/$id" params={{ id }}>
              <Button size="sm" variant="default" className="font-medium">
                Details
              </Button>
            </Link>
          )}
          {onDelete && (
            <Button size="sm" variant="default" onClick={() => onDelete(id)}>
              Delete
            </Button>
          )}
        </div>
      </div>
    </motion.div>
  )
}
