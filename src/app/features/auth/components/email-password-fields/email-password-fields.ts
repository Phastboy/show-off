import { ChangeDetectionStrategy, Component, inject, input } from '@angular/core';
import { ControlContainer, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Field } from '../../../../shared/components/field/field';

@Component({
  selector: 'app-email-password-fields',
  imports: [ReactiveFormsModule, Field],
  changeDetection: ChangeDetectionStrategy.OnPush,
  viewProviders: [
    {
      provide: ControlContainer,
      useFactory: () => inject(ControlContainer, { skipSelf: true }),
    },
  ],
  templateUrl: './email-password-fields.html',
  styleUrl: './email-password-fields.css',
})
export class EmailPasswordFields {
  readonly parentForm = input.required<FormGroup>();

  protected isInvalid(field: string): boolean {
    const c = this.parentForm().get(field);
    return !!(c?.invalid && c.touched);
  }

  protected getError(field: string): string | null {
    const c = this.parentForm().get(field);
    if (!c?.touched || !c.errors) return null;
    if (c.errors['required']) return 'This field is required';
    if (c.errors['email']) return 'Enter a valid email address';
    if (c.errors['minlength']) return `Minimum ${c.errors['minlength'].requiredLength} characters`;
    return null;
  }
}
