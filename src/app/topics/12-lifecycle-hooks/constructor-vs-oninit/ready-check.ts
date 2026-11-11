import {
  AfterViewInit,
  Component,
  DestroyRef,
  effect,
  ElementRef,
  inject,
  input,
  Input,
  OnInit,
} from '@angular/core';
import { attempt, MomentReport } from '../_shared/moment-report';

export type Moment = 'constructor' | 'ngOnInit' | 'ngAfterViewInit';

/**
 * The same five checks, run in the constructor, in ngOnInit and in ngAfterViewInit:
 * can it read the inputs, call inject() and effect(), and see the rendered template?
 */
@Component({
  selector: 'app-ready-check',
  template: `<p class="greeting">{{ name() }} from {{ city }}</p>`,
  styles: '.greeting { margin: 0; }',
})
export class ReadyCheck implements OnInit, AfterViewInit {
  private readonly report = inject(MomentReport);
  private readonly host = inject<ElementRef<HTMLElement>>(ElementRef);

  readonly name = input('Guest'); // signal input with a default
  @Input() city = 'Unknown'; // decorator input with a default

  constructor() {
    this.runChecks('constructor');
  }

  ngOnInit(): void {
    this.runChecks('ngOnInit');
  }

  ngAfterViewInit(): void {
    this.runChecks('ngAfterViewInit');
  }

  private runChecks(moment: Moment): void {
    // ✓ only when the value is the one the parent passed, not the default
    this.report.record('signal input', moment, {
      ok: this.name() !== 'Guest',
      text: `"${this.name()}"`,
    });
    this.report.record('@Input()', moment, { ok: this.city !== 'Unknown', text: `"${this.city}"` });
    this.report.record(
      'inject()',
      moment,
      attempt(() => inject(DestroyRef)),
    );
    this.report.record(
      'effect()',
      moment,
      attempt(() => effect(() => this.name())),
    );

    // The <p> in the template, and the text Angular has written into it so far
    const text = this.host.nativeElement.querySelector('.greeting')?.textContent;
    this.report.record('template', moment, {
      ok: !!text?.includes(this.name()),
      text: text === undefined ? 'no <p> yet' : `"${text}"`,
    });
  }
}
