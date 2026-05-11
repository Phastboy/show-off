import { Injectable, inject, signal } from '@angular/core';
import { forkJoin, switchMap, tap, of } from 'rxjs';
import { MediaService } from './media.service';
import { VenueService } from './venue';
import type { CreateVenueDto, VenueMediaDto } from '../models/api.models';

export type VenueFormPayload = Omit<CreateVenueDto, 'media'>;

// 1. Create a DTO for the upload queue so core doesn't depend on UI/Component types
export interface VenueMediaUploadData {
  file: File;
  type: 'IMAGE' | 'VIDEO';
  caption?: string;
}

@Injectable({ providedIn: 'root' })
export class CreateVenueService {
  private readonly media = inject(MediaService);
  private readonly venue = inject(VenueService);

  readonly uploadedCount = signal(0);
  readonly totalCount = signal(0);

  // 2. Accept the rich media data
  createWithMedia(payload: VenueFormPayload, mediaItems: VenueMediaUploadData[]) {
    this.uploadedCount.set(0);
    this.totalCount.set(mediaItems.length);

    const upload$ =
      mediaItems.length === 0
        ? of([])
        : forkJoin(
            mediaItems.map((item) =>
              this.media
                .uploadMedia(item.file, 'VENUE_GALLERY')
                .pipe(tap(() => this.uploadedCount.update((n) => n + 1))),
            ),
          ).pipe(
            switchMap((results) =>
              of(
                results.map(
                  (r, i): VenueMediaDto => ({
                    type: mediaItems[i].type, // 3. Dynamically map type
                    publicId: r.fileId,
                    url: r.url,
                    order: i,
                    caption: mediaItems[i].caption || undefined, // 4. Map caption
                  }),
                ),
              ),
            ),
          );

    return upload$.pipe(
      switchMap((mediaDtos) => this.venue.createVenue({ ...payload, media: mediaDtos })),
    );
  }
}
