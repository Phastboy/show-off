import { Injectable, inject, signal } from '@angular/core';
import { forkJoin, switchMap, tap } from 'rxjs';
import { of } from 'rxjs';
import { MediaService } from './media.service';
import { VenueService } from './venue';
import type { CreateVenueDto, VenueMediaDto } from '../models/api.models';

/** Payload consumed by createWithMedia, minus the media[] the service builds. */
export type VenueFormPayload = Omit<CreateVenueDto, 'media'>;

/**
 * Orchestrates the two-step "create venue" flow:
 * 1. forkJoin — upload all gallery images in parallel.
 * 2. Assemble media[] with stable order indices, then POST /api/venues.
 *
 * Keeps upload progress visible so the UI can show "Uploading 2 / 5…".
 */
@Injectable({ providedIn: 'root' })
export class CreateVenueService {
  private readonly media = inject(MediaService);
  private readonly venue = inject(VenueService);

  /** How many uploads have resolved so far (success or failure counted together). */
  readonly uploadedCount = signal(0);
  /** Total images queued for the current submission. */
  readonly totalCount = signal(0);

  /**
   * Uploads all files in parallel, then creates the venue.
   * If files is empty the venue is created immediately with no media.
   *
   * @param payload  All venue fields except media[].
   * @param files    Ordered gallery images selected by the user.
   */
  createWithMedia(payload: VenueFormPayload, files: File[]) {
    this.uploadedCount.set(0);
    this.totalCount.set(files.length);

    const upload$ =
      files.length === 0
        ? of([] as VenueMediaDto[])
        : forkJoin(
            files.map((file) =>
              this.media
                .uploadMedia(file, 'VENUE_GALLERY')
                .pipe(tap(() => this.uploadedCount.update((n) => n + 1))),
            ),
          ).pipe(
            switchMap((results) =>
              of(
                results.map(
                  (r, i): VenueMediaDto => ({
                    type: 'IMAGE',
                    publicId: r.fileId,
                    url: r.url,
                    order: i,
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
