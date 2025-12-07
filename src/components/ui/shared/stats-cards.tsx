import { motion } from 'framer-motion'
import { SlideUpVariant } from 'utils/animate'
import type { ReactNode } from 'react'

interface StatCardProps {
  value: ReactNode
  label: string
  icon?: ReactNode
  subtitle?: string
  colorClass?: string
}

export function StatCard({
  value,
  label,
  icon,
  subtitle,
  colorClass = 'text-black',
}: StatCardProps) {
  return (
    <motion.div variants={SlideUpVariant} initial="initial" animate="animate">
      <div className="bg-[#FFFAF0] border-2 rounded-lg flex flex-row items-center justify-between h-full border-black shadow-[6px_6px_0_0_#000] p-6 transition-all hover:translate-y-[-4px] hover:shadow-[10px_10px_0_0_#000] duration-200 cursor-pointer">
        <div className="flex flex-col min-w-0 gap-1">
          <h1 className={`font-black text-3xl truncate ${colorClass}`}>
            {value}
          </h1>
          <div className="text-xl font-bold text-muted-foreground truncate">
            {label}
          </div>

          {subtitle && (
            <div className="text-sm text-muted-foreground truncate">
              {subtitle}
            </div>
          )}
        </div>

        {icon && <div className="shrink-0 ml-4">{icon}</div>}
      </div>
    </motion.div>
  )
}
