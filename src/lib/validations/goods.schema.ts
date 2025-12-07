import { z } from 'zod'

// Schema untuk form validation
export const goodsFormSchema = z.object({
  name: z.string().min(1, 'Product name is required'),
  category: z.string(),
  price: z.number().positive('Price must be positive'),
  stock_quantity: z
    .number()
    .int('Stock must be an integer')
    .min(0, 'Stock must be at least 0'),
})

// Type yang di-export
export type TGoodsForm = z.infer<typeof goodsFormSchema>
