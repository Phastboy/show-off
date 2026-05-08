import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { AuthForm, AuthFormValue } from '../../../shared/components/auth-form/auth-form';
import { AuthService } from '../../../core/services/auth';

@Component({
  selector: 'app-register',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [AuthForm, RouterLink],
  templateUrl: './register.html',
  styleUrl: './register.css',
})
export class Register {
  private readonly auth = inject(AuthService);
  private readonly router = inject(Router);

  readonly loading = signal(false);
  readonly error = signal<string | null>(null);

  onSubmit(value: AuthFormValue) {
    this.loading.set(true);
    this.error.set(null);

    this.auth.register(value).subscribe({
      next: () => {
        this.auth.login(value).subscribe({
          next: () => this.router.navigate(['/home']),
          error: () => this.router.navigate(['/auth/login']),
        });
      },
      error: (err) => {
        this.error.set(
          err.status === 409 ? 'Email already registered.' : 'Something went wrong.',
        );
        this.loading.set(false);
      },
    });
  }
}
