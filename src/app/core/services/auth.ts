import { HttpClient } from '@angular/common/http';
import { isPlatformBrowser } from '@angular/common';
import { Injectable, PLATFORM_ID, computed, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
import { tap } from 'rxjs';
import type {
  LoginPasswordDto,
  ProfileResponse,
  ReceiptTokenResponse,
  RegisterDto,
  RegisterResponse,
} from '../models/api.models';

const TOKEN_KEY = 'cp_token';
const BASE = 'https://distinguished-dolorita-campusuniverse-5925f056.koyeb.app/api';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly http = inject(HttpClient);
  private readonly router = inject(Router);
  private readonly isBrowser = isPlatformBrowser(inject(PLATFORM_ID));

  // Signal is set in constructor so isPlatformBrowser is available
  private readonly _token = signal<string | null>(null);

  readonly token = this._token.asReadonly();
  readonly isAuthenticated = computed(() => this._token() !== null);

  constructor() {
    if (this.isBrowser) {
      this._token.set(localStorage.getItem(TOKEN_KEY));
    }
  }

  register(dto: RegisterDto) {
    return this.http.post<RegisterResponse>(`${BASE}/accounts/register`, dto);
  }

  login(dto: LoginPasswordDto) {
    return this.http
      .post<ReceiptTokenResponse>(`${BASE}/auth/login`, dto)
      .pipe(tap((res) => this.persist(res.token)));
  }

  me() {
    return this.http.get<ProfileResponse>(`${BASE}/me`);
  }

  logout() {
    this.clear();
    this.router.navigate(['/auth/login']);
  }

  private persist(token: string) {
    if (this.isBrowser) localStorage.setItem(TOKEN_KEY, token);
    this._token.set(token);
  }

  private clear() {
    if (this.isBrowser) localStorage.removeItem(TOKEN_KEY);
    this._token.set(null);
  }
}
