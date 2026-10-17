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

const ACCENTS = ['#d98bff', '#7dd3fc', '#a3e635', '#fbbf24'];

/** Every control drives one class or style binding. Watch the toast's real class and style change. */
@Component({
  selector: 'app-class-style-demo',
  styleUrl: './class-style-demo.scss',
  templateUrl: './class-style-demo.html',
})
export default class ClassStyleDemo {
  private readonly toast = viewChild.required<ElementRef<HTMLElement>>('toast');

  protected readonly accents = ACCENTS;
  // Shown as text: a raw "{" in a template starts an ICU message, so it lives here
  protected readonly objectBinding = `[class]="{ 'is-dense': dense(), 'is-pinned': pinned() }"`;

  // CLASS STATE
  protected readonly hasError = signal(false);
  protected readonly dense = signal(false);
  protected readonly pinned = signal(false);

  // STYLE STATE
  protected readonly radius = signal(10);
  protected readonly width = signal(100);
  protected readonly accent = signal(ACCENTS[0]);

  protected readonly toastHtml = signal('');

  constructor() {
    const destroyRef = inject(DestroyRef);

    afterNextRender(() => {
      const stop = watchHtml(this.toast().nativeElement, (html) =>
        this.toastHtml.set(withoutScoping(openingTag(html))),
      );
      destroyRef.onDestroy(stop);
    });
  }
}
