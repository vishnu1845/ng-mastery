import { afterNextRender, Component, inject, signal } from '@angular/core';
import { MomentReport } from '../_shared/moment-report';
import { CardPanel } from './card-panel';
import { LatePlain, LateSignal } from './late-change';

/** Shows when projected content and the component's own view are ready, and the ngAfterViewInit trap. */
@Component({
  selector: 'app-content-vs-view-demo',
  imports: [CardPanel, LatePlain, LateSignal],
  providers: [MomentReport],
  styleUrl: './content-vs-view-demo.scss',
  templateUrl: './content-vs-view-demo.html',
})
export default class ContentVsViewDemo {
  protected readonly report = inject(MomentReport);
  protected readonly moments = ['constructor', 'ngOnInit', 'ngAfterContentInit', 'ngAfterViewInit'];
  protected readonly queries = ['@ContentChild', 'contentChild()', '@ViewChild', 'viewChild()'];

  // A new id creates new components, so every check runs again
  protected readonly rounds = signal<{ id: number }[]>([]);

  constructor() {
    // Created in the browser, so nothing is reused from the server's HTML
    afterNextRender(() => this.again());
  }

  protected again(): void {
    this.report.clear();
    this.rounds.update(([round]) => [{ id: (round?.id ?? 0) + 1 }]);
  }
}
