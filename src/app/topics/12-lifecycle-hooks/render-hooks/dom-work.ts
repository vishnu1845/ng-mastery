import {
  afterEveryRender,
  afterNextRender,
  Component,
  computed,
  ElementRef,
  signal,
  viewChild,
} from '@angular/core';

/** afterNextRender: focus the box and measure it once, right after it first appears. */
@Component({
  selector: 'app-search-box',
  styleUrl: './render-hooks.scss',
  template: `
    <input #box type="search" placeholder="Search lessons" aria-label="Search lessons" />
    <p class="muted">{{ report() }}</p>
  `,
})
export class SearchBox {
  private readonly box = viewChild.required<ElementRef<HTMLInputElement>>('box');
  protected readonly report = signal('Waiting for the first render…');

  constructor() {
    afterNextRender({
      write: () => this.box().nativeElement.focus(),
      read: () => {
        const width = Math.round(this.box().nativeElement.getBoundingClientRect().width);
        const focused = document.activeElement === this.box().nativeElement;
        this.report.set(`afterNextRender: focused = ${focused}, width = ${width}px`);
      },
    });
  }
}

/**
 * afterEveryRender: read the list's height after every render of the app.
 * The result is written straight into the DOM. Setting a signal here would render again,
 * and this callback would run again, forever.
 */
@Component({
  selector: 'app-growing-list',
  styleUrl: './render-hooks.scss',
  template: `
    <div class="row">
      <button type="button" (click)="add()">Add a line</button>
      <button type="button" class="btn-ghost" (click)="lines.set(1)">Reset</button>
    </div>
    <ol #list class="lines">
      @for (line of numbers(); track line) {
        <li>Line {{ line }}</li>
      }
    </ol>
    <output #out class="mono">Waiting for the first render…</output>
  `,
})
export class GrowingList {
  protected readonly lines = signal(1);
  protected readonly numbers = computed(() =>
    Array.from({ length: this.lines() }, (_, i) => i + 1),
  );
  private readonly list = viewChild.required<ElementRef<HTMLElement>>('list');
  private readonly out = viewChild.required<ElementRef<HTMLElement>>('out');
  private renders = 0;

  constructor() {
    afterEveryRender({
      earlyRead: () => this.list().nativeElement.offsetHeight,
      write: (height) => {
        this.renders++;
        this.out().nativeElement.textContent = `afterEveryRender ran ${this.renders} times, list height ${height}px`;
      },
    });
  }

  protected add(): void {
    this.lines.update((lines) => lines + 1);
  }
}
