import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnInit,
  signal,
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BusinessProfileService } from '../../services/business-profile';
import { BusinessForm, BusinessFormValue } from '../../components/business-form/business-form';
import { BrandingUpload } from '../../components/branding-upload/branding-upload';
import type { BusinessProfile, UpdateBusinessProfileDto } from '../../models/business-profile.models';

@Component({
  selector: 'app-edit-business',
  imports: [BusinessForm, BrandingUpload],
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

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id')!;
    this.service.getById(id).subscribe({
      next: (p) => {
        this.profile.set(p);
        this.loading.set(false);
      },
      error: () => this.router.navigate(['/businesses']),
    });
  }

  protected submit(value: BusinessFormValue) {
    const id = this.profile()!.id;
    this.submitting.set(true);
    this.service.update(id, value as UpdateBusinessProfileDto).subscribe({
      next: (updated) => {
        this.profile.set(updated);
        this.submitting.set(false);
      },
      error: () => this.submitting.set(false),
    });
  }

  protected cancel() {
    this.router.navigate(['/businesses']);
  }
}

