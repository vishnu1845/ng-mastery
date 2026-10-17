import { Component, computed, inject, input, output, signal } from '@angular/core';
import { DEFAULT_LABELS, RATING_LABELS } from './rating-labels';

// THE MODERN STYLE: same behaviour, and @Component is the only decorator left
@Component({
  selector: 'app-signal-rating',
  template: `
    @for (star of stars(); track star) {
      <button
        type="button"
        [class.is-on]="star <= value()"
        [attr.aria-label]="star + ' stars'"
        (click)="rate(star)"
      >
        ★
      </button>
    }
    <span class="label">{{ label() }}</span>
  `,
  styleUrl: './rating.scss',
  // host: {} replaces @HostBinding and @HostListener
  host: {
    tabindex: '0',
    '[class.is-rated]': 'value() > 0',
    '(keydown.arrowRight)': 'next()',
    '(keydown.arrowLeft)': 'previous()',
  },
})
export class SignalRating {
  // input() / output() replace @Input / @Output
  readonly max = input(5);
  readonly rated = output<number>();

  // inject() replaces @Optional() @Inject() in the constructor
  private readonly labels = inject(RATING_LABELS, { optional: true }) ?? DEFAULT_LABELS;

  protected readonly value = signal(0);
  protected readonly stars = computed(() => Array.from({ length: this.max() }, (_, i) => i + 1));
  protected readonly label = computed(() => this.labels[this.value() - 1] ?? 'Not rated');

  protected next(): void {
    this.rate(Math.min(this.max(), this.value() + 1));
  }

  protected previous(): void {
    this.rate(Math.max(1, this.value() - 1));
  }

  protected rate(value: number): void {
    this.value.set(value);
    this.rated.emit(value);
  }
}
