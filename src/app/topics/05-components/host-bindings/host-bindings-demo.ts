import {
  afterNextRender,
  Component,
  DestroyRef,
  ElementRef,
  inject,
  signal,
  viewChild,
} from '@angular/core';
import { CodeBlock } from '@shared/ui/code-block/code-block';
import { openingTag, watchHtml } from '@shared/utils/dom-watch';
import { ToggleSwitch } from './toggle-switch';

const OLD_WAY = `// Same result with decorators (still works, not the recommended style)
@HostBinding('attr.role') role = 'switch';
@HostBinding('attr.aria-checked') get checked() { return this.on(); }
@HostBinding('class.active') get active() { return this.on(); }
@HostListener('click') toggle() { ... }`;

/** The host element is the component's own tag. Watch its real HTML change as you use it. */
@Component({
  imports: [ToggleSwitch, CodeBlock],
  selector: 'app-host-bindings-demo',
  styleUrl: './host-bindings-demo.scss',
  templateUrl: './host-bindings-demo.html',
})
export default class HostBindingsDemo {
  private readonly toggle = viewChild.required(ToggleSwitch, { read: ElementRef });

  protected readonly oldWay = OLD_WAY;
  protected readonly hostHtml = signal('');
  protected readonly changes = signal(0);

  constructor() {
    const destroyRef = inject(DestroyRef);

    afterNextRender(() => {
      // Only the opening tag: that's where host bindings land
      const stop = watchHtml(this.toggle().nativeElement, (html) =>
        this.hostHtml.set(openingTag(html)),
      );
      destroyRef.onDestroy(stop);
    });
  }
}
