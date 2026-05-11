import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import type { UpdateUserProfileDto, UserProfile } from '../models/api.models';
import { MediaService } from './media.service';
import { API_BASE_URL } from '../constants/api';

@Injectable({ providedIn: 'root' })
export class UserService {
  private readonly http = inject(HttpClient);
  private readonly media = inject(MediaService);
  private readonly baseUrl = inject(API_BASE_URL);

  getProfile() {
    return this.http.get<UserProfile>(`${this.baseUrl}/users/me`);
  }

  updateProfile(dto: UpdateUserProfileDto) {
    return this.http.patch<UserProfile>(`${this.baseUrl}/users/me`, dto);
  }

  uploadAvatar(file: File) {
    return this.media.uploadMedia(file, 'AVATAR');
  }
}
