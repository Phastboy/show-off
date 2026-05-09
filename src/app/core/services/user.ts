import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import type { UpdateUserProfileDto, UserProfile } from '../models/api.models';

const BASE = 'https://distinguished-dolorita-campusuniverse-5925f056.koyeb.app/api';

@Injectable({ providedIn: 'root' })
export class UserService {
  private readonly http = inject(HttpClient);

  getProfile() {
    return this.http.get<UserProfile>(`${BASE}/users/me`);
  }

  updateProfile(dto: UpdateUserProfileDto) {
    return this.http.patch<UserProfile>(`${BASE}/users/me`, dto);
  }

  uploadAvatar(file: File) {
    const form = new FormData();
    form.append('file', file);
    form.append('folderType', 'AVATAR');
    return this.http.post<{ url: string; id: string }>(`${BASE}/media/upload`, form);
  }
}
