import { Component, EventEmitter, HostListener, OnInit, Output, signal } from '@angular/core';
import { GameService, ThemeCategory } from '../../core/services/game.service';
import {
  LanguageCode,
  ThemeCategoryKey,
  TranslationService
} from '../../core/services/translation.service';
import { LoaderService } from '../../core/services/loader.service';

type HomeView = 'home' | 'howto' | 'locations';

@Component({
  selector: 'app-home',
  standalone: true,
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {
  @Output() startGame = new EventEmitter<void>();
  @Output() openSettings = new EventEmitter<void>();
  @Output() footerVisibleChange = new EventEmitter<boolean>();

  readonly view = signal<HomeView>('home');
  readonly expandedCategory = signal<ThemeCategoryKey | null>(null);
  readonly isLanguageMenuOpen = signal(false);

  readonly languageOptions: Array<{
    code: LanguageCode;
    label: string;
    flagSrc: string;
  }> = [
    { code: 'en', label: 'English', flagSrc: 'assets/flags/gb.svg' },
    { code: 'fr', label: 'Français', flagSrc: 'assets/flags/fr.svg' },
    { code: 'ar', label: 'العربية', flagSrc: 'assets/flags/dz.svg' }
  ];

  constructor(
    public readonly gameService: GameService,
    public readonly translationService: TranslationService,
    private readonly loaderService: LoaderService
  ) {}

  ngOnInit(): void {
    this.footerVisibleChange.emit(true);
  }

  showHome(): void {
    this.view.set('home');
    this.footerVisibleChange.emit(true);
  }

  showHowToPlay(): void {
    this.view.set('howto');
    this.isLanguageMenuOpen.set(false);
    this.footerVisibleChange.emit(false);
  }

  showLocations(): void {
    this.view.set('locations');
    this.expandedCategory.set(this.gameService.themeCategories[0]?.id ?? null);
    this.isLanguageMenuOpen.set(false);
    this.footerVisibleChange.emit(false);
  }

  toggleLanguageMenu(): void {
    this.isLanguageMenuOpen.update((current) => !current);
  }

  closeLanguageMenu(): void {
    this.isLanguageMenuOpen.set(false);
  }

  setLanguage(language: LanguageCode): void {
    this.translationService.setLanguage(language);
    this.isLanguageMenuOpen.set(false);
    this.loaderService.showLoader(1500);
  }

  currentLanguageOption(): { code: LanguageCode; label: string; flagSrc: string } {
    const current = this.translationService.currentLanguage();
    return this.languageOptions.find((option) => option.code === current) ?? this.languageOptions[0];
  }

  toggleCategory(categoryId: ThemeCategoryKey): void {
    const isExpanded = this.expandedCategory() === categoryId;
    this.expandedCategory.set(isExpanded ? null : categoryId);
  }

  isCategoryExpanded(categoryId: ThemeCategoryKey): boolean {
    return this.expandedCategory() === categoryId;
  }

  categoryTitle(category: ThemeCategory): string {
    return this.translationService.translateCategory(category.nameKey);
  }

  categoryItemLabel(item: string): string {
    return this.translationService.translateLocation(item);
  }

  t(key: Parameters<TranslationService['t']>[0]): string {
    return this.translationService.t(key);
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent): void {
    if (!this.isLanguageMenuOpen()) {
      return;
    }

    const target = event.target as HTMLElement | null;
    const clickedInsideLanguageSwitcher =
      !!target && typeof target.closest === 'function' && !!target.closest('.lang-switcher');

    if (!clickedInsideLanguageSwitcher) {
      this.closeLanguageMenu();
    }
  }

  @HostListener('document:keydown.escape')
  onEscapeKey(): void {
    this.closeLanguageMenu();
  }
}
