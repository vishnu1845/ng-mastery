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
import { Dropdown } from './dropdown';
import { DropdownDecorators } from './dropdown-decorators';

/** One dropdown written with host metadata and one with decorators, behaving the same. */
@Component({
  selector: 'app-host-listeners-demo',
  imports: [Dropdown, DropdownDecorators],
  styleUrl: './host-listeners-demo.scss',
  templateUrl: './host-listeners-demo.html',
})
export default class HostListenersDemo {
  private readonly stage = viewChild.required<ElementRef<HTMLElement>>('stage');

  protected readonly actions = ['Rename', 'Duplicate', 'Archive'];

  // HOST METADATA VERSION
  protected readonly hostOpen = signal(false);
  protected readonly hostHeard = signal(0);
  protected readonly hostTag = signal('');

  // DECORATOR VERSION
  protected readonly oldOpen = signal(false);
  protected readonly oldHeard = signal(0);
  protected readonly oldTag = signal('');

  // Removing the menus destroys both directives, and their document listeners with them
  protected readonly mounted = signal(true);
  protected readonly lastAction = signal('');

  constructor() {
    const destroyRef = inject(DestroyRef);

    afterNextRender(() => {
      const stage = this.stage().nativeElement;
      const read = () => {
        this.hostTag.set(tagOf(stage.querySelector('[appDropdown]')));
        this.oldTag.set(tagOf(stage.querySelector('[appDropdownOld]')));
      };
      read();
      destroyRef.onDestroy(watchChanges(stage, read));
    });
  }

  protected pick(action: string, open: { set(value: boolean): void }): void {
    this.lastAction.set(action);
    open.set(false);
  }
}

function tagOf(element: Element | null): string {
  return element ? withoutScoping(openingTag(element.outerHTML)) : '(destroyed)';
}
