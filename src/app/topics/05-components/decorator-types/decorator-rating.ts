import {
  Component,
  EventEmitter,
  HostBinding,
  HostListener,
  Inject,
  Input,
  Optional,
  Output,
} from '@angular/core';
import { DEFAULT_LABELS, RATING_LABELS } from './rating-labels';

// THE OLD STYLE: all four decorator types in one component

@Component({
  // 1. CLASS decorator: "this class is a component"
  selector: 'app-decorator-rating',
  template: `
    @for (star of stars; track star) {
      <button
        type="button"
        [class.is-on]="star <= value"
        [attr.aria-label]="star + ' stars'"
        (click)="rate(star)"
      >
        ★
      </button>
    }
    <span class="label">{{ label }}</span>
  `,
  styleUrl: './rating.scss',
})
export class DecoratorRating {
  // 2. PROPERTY decorators: inputs, outputs and host bindings
  @Input() max = 5;
  @Output() rated = new EventEmitter<number>();
  @HostBinding('attr.tabindex') tabindex = 0;
  @HostBinding('class.is-rated') get isRated(): boolean {
    return this.value > 0;
  }

  value = 0;
  private readonly labels: string[];

  // 4. PARAMETER decorators: tell DI what to inject (and that it may be missing)
  // eslint-disable-next-line @angular-eslint/prefer-inject -- this lesson shows the old style
  constructor(@Optional() @Inject(RATING_LABELS) labels: string[] | null) {
    this.labels = labels ?? DEFAULT_LABELS;
  }

  // 3. METHOD decorators: listen to events on the host element
  @HostListener('keydown.arrowRight') next(): void {
    this.rate(Math.min(this.max, this.value + 1));
  }

  @HostListener('keydown.arrowLeft') previous(): void {
    this.rate(Math.max(1, this.value - 1));
  }

  get stars(): number[] {
    return Array.from({ length: this.max }, (_, i) => i + 1);
  }

  get label(): string {
    return this.labels[this.value - 1] ?? 'Not rated';
  }

  rate(value: number): void {
    this.value = value;
    this.rated.emit(value);
  }
}
