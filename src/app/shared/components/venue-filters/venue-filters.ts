import {
  ChangeDetectionStrategy,
  Component,
  inject,
  output,
} from '@angular/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import type { VenueFilters as VenueFiltersModel } from '../../../core/models/api.models';

@Component({
  selector: 'app-venue-filters',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ReactiveFormsModule],
  templateUrl: './venue-filters.html',
  styleUrl: './venue-filters.css',
})
export class VenueFilters {
  private readonly fb = inject(FormBuilder);

  filtersChanged = output<VenueFiltersModel>();

  readonly form = this.fb.nonNullable.group({
    location: [''],
    minCapacity: [null as number | null],
    maxPrice: [null as number | null],
  });

  apply() {
    const { location, minCapacity, maxPrice } = this.form.getRawValue();
    const filters: VenueFiltersModel = {};
    if (location) filters.location = location;
    if (minCapacity) filters.minCapacity = minCapacity;
    if (maxPrice) filters.maxPrice = maxPrice;
    this.filtersChanged.emit(filters);
  }

  reset() {
    this.form.reset();
    this.filtersChanged.emit({});
  }
}
