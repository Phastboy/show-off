import { computed, inject, Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { tap } from 'rxjs';
import { CookieService } from './cookie.service';
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
  private readonly cookies = inject(CookieService);

  private readonly _token = signal<string | null>(this.cookies.get(TOKEN_KEY));

  readonly token = this._token.asReadonly();
  readonly isAuthenticated = computed(() => this._token() !== null);

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
    this.cookies.set(TOKEN_KEY, token);
    this._token.set(token);
  }

  private clear() {
    this.cookies.delete(TOKEN_KEY);
    this._token.set(null);
  }
}
