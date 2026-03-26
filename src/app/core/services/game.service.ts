import { Injectable, computed, signal } from '@angular/core';
import { LocationKey, ThemeCategoryKey } from './translation.service';

export interface ThemeCategory {
  id: ThemeCategoryKey;
  emoji: string;
  nameKey: ThemeCategoryKey;
  items: LocationKey[];
}

export interface GameState {
  playerCount: number;
  spyCount: number;
  currentPlayer: number;
  location: LocationKey | '';
  selectedCategoryId: ThemeCategoryKey;
  spyIndexes: number[];
  timerDuration: number;
  timeRemaining: number;
  currentVote: number | null;
  isSpyGuessing: boolean;
}

@Injectable({ providedIn: 'root' })
export class GameService {
  private readonly timerStorageKey = 'spyGameTimerDuration';
  private readonly selectedCategoryStorageKey = 'spyGameCategory';

  readonly themeCategories: ThemeCategory[] = [
    {
      id: 'places',
      emoji: '🏙️',
      nameKey: 'places',
      items: [
        'airport',
        'hospital',
        'restaurant',
        'school',
        'beach',
        'spaceStation',
        'hotel',
        'supermarket',
        'trainStation',
        'circus',
        'movieTheatre',
        'desertCamp',
        'footballStadium',
        'militaryBase',
        'policeStation'
      ]
    },
    {
      id: 'sports',
      emoji: '⚽',
      nameKey: 'sports',
      items: [
        'football',
        'basketball',
        'tennis',
        'swimming',
        'volleyball',
        'boxing',
        'cycling',
        'athletics',
        'gymnastics',
        'handball',
        'baseball',
        'tableTennis',
        'golf',
        'wrestling',
        'karate'
      ]
    },
    {
      id: 'countries',
      emoji: '🌍',
      nameKey: 'countries',
      items: [
        'algeria',
        'france',
        'japan',
        'brazil',
        'canada',
        'egypt',
        'morocco',
        'spain',
        'italy',
        'germany',
        'tunisia',
        'turkey',
        'india',
        'mexico',
        'argentina'
      ]
    },
    {
      id: 'professions',
      emoji: '🧑‍🍳',
      nameKey: 'professions',
      items: [
        'doctor',
        'teacher',
        'chef',
        'engineer',
        'pilot',
        'policeOfficer',
        'firefighter',
        'journalist',
        'lawyer',
        'architect',
        'nurse',
        'farmer',
        'electrician',
        'designer',
        'photographer'
      ]
    }
  ];

  readonly locations: LocationKey[] = this.themeCategories.flatMap((category) =>
    category.items
  );

  private readonly initialState: GameState = {
    playerCount: 4,
    spyCount: 1,
    currentPlayer: 1,
    location: '',
    selectedCategoryId: 'places',
    spyIndexes: [],
    timerDuration: 8,
    timeRemaining: 0,
    currentVote: null,
    isSpyGuessing: false
  };

  private readonly stateSignal = signal<GameState>({
    ...this.initialState,
    selectedCategoryId: this.loadSavedCategory(),
    timerDuration: this.loadSavedTimerDuration()
  });
  private timerInterval: number | null = null;

  readonly state = computed(() => this.stateSignal());

  readonly timerText = computed(() => {
    const totalSeconds = this.stateSignal().timeRemaining;
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
  });

  setPlayerCount(count: number): void {
    const nextValue = Math.min(12, Math.max(3, count));
    this.patchState({ playerCount: nextValue });
  }

  setSpyCount(count: number): void {
    const nextValue = Math.min(2, Math.max(1, count));
    this.patchState({ spyCount: nextValue });
  }

  incrementPlayers(): void {
    this.setPlayerCount(this.stateSignal().playerCount + 1);
  }

  decrementPlayers(): void {
    this.setPlayerCount(this.stateSignal().playerCount - 1);
  }

  incrementSpies(): void {
    this.setSpyCount(this.stateSignal().spyCount + 1);
  }

  decrementSpies(): void {
    this.setSpyCount(this.stateSignal().spyCount - 1);
  }

  setTimerDuration(minutes: number): void {
    const nextValue = Math.min(20, Math.max(3, minutes));
    this.patchState({ timerDuration: nextValue });
    localStorage.setItem(this.timerStorageKey, String(nextValue));
  }

  setSelectedCategory(categoryId: ThemeCategoryKey): void {
    const exists = this.themeCategories.some((category) => category.id === categoryId);
    if (!exists) {
      return;
    }

    this.patchState({ selectedCategoryId: categoryId });
    localStorage.setItem(this.selectedCategoryStorageKey, categoryId);
  }

  getSelectedCategory(): ThemeCategory {
    const selectedId = this.stateSignal().selectedCategoryId;
    return (
      this.themeCategories.find((category) => category.id === selectedId) ??
      this.themeCategories[0]
    );
  }

  startRoleAssignment(): void {
    const location = this.randomLocation();
    const spyIndexes = this.randomSpyIndexes(
      this.stateSignal().playerCount,
      this.stateSignal().spyCount
    );

    this.patchState({
      currentPlayer: 1,
      location,
      spyIndexes,
      currentVote: null,
      isSpyGuessing: false
    });
  }

  nextPlayer(): boolean {
    const nextPlayer = this.stateSignal().currentPlayer + 1;
    this.patchState({ currentPlayer: nextPlayer });
    return nextPlayer <= this.stateSignal().playerCount;
  }

  isCurrentPlayerSpy(): boolean {
    return this.stateSignal().spyIndexes.includes(this.stateSignal().currentPlayer);
  }

  startTimer(onTimeUp?: () => void): void {
    this.stopTimer();

    const durationSeconds = this.stateSignal().timerDuration * 60;
    this.patchState({ timeRemaining: durationSeconds });

    this.timerInterval = window.setInterval(() => {
      const current = this.stateSignal().timeRemaining;
      const next = Math.max(0, current - 1);
      this.patchState({ timeRemaining: next });

      if (next <= 0) {
        this.stopTimer();
        onTimeUp?.();
      }
    }, 1000);
  }

  stopTimer(): void {
    if (this.timerInterval !== null) {
      window.clearInterval(this.timerInterval);
      this.timerInterval = null;
    }
  }

  setVote(playerNumber: number | null): void {
    this.patchState({ currentVote: playerNumber });
  }

  resetGame(): void {
    this.stopTimer();

    const current = this.stateSignal();
    this.stateSignal.set({
      ...this.initialState,
      playerCount: current.playerCount,
      spyCount: current.spyCount,
      selectedCategoryId: current.selectedCategoryId,
      timerDuration: current.timerDuration
    });
  }

  private loadSavedCategory(): ThemeCategoryKey {
    const saved = localStorage.getItem(this.selectedCategoryStorageKey);
    if (
      saved === 'places' ||
      saved === 'sports' ||
      saved === 'countries' ||
      saved === 'professions'
    ) {
      return saved;
    }

    return this.initialState.selectedCategoryId;
  }

  private loadSavedTimerDuration(): number {
    const saved = localStorage.getItem(this.timerStorageKey);
    if (saved === null) {
      return this.initialState.timerDuration;
    }

    const parsed = Number.parseInt(saved, 10);
    if (Number.isNaN(parsed)) {
      return this.initialState.timerDuration;
    }

    return Math.min(20, Math.max(3, parsed));
  }

  private patchState(partial: Partial<GameState>): void {
    this.stateSignal.update((current) => ({ ...current, ...partial }));
  }

  private randomLocation(): LocationKey {
    const selectedCategory = this.getSelectedCategory();
    const items = selectedCategory.items;
    return items[Math.floor(Math.random() * items.length)];
  }

  private randomSpyIndexes(playerCount: number, spyCount: number): number[] {
    const indexes: number[] = [];

    while (indexes.length < spyCount) {
      const randomIndex = Math.floor(Math.random() * playerCount) + 1;
      if (!indexes.includes(randomIndex)) {
        indexes.push(randomIndex);
      }
    }

    return indexes;
  }
}
