export interface Deal {
  id: string;
  property_name: string;
  address: string;
  city: string;
  state: string;
  zip: string;
  deal_description: string;
  regular_rent: number;
  effective_rent: number;
  bedrooms: number;
  listing_url: string;
  image_url: string;
  found_at: string;
  deal_expires_at?: string;
  is_active: boolean;
}

export interface EmailSignup {
  email: string;
  city: string;
  subscribed_at: string;
}

export interface DataStore {
  deals: Deal[];
  emails: EmailSignup[];
}

export interface DealFormData {
  property_name: string;
  address: string;
  city: string;
  state: string;
  zip: string;
  deal_description: string;
  regular_rent: number;
  bedrooms: number;
  listing_url: string;
  image_url: string;
  deal_expires_at?: string;
}

export type SortOption = 'savings' | 'rent' | 'ending' | 'newest';

export interface DealFilters {
  bedrooms?: number;
  minRent?: number;
  maxRent?: number;
}

export interface DealSavings {
  monthlySavings: number;
  totalSavings: number;
  percentageSavings: number;
}
