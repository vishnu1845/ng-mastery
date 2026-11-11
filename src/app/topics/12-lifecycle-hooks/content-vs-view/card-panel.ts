import {
  AfterContentInit,
  AfterViewInit,
  Component,
  contentChild,
  ContentChild,
  ElementRef,
  inject,
  OnInit,
  viewChild,
  ViewChild,
} from '@angular/core';
import { MomentReport } from '../_shared/moment-report';

/**
 * Content = what the parent puts between our tags (shown with <ng-content>).
 * View    = our own template.
 * Each hook checks which of the two it can already find.
 */
@Component({
  selector: 'app-card-panel',
  styleUrl: './content-vs-view.scss',
  template: `
    <ng-content />
    <p #own class="own">Card's own template</p>
  `,
})
export class CardPanel implements OnInit, AfterContentInit, AfterViewInit {
  private readonly report = inject(MomentReport);

  @ContentChild('projected') oldContent?: ElementRef;
  @ViewChild('own') oldView?: ElementRef;
  readonly content = contentChild<ElementRef>('projected');
  readonly view = viewChild<ElementRef>('own');

  constructor() {
    this.check('constructor');
  }

  ngOnInit(): void {
    this.check('ngOnInit');
  }

  ngAfterContentInit(): void {
    this.check('ngAfterContentInit');
  }

  ngAfterViewInit(): void {
    this.check('ngAfterViewInit');
  }

  private check(moment: string): void {
    const found = (value: unknown) => ({ ok: !!value, text: value ? 'found' : 'undefined' });
    this.report.record('@ContentChild', moment, found(this.oldContent));
    this.report.record('@ViewChild', moment, found(this.oldView));
    this.report.record('contentChild()', moment, found(this.content()));
    this.report.record('viewChild()', moment, found(this.view()));
  }
}
