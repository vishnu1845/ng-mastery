import { Component, computed, inject } from '@angular/core';
import { NgIcon } from '@ng-icons/core';
import {
  THEME_ACCENTS,
  THEME_MODES,
  ThemeAccent,
  ThemeMode,
  ThemeStore,
} from '@core/theme/theme-store';

const MODE_LABELS: Record<ThemeMode, { label: string; icon: string }> = {
  dark: { label: 'Dark', icon: 'lucideMoon' },
  light: { label: 'Light', icon: 'lucideSun' },
  system: { label: 'System', icon: 'lucideMonitor' },
};

const ACCENT_LABELS: Record<ThemeAccent, string> = {
  angular: 'Angular',
  ocean: 'Ocean',
  lime: 'Lime',
};

/** Theme picker in a native HTML popover (no library needed). */
@Component({
  imports: [NgIcon],
  selector: 'app-theme-menu',
  styleUrl: './theme-menu.scss',
  templateUrl: './theme-menu.html',
})
export class ThemeMenu {
  protected readonly theme = inject(ThemeStore);

  protected readonly modes = THEME_MODES.map((mode) => ({ mode, ...MODE_LABELS[mode] }));
  protected readonly accents = THEME_ACCENTS.map((accent) => ({
    accent,
    label: ACCENT_LABELS[accent],
  }));

  protected readonly triggerIcon = computed(() => MODE_LABELS[this.theme.mode()].icon);
}
