import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { AuthService } from '../../../core/services/auth';
import type { ProfileResponse } from '../../../core/models/api.models';

@Component({
  selector: 'app-home',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home {
  private readonly auth = inject(AuthService);

  readonly profile = signal<ProfileResponse | null>(null);

  constructor() {
    this.auth.me().subscribe({
      next: (p) => this.profile.set(p),
      error: () => this.auth.logout(),
    });
  }

  logout() {
    this.auth.logout();
  }
}
