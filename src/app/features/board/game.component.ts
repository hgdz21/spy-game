import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { GameService } from '../../core/services/game.service';
import { TranslationService } from '../../core/services/translation.service';

@Component({
  selector: 'app-game',
  standalone: true,
  templateUrl: './game.component.html',
  styleUrl: './game.component.css'
})
export class GameComponent implements OnInit, OnDestroy {
  @Output() exitGame = new EventEmitter<void>();

  showConfirmModal = false;

  constructor(
    public readonly gameService: GameService,
    public readonly translationService: TranslationService
  ) {}

  ngOnInit(): void {
    this.gameService.startTimer(() => this.exitGame.emit());
  }

  ngOnDestroy(): void {
    this.gameService.stopTimer();
  }

  showEndGameModal(): void {
    this.showConfirmModal = true;
  }

  hideConfirmModal(): void {
    this.showConfirmModal = false;
  }

  confirmEndGame(): void {
    this.gameService.stopTimer();
    this.showConfirmModal = false;
    this.exitGame.emit();
  }

  t(key: Parameters<TranslationService['t']>[0]): string {
    return this.translationService.t(key);
  }
}
