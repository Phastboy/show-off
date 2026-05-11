import { Injectable, inject, signal, computed } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { CreateVenueService } from '../../../core/services/create-venue.service';
import type { PickedMedia } from '../../../shared/components/media-picker/media-picker';

@Injectable()
export class CreateVenueFormService {
  private readonly fb = inject(FormBuilder);
  private readonly createVenueOrchestrator = inject(CreateVenueService);

  readonly submitting = signal(false);
  readonly serverError = signal<string | null>(null);
  readonly amenities = signal<string[]>([]);
  readonly amenityControl = new FormControl('', { nonNullable: true });

  readonly pickedMedia = signal<PickedMedia[]>([]);

  // Progress State
  readonly uploadedCount = this.createVenueOrchestrator.uploadedCount;
  readonly totalUploads = this.createVenueOrchestrator.totalCount;

  readonly isUploading = computed(
    () =>
      this.submitting() && this.totalUploads() > 0 && this.uploadedCount() < this.totalUploads(),
  );

  readonly uploadPercentage = computed(() => {
    if (this.totalUploads() === 0) return 0;
    return Math.round((this.uploadedCount() / this.totalUploads()) * 100);
  });

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
    const val = this.amenityControl.value.trim();
    if (!val || this.amenities().includes(val)) return;
    this.amenities.update((l) => [...l, val]);
    this.amenityControl.reset();
  }

  removeAmenity(a: string) {
    this.amenities.update((l) => l.filter((x) => x !== a));
  }

  submit(onSuccess: () => void) {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    this.submitting.set(true);
    this.serverError.set(null);

    const raw = this.form.getRawValue();
    const payload = {
      name: raw.name,
      description: raw.description || undefined,
      location: raw.location,
      address: raw.address,
      capacity: raw.capacity!,
      priceRangeMin: raw.priceRangeMin ?? undefined,
      priceRangeMax: raw.priceRangeMax ?? undefined,
      contactPhone: raw.contactPhone || undefined,
      contactWhatsapp: raw.contactWhatsapp || undefined,
      amenities: this.amenities().length ? this.amenities() : undefined,
    };

    const mediaUploadData = this.pickedMedia().map((m) => ({
      file: m.asset.file,
      type: m.asset.type,
      caption: m.caption,
    }));

    this.createVenueOrchestrator.createWithMedia(payload, mediaUploadData).subscribe({
      next: onSuccess,
      error: () => {
        this.serverError.set('Failed to create venue.');
        this.submitting.set(false);
      },
    });
  }
}
