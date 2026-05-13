import { DynamicAttributes } from './api.models';

export interface ListingMedia {
  url: string;
  publicId: string; // Crucial for storage management
  order: number;
}

/**
 * Standardized response for discovery and details.
 */
export interface Listing {
  id: string;
  slug: string;
  title: string;
  description: string | null;
  basePrice: number;
  currency: string;
  isVerified: boolean;
  attributes: DynamicAttributes; // Polymorphic JSONB data
  category: {
    id: string;
    name: string;
    slug: string;
  };
  media: ListingMedia[];
  createdAt: string;
}

export interface CreateListingDto {
  title: string;
  description?: string;
  categoryId: string; // Links to the Blueprint
  basePrice: number;
  currency: string; // Default "NGN"
  attributes: DynamicAttributes;
  media?: ListingMedia[];
}

/**
 * Partial update for editing listings.
 */
export type UpdateListingDto = Partial<CreateListingDto>;
