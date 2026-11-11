import {
  afterRenderEffect,
  AfterViewInit,
  Component,
  ElementRef,
  inject,
  QueryList,
  signal,
  viewChild,
  viewChildren,
  ViewChildren,
} from '@angular/core';
import { InfoCard } from '../_shared/info-card';
import { AddressBlock } from './address-block';

interface Field {
  id: number;
  label: string;
}

/** Which #field inputs a view query finds: its own, the ones it projects, not a child's. */
@Component({
  selector: 'app-view-queries-demo',
  imports: [AddressBlock, InfoCard],
  styleUrl: './view-queries-demo.scss',
  templateUrl: './view-queries-demo.html',
})
export default class ViewQueriesDemo implements AfterViewInit {
  private readonly host = inject<ElementRef<HTMLElement>>(ElementRef);

  protected readonly list = signal<Field[]>([
    { id: 1, label: 'First name' },
    { id: 2, label: 'Last name' },
  ]);
  private nextId = 3;

  // NEW: a signal of a readonly array, updated when @for adds or removes a field
  protected readonly fields = viewChildren<ElementRef<HTMLInputElement>>('field');
  protected readonly address = viewChild(AddressBlock);

  // OLD: a QueryList, with a changes Observable
  @ViewChildren('field') oldFields!: QueryList<ElementRef<HTMLInputElement>>;
  protected readonly oldLength = signal(0);
  protected readonly changesEmitted = signal(0);

  constructor() {
    // DEMO ONLY: outline every input the query found, after each render
    afterRenderEffect({
      write: () => {
        const found = new Set(this.fields().map((field) => field.nativeElement));
        for (const input of this.host.nativeElement.querySelectorAll('input')) {
          input.dataset['found'] = String(found.has(input));
        }
      },
    });
  }

  ngAfterViewInit(): void {
    this.oldLength.set(this.oldFields.length);
    // Angular completes this Observable when the view is destroyed
    this.oldFields.changes.subscribe(() => {
      this.oldLength.set(this.oldFields.length);
      this.changesEmitted.update((count) => count + 1);
    });
  }

  protected add(): void {
    this.list.update((list) => [...list, { id: this.nextId, label: `Field ${this.nextId++}` }]);
  }

  protected removeLast(): void {
    this.list.update((list) => list.slice(0, -1));
  }

  protected focusLast(): void {
    this.fields().at(-1)?.nativeElement.focus();
  }
}
