import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../../../core/services/auth';
import { EmailPasswordFields } from '../../components/email-password-fields/email-password-fields';

@Component({
  selector: 'app-register',
  imports: [ReactiveFormsModule, RouterLink, EmailPasswordFields],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './register.html',
  styleUrl: './register.css',
})
export class Register {
  private readonly auth = inject(AuthService);
  private readonly router = inject(Router);
  private readonly fb = inject(FormBuilder);

  protected readonly submitting = signal(false);
  protected readonly error = signal<string | null>(null);

  protected readonly form = this.fb.nonNullable.group({
    name: ['', [Validators.required, Validators.minLength(2)]],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(8)]],
  });

  protected submit() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.submitting.set(true);
    this.error.set(null);

    this.auth.register(this.form.getRawValue()).subscribe({
      next: () => {
        // Auto-login after successful registration
        const { email, password } = this.form.getRawValue();
        this.auth.login({ email, password }).subscribe({
          error: () => this.router.navigate(['/auth/login']),
        });
      },
      error: (err) => {
        this.error.set(
          err.status === 409 ? 'An account with this email already exists.' : 'Registration failed. Please try again.',
        );
        this.submitting.set(false);
      },
    });
  }
}

