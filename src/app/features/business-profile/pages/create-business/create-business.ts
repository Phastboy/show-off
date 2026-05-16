import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
import { BusinessProfileService } from '../../services/business-profile';
import { BusinessForm, BusinessFormValue } from '../../components/business-form/business-form';
import type { CreateBusinessProfileDto } from '../../models/business-profile.models';

@Component({
  selector: 'app-create-business',
  imports: [BusinessForm],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './create-business.html',
  styleUrl: './create-business.css',
})
export class CreateBusiness {
  private readonly service = inject(BusinessProfileService);
  private readonly router = inject(Router);

  protected readonly submitting = signal(false);

  protected submit(value: BusinessFormValue) {
    this.submitting.set(true);
    this.service.create(value as CreateBusinessProfileDto).subscribe({
      next: () => this.router.navigate(['/businesses']),
      error: () => this.submitting.set(false),
    });
  }

  protected cancel() {
    this.router.navigate(['/businesses']);
  }
}

