import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import type { Venue, Amenity } from '../../../core/models/api.models';

@Component({
  selector: 'app-venue-card',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [],
  templateUrl: './venue-card.html',
  styleUrl: './venue-card.css',
})
export class VenueCard {
  venue = input.required<Venue>();

  getAmenityName(a: string | Amenity): string {
    return typeof a === 'string' ? a : a.name;
  }

  get mainImage() {
    return this.venue().media?.find((m) => m.order === 0 && m.type === 'IMAGE')?.url ?? null;
  }

  get priceRange() {
    const v = this.venue();
    if (!v.priceRangeMin && !v.priceRangeMax) return null;
    if (v.priceRangeMin && v.priceRangeMax) {
      return `₦${v.priceRangeMin.toLocaleString()} – ₦${v.priceRangeMax.toLocaleString()}`;
    }
    return `From ₦${(v.priceRangeMin ?? v.priceRangeMax)!.toLocaleString()}`;
  }
}
