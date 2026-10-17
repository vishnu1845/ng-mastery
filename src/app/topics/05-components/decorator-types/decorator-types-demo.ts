import { Component, signal } from '@angular/core';
import { CodeBlock } from '@shared/ui/code-block/code-block';
import { DecoratorRating } from './decorator-rating';
import { RATING_LABELS } from './rating-labels';
import { SignalRating } from './signal-rating';

const OLD_CODE = `@Component({ selector: 'app-decorator-rating' })   // class
export class DecoratorRating {
  @Input() max = 5;                                  // property
  @Output() rated = new EventEmitter<number>();      // property
  @HostBinding('class.is-rated') get isRated() {}    // property

  constructor(@Optional() @Inject(RATING_LABELS)     // parameter
              labels: string[] | null) {}

  @HostListener('keydown.arrowRight') next() {}      // method
}`;

const NEW_CODE = `@Component({
  selector: 'app-signal-rating',
  host: {
    '[class.is-rated]': 'value() > 0',
    '(keydown.arrowRight)': 'next()',
  },
})
export class SignalRating {
  readonly max = input(5);
  readonly rated = output<number>();
  private labels = inject(RATING_LABELS, { optional: true });
}`;

/** The same rating written with decorators and with functions. Both feed one event log. */
@Component({
  imports: [DecoratorRating, SignalRating, CodeBlock],
  selector: 'app-decorator-types-demo',
  styleUrl: './decorator-types-demo.scss',
  templateUrl: './decorator-types-demo.html',
  // Both ratings get these labels through DI (one with @Inject, one with inject())
  providers: [{ provide: RATING_LABELS, useValue: ['Bad', 'Meh', 'Okay', 'Good', 'Loved it'] }],
})
export default class DecoratorTypesDemo {
  protected readonly oldCode = OLD_CODE;
  protected readonly newCode = NEW_CODE;
  protected readonly log = signal<string[]>([]);

  protected record(source: string, stars: number): void {
    this.log.update((log) => [`${source} (rated) → ${stars}`, ...log].slice(0, 6));
  }
}
