import { ChangeDetectionStrategy, Component, inject, OnInit, signal } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BusinessProfileService } from '../../services/business-profile';
import { BusinessForm, BusinessFormValue } from '../../components/business-form/business-form';
import { BrandingUpload } from '../../components/branding-upload/branding-upload';
import { Badge, BadgeVariant } from '../../../../shared/components/badge/badge';
import { Card } from '../../../../shared/components/card/card';
import { Skeleton } from '../../../../shared/components/skeleton/skeleton';
import type { BusinessProfile, UpdateBusinessProfileDto, VerificationStatus } from '../../models/business-profile.models';
import { VERIFICATION_STATUS_LABELS } from '../../models/business-profile.models';

@Component({
  selector: 'app-edit-business',
  imports: [BusinessForm, BrandingUpload, Badge, Card, Skeleton],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './edit-business.html',
  styleUrl: './edit-business.css',
})
export class EditBusiness implements OnInit {
  private readonly service = inject(BusinessProfileService);
  private readonly router = inject(Router);
  private readonly route = inject(ActivatedRoute);

  protected readonly profile = signal<BusinessProfile | null>(null);
  protected readonly submitting = signal(false);
  protected readonly loading = signal(true);
  protected readonly verificationLabels = VERIFICATION_STATUS_LABELS;

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id')!;
    this.service.getById(id).subscribe({
      next: (p) => { this.profile.set(p); this.loading.set(false); },
      error: () => this.router.navigate(['/businesses']),
    });
  }

  protected getStatusVariant(status: VerificationStatus): BadgeVariant {
    const map: Record<VerificationStatus, BadgeVariant> = {
      UNVERIFIED: 'default',
      PENDING: 'pending',
      VERIFIED: 'verified',
      REJECTED: 'rejected',
    };
    return map[status];
  }

  protected submit(value: BusinessFormValue) {
    const id = this.profile()!.id;
    this.submitting.set(true);
    this.service.update(id, value as UpdateBusinessProfileDto).subscribe({
      next: (updated) => { this.profile.set(updated); this.submitting.set(false); },
      error: () => this.submitting.set(false),
    });
  }

  protected cancel() {
    this.router.navigate(['/businesses']);
  }
}
