import { Component, signal } from '@angular/core';
import { Panel } from '../_shared/panel';

/** Grouping two elements for one slot: a plain <ng-container>, then with ngProjectAs, then @if. */
@Component({
  selector: 'app-ng-project-as-demo',
  imports: [Panel],
  styleUrl: './ng-project-as-demo.scss',
  templateUrl: './ng-project-as-demo.html',
})
export default class NgProjectAsDemo {
  protected readonly showRank = signal(true);
}
