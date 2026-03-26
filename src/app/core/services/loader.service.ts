import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoaderService {
  readonly isLoading = signal(false);

  showLoader(duration: number = 1500): void {
    this.isLoading.set(true);
    setTimeout(() => this.isLoading.set(false), duration);
  }

  hideLoader(): void {
    this.isLoading.set(false);
  }
}
