export interface LoginDto {
  email: string;
  password: string;
}

export interface RegisterDto {
  email: string;
  password: string;
  name: string;
}

export interface AuthToken {
  token: string;
  expiresAt: string;
}

export interface RegisterResponse {
  accountId: string;
  userId: string;
  email: string;
  name: string;
  createdAt: string;
}

