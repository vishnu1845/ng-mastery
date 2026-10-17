import {
  afterNextRender,
  Component,
  DestroyRef,
  ElementRef,
  inject,
  signal,
  viewChild,
} from '@angular/core';
import { openingTag, watchHtml, withoutScoping } from '@shared/utils/dom-watch';

type UploadState = 'idle' | 'uploading' | 'done';

/** Attribute bindings on a real progress bar and table cell, with their live HTML. */
@Component({
  selector: 'app-attribute-demo',
  styleUrl: './attribute-demo.scss',
  templateUrl: './attribute-demo.html',
})
export default class AttributeDemo {
  private readonly bar = viewChild.required<ElementRef<HTMLElement>>('bar');
  private readonly totalCell = viewChild.required<ElementRef<HTMLElement>>('totalCell');
  private timer?: ReturnType<typeof setInterval>;

  // UPLOAD STATE
  protected readonly percent = signal(0);
  protected readonly state = signal<UploadState>('idle');

  // TABLE STATE
  protected readonly showTax = signal(false);

  // LIVE HTML
  protected readonly barHtml = signal('');
  protected readonly cellHtml = signal('');

  constructor() {
    const destroyRef = inject(DestroyRef);
    destroyRef.onDestroy(() => clearInterval(this.timer));

    afterNextRender(() => {
      const show = (html: string) => withoutScoping(openingTag(html));
      const stopBar = watchHtml(this.bar().nativeElement, (html) => this.barHtml.set(show(html)));
      const stopCell = watchHtml(this.totalCell().nativeElement, (html) =>
        this.cellHtml.set(show(html)),
      );
      destroyRef.onDestroy(() => {
        stopBar();
        stopCell();
      });
    });
  }

  protected upload(): void {
    this.state.set('uploading');
    this.timer = setInterval(() => {
      this.percent.update((value) => Math.min(value + 10, 100));
      if (this.percent() === 100) {
        clearInterval(this.timer);
        this.state.set('done');
      }
    }, 250);
  }

  protected reset(): void {
    clearInterval(this.timer);
    this.percent.set(0);
    this.state.set('idle');
  }
}
