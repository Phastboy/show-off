import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { LucideHome, LucidePlusSquare, LucideUser, LucideLogOut } from '@lucide/angular';
import { AuthService } from '../../../core/services/auth';

@Component({
  selector: 'app-shell',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    RouterOutlet,
    RouterLink,
    RouterLinkActive,
    LucideHome,
    LucidePlusSquare,
    LucideUser,
    LucideLogOut,
  ],
  templateUrl: './app-shell.html',
  styleUrl: './app-shell.css',
})
export class AppShell {
  private readonly auth = inject(AuthService);

  logout() {
    this.auth.logout();
  }
}
