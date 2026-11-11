import { Component, DoCheck, inject, input, OnChanges, signal } from '@angular/core';
import { HookLog } from '../_shared/hook-log';

/**
 * Gets a list from its parent. ngOnChanges sees only a new array.
 * ngDoCheck runs whenever the parent is checked, so it can notice a push() into the same array.
 */
@Component({
  selector: 'app-watcher',
  styleUrl: './do-check.scss',
  template: `
    <p class="title">Watcher (child)</p>
    <p>
      Counted in <code>ngDoCheck</code>: <strong>{{ seen() }}</strong>
      {{ seen() === 1 ? 'item' : 'items' }}
    </p>
  `,
})
export class Watcher implements OnChanges, DoCheck {
  private readonly log = inject(HookLog);
  readonly items = input<string[]>([]);

  protected readonly seen = signal(0);
  private lastList: string[] = [];
  private lastLength = 0;

  ngOnChanges(): void {
    this.log.record('Watcher', 'ngOnChanges', `new array, ${this.items().length} items`);
  }

  // CUSTOM CHANGE DETECTION: compare what we saw last time by hand
  ngDoCheck(): void {
    const list = this.items();
    const mutated = list === this.lastList && list.length !== this.lastLength;
    this.log.record(
      'Watcher',
      'ngDoCheck',
      mutated ? `caught a push(): ${this.lastLength} → ${list.length} items` : undefined,
    );

    this.lastList = list;
    this.lastLength = list.length;
    this.seen.set(list.length);
  }
}
