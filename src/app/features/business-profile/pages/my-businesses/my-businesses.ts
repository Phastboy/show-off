import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { BusinessProfileService } from '../../services/business-profile';
import { BusinessCard } from '../../components/business-card/business-card';

@Component({
  selector: 'app-my-businesses',
  imports: [RouterLink, BusinessCard],
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

