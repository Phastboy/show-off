import { Injectable, inject, signal } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { forkJoin, of } from 'rxjs';
import { VenueService } from '../../../core/services/venue';
import type { VenueMediaDto } from '../../../core/models/api.models';
import type { PickedMedia } from '../../../shared/components/media-picker/media-picker';

@Injectable()
export class CreateVenueFormService {
  private readonly fb = inject(FormBuilder);
  private readonly venueService = inject(VenueService);

  readonly submitting = signal(false);
  readonly serverError = signal<string | null>(null);
  readonly amenities = signal<string[]>([]);
  readonly amenityInput = signal('');

  // media owned by MediaPicker; service just holds the latest emission
  pickedMedia: PickedMedia[] = [];

  readonly form = this.fb.nonNullable.group({
    name: ['', Validators.required],
    description: [''],
    location: ['', Validators.required],
    address: ['', Validators.required],
    capacity: [null as number | null, [Validators.required, Validators.min(1)]],
    priceRangeMin: [null as number | null, Validators.min(0)],
    priceRangeMax: [null as number | null, Validators.min(0)],
    contactPhone: [''],
    contactWhatsapp: [''],
  });

  addAmenity() {
    const val = this.amenityInput().trim();
    if (!val || this.amenities().includes(val)) return;
    this.amenities.update((l) => [...l, val]);
    this.amenityInput.set('');
  }

  removeAmenity(a: string) { this.amenities.update((l) => l.filter((x) => x !== a)); }

  submit(onSuccess: () => void) {
    if (this.form.invalid) { this.form.markAllAsTouched(); return; }
    this.submitting.set(true);
    this.serverError.set(null);
    const media = this.pickedMedia;
    const uploads$ = media.length
      ? forkJoin(media.map((m) => this.venueService.uploadMedia(m.asset.file)))
      : of([] as { url: string; id: string }[]);
    uploads$.subscribe({
      next: (results) => this.postVenue(results, media, onSuccess),
      error: () => { this.serverError.set('Upload failed.'); this.submitting.set(false); },
    });
  }

  private toMediaDto(results: { url: string; id: string }[], media: PickedMedia[]): VenueMediaDto[] {
    return results.map((r, i) => ({ type: media[i].asset.type, url: r.url, order: i, caption: media[i].caption || undefined }));
  }

  private postVenue(results: { url: string; id: string }[], media: PickedMedia[], onSuccess: () => void) {
    const raw = this.form.getRawValue();
    this.venueService.createVenue({
      name: raw.name, description: raw.description || undefined,
      location: raw.location, address: raw.address, capacity: raw.capacity!,
      priceRangeMin: raw.priceRangeMin ?? undefined, priceRangeMax: raw.priceRangeMax ?? undefined,
      contactPhone: raw.contactPhone || undefined, contactWhatsapp: raw.contactWhatsapp || undefined,
      amenities: this.amenities().length ? this.amenities() : undefined,
      media: results.length ? this.toMediaDto(results, media) : undefined,
    }).subscribe({
      next: onSuccess,
      error: () => { this.serverError.set('Failed to create venue.'); this.submitting.set(false); },
    });
  }
}
