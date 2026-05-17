import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Badge } from '../../../../shared/components/badge/badge';
import { Card } from '../../../../shared/components/card/card';
import type { BusinessProfile } from '../../models/business-profile.models';
import { BUSINESS_TYPE_LABELS } from '../../models/business-profile.models';

@Component({
  selector: 'app-business-card',
  imports: [RouterLink, Badge, Card],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './business-card.html',
  styleUrl: './business-card.css',
})
export class BusinessCard {
  readonly business = input.required<BusinessProfile>();
  protected readonly typeLabels = BUSINESS_TYPE_LABELS;
}
