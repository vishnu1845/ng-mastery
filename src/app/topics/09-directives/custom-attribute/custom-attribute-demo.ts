import {
  afterNextRender,
  Component,
  DestroyRef,
  ElementRef,
  inject,
  signal,
  viewChild,
} from '@angular/core';
import { openingTag, watchChanges, withoutScoping } from '@shared/utils/dom-watch';
import { Highlight } from '../_shared/highlight';
import { AutoFocus } from './auto-focus';

/** One highlight directive on three different elements, and a search box that focuses itself. */
@Component({
  selector: 'app-custom-attribute-demo',
  imports: [Highlight, AutoFocus],
  styleUrl: './custom-attribute-demo.scss',
  templateUrl: './custom-attribute-demo.html',
})
export default class CustomAttributeDemo {
  private readonly targets = viewChild.required<ElementRef<HTMLElement>>('targets');

  // HIGHLIGHT
  protected readonly colors = ['aqua', 'violet', 'tomato'];
  protected readonly color = signal('aqua');
  protected readonly activeTag = signal('');

  // AUTOFOCUS
  protected readonly searching = signal(false);
  protected readonly focused = signal(false);

  constructor() {
    const destroyRef = inject(DestroyRef);

    afterNextRender(() => {
      const targets = this.targets().nativeElement;
      const stop = watchChanges(targets, () => {
        const active = targets.querySelector('[style*="background"]');
        this.activeTag.set(active ? withoutScoping(openingTag(active.outerHTML)) : '');
      });
      destroyRef.onDestroy(stop);
    });
  }

  protected toggleSearch(): void {
    this.focused.set(false);
    this.searching.update((searching) => !searching);
  }
}
