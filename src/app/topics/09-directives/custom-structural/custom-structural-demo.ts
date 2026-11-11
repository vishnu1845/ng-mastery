import {
  afterNextRender,
  Component,
  DestroyRef,
  ElementRef,
  inject,
  signal,
  viewChild,
} from '@angular/core';
import { watchHtml, withoutScoping } from '@shared/utils/dom-watch';
import { HasRole } from './has-role';
import { Role, Session } from './session';

/** A toolbar whose buttons exist only for the right role, with its live HTML. */
@Component({
  selector: 'app-custom-structural-demo',
  imports: [HasRole],
  providers: [Session],
  styleUrl: './custom-structural-demo.scss',
  templateUrl: './custom-structural-demo.html',
})
export default class CustomStructuralDemo {
  private readonly toolbar = viewChild.required<ElementRef<HTMLElement>>('toolbar');

  protected readonly session = inject(Session);
  protected readonly roles: Role[] = ['guest', 'editor', 'admin'];
  protected readonly toolbarHtml = signal('');

  constructor() {
    const destroyRef = inject(DestroyRef);

    afterNextRender(() => {
      const stop = watchHtml(this.toolbar().nativeElement, (html) =>
        this.toolbarHtml.set(withoutScoping(html).replace(/></g, '>\n<')),
      );
      destroyRef.onDestroy(stop);
    });
  }
}
