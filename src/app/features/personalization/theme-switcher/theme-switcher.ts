import { Component, inject } from '@angular/core';
import { ThemeService } from '../../../core/services/theme.service';
import { Button } from '../../../shared/ui/button/button';
import { Card } from '../../../shared/ui/card/card';
import { LucideSun, LucideMoon, LucideMonitor } from '@lucide/angular';

@Component({
  selector: 'app-theme-switcher',
  imports: [Button, Card, LucideSun, LucideMoon, LucideMonitor],
  templateUrl: './theme-switcher.html',
  styleUrl: './theme-switcher.css',
})
export class ThemeSwitcher {
  public themeService = inject(ThemeService);
}
