import { computed, inject, Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { tap, switchMap } from 'rxjs';
import { API_BASE_URL } from '../constants/api';
import { CookieService } from './cookie.service';
import { UserStore } from './user.store';
import type { AuthToken, LoginDto, RegisterDto, RegisterResponse } from '../models/auth.models';

const TOKEN_KEY = 'pulse_token';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly http = inject(HttpClient);
  private readonly router = inject(Router);
  private readonly cookies = inject(CookieService);
  private readonly baseUrl = inject(API_BASE_URL);
  private readonly userStore = inject(UserStore);

  private readonly _token = signal<string | null>(this.cookies.get(TOKEN_KEY));

  readonly token = this._token.asReadonly();
  readonly isAuthenticated = computed(() => this._token() !== null);

  register(dto: RegisterDto) {
    return this.http.post<RegisterResponse>(`${this.baseUrl}/accounts/register`, dto);
  }

  login(dto: LoginDto) {
    return this.http.post<AuthToken>(`${this.baseUrl}/auth/login`, dto).pipe(
      tap((res) => this.persist(res.token)),
      switchMap(() => this.userStore.load()),
      tap(() => this.router.navigate(['/businesses'])),
    );
  }

  loadSession() {
    if (!this._token()) return;
    this.userStore.load().subscribe({
      error: () => this.logout(),
    });
  }

  logout() {
    this.clear();
    this.router.navigate(['/auth/login']);
  }

  private persist(token: string) {
    this.cookies.set(TOKEN_KEY, token, { maxAge: 60 * 60 * 24 * 7 });
    this._token.set(token);
  }

  private clear() {
    this.cookies.delete(TOKEN_KEY);
    this._token.set(null);
    this.userStore.clear();
  }
}

