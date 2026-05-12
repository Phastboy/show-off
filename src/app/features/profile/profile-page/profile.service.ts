import { Injectable, inject, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { API_BASE_URL } from '../../../core/constants/api';
import type { UserProfile, UpdateUserProfileDto } from '../../../core/models/api.models';

@Injectable()
export class ProfileService {
  private readonly http = inject(HttpClient);
  private readonly baseUrl = inject(API_BASE_URL);

  readonly user = signal<UserProfile | null>(null);
  readonly loading = signal(true);
  readonly updating = signal(false);

  loadProfile() {
    this.loading.set(true);
    // Adjust endpoint to match your backend (e.g., /auth/profile or /users/me)
    this.http.get<UserProfile>(`${this.baseUrl}/users/me`).subscribe({
      next: (profile) => {
        this.user.set(profile);
        this.loading.set(false);
      },
      error: () => this.loading.set(false),
    });
  }

  updateProfile(dto: UpdateUserProfileDto) {
    this.updating.set(true);
    return this.http.patch<UserProfile>(`${this.baseUrl}/users/me`, dto).subscribe({
      next: (updated) => {
        this.user.set(updated);
        this.updating.set(false);
      },
      error: () => this.updating.set(false),
    });
  }
}
