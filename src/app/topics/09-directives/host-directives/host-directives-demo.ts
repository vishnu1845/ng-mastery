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
import { Chip } from './chip';
import { CreationLog } from './creation-log';
import { Pressable } from './pressable';

/** A chip built from two host directives, next to the same thing wired by hand. */
@Component({
  selector: 'app-host-directives-demo',
  imports: [Chip, Highlight, Pressable],
  providers: [CreationLog],
  styleUrl: './host-directives-demo.scss',
  templateUrl: './host-directives-demo.html',
})
export default class HostDirectivesDemo {
  private readonly composed = viewChild.required<ElementRef<HTMLElement>>('composed');
  private readonly log = inject(CreationLog);

  protected readonly topics = [
    { label: 'Signals', color: 'aqua' },
    { label: 'Routing', color: 'violet' },
    { label: 'Forms', color: 'tomato' },
  ];

  protected readonly pressed = signal('');
  protected readonly chipTag = signal('');
  protected readonly order = signal<string[]>([]);

  constructor() {
    const destroyRef = inject(DestroyRef);

    afterNextRender(() => {
      // The first chip on the page: its host directive and then the component itself
      this.order.set(this.log.names.slice(0, 2));

      const composed = this.composed().nativeElement;
      const read = () => {
        const chip =
          composed.querySelector('app-chip[style*="background"]') ??
          composed.querySelector('app-chip');
        this.chipTag.set(
          chip ? withoutScoping(openingTag(chip.outerHTML)).replace(' style=""', '') : '',
        );
      };
      read();
      destroyRef.onDestroy(watchChanges(composed, read));
    });
  }
}
