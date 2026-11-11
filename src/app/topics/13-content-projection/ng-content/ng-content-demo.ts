import { Component, signal } from '@angular/core';
import { RunCount } from '@shared/ui/run-count/run-count';
import { RunCounter } from '@shared/utils/run-counter';
import { ChartWidget } from '../_shared/chart-widget';
import { ContentCollapsible, ContentRepeat } from '../_shared/content-vs-template';
import { InfoCard } from '../_shared/info-card';

/** What <ng-content> shows, who owns it, and what happens when it is hidden or repeated. */
@Component({
  selector: 'app-ng-content-demo',
  imports: [InfoCard, ContentCollapsible, ContentRepeat, ChartWidget, RunCount],
  providers: [RunCounter],
  styleUrl: './ng-content-demo.scss',
  templateUrl: './ng-content-demo.html',
})
export default class NgContentDemo {
  protected readonly name = signal('Mikasa');
  protected readonly likes = signal(0);
}
