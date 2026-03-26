import { Component, EventEmitter, Output, signal } from '@angular/core';
import { GameService } from '../../core/services/game.service';
import { ThemeService } from '../../core/services/theme.service';
import { TranslationService } from '../../core/services/translation.service';

@Component({
  selector: 'app-settings',
  standalone: true,
  templateUrl: './settings.component.html',
  styleUrl: './settings.component.css'
})
export class SettingsComponent {
  @Output() cancel = new EventEmitter<void>();
  @Output() saved = new EventEmitter<void>();

  readonly timerDuration = signal(8);
  readonly lightModeChecked = signal(false);

  constructor(
    private readonly gameService: GameService,
    private readonly themeService: ThemeService,
    public readonly translationService: TranslationService
  ) {
    this.timerDuration.set(this.gameService.state().timerDuration);
    this.lightModeChecked.set(!this.themeService.isDarkMode());
  }

  setTimerDuration(value: string): void {
    const numeric = Number.parseInt(value, 10);
    if (Number.isNaN(numeric)) {
      return;
    }

    const clamped = Math.max(3, Math.min(20, numeric));
    this.timerDuration.set(clamped);
  }

  setLightMode(checked: boolean): void {
    this.lightModeChecked.set(checked);
  }

  saveSettings(): void {
    this.gameService.setTimerDuration(this.timerDuration());
    this.themeService.setDarkMode(!this.lightModeChecked());
    this.saved.emit();
  }

  t(key: Parameters<TranslationService['t']>[0]): string {
    return this.translationService.t(key);
  }
}
