import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { VenueDetailService } from './venue-detail.service';

@Component({
  selector: 'app-venue-detail',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [RouterLink],
  providers: [VenueDetailService],
  templateUrl: './venue-detail.html',
  styleUrls: ['./venue-detail.css'],
})
export class VenueDetail implements OnInit {
  private readonly route = inject(ActivatedRoute);

  // Expose the logic layer to the template
  readonly vm = inject(VenueDetailService);

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.vm.loadVenue(id);
    }
  }
}
