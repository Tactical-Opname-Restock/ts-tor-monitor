export interface DashboardResponse {
  data: DashboardData
}

export interface DashboardData {
  top_low_stock: Array<Product>
  sales_chart: Array<SalesChart>
  monthly_revenue: number
  top_selling_item: TopSellingItem
}

export interface Product {
  id: string
  name: string
  category: string
  stock_quantity: number
  price: number
}

export interface SalesChart {
  date: string
  total_sales: number
}

export interface TopSellingItem {
  name: string
  total_quantity_sold: number
  total_profit: number
}
