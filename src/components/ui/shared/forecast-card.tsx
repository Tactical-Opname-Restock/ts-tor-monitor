import { motion } from 'framer-motion'

export interface ForecastPrediction {
  date: string
  total_sales: number
  max_sales: number
  min_sales: number
}

export interface ProductForecast {
  predictions: Array<ForecastPrediction>
  total_sales: number
  max_restock_quantity: number
  min_restock_quantity: number
  restock_quantity: number
  goods_mae: number
}

export interface ForecastCardProps {
  forecast: ProductForecast
}

export function ForecastCard({ forecast }: ForecastCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="bg-white-primary border-2 border-black rounded-lg shadow-[4px_4px_0_0_#000] p-4 flex flex-col gap-3"
    >
      <h2 className="font-bold text-lg">Forecast Summary</h2>

      <div className="flex flex-col gap-1 text-sm text-stone-700">
        <p>
          Total Forecast Sales:{' '}
          <span className="font-semibold">{forecast.total_sales}</span>
        </p>
        <p>
          Restock Quantity:{' '}
          <span className="font-semibold">{forecast.restock_quantity}</span>
        </p>
        <p>
          Min Restock:{' '}
          <span className="font-semibold">{forecast.min_restock_quantity}</span>{' '}
          | Max Restock:{' '}
          <span className="font-semibold">{forecast.max_restock_quantity}</span>
        </p>
      </div>
    </motion.div>
  )
}
