import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthForm, AuthFormValue } from '../../../shared/components/auth-form/auth-form';
import { AuthService } from '../../../core/services/auth';

@Component({
  selector: 'app-register',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [AuthForm, RouterLink, ReactiveFormsModule],
  templateUrl: './register.html',
  styleUrl: './register.css',
})
export class Register {
  private readonly auth = inject(AuthService);
  private readonly router = inject(Router);
  private readonly fb = inject(FormBuilder);

  readonly loading = signal(false);
  readonly error = signal<string | null>(null);

  readonly nameControl = this.fb.nonNullable.control('', [
    Validators.required,
    Validators.minLength(2),
  ]);

  get nameInvalid() {
    return this.nameControl.invalid && this.nameControl.touched;
  }

  onSubmit(value: AuthFormValue) {
    // validate name before proceeding
    this.nameControl.markAsTouched();
    if (this.nameControl.invalid) return;

    this.loading.set(true);
    this.error.set(null);

    this.auth.register({ ...value, name: this.nameControl.value }).subscribe({
      next: () => {
        this.auth.login(value).subscribe({
          next: () => this.router.navigate(['/businesses']),
          error: () => this.router.navigate(['/auth/login']),
        });
      },
      error: (err) => {
        this.error.set(err.status === 409 ? 'Email already registered.' : 'Something went wrong.');
        this.loading.set(false);
      },
    });
  }
}
