// ── Request DTOs ────────────────────────────────────────────────────────────

export interface RegisterDto {
  email: string;
  password: string;
  name: string;
}

export interface LoginPasswordDto {
  email: string;
  password: string;
}

// ── Response shapes ──────────────────────────────────────────────────────────

export interface RegisterResponse {
  accountId: string;
  email: string;
  userId: string;
  name: string;
  createdAt: string;
}

export interface ReceiptTokenResponse {
  token: string;
  expiresAt: string;
}

export interface ProfileResponse {
  accountId: string;
  expiresAt: string;
}

export interface UserProfile {
  name?: string;
  avatarUrl?: string;
  avatarId?: string;
  phoneNumber?: string;
}

export interface UpdateUserProfileDto {
  name?: string;
  avatarUrl?: string;
  avatarId?: string;
  phoneNumber?: string;
}

// ── Venue ────────────────────────────────────────────────────────────────────

export interface VenueMediaDto {
  type: 'IMAGE' | 'VIDEO';
  publicId: string;
  url: string;
  order: number;
  caption?: string;
}

/** Read shape is identical to the write DTO. */
export type VenueMedia = VenueMediaDto;

export interface Perk {
  title: string;
  description?: string;
}

export interface Venue {
  id: string;
  name: string;
  description?: string;
  location: string;
  address: string;
  capacity: number;
  priceRangeMin?: number;
  priceRangeMax?: number;
  contactPhone?: string;
  contactWhatsapp?: string;
  amenities?: string[];
  media?: VenueMedia[];
  perks?: Perk[];
}

export interface PerkDto {
  title: string;
  description?: string;
}

export interface CreateVenueDto {
  name: string;
  location: string;
  address: string;
  capacity: number;
  description?: string;
  priceRangeMin?: number;
  priceRangeMax?: number;
  contactPhone?: string;
  contactWhatsapp?: string;
  amenities?: string[];
  media?: VenueMediaDto[];
  perks?: PerkDto[];
}

export interface VenueFilters {
  location?: string;
  minCapacity?: number;
  maxPrice?: number;
  amenities?: string[];
  page?: number;
  limit?: number;
}
