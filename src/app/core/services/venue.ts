import { map } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import type { Amenity, CreateVenueDto, Venue, VenueFilters } from '../models/api.models';
import { API_BASE_URL } from '../constants/api';

export interface VenueListResponse {
  data: Venue[];
  total: number;
  page: number;
  limit: number;
}

@Injectable({ providedIn: 'root' })
export class VenueService {
  private readonly http = inject(HttpClient);
  private readonly baseUrl = inject(API_BASE_URL);

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

    return this.http.get<VenueListResponse>(`${this.baseUrl}/venues`, { params });
  }

  createVenue(dto: CreateVenueDto) {
    return this.http.post<Venue>(`${this.baseUrl}/venues`, dto);
  }

  getVenue(id: string) {
    return this.http.get<Venue>(`${this.baseUrl}/venues/${id}`).pipe(
      map((venue) => ({
        ...venue,
        amenities:
          venue.amenities?.map((a: string | Amenity) => (typeof a === 'string' ? a : a.name)) || [],
      })),
    );
  }
}
