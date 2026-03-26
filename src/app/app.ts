import { Component, computed, effect, signal } from '@angular/core';
import { NgxParticlesModule } from '@tsparticles/angular';
import type { Engine, ISourceOptions } from '@tsparticles/engine';
import { loadSlim } from '@tsparticles/slim';
import { GameService } from './core/services/game.service';
import { ThemeService } from './core/services/theme.service';
import { TranslationService } from './core/services/translation.service';
import { GameComponent } from './features/board/game.component';
import { HomeComponent } from './features/home/home.component';
import { SettingsComponent } from './features/settings/settings.component';
import { RoleRevealComponent } from './features/setup/role-reveal.component';
import { SetupComponent } from './features/setup/setup.component';

type ScreenName = 'home' | 'setup' | 'settings' | 'role' | 'game';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    NgxParticlesModule,
    HomeComponent,
    SetupComponent,
    RoleRevealComponent,
    GameComponent,
    SettingsComponent
  ],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  readonly currentScreen = signal<ScreenName>('home');
  readonly homeFooterVisible = signal(true);
  readonly isLoading = signal(false);
  readonly particlesOptions = signal<ISourceOptions>(this.createParticlesOptions());

  readonly particlesInit = async (engine: Engine): Promise<void> => {
    await loadSlim(engine);
  };

  readonly shouldShowFooter = computed(
    () => this.currentScreen() === 'home' && this.homeFooterVisible()
  );

  constructor(
    private readonly gameService: GameService,
    private readonly themeService: ThemeService,
    private readonly translationService: TranslationService
  ) {
    this.themeService.loadTheme();
    this.translationService.loadLanguage();

    effect(() => {
      this.themeService.isDarkMode();
      this.particlesOptions.set(this.createParticlesOptions());
    });

    // Add global click handler for loader
    document.addEventListener('click', (event) => {
      const target = event.target as HTMLElement;
      // Show loader on button clicks, input changes, etc
      if (
        target.tagName === 'BUTTON' ||
        target.closest('button') ||
        target.tagName === 'A' ||
        target.closest('a')
      ) {
        this.showLoader();
        // Auto-hide loader after 800ms
        setTimeout(() => this.hideLoader(), 800);
      }
    });
  }

  showScreen(screen: ScreenName): void {
    this.currentScreen.set(screen);
  }

  showHomeScreen(): void {
    this.gameService.resetGame();
    this.homeFooterVisible.set(true);
    this.currentScreen.set('home');
  }

  setHomeFooterVisible(isVisible: boolean): void {
    this.homeFooterVisible.set(isVisible);
  }

  showLoader(): void {
    this.isLoading.set(true);
  }

  hideLoader(): void {
    this.isLoading.set(false);
  }

  private createParticlesOptions(): ISourceOptions {
    const styles = getComputedStyle(document.body);
    const primaryColor = styles.getPropertyValue('--color-primary').trim() || '#667eea';
    const mutedColor = styles.getPropertyValue('--text-muted').trim() || '#a0aec0';
    const isSmallScreen = window.matchMedia('(max-width: 480px)').matches;
    const isCoarsePointer = window.matchMedia('(pointer: coarse)').matches;
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const useLowPowerProfile = isSmallScreen || isCoarsePointer || prefersReducedMotion;

    const particleCount = useLowPowerProfile ? 18 : 30;
    const particleSpeed = prefersReducedMotion ? 0.15 : useLowPowerProfile ? 0.25 : 0.35;
    const linksDistance = useLowPowerProfile ? 105 : 130;
    const linksOpacity = useLowPowerProfile ? 0.1 : 0.14;
    const hoverEnabled = !isCoarsePointer && !prefersReducedMotion;
    const fpsLimit = useLowPowerProfile ? 30 : 40;

    return {
      background: {
        color: 'transparent'
      },
      fullScreen: {
        enable: false
      },
      fpsLimit,
      detectRetina: true,
      interactivity: {
        events: {
          onHover: {
            enable: hoverEnabled,
            mode: 'grab'
          },
          resize: {
            enable: true
          }
        },
        modes: {
          grab: {
            distance: 120,
            links: {
              opacity: 0.22
            }
          }
        }
      },
      particles: {
        color: {
          value: [primaryColor, mutedColor]
        },
        links: {
          color: mutedColor,
          distance: linksDistance,
          enable: true,
          opacity: linksOpacity,
          width: 1
        },
        move: {
          direction: 'none',
          enable: true,
          outModes: {
            default: 'out'
          },
          random: false,
          speed: particleSpeed,
          straight: false
        },
        number: {
          density: {
            enable: true,
            width: 900,
            height: 900
          },
          value: particleCount
        },
        opacity: {
          value: {
            min: 0.06,
            max: 0.18
          }
        },
        shape: {
          type: 'circle'
        },
        size: {
          value: {
            min: 1,
            max: 2.8
          }
        }
      },
      pauseOnBlur: true,
      pauseOnOutsideViewport: true
    };
  }
}
