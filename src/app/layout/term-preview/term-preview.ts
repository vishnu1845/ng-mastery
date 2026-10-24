import { afterNextRender, Component, DestroyRef, inject, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { NavigationStart, Router } from '@angular/router';
import { filter } from 'rxjs';
import { inlineCode, TextPart } from '@glossary/inline-code';

interface Preview {
  term: string;
  short: TextPart[];
  left: number;
  top: number | null;
  bottom: number | null;
}

const TERM_LINK = 'a.term[href^="/glossary/"]';
const SHOW_DELAY = 250;
const CARD_ID = 'term-preview';

/**
 * Glossary links, app-wide:
 * - hover or focus a term to see its one-line definition
 * - links inside rendered markdown navigate inside the app (no full page reload)
 * Listeners are added by hand, so moving the mouse never triggers change detection.
 */
@Component({
  selector: 'app-term-preview',
  styleUrl: './term-preview.scss',
  templateUrl: './term-preview.html',
})
export class TermPreview {
  private readonly router = inject(Router);
  private glossary?: Promise<typeof import('@glossary/glossary-terms')>;
  private anchor: HTMLAnchorElement | null = null;
  private timer?: ReturnType<typeof setTimeout>;

  protected readonly cardId = CARD_ID;
  protected readonly preview = signal<Preview | null>(null);

  constructor() {
    const destroyRef = inject(DestroyRef);

    this.router.events
      .pipe(
        filter((event) => event instanceof NavigationStart),
        takeUntilDestroyed(),
      )
      .subscribe(() => this.hide());

    afterNextRender(() => {
      const options = { passive: true };
      const listeners: [EventTarget, string, (event: Event) => void][] = [
        [document, 'click', (event) => this.onClick(event as MouseEvent)],
        [document, 'pointerover', (event) => this.onPointerOver(event as PointerEvent)],
        [document, 'pointerout', (event) => this.onPointerOut(event as PointerEvent)],
        [document, 'focusin', (event) => this.onFocusIn(event)],
        [document, 'focusout', () => this.hide()],
        [document, 'keydown', (event) => this.onKeydown(event as KeyboardEvent)],
        [window, 'scroll', () => this.hide()],
      ];
      for (const [target, type, handler] of listeners) {
        target.addEventListener(type, handler, type === 'click' ? undefined : options);
      }
      destroyRef.onDestroy(() => {
        clearTimeout(this.timer);
        for (const [target, type, handler] of listeners) target.removeEventListener(type, handler);
      });
    });
  }

  // LINKS IN MARKDOWN: navigate inside the app instead of reloading the page
  private onClick(event: MouseEvent): void {
    const modified = event.metaKey || event.ctrlKey || event.shiftKey || event.altKey;
    if (event.defaultPrevented || event.button !== 0 || modified) return;

    const link = (event.target as Element).closest<HTMLAnchorElement>('.prose a[href^="/"]');
    if (!link) return;
    event.preventDefault();
    this.router.navigateByUrl(link.getAttribute('href') ?? '/');
  }

  // HOVER (mouse only: on touch, a tap simply opens the glossary page)
  private onPointerOver(event: PointerEvent): void {
    if (event.pointerType !== 'mouse') return;
    const link = (event.target as Element).closest<HTMLAnchorElement>(TERM_LINK);
    if (!link || link === this.anchor) return;
    clearTimeout(this.timer);
    this.timer = setTimeout(() => this.show(link), SHOW_DELAY);
  }

  private onPointerOut(event: PointerEvent): void {
    const link = (event.target as Element).closest(TERM_LINK);
    if (link && !link.contains(event.relatedTarget as Node | null)) this.hide();
  }

  private onKeydown(event: KeyboardEvent): void {
    if (event.key === 'Escape') this.hide();
  }

  // KEYBOARD: Tab onto a term to see the same card
  private onFocusIn(event: Event): void {
    const link = (event.target as Element).closest<HTMLAnchorElement>(TERM_LINK);
    if (link) this.show(link);
  }

  private async show(link: HTMLAnchorElement): Promise<void> {
    this.glossary ??= import('@glossary/glossary-terms');
    const { findTerm } = await this.glossary;
    const entry = findTerm(link.pathname.slice('/glossary/'.length));
    if (!entry || !link.isConnected) return;

    // Below the word, or above it when there isn't room
    const rect = link.getBoundingClientRect();
    const width = Math.min(320, innerWidth - 32);
    const above = innerHeight - rect.bottom < 200;

    this.anchor?.removeAttribute('aria-describedby');
    this.anchor = link;
    link.setAttribute('aria-describedby', CARD_ID);

    this.preview.set({
      term: entry.term,
      short: inlineCode(entry.short),
      left: Math.min(Math.max(16, rect.left), innerWidth - 16 - width),
      top: above ? null : rect.bottom + 8,
      bottom: above ? innerHeight - rect.top + 8 : null,
    });
  }

  private hide(): void {
    clearTimeout(this.timer);
    this.anchor?.removeAttribute('aria-describedby');
    this.anchor = null;
    if (this.preview()) this.preview.set(null);
  }
}
