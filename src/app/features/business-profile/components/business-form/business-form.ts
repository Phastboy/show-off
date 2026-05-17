import { ChangeDetectionStrategy, Component, inject, input, OnInit, output } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { Field } from '../../../../shared/components/field/field';
import { Btn } from '../../../../shared/components/btn/btn';
import type { BusinessProfile, BusinessType, CreateBusinessProfileDto, UpdateBusinessProfileDto } from '../../models/business-profile.models';
import { BUSINESS_TYPE_LABELS } from '../../models/business-profile.models';

export type BusinessFormValue = CreateBusinessProfileDto | UpdateBusinessProfileDto;

@Component({
  selector: 'app-business-form',
  imports: [ReactiveFormsModule, Field, Btn],
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

  protected readonly businessTypeOptions = Object.entries(BUSINESS_TYPE_LABELS) as [BusinessType, string][];

  protected readonly form = this.fb.nonNullable.group({
    name:         ['', [Validators.required, Validators.minLength(2), Validators.maxLength(100)]],
    businessType: ['' as BusinessType, Validators.required],
    description:  ['', Validators.maxLength(1000)],
    phoneNumber:  ['', Validators.maxLength(30)],
    whatsapp:     ['', Validators.maxLength(30)],
    email:        ['', [Validators.email, Validators.maxLength(200)]],
    location:     ['', Validators.maxLength(200)],
    isPublic:     [false],
  });

  ngOnInit() {
    const p = this.existing();
    if (p) {
      this.form.patchValue({
        name:         p.name,
        businessType: p.businessType,
        description:  p.description ?? '',
        phoneNumber:  p.phoneNumber ?? '',
        whatsapp:     p.whatsapp ?? '',
        email:        p.email ?? '',
        location:     p.location ?? '',
        isPublic:     p.isPublic,
      });
    }
  }

  protected submit() {
    if (this.form.invalid) { this.form.markAllAsTouched(); return; }
    const raw = this.form.getRawValue();
    this.submitted.emit({
      name:         raw.name,
      businessType: raw.businessType,
      ...(raw.description  && { description: raw.description }),
      ...(raw.phoneNumber  && { phoneNumber: raw.phoneNumber }),
      ...(raw.whatsapp     && { whatsapp: raw.whatsapp }),
      ...(raw.email        && { email: raw.email }),
      ...(raw.location     && { location: raw.location }),
      isPublic: raw.isPublic,
    });
  }

  protected cancel() { this.cancelled.emit(); }

  protected isInvalid(field: string): boolean {
    const c = this.form.get(field);
    return !!(c?.invalid && c.touched);
  }

  protected getError(field: string): string | null {
    const c = this.form.get(field);
    if (!c?.touched || !c.errors) return null;
    if (c.errors['required'])  return 'This field is required';
    if (c.errors['email'])     return 'Enter a valid email address';
    if (c.errors['minlength']) return `Minimum ${c.errors['minlength'].requiredLength} characters`;
    if (c.errors['maxlength']) return `Maximum ${c.errors['maxlength'].requiredLength} characters`;
    return null;
  }
}
