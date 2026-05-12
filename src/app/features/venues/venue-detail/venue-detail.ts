import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { VenueDetailService } from './venue-detail.service';
import { LucideUsers, LucideCheck, LucideSparkles } from '@lucide/angular';

@Component({
  selector: 'app-venue-detail',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [LucideUsers, LucideCheck, LucideSparkles],
  providers: [VenueDetailService],
  templateUrl: './venue-detail.html',
  styleUrls: ['./venue-detail.css'],
})
export class VenueDetail implements OnInit {
  private readonly route = inject(ActivatedRoute);
  readonly vm = inject(VenueDetailService);

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.vm.loadVenue(id);
    }
  }
}
