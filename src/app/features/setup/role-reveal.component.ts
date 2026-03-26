import { Component, EventEmitter, OnDestroy, Output, signal } from '@angular/core';
import { GameService } from '../../core/services/game.service';
import { TranslationService } from '../../core/services/translation.service';

const FLIP_DURATION_MS = 520;

@Component({
  selector: 'app-role-reveal',
  standalone: true,
  templateUrl: './role-reveal.component.html',
  styleUrl: './role-reveal.component.css'
})
export class RoleRevealComponent {
  @Output() rolesCompleted = new EventEmitter<void>();

  readonly isFlipped = signal(false);
  readonly isTransitioning = signal(false);

  private transitionTimeoutId: number | null = null;

  constructor(
    public readonly gameService: GameService,
    public readonly translationService: TranslationService
  ) {}

  handleCardTap(): void {
    if (this.isTransitioning()) {
      return;
    }

    // Tap 1: Reveal role by flipping card.
    if (!this.isFlipped()) {
      this.isFlipped.set(true);
      return;
    }

    // Tap 2: Flip card back, then advance player after animation completes.
    const isLastPlayer =
      this.gameService.state().currentPlayer >= this.gameService.state().playerCount;

    this.isTransitioning.set(true);
    this.isFlipped.set(false);

    this.transitionTimeoutId = window.setTimeout(() => {
      if (isLastPlayer) {
        this.rolesCompleted.emit();
      } else {
        this.gameService.nextPlayer();
      }

      this.isTransitioning.set(false);
      this.transitionTimeoutId = null;
    }, FLIP_DURATION_MS);
  }

  handleCardKeydown(event: KeyboardEvent): void {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      this.handleCardTap();
    }
  }

  ngOnDestroy(): void {
    if (this.transitionTimeoutId !== null) {
      window.clearTimeout(this.transitionTimeoutId);
      this.transitionTimeoutId = null;
    }
  }

  t(key: Parameters<TranslationService['t']>[0]): string {
    return this.translationService.t(key);
  }
}
