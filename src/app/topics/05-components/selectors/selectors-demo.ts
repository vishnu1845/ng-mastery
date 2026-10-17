import {
  afterNextRender,
  Component,
  DestroyRef,
  ElementRef,
  inject,
  signal,
  viewChild,
} from '@angular/core';
import { watchHtml } from '../dom-watch';
import { Chip, PrimaryButton, TagBadge } from './selector-kinds';

/** The three selector types, with the real DOM each one produces. */
@Component({
  imports: [TagBadge, PrimaryButton, Chip],
  selector: 'app-selectors-demo',
  styleUrl: './selectors-demo.scss',
  templateUrl: './selectors-demo.html',
})
export default class SelectorsDemo {
  // THE HOST ELEMENTS (read as plain DOM elements)
  private readonly badge = viewChild.required(TagBadge, { read: ElementRef });
  private readonly button = viewChild.required(PrimaryButton, { read: ElementRef });
  private readonly chip = viewChild.required(Chip, { read: ElementRef });

  // LIVE HTML of each host
  protected readonly badgeHtml = signal('');
  protected readonly buttonHtml = signal('');
  protected readonly chipHtml = signal('');

  protected readonly name = signal('Asha');
  protected readonly saved = signal<string | null>(null);

  constructor() {
    const destroyRef = inject(DestroyRef);

    afterNextRender(() => {
      const stops = [
        watchHtml(this.badge().nativeElement, (html) => this.badgeHtml.set(html)),
        watchHtml(this.button().nativeElement, (html) => this.buttonHtml.set(html)),
        watchHtml(this.chip().nativeElement, (html) => this.chipHtml.set(html)),
      ];
      destroyRef.onDestroy(() => stops.forEach((stop) => stop()));
    });
  }

  // A normal form submit: proof that button[appPrimary] is still a real button
  protected submit(event: Event): void {
    event.preventDefault();
    this.saved.set(this.name());
  }
}
