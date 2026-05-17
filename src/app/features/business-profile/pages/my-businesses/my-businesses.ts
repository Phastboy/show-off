import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { BusinessProfileService } from '../../services/business-profile';
import { BusinessCard } from '../../components/business-card/business-card';
import { Btn } from '../../../../shared/components/btn/btn';
import { Skeleton } from '../../../../shared/components/skeleton/skeleton';

@Component({
  selector: 'app-my-businesses',
  imports: [RouterLink, BusinessCard, Btn, Skeleton],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './my-businesses.html',
  styleUrl: './my-businesses.css',
})
export class MyBusinesses implements OnInit {
  protected readonly service = inject(BusinessProfileService);

  ngOnInit() {
    this.service.loadMyBusinesses().subscribe();
  }
}
