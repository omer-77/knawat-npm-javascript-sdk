interface Attribute {
  name: Locale;
  options: Locale[];
}
interface Locale {
  ar: string;
  tr: string;
  en: string;
}
export interface Product {
  sku: string;
  name: Locale;
  description: Locale;
  images: string[];
  created: string;
  updated: string;
  attributes: Attribute[];
  variations: Variation[];
  externalId: number;
  externalUrl: string;
}
export interface Variation {
  sku: string;
  cost_price: number;
  sale_price: number;
  market_price: number;
  weight: number;
  attributes: Attribute[];
  quantity: number;
  externalId: number;
  inventoryItemId?: number;
}
export interface GetProductsParams {
  limit: number;
  page: number;
  lastupdate?: number;
}
export interface Store {
  consumer_key: string;
  consumer_secret: string;
  created: string;
  updated: string;
  stock_date: string;
  stock_status: string;
  price_date: string;
  price_status: string;
  sale_price: number;
  sale_price_operator: number;
  compared_at_price: number;
  compared_at_price_operator: number;
  currency: string;
  name: string;
  external_data: StoreExternalData;
  languages: string[];
  status: string;
  type: string;
  url: string;
}
interface StoreExternalData {
  default_language: string;
  website: string;
  timezone: string;
  ships_to_countries: string[];
  shopify_plan: string;
  access_token: string;
  fulfillmentService: StoreFulfillmentService;
  custom_repush: boolean;
}
interface StoreFulfillmentService {
  id: number;
  name: string;
  email: string;
  service_name: string;
  handle: string;
  fulfillment_orders_opt_in: boolean;
  include_pending_stock: boolean;
  provider_id: number;
  location_id: number;
  callback_url: string;
  tracking_support: boolean;
  inventory_management: boolean;
}