import { Listing } from './listing.models';

export interface ListingFilters {
  category?: string; // Category slug
  minPrice?: number;
  maxPrice?: number;
  search?: string; // Title/Description keyword
  /**
   * Dynamic attributes sent as an object (will be stringified in the service)
   * e.g., { capacity: 500 }
   */
  attributes?: Record<string, any>;
  page: number;
  limit: number;
}

export interface PaginatedListings {
  data: Listing[];
  total: number;
  page: number;
  limit: number;
}
