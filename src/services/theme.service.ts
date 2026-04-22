import { Injectable, signal, effect, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

export type Theme = 'light' | 'dark';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  currentTheme = signal<Theme>('dark');

  constructor(@Inject(PLATFORM_ID) private platformId: object) {
    if (isPlatformBrowser(platformId)) {
      this.initializeTheme();
    }

    // Watch for theme changes and apply them
    effect(() => {
      if (isPlatformBrowser(this.platformId)) {
        const theme = this.currentTheme();
        document.documentElement.setAttribute('data-theme', theme);
        localStorage.setItem('theme', theme);
      }
    });
  }

  private initializeTheme(): void {
    // Check for saved preference
    const savedTheme = localStorage.getItem('theme') as Theme | null;
    if (savedTheme) {
      this.currentTheme.set(savedTheme);
      return;
    }

    // Check system preference
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    this.currentTheme.set(prefersDark ? 'dark' : 'light');
  }

  toggleTheme(): void {
    this.currentTheme.update(theme => theme === 'dark' ? 'light' : 'dark');
  }

  setTheme(theme: Theme): void {
    this.currentTheme.set(theme);
  }

  getTheme(): Theme {
    return this.currentTheme();
  }
}
