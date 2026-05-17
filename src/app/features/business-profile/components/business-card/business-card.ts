import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Badge, BadgeVariant } from '../../../../shared/components/badge/badge';
import { Card } from '../../../../shared/components/card/card';
import type { BusinessProfile, VerificationStatus } from '../../models/business-profile.models';
import { BUSINESS_TYPE_LABELS, VERIFICATION_STATUS_LABELS } from '../../models/business-profile.models';

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
  protected readonly verificationLabels = VERIFICATION_STATUS_LABELS;

  protected getStatusVariant(status: VerificationStatus): BadgeVariant {
    const map: Record<VerificationStatus, BadgeVariant> = {
      UNVERIFIED: 'default',
      PENDING: 'pending',
      VERIFIED: 'verified',
      REJECTED: 'rejected',
    };
    return map[status];
  }
}
