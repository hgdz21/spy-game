import { Component, EventEmitter, Output } from '@angular/core';
import { GameService, ThemeCategory } from '../../core/services/game.service';
import { ThemeCategoryKey, TranslationService } from '../../core/services/translation.service';

@Component({
  selector: 'app-setup',
  standalone: true,
  templateUrl: './setup.component.html',
  styleUrl: './setup.component.css'
})
export class SetupComponent {
  @Output() cancel = new EventEmitter<void>();
  @Output() startRoles = new EventEmitter<void>();

  constructor(
    public readonly gameService: GameService,
    public readonly translationService: TranslationService
  ) {}

  startRoleAssignment(): void {
    this.gameService.startRoleAssignment();
    this.startRoles.emit();
  }

  selectCategory(categoryId: ThemeCategoryKey): void {
    this.gameService.setSelectedCategory(categoryId);
  }

  isSelectedCategory(categoryId: ThemeCategoryKey): boolean {
    return this.gameService.state().selectedCategoryId === categoryId;
  }

  categoryName(category: ThemeCategory): string {
    return this.translationService.translateCategory(category.nameKey);
  }

  t(key: Parameters<TranslationService['t']>[0]): string {
    return this.translationService.t(key);
  }
}
