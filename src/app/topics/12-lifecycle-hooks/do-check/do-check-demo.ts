import { Component } from '@angular/core';
import { HookLog } from '../_shared/hook-log';
import { HookTimeline } from '../_shared/hook-timeline';
import { CheckParent, CheckSibling } from './panels';

/** Counts when the Watcher's ngDoCheck really runs: after clicks in its parent, not in a sibling. */
@Component({
  selector: 'app-do-check-demo',
  imports: [CheckParent, CheckSibling, HookTimeline],
  providers: [HookLog],
  styleUrl: './do-check-demo.scss',
  templateUrl: './do-check-demo.html',
})
export default class DoCheckDemo {
  protected readonly hooks = ['ngOnChanges', 'ngDoCheck'];
}
