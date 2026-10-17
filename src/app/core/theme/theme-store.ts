import { computed, DOCUMENT, effect, inject, Service, signal } from '@angular/core';
import { BrowserStorage } from '../platform/browser-storage';

export type ThemeMode = 'dark' | 'light' | 'system';
export type ThemeAccent = 'angular' | 'ocean' | 'lime';

export const THEME_MODES: readonly ThemeMode[] = ['dark', 'light', 'system'];
export const THEME_ACCENTS: readonly ThemeAccent[] = ['angular', 'ocean', 'lime'];

const MODE_KEY = 'ngm-theme';
const ACCENT_KEY = 'ngm-accent';

/**
 * Theme state for the whole app.
 * The inline script in index.html applies the saved theme before Angular starts;
 * this store keeps <html data-theme> and <html data-accent> in sync afterwards.
 */
@Service()
export class ThemeStore {
  private readonly storage = inject(BrowserStorage);
  private readonly document = inject(DOCUMENT);

  readonly mode = signal<ThemeMode>(pick(this.storage.get(MODE_KEY), THEME_MODES, 'dark'));
  readonly accent = signal<ThemeAccent>(
    pick(this.storage.get(ACCENT_KEY), THEME_ACCENTS, 'angular'),
  );

  private readonly prefersLight = signal(false);

  /** The theme actually on screen ('system' resolved to dark or light). */
  readonly resolved = computed(() => {
    const mode = this.mode();
    if (mode !== 'system') return mode;
    return this.prefersLight() ? 'light' : 'dark';
  });

  constructor() {
    this.watchSystemPreference();

    // APPLY + SAVE
    effect(() => {
      const root = this.document.documentElement;
      root.setAttribute('data-theme', this.resolved());
      root.setAttribute('data-accent', this.accent());
      this.storage.set(MODE_KEY, this.mode());
      this.storage.set(ACCENT_KEY, this.accent());
    });
  }

  setMode(mode: ThemeMode): void {
    this.mode.set(mode);
  }

  setAccent(accent: ThemeAccent): void {
    this.accent.set(accent);
  }

  private watchSystemPreference(): void {
    const query = this.document.defaultView?.matchMedia?.('(prefers-color-scheme: light)');
    if (!query) return;

    this.prefersLight.set(query.matches);
    query.addEventListener('change', (event) => this.prefersLight.set(event.matches));
  }
}

function pick<T extends string>(value: string | null, allowed: readonly T[], fallback: T): T {
  return allowed.includes(value as T) ? (value as T) : fallback;
}
