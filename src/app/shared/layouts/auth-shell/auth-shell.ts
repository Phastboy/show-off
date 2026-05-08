import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-auth-shell',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterOutlet],
  templateUrl: './auth-shell.html',
  styleUrl: './auth-shell.css',
})
export class AuthShell {}
