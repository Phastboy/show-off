import {
  ChangeDetectionStrategy,
  Component,
  inject,
  input,
  output,
} from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';

export interface AuthFormValue {
  email: string;
  password: string;
}

@Component({
  selector: 'app-auth-form',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ReactiveFormsModule],
  templateUrl: './auth-form.html',
  styleUrl: './auth-form.css',
})
export class AuthForm {
  private readonly fb = inject(FormBuilder);

  submitLabel = input<string>('Submit');
  loading = input<boolean>(false);
  serverError = input<string | null>(null);

  submitted = output<AuthFormValue>();

  readonly form = this.fb.nonNullable.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(8)]],
  });

  get emailInvalid() {
    const c = this.form.controls.email;
    return c.invalid && c.touched;
  }

  get passwordInvalid() {
    const c = this.form.controls.password;
    return c.invalid && c.touched;
  }

  submit() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    this.submitted.emit(this.form.getRawValue());
  }
}
