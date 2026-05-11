import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { CreateVenueFormService } from './create-venue-form.service';
import { MediaPicker, PickedMedia } from '../../../shared/components/media-picker/media-picker';

@Component({
  selector: 'app-create-venue',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ReactiveFormsModule, MediaPicker],
  providers: [CreateVenueFormService],
  templateUrl: './create-venue.html',
  styleUrls: ['./create-venue.css'],
})
export class CreateVenue {
  private readonly router = inject(Router);
  readonly vm = inject(CreateVenueFormService);

  onAmenityKeydown(e: KeyboardEvent) {
    if (e.key === 'Enter') {
      e.preventDefault();
      this.vm.addAmenity();
    }
  }

  // Update the signal
  onMediaChanged(items: PickedMedia[]) {
    this.vm.pickedMedia.set(items);
  }

  submit() {
    this.vm.submit(() => this.router.navigate(['/venues']));
  }
}
