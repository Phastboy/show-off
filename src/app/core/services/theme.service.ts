import { Service, inject, signal, effect, PLATFORM_ID } from '@angular/core';
import { DOCUMENT, isPlatformBrowser } from '@angular/common';
import { CookieService } from './cookie.service';

export type ThemeOption = 'system' | 'light' | 'dark';
const STORAGE_KEY = 'app_theme';

@Service()
export class ThemeService {
  private readonly cookieService = inject(CookieService);
  private readonly document = inject(DOCUMENT);
  private readonly isBrowser = isPlatformBrowser(inject(PLATFORM_ID));

  readonly theme = signal<ThemeOption>(this.loadSavedTheme());

  readonly _ = effect(() => {
    const currentTheme = this.theme();
    if (this.isBrowser) {
      this.applyTheme(currentTheme);
    }
  });

  private loadSavedTheme(): ThemeOption {
    const saved = this.cookieService.get(STORAGE_KEY);
    if (saved === 'light' || saved === 'dark' || saved === 'system') {
      return saved as ThemeOption;
    }
    return 'system';
  }

  setTheme(newTheme: ThemeOption): void {
    this.theme.set(newTheme);
    this.cookieService.set(STORAGE_KEY, newTheme, {
      maxAge: 60 * 60 * 24 * 365,
      path: '/',
    });
  }

  private applyTheme(theme: ThemeOption): void {
    const classList = this.document.documentElement.classList; // toggle on <html>
    classList.remove('light', 'dark');

    if (theme === 'system') {
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      classList.add(prefersDark ? 'dark' : 'light');
    } else {
      classList.add(theme);
    }
  }
}
