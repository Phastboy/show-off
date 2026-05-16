import { inject, Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs';
import { API_BASE_URL } from '../constants/api';
import type { User } from '../models/user.models';

@Injectable({ providedIn: 'root' })
export class UserStore {
  private readonly http = inject(HttpClient);
  private readonly baseUrl = inject(API_BASE_URL);

  private readonly _user = signal<User | null>(null);
  readonly user = this._user.asReadonly();

  load() {
    return this.http
      .get<User>(`${this.baseUrl}/users/me`)
      .pipe(tap((user) => this._user.set(user)));
  }

  set(user: User) {
    this._user.set(user);
  }

  clear() {
    this._user.set(null);
  }
}

