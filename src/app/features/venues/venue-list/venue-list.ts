import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
import { VenueService } from '../../../core/services/venue';
import { VenueFilters } from '../../../shared/components/venue-filters/venue-filters';
import { VenueCard } from '../../../shared/components/venue-card/venue-card';
import type { VenueFilters as VenueFiltersModel, Venue } from '../../../core/models/api.models';

@Component({
  selector: 'app-venue-list',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [VenueFilters, VenueCard],
  templateUrl: './venue-list.html',
  styleUrl: './venue-list.css',
})
export class VenueList {
  private readonly venueService = inject(VenueService);
  private readonly router = inject(Router);

  readonly loading = signal(true);
  readonly error = signal<string | null>(null);
  readonly venues = signal<Venue[]>([]);
  readonly total = signal(0);
  readonly page = signal(1);

  private activeFilters: VenueFiltersModel = {};

  constructor() {
    this.load();
  }

  onFiltersChanged(filters: VenueFiltersModel) {
    this.activeFilters = filters;
    this.page.set(1);
    this.load();
  }

  nextPage() {
    this.page.update((p) => p + 1);
    this.load();
  }

  prevPage() {
    this.page.update((p) => Math.max(1, p - 1));
    this.load();
  }

  goToProfile() {
    this.router.navigate(['/profile']);
  }

  get hasMore() {
    return this.venues().length < this.total();
  }

  private load() {
    this.loading.set(true);
    this.error.set(null);

    this.venueService
      .getVenues({ ...this.activeFilters, page: this.page(), limit: 20 })
      .subscribe({
        next: (res: any) => {
          this.venues.set(res.data ?? res);
          this.total.set(res.total ?? res.length ?? 0);
          this.loading.set(false);
        },
        error: () => {
          this.error.set('Failed to load venues. Please try again.');
          this.loading.set(false);
        },
      });
  }
}
