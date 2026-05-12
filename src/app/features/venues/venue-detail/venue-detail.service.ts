import { Injectable, inject, signal } from '@angular/core';
import { VenueService } from '../../../core/services/venue';
import type { Venue } from '../../../core/models/api.models';

@Injectable()
export class VenueDetailService {
  private readonly api = inject(VenueService);

  // Reactive State
  readonly venue = signal<Venue | null>(null);
  readonly loading = signal(true);
  readonly error = signal<string | null>(null);

  // Computed state for the UI
  readonly mainImage = signal<string | null>(null);
  readonly gallery = signal<string[]>([]);

  loadVenue(id: string) {
    this.loading.set(true);
    this.error.set(null);

    this.api.getVenue(id).subscribe({
      next: (v) => {
        this.venue.set(v);

        // Sort out media for the UI
        const images =
          v.media?.filter((m) => m.type === 'IMAGE').sort((a, b) => a.order - b.order) || [];
        this.mainImage.set(images[0]?.url || null);
        this.gallery.set(images.slice(1).map((m) => m.url));

        this.loading.set(false);
      },
      error: () => {
        this.error.set('Failed to load venue details. It may have been removed.');
        this.loading.set(false);
      },
    });
  }
}
