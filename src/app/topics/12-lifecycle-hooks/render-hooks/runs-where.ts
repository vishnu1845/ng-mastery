import {
  afterEveryRender,
  afterNextRender,
  AfterViewInit,
  Component,
  inject,
  makeStateKey,
  OnInit,
  PLATFORM_ID,
  signal,
  TransferState,
} from '@angular/core';
import { isPlatformServer } from '@angular/common';

const SERVER_RUN = makeStateKey<string[]>('lifecycle-hooks.runs-where');

/**
 * Records which hooks run while the server prerenders this page, and which run in the browser.
 * The server's list travels to the browser inside the page, with TransferState.
 */
@Component({
  selector: 'app-runs-where',
  styleUrl: './runs-where.scss',
  templateUrl: './runs-where.html',
})
export class RunsWhere implements OnInit, AfterViewInit {
  private readonly state = inject(TransferState);
  private readonly onServer = isPlatformServer(inject(PLATFORM_ID));
  private readonly ran: string[] = [];

  protected readonly hooks = [
    'constructor',
    'ngOnInit',
    'ngAfterViewInit',
    'afterNextRender',
    'afterEveryRender',
  ];
  /** In the browser: the list the server wrote into the page. Empty after an in-app navigation. */
  protected readonly server = signal<string[]>(this.onServer ? [] : this.state.get(SERVER_RUN, []));
  protected readonly browser = signal<string[]>([]);

  constructor() {
    this.mark('constructor');
    afterNextRender(() => this.mark('afterNextRender'));
    // Marked once, then stopped: marking makes Angular render again, which would call it again
    const everyRender = afterEveryRender(() => {
      this.mark('afterEveryRender');
      everyRender.destroy();
    });
  }

  ngOnInit(): void {
    this.mark('ngOnInit');
  }

  ngAfterViewInit(): void {
    this.mark('ngAfterViewInit');
  }

  private mark(hook: string): void {
    this.ran.push(hook);
    const list = [...this.ran];
    if (this.onServer) this.state.set(SERVER_RUN, list);
    // Shown after the render, since the hooks run in the middle of it
    queueMicrotask(() => (this.onServer ? this.server : this.browser).set(list));
  }
}
