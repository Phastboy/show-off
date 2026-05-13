/**
 * Payload for creating a new account and user profile.
 */
export interface RegisterDto {
  email: string;
  password: string;
  name: string;
}

/**
 * Metadata returned after a successful registration.
 */
export interface RegisterResponse {
  accountId: string;
  userId: string;
  email: string;
  name: string;
  createdAt: string; // ISO Date string
}

/**
 * Payload for logging in via email and password.
 */
export interface LoginPasswordDto {
  email: string;
  password: string;
}

/**
 * Standardized session response containing the JWT.
 */
export interface ReceiptTokenResponse {
  token: string;
  expiresAt: string; // ISO Date string
}
