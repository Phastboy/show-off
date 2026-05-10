import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CreateVenueService } from '../../../core/services/create-venue.service';
import { VenueImagePicker } from '../../../shared/components/venue-image-picker/venue-image-picker';
import { parseAmenities } from './amenities.util';

/**
 * Page component for listing a new venue.
 * Delegates upload orchestration entirely to CreateVenueService.
 */
@Component({
  selector: 'app-create-venue',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ReactiveFormsModule, VenueImagePicker],
  templateUrl: './create-venue.html',
  styleUrl: './create-venue.css',
})
export class CreateVenue {
  private readonly fb = inject(FormBuilder);
  private readonly router = inject(Router);
  private readonly createVenueService = inject(CreateVenueService);

  readonly submitting = signal(false);
  readonly serverError = signal<string | null>(null);

  /** Tracks files from the image picker; updated on every filesChanged emission. */
  private galleryFiles: File[] = [];

  /** Forwarded from CreateVenueService for the progress indicator. */
  readonly uploadedCount = this.createVenueService.uploadedCount;
  readonly totalCount = this.createVenueService.totalCount;

  readonly form = this.fb.nonNullable.group({
    name: ['', [Validators.required, Validators.minLength(2)]],
    location: ['', Validators.required],
    address: ['', Validators.required],
    capacity: [null as number | null, [Validators.required, Validators.min(1)]],
    description: [''],
    priceRangeMin: [null as number | null],
    priceRangeMax: [null as number | null],
    contactPhone: [''],
    contactWhatsapp: [''],
    amenities: [''],
  });

  onFilesChanged(files: File[]) {
    this.galleryFiles = files;
  }

  submit() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.submitting.set(true);
    this.serverError.set(null);

    const raw = this.form.getRawValue();

    this.createVenueService
      .createWithMedia(
        {
          name: raw.name,
          location: raw.location,
          address: raw.address,
          capacity: raw.capacity!,
          description: raw.description || undefined,
          priceRangeMin: raw.priceRangeMin ?? undefined,
          priceRangeMax: raw.priceRangeMax ?? undefined,
          contactPhone: raw.contactPhone || undefined,
          contactWhatsapp: raw.contactWhatsapp || undefined,
          amenities: parseAmenities(raw.amenities),
        },
        this.galleryFiles,
      )
      .subscribe({
        next: () => this.router.navigate(['/venues']),
        error: () => {
          this.submitting.set(false);
          this.serverError.set('Failed to create venue. Please try again.');
        },
      });
  }

  goBack() {
    this.router.navigate(['/venues']);
  }
}
