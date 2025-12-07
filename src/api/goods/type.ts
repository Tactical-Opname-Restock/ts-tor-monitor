export interface ProductItem {
  id: string
  name: string
  category: string
  price: number
  stock_quantity: number
  created_at: string
}
export interface PaginatedResponse<T> {
  data: Array<T>
  total: number
  page: number
  limit: number
}
export type GetGoodsParams = {
  page_index?: number
  limit?: number
  q?: string
}
export type TMutationGoods = {
  name: string
  category: string
  price: number
  stock_quantity: number
}
export interface ProductSalesSummary {
  date: string
  total_quantity: number
}

export interface ProductForecastPrediction {
  date: string
  total_sales: number
  max_sales: number
  min_sales: number
}

export interface ProductForecast {
  predictions: Array<ProductForecastPrediction>
  total_sales: number
  max_restock_quantity: number
  min_restock_quantity: number
  restock_quantity: number
  goods_mae: number
}

export interface ProductDetailItem {
  id: string
  name: string
  category: string
  price: number
  stock_quantity: number
  created_at: string
  sales: Array<ProductSalesSummary>
  is_forecasted: boolean
  forecast: ProductForecast
}

// Response dari API forecast
export interface ProductForecastResponse {
  data: Array<ProductDetailItem>
}
