import {
  ChangeDetectionStrategy,
  Component,
  input,
  output,
  OnInit,
  inject,
} from '@angular/core';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import type {
  BusinessProfile,
  BusinessType,
  CreateBusinessProfileDto,
  UpdateBusinessProfileDto,
} from '../../models/business-profile.models';
import { BUSINESS_TYPE_LABELS } from '../../models/business-profile.models';

export type BusinessFormValue = CreateBusinessProfileDto | UpdateBusinessProfileDto;

@Component({
  selector: 'app-business-form',
  imports: [ReactiveFormsModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './business-form.html',
  styleUrl: './business-form.css',
})
export class BusinessForm implements OnInit {
  readonly existing = input<BusinessProfile | null>(null);
  readonly submitting = input(false);
  readonly submitted = output<BusinessFormValue>();
  readonly cancelled = output<void>();

  private readonly fb = inject(FormBuilder);

  protected readonly businessTypeOptions = Object.entries(BUSINESS_TYPE_LABELS) as [
    BusinessType,
    string,
  ][];

  protected readonly form = this.fb.nonNullable.group({
    name: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(100)]],
    businessType: ['' as BusinessType, Validators.required],
    description: ['', Validators.maxLength(1000)],
    phoneNumber: ['', Validators.maxLength(30)],
    whatsapp: ['', Validators.maxLength(30)],
    email: ['', [Validators.email, Validators.maxLength(200)]],
    location: ['', Validators.maxLength(200)],
    isPublic: [false],
  });

  ngOnInit() {
    const profile = this.existing();
    if (profile) {
      this.form.patchValue({
        name: profile.name,
        businessType: profile.businessType,
        description: profile.description ?? '',
        phoneNumber: profile.phoneNumber ?? '',
        whatsapp: profile.whatsapp ?? '',
        email: profile.email ?? '',
        location: profile.location ?? '',
        isPublic: profile.isPublic,
      });
    }
  }

  protected submit() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const raw = this.form.getRawValue();

    const value: BusinessFormValue = {
      name: raw.name,
      businessType: raw.businessType,
      ...(raw.description && { description: raw.description }),
      ...(raw.phoneNumber && { phoneNumber: raw.phoneNumber }),
      ...(raw.whatsapp && { whatsapp: raw.whatsapp }),
      ...(raw.email && { email: raw.email }),
      ...(raw.location && { location: raw.location }),
      isPublic: raw.isPublic,
    };

    this.submitted.emit(value);
  }

  protected cancel() {
    this.cancelled.emit();
  }

  protected isInvalid(field: string): boolean {
    const control = this.form.get(field);
    return !!(control?.invalid && control.touched);
  }
}

