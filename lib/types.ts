export interface Category {
  id: string
  name_en: string
  name_fr: string
  description_en?: string
  description_fr?: string
  display_order: number
}

export interface MenuItem {
  id: string
  category_id: string
  name_en: string
  name_fr: string
  description_en?: string
  description_fr?: string
  price: number
  image_url?: string
  is_available: boolean
  preparation_time: number
}

export interface CartItem extends MenuItem {
  quantity: number
}

export interface Order {
  id: string
  customer_name: string
  customer_email: string
  customer_phone: string
  delivery_address: string
  status: "pending" | "confirmed" | "preparing" | "ready" | "delivered" | "cancelled"
  payment_method: "mtn_money" | "orange_money" | "cash"
  payment_status: "pending" | "completed" | "failed"
  subtotal: number
  delivery_fee: number
  total: number
  notes?: string
  items: OrderItem[]
  created_at: string
}

export interface OrderItem {
  id: string
  order_id: string
  menu_item_id: string
  item_name: string
  item_price: number
  quantity: number
  subtotal: number
}

export type Language = "en" | "fr"
