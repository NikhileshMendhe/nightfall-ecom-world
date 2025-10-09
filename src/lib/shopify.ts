import { supabase } from "@/integrations/supabase/client";

export interface ShopifyProduct {
  id: number;
  title: string;
  body_html: string;
  vendor: string;
  product_type: string;
  created_at: string;
  handle: string;
  updated_at: string;
  published_at: string;
  template_suffix: string | null;
  status: string;
  published_scope: string;
  tags: string;
  admin_graphql_api_id: string;
  variants: Array<{
    id: number;
    product_id: number;
    title: string;
    price: string;
    sku: string;
    position: number;
    inventory_policy: string;
    compare_at_price: string | null;
    fulfillment_service: string;
    inventory_management: string | null;
    option1: string;
    option2: string | null;
    option3: string | null;
    created_at: string;
    updated_at: string;
    taxable: boolean;
    barcode: string | null;
    grams: number;
    image_id: number | null;
    weight: number;
    weight_unit: string;
    inventory_item_id: number;
    inventory_quantity: number;
    old_inventory_quantity: number;
    requires_shipping: boolean;
    admin_graphql_api_id: string;
  }>;
  options: Array<{
    id: number;
    product_id: number;
    name: string;
    position: number;
    values: string[];
  }>;
  images: Array<{
    id: number;
    product_id: number;
    position: number;
    created_at: string;
    updated_at: string;
    alt: string | null;
    width: number;
    height: number;
    src: string;
    variant_ids: number[];
    admin_graphql_api_id: string;
  }>;
  image: {
    id: number;
    product_id: number;
    position: number;
    created_at: string;
    updated_at: string;
    alt: string | null;
    width: number;
    height: number;
    src: string;
    variant_ids: number[];
    admin_graphql_api_id: string;
  } | null;
}

export interface ShopifyShopInfo {
  shop: {
    id: number;
    name: string;
    email: string;
    domain: string;
    province: string;
    country: string;
    address1: string;
    zip: string;
    city: string;
    source: string | null;
    phone: string;
    latitude: number;
    longitude: number;
    primary_locale: string;
    address2: string | null;
    created_at: string;
    updated_at: string;
    country_code: string;
    country_name: string;
    currency: string;
    customer_email: string;
    timezone: string;
    iana_timezone: string;
    shop_owner: string;
    money_format: string;
    money_with_currency_format: string;
    weight_unit: string;
    province_code: string | null;
    taxes_included: boolean | null;
    auto_configure_tax_inclusivity: boolean | null;
    tax_shipping: boolean | null;
    county_taxes: boolean | null;
    plan_display_name: string;
    plan_name: string;
    has_discounts: boolean;
    has_gift_cards: boolean;
    myshopify_domain: string;
    google_apps_domain: string | null;
    google_apps_login_enabled: boolean | null;
    money_in_emails_format: string;
    money_with_currency_in_emails_format: string;
    eligible_for_payments: boolean;
    requires_extra_payments_agreement: boolean;
    password_enabled: boolean;
    has_storefront: boolean;
    finances: boolean;
    primary_location_id: number;
    checkout_api_supported: boolean;
    multi_location_enabled: boolean;
    setup_required: boolean;
    pre_launch_enabled: boolean;
    enabled_presentment_currencies: string[];
    transactional_sms_disabled: boolean;
    marketing_sms_consent_enabled_at_checkout: boolean;
  };
}

/**
 * Makes a server-side request to Shopify API via edge function
 * @param endpoint - The Shopify API endpoint (e.g., 'products.json', 'shop.json')
 * @param method - HTTP method (GET, POST, PUT, DELETE)
 * @param body - Request body for POST/PUT requests
 */
export async function callShopifyAPI<T = any>(
  endpoint: string,
  method: 'GET' | 'POST' | 'PUT' | 'DELETE' = 'GET',
  body?: any
): Promise<T> {
  try {
    const { data, error } = await supabase.functions.invoke('shopify-api', {
      body: { endpoint, method, body }
    });

    if (error) {
      console.error('Shopify API call failed:', error);
      throw new Error(error.message || 'Failed to call Shopify API');
    }

    if (data.error) {
      console.error('Shopify API returned error:', data.error);
      throw new Error(data.error);
    }

    return data as T;
  } catch (error) {
    console.error('Error calling Shopify API:', error);
    throw error;
  }
}

/**
 * Fetches all products from Shopify
 */
export async function getShopifyProducts(): Promise<ShopifyProduct[]> {
  const data = await callShopifyAPI<{ products: ShopifyProduct[] }>('products.json');
  return data.products;
}

/**
 * Fetches a single product by ID from Shopify
 */
export async function getShopifyProduct(productId: number): Promise<ShopifyProduct> {
  const data = await callShopifyAPI<{ product: ShopifyProduct }>(`products/${productId}.json`);
  return data.product;
}

/**
 * Fetches shop information from Shopify
 */
export async function getShopInfo(): Promise<ShopifyShopInfo['shop']> {
  const data = await callShopifyAPI<ShopifyShopInfo>('shop.json');
  return data.shop;
}

/**
 * Verifies Shopify connection by fetching shop metadata
 */
export async function verifyShopifyConnection(): Promise<boolean> {
  try {
    await getShopInfo();
    return true;
  } catch (error) {
    console.error('Shopify connection verification failed:', error);
    return false;
  }
}
