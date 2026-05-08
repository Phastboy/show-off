export interface RegisterDto {
  email: string;
  password: string;
}

export interface LoginPasswordDto {
  email: string;
  password: string;
}

export interface RegisterResponse {
  accountId: string;
  email: string;
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
