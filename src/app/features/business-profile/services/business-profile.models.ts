export type BusinessType =
  | 'INDIVIDUAL'
  | 'RETAILER'
  | 'DISTRIBUTOR'
  | 'WHOLESALER'
  | 'AGENCY';

export type VerificationStatus =
  | 'UNVERIFIED'
  | 'PENDING'
  | 'VERIFIED'
  | 'REJECTED';

export interface BusinessProfile {
  id: string;
  ownerId: string;
  name: string;
  slug: string;
  businessType: BusinessType;
  isPublic: boolean;
  verificationStatus: VerificationStatus;
  description: string | null;
  logoUrl: string | null;
  bannerUrl: string | null;
  phoneNumber: string | null;
  whatsapp: string | null;
  email: string | null;
  location: string | null;
  createdAt: string;
}

export interface BusinessSummary {
  id: string;
  name: string;
  slug: string;
  businessType: BusinessType;
  verificationStatus: VerificationStatus;
  description: string | null;
  logoUrl: string | null;
  location: string | null;
}

export interface PaginatedBusinesses {
  items: BusinessSummary[];
  total: number;
  page: number;
  limit: number;
}

export interface CreateBusinessProfileDto {
  name: string;
  businessType: BusinessType;
  description?: string;
  phoneNumber?: string;
  whatsapp?: string;
  email?: string;
  location?: string;
}

export interface UpdateBusinessProfileDto {
  name?: string;
  businessType?: BusinessType;
  description?: string;
  phoneNumber?: string;
  whatsapp?: string;
  email?: string;
  location?: string;
  isPublic?: boolean;
}

export const BUSINESS_TYPE_LABELS: Record<BusinessType, string> = {
  INDIVIDUAL: 'Individual',
  RETAILER: 'Retailer',
  DISTRIBUTOR: 'Distributor',
  WHOLESALER: 'Wholesaler',
  AGENCY: 'Agency',
};

export const VERIFICATION_STATUS_LABELS: Record<VerificationStatus, string> = {
  UNVERIFIED: 'Unverified',
  PENDING: 'Pending Review',
  VERIFIED: 'Verified',
  REJECTED: 'Rejected',
};

