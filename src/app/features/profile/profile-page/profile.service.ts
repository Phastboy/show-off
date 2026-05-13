import { Injectable, inject, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { switchMap, tap } from 'rxjs';
import { API_BASE_URL } from '../../../core/constants/api';
import { MediaService } from '../../../core/services/media.service';
import { User } from '../../../core/models/user.models';

export interface UpdateProfileDto {
  name?: string;
  avatarUrl?: string;
  avatarId?: string;
}

@Injectable()
export class ProfileService {
  private readonly http = inject(HttpClient);
  private readonly media = inject(MediaService);
  private readonly baseUrl = inject(API_BASE_URL);

  readonly user = signal<User | null>(null);
  readonly loading = signal(false);
  readonly saving = signal(false);

  load() {
    this.loading.set(true);
    return this.http.get<User>(`${this.baseUrl}/users/me`).pipe(
      tap({
        next: (u) => {
          this.user.set(u);
          this.loading.set(false);
        },
        error: () => this.loading.set(false),
      }),
    );
  }

  /**
   * If a new avatar file is provided, upload it first then patch.
   * Otherwise patch name-only. One round-trip when no avatar change.
   */
  save(name: string, avatarFile: File | null) {
    this.saving.set(true);

    const patch$ = avatarFile
      ? this.media.uploadMedia(avatarFile, 'AVATAR').pipe(
          switchMap((uploaded) =>
            this.http.patch<User>(`${this.baseUrl}/users/me`, {
              name,
              avatarUrl: uploaded.url,
              avatarId: uploaded.fileId,
            }),
          ),
        )
      : this.http.patch<User>(`${this.baseUrl}/users/me`, { name });

    return patch$.pipe(
      tap({
        next: (u) => {
          this.user.set(u);
          this.saving.set(false);
        },
        error: () => this.saving.set(false),
      }),
    );
  }
}
