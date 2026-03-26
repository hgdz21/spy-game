import { Injectable, signal } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class ThemeService {
  private readonly storageKey = 'spyGameTheme';
  private readonly darkModeSignal = signal<boolean>(true);

  readonly isDarkMode = this.darkModeSignal.asReadonly();

  constructor() {
    this.loadTheme();
  }

  loadTheme(): void {
    const saved = localStorage.getItem(this.storageKey);
    if (saved === 'dark' || saved === 'light') {
      this.darkModeSignal.set(saved === 'dark');
    }

    this.applyThemeClass();
  }

  setDarkMode(isDarkMode: boolean): void {
    this.darkModeSignal.set(isDarkMode);
    localStorage.setItem(this.storageKey, isDarkMode ? 'dark' : 'light');
    this.applyThemeClass();
  }

  toggleTheme(): void {
    this.setDarkMode(!this.darkModeSignal());
  }

  private applyThemeClass(): void {
    if (this.darkModeSignal()) {
      document.body.classList.remove('light-mode');
    } else {
      document.body.classList.add('light-mode');
    }
  }
}
