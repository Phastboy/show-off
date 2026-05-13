/**
 * Available authorization levels in the system.
 */
export type RoleType = 'USER' | 'ADMIN';

/**
 * The core User identity as defined in the domain and database.
 */
export interface User {
  id: string;
  accountId: string;
  name: string;
  role: RoleType[];
  avatarUrl: string | null;
  avatarId: string | null;
}

/**
 * Brief profile session metadata.
 */
export interface ProfileResponse {
  accountId: string;
  expiresAt: string; // ISO Date string
}
