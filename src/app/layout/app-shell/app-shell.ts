import { Component, inject, signal, viewChild } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { filter } from 'rxjs';
import { CommandPalette } from '../command-palette/command-palette';
import { Sidebar } from '../sidebar/sidebar';
import { TermPreview } from '../term-preview/term-preview';
import { Topbar } from '../topbar/topbar';

/** The app frame: sidebar, top bar, page outlet, the search palette and glossary previews. */
@Component({
  host: { '(document:keydown)': 'onKeydown($event)' },
  imports: [RouterOutlet, Sidebar, Topbar, CommandPalette, TermPreview],
  selector: 'app-shell',
  styleUrl: './app-shell.scss',
  templateUrl: './app-shell.html',
})
export class AppShell {
  private readonly palette = viewChild.required(CommandPalette);

  /** Mobile: is the sidebar drawer open? */
  protected readonly navOpen = signal(false);

  constructor() {
    // CLOSE THE DRAWER AFTER EVERY NAVIGATION
    inject(Router)
      .events.pipe(
        filter((event) => event instanceof NavigationEnd),
        takeUntilDestroyed(),
      )
      .subscribe(() => this.navOpen.set(false));
  }

  protected openSearch(): void {
    this.palette().open();
  }

  protected onKeydown(event: KeyboardEvent): void {
    const typing = isTypingTarget(event.target);

    if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === 'k') {
      event.preventDefault();
      this.openSearch();
    } else if (event.key === '/' && !typing) {
      event.preventDefault();
      this.openSearch();
    } else if (event.key === 'Escape') {
      this.navOpen.set(false);
    }
  }
}

function isTypingTarget(target: EventTarget | null): boolean {
  return (
    target instanceof HTMLElement &&
    (target.isContentEditable || ['INPUT', 'TEXTAREA', 'SELECT'].includes(target.tagName))
  );
}
