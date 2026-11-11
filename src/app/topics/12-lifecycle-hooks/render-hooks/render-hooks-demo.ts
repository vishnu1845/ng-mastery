import { Component, signal } from '@angular/core';
import { GrowingList, SearchBox } from './dom-work';
import { RunsWhere } from './runs-where';

/** Where render hooks run, and the two everyday jobs: one-time DOM work and reading after each render. */
@Component({
  selector: 'app-render-hooks-demo',
  imports: [RunsWhere, SearchBox, GrowingList],
  styleUrl: './render-hooks-demo.scss',
  templateUrl: './render-hooks-demo.html',
})
export default class RenderHooksDemo {
  protected readonly searchOpen = signal(false);
  protected readonly elsewhere = signal(0);
}
