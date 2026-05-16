import { inject, Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs';
import { API_BASE_URL } from '../../../core/constants/api';
import type {
  BusinessProfile,
  CreateBusinessProfileDto,
  UpdateBusinessProfileDto,
} from '../models/business-profile.models';

@Injectable({ providedIn: 'root' })
export class BusinessProfileService {
  private readonly http = inject(HttpClient);
  private readonly baseUrl = inject(API_BASE_URL);

  private readonly _myBusinesses = signal<BusinessProfile[]>([]);
  readonly myBusinesses = this._myBusinesses.asReadonly();

  private readonly _loading = signal(false);
  readonly loading = this._loading.asReadonly();

  loadMyBusinesses() {
    this._loading.set(true);
    return this.http.get<BusinessProfile[]>(`${this.baseUrl}/users/me/businesses`).pipe(
      tap({
        next: (businesses) => this._myBusinesses.set(businesses),
        finalize: () => this._loading.set(false),
      }),
    );
  }

  getById(id: string) {
    return this.http.get<BusinessProfile>(`${this.baseUrl}/businesses/${id}`);
  }

  create(dto: CreateBusinessProfileDto) {
    return this.http.post<BusinessProfile>(`${this.baseUrl}/businesses`, dto).pipe(
      tap((created) => this._myBusinesses.update((list) => [created, ...list])),
    );
  }

  update(id: string, dto: UpdateBusinessProfileDto) {
    return this.http.patch<BusinessProfile>(`${this.baseUrl}/businesses/${id}`, dto).pipe(
      tap((updated) =>
        this._myBusinesses.update((list) => list.map((b) => (b.id === id ? updated : b))),
      ),
    );
  }

  delete(id: string) {
    return this.http.delete<void>(`${this.baseUrl}/businesses/${id}`).pipe(
      tap(() => this._myBusinesses.update((list) => list.filter((b) => b.id !== id))),
    );
  }

  uploadLogo(id: string, file: File) {
    const form = new FormData();
    form.append('file', file);
    return this.http.post<BusinessProfile>(`${this.baseUrl}/businesses/${id}/logo`, form).pipe(
      tap((updated) =>
        this._myBusinesses.update((list) => list.map((b) => (b.id === id ? updated : b))),
      ),
    );
  }

  uploadBanner(id: string, file: File) {
    const form = new FormData();
    form.append('file', file);
    return this.http.post<BusinessProfile>(`${this.baseUrl}/businesses/${id}/banner`, form).pipe(
      tap((updated) =>
        this._myBusinesses.update((list) => list.map((b) => (b.id === id ? updated : b))),
      ),
    );
  }
}

