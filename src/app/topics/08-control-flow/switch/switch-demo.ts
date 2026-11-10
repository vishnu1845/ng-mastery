import {
  afterNextRender,
  Component,
  computed,
  DestroyRef,
  ElementRef,
  inject,
  signal,
  viewChild,
} from '@angular/core';
import { watchHtml, withoutScoping } from '@shared/utils/dom-watch';

type OrderStatus = 'placed' | 'packed' | 'shipped' | 'delivered' | 'cancelled';

/** An order tracker on @switch with its live DOM, then a string that never equals a number. */
@Component({
  selector: 'app-switch-demo',
  styleUrl: './switch-demo.scss',
  templateUrl: './switch-demo.html',
})
export default class SwitchDemo {
  private readonly tracker = viewChild.required<ElementRef<HTMLElement>>('tracker');

  // ORDER TRACKER
  protected readonly statuses: OrderStatus[] = [
    'placed',
    'packed',
    'shipped',
    'delivered',
    'cancelled',
  ];
  protected readonly status = signal<OrderStatus>('placed');
  protected readonly trackerHtml = signal('');

  // STRICT EQUALITY: an <input> always gives a string
  protected readonly typed = signal('2');
  protected readonly convert = signal(false);
  protected readonly stars = computed<string | number>(() =>
    this.convert() ? Number(this.typed()) : this.typed(),
  );
  protected readonly starsType = computed(() => typeof this.stars());

  protected readonly neverLine = '@default never;';
  protected readonly neverError = "TS2322: Type '\"cancelled\"' is not assignable to type 'never'.";

  constructor() {
    const destroyRef = inject(DestroyRef);

    afterNextRender(() => {
      const stop = watchHtml(this.tracker().nativeElement, (html) =>
        this.trackerHtml.set(withoutScoping(html)),
      );
      destroyRef.onDestroy(stop);
    });
  }
}
