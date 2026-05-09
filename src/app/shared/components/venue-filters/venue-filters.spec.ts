import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VenueFilters } from './venue-filters';

describe('VenueFilters', () => {
  let component: VenueFilters;
  let fixture: ComponentFixture<VenueFilters>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VenueFilters],
    }).compileComponents();

    fixture = TestBed.createComponent(VenueFilters);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
