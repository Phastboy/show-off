import {
  ChangeDetectionStrategy,
  Component,
  inject,
  input,
  OnInit,
} from '@angular/core';
import {
  ControlContainer,
  FormGroup,
  ReactiveFormsModule,
} from '@angular/forms';

@Component({
  selector: 'app-email-password-fields',
  imports: [ReactiveFormsModule],
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
    const control = this.parentForm().get(field);
    return !!(control?.invalid && control.touched);
  }

  protected getError(field: string): string | null {
    const control = this.parentForm().get(field);
    if (!control?.touched || !control.errors) return null;
    if (control.errors['required']) return 'This field is required';
    if (control.errors['email']) return 'Enter a valid email address';
    if (control.errors['minlength']) return `Minimum ${control.errors['minlength'].requiredLength} characters`;
    return null;
  }
}

