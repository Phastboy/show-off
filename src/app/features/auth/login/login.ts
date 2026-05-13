import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { AuthForm, AuthFormValue } from '../../../shared/components/auth-form/auth-form';
import { AuthService } from '../../../core/services/auth';

@Component({
  selector: 'app-login',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [AuthForm, RouterLink],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {
  private readonly auth = inject(AuthService);
  private readonly router = inject(Router);

  readonly loading = signal(false);
  readonly error = signal<string | null>(null);

  onSubmit(value: AuthFormValue) {
    this.loading.set(true);
    this.error.set(null);

    this.auth.login(value).subscribe({
      next: () => this.router.navigate(['/profile']),
      error: (err) => {
        this.error.set(err.status === 401 ? 'Invalid email or password.' : 'Something went wrong.');
        this.loading.set(false);
      },
    });
  }
}
