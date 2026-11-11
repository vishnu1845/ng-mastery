import { Component, inject, signal } from '@angular/core';
import { HookLog } from '../_shared/hook-log';
import { Watcher } from './watcher';

const FOODS = ['ramen', 'onigiri', 'dango', 'mochi', 'takoyaki', 'gyoza'];

/** The Watcher's parent. Its buttons are inside its own template, so a click checks this view. */
@Component({
  selector: 'app-check-parent',
  imports: [Watcher],
  styleUrl: './do-check.scss',
  template: `
    <p class="title">Parent</p>
    <div class="row">
      <button type="button" (click)="pushItem()">push() an item</button>
      <button type="button" (click)="addItem()">Add with a new array</button>
      <button type="button" (click)="click()">Click, nothing changes</button>
    </div>
    <p class="muted">The parent's list: {{ items().length }} items</p>
    <app-watcher [items]="items()" />
  `,
})
export class CheckParent {
  private readonly log = inject(HookLog);
  protected readonly items = signal<string[]>(['ramen']);

  protected pushItem(): void {
    this.log.begin('Parent: push() an item');
    this.items().push(this.next());
  }

  protected addItem(): void {
    this.log.begin('Parent: add with a new array');
    this.items.update((items) => [...items, this.next()]);
  }

  protected click(): void {
    this.log.begin('Parent: click, nothing changes');
  }

  private next(): string {
    return FOODS[this.items().length % FOODS.length];
  }
}

/** A component next to the parent. Its clicks never check the parent's view. */
@Component({
  selector: 'app-check-sibling',
  styleUrl: './do-check.scss',
  template: `
    <p class="title">Sibling</p>
    <div class="row">
      <button type="button" (click)="click()">Click the sibling</button>
      <span class="muted">clicked {{ clicks() }} times</span>
    </div>
  `,
})
export class CheckSibling {
  private readonly log = inject(HookLog);
  protected readonly clicks = signal(0);

  protected click(): void {
    this.log.begin('Sibling: click');
    this.clicks.update((clicks) => clicks + 1);
  }
}
