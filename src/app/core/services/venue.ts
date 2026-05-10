import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import type { CreateVenueDto, Venue, VenueFilters } from '../models/api.models';

const BASE = 'https://distinguished-dolorita-campusuniverse-5925f056.koyeb.app/api';

export interface VenueListResponse {
  data: Venue[];
  total: number;
  page: number;
  limit: number;
}

export interface MediaUploadResponse {
  url: string;
  id: string;
}

@Injectable({ providedIn: 'root' })
export class VenueService {
  private readonly http = inject(HttpClient);

  getVenues(filters: VenueFilters = {}) {
    let params = new HttpParams();
    if (filters.location) params = params.set('location', filters.location);
    if (filters.minCapacity) params = params.set('minCapacity', filters.minCapacity);
    if (filters.maxPrice) params = params.set('maxPrice', filters.maxPrice);
    if (filters.amenities?.length) {
      filters.amenities.forEach((a) => (params = params.append('amenities', a)));
    }
    if (filters.page) params = params.set('page', filters.page);
    if (filters.limit) params = params.set('limit', filters.limit);

    return this.http.get<VenueListResponse>(`${BASE}/venues`, { params });
  }

  createVenue(dto: CreateVenueDto) {
    return this.http.post<Venue>(`${BASE}/venues`, dto);
  }

  uploadMedia(file: File) {
    const form = new FormData();
    form.append('file', file);
    form.append('folderType', 'VENUE_GALLERY');
    return this.http.post<MediaUploadResponse>(`${BASE}/media/upload`, form);
  }
}
