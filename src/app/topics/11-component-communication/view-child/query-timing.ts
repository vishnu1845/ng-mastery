import { AfterViewInit, Component, OnInit, signal, viewChild, ViewChild } from '@angular/core';
import { Question } from './question';

export interface TimingRow {
  moment: string;
  decorator: string;
  decoratorStatic: string;
  signal: string;
  signalInIf: string;
}

/** Records, at each moment, which queries already have their child. */
@Component({
  selector: 'app-query-timing',
  imports: [Question],
  template: `
    <app-question #fixed text="Written straight in the template" />
    @if (show) {
      <app-question #inIf text="Written inside an @if" />
    }
  `,
  styles: `
    :host {
      display: none;
    }
  `,
})
export class QueryTiming implements OnInit, AfterViewInit {
  protected readonly show = true;

  // OLDER: decorators
  @ViewChild('fixed') decorator?: Question;
  @ViewChild('fixed', { static: true }) decoratorStatic?: Question;

  // MODERN: signal queries
  readonly fixed = viewChild<Question>('fixed');
  readonly inIf = viewChild<Question>('inIf');
  private readonly inIfRequired = viewChild.required<Question>('inIf');

  // Signals, so the parent's table updates when a later hook adds a row
  readonly rows = signal<TimingRow[]>([]);
  readonly requiredTooEarly = signal('');

  constructor() {
    this.record('constructor');
  }

  ngOnInit(): void {
    this.record('ngOnInit');
    try {
      this.inIfRequired();
      this.requiredTooEarly.set('it had the child');
    } catch (error) {
      this.requiredTooEarly.set(
        error instanceof Error ? error.message.split('\n')[0] : String(error),
      );
    }
  }

  ngAfterViewInit(): void {
    this.record('ngAfterViewInit');
  }

  private record(moment: string): void {
    const found = (value: unknown) => (value ? 'the child' : 'undefined');
    const row = {
      moment,
      decorator: found(this.decorator),
      decoratorStatic: found(this.decoratorStatic),
      signal: found(this.fixed()),
      signalInIf: found(this.inIf()),
    };
    this.rows.update((rows) => [...rows, row]);
  }
}
